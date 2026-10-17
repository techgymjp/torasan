/*
 * 音楽・効果音（Web Audio API でその場で合成）
 * 音声ファイルを使わないため、素材の権利確認やダウンロードが不要。
 * 旋律はすべてオリジナル（ヨナ抜き音階：レ・ミ・ソ・ラ・シ）。
 *
 * ブラウザの自動再生制限に従い、最初のクリック／キー入力で unlock() してから鳴らす。
 * AudioContext が使えない環境では何もしない（ゲームはそのまま遊べる）。
 */
(function (root) {
  "use strict";

  const AudioCtor = root.AudioContext || root.webkitAudioContext;

  const VOLUME = { master: 0.6, music: 0.32, sfx: 0.8 };
  const LOOKAHEAD = 0.2;   // 何秒先まで予約するか
  const TICK_MS = 50;      // 予約処理の間隔

  // ---------- 曲データ（8分音符単位。null は休符、数値は MIDI ノート番号） ----------

  const TRACKS = {
    // 商店街のにぎわい（タイトル・商売中）
    street: {
      tempo: 138,
      melody: [
        74, null, 76, 74, 71, null, 69, null, 71, 74, 71, 69, 67, null, null, null,
        69, null, 71, 69, 67, null, 64, null, 67, 69, 67, 64, 62, null, null, null,
        62, 64, 67, null, 69, null, 71, null, 74, null, 71, 69, 71, null, null, null,
        76, null, 74, 71, 69, 71, 67, null, 64, 67, 64, 62, 62, null, null, null
      ],
      bassRoots: [50, 55, 57, 50, 55, 50, 57, 50],
      drums: true
    },
    // 結末（ゆったり、しみじみ）
    ending: {
      tempo: 84,
      melody: [
        74, null, null, 71, 69, null, 71, null, 67, null, null, 64, 62, null, null, null,
        64, null, 67, null, 69, null, 71, 69, 67, null, null, null, null, null, null, null
      ],
      bassRoots: [50, 55, 57, 50],
      drums: false,
      bell: true
    }
  };

  let ctx = null;
  let buses = null;
  let noiseBuffer = null;
  let enabled = { music: true, sfx: true };
  let wantedTrack = null;
  let playing = null; // { name, step, nextTime }
  let tempoScale = 1;
  let timer = null;

  function midiToFreq(m) {
    return 440 * Math.pow(2, (m - 69) / 12);
  }

  // ---------- 初期化 ----------

  function unlock() {
    if (!AudioCtor) return false;
    try {
      if (!ctx) {
        ctx = new AudioCtor();
        const master = ctx.createGain();
        master.gain.value = VOLUME.master;
        master.connect(ctx.destination);
        const music = ctx.createGain();
        music.gain.value = enabled.music ? VOLUME.music : 0;
        music.connect(master);
        const sfx = ctx.createGain();
        sfx.gain.value = enabled.sfx ? VOLUME.sfx : 0;
        sfx.connect(master);
        buses = { master: master, music: music, sfx: sfx };

        noiseBuffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

        document.addEventListener("visibilitychange", function () {
          if (!ctx) return;
          if (document.hidden) ctx.suspend();
          else ctx.resume();
        });
      }
      if (ctx.state === "suspended") ctx.resume();
      syncMusic();
      return true;
    } catch (e) {
      ctx = null;
      return false;
    }
  }

  function ready(kind) {
    return ctx !== null && enabled[kind];
  }

  // ---------- 楽器 ----------

  // 三味線風のはじく音：明るい立ち上がりから素早く減衰
  function pluck(midi, t, vol, bus) {
    const f = midiToFreq(midi);
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(f * 1.01, t);
    osc.frequency.exponentialRampToValueAtTime(f, t + 0.04);
    const buzz = ctx.createOscillator();
    buzz.type = "square";
    buzz.frequency.value = f * 2;
    const buzzGain = ctx.createGain();
    buzzGain.gain.value = 0.15;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(3200, t);
    filter.frequency.exponentialRampToValueAtTime(700, t + 0.3);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    osc.connect(filter);
    buzz.connect(buzzGain).connect(filter);
    filter.connect(g).connect(bus);
    osc.start(t); buzz.start(t);
    osc.stop(t + 0.55); buzz.stop(t + 0.55);
  }

  // 風鈴・鈴のような余韻のある音
  function bell(midi, t, vol, bus) {
    const f = midiToFreq(midi);
    [[1, 1], [2.76, 0.35], [5.4, 0.12]].forEach(function (p) {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f * p[0];
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol * p[1], t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6 / p[0] + 0.3);
      osc.connect(g).connect(bus);
      osc.start(t);
      osc.stop(t + 2);
    });
  }

  function noise(t, dur, vol, type, freq, q, bus) {
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = freq;
    filter.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(filter).connect(g).connect(bus);
    src.start(t);
    src.stop(t + dur + 0.02);
  }

  // 太鼓：低い胴鳴り＋皮の打撃音
  function taiko(t, vol, bus) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(130, t);
    osc.frequency.exponentialRampToValueAtTime(48, t + 0.25);
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
    osc.connect(g).connect(bus);
    osc.start(t);
    osc.stop(t + 0.5);
    noise(t, 0.08, vol * 0.5, "lowpass", 500, 0.7, bus);
  }

  // 太鼓のふち打ち「カッ」
  function rim(t, vol, bus) {
    noise(t, 0.035, vol, "bandpass", 3200, 2, bus);
  }

  // 拍子木「チョン」
  function hyoshigi(t, vol, bus) {
    [2150, 3300].forEach(function (f, i) {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.setValueAtTime(vol * (i ? 0.4 : 1), t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      osc.connect(g).connect(bus);
      osc.start(t);
      osc.stop(t + 0.15);
    });
    noise(t, 0.02, vol * 0.8, "bandpass", 2600, 6, bus);
  }

  // すべり落ちる音（失敗）
  function slide(t, from, to, dur, vol, bus) {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(from, t);
    osc.frequency.exponentialRampToValueAtTime(to, t + dur);
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 9;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = from * 0.03;
    lfo.connect(lfoGain).connect(osc.frequency);
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.setValueAtTime(vol, t + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g).connect(bus);
    osc.start(t); lfo.start(t);
    osc.stop(t + dur + 0.05); lfo.stop(t + dur + 0.05);
  }

  // 小銭の音
  function coin(t, vol, bus) {
    [88, 93].forEach(function (m, i) {
      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.value = midiToFreq(m);
      const g = ctx.createGain();
      const s = t + i * 0.07;
      g.gain.setValueAtTime(0.0001, s);
      g.gain.exponentialRampToValueAtTime(vol, s + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, s + (i ? 0.35 : 0.08));
      osc.connect(g).connect(bus);
      osc.start(s);
      osc.stop(s + 0.4);
    });
  }

  // ---------- BGM の予約再生 ----------

  function scheduleStep(track, step, t) {
    const bus = buses.music;
    const len = track.melody.length;
    const i = step % len;
    const note = track.melody[i];
    if (note !== null) {
      if (track.bell) bell(note, t, 0.22, bus);
      else pluck(note, t, 0.28, bus);
    }
    const bar = Math.floor(i / 8);
    const inBar = i % 8;
    const root = track.bassRoots[bar % track.bassRoots.length];
    if (inBar === 0) pluck(root, t, 0.3, bus);
    if (inBar === 4) pluck(root + 7, t, 0.22, bus);
    if (track.drums) {
      if (inBar === 0 || inBar === 4) taiko(t, 0.55, bus);
      if (inBar === 2 || inBar === 6) rim(t, 0.25, bus);
      if (inBar === 7 && bar % 2 === 1) taiko(t, 0.35, bus);
    } else if (inBar === 0) {
      taiko(t, 0.18, bus);
    }
  }

  function tick() {
    if (!playing || !ctx) return;
    const track = TRACKS[playing.name];
    const stepDur = 60 / (track.tempo * (playing.name === "street" ? tempoScale : 1)) / 2;
    while (playing.nextTime < ctx.currentTime + LOOKAHEAD) {
      scheduleStep(track, playing.step, playing.nextTime);
      playing.step++;
      playing.nextTime += stepDur;
    }
  }

  function syncMusic() {
    const shouldPlay = ctx && enabled.music && wantedTrack ? wantedTrack : null;
    if (playing && playing.name === shouldPlay) return;
    playing = null;
    if (timer) { clearInterval(timer); timer = null; }
    if (!shouldPlay) return;
    playing = { name: shouldPlay, step: 0, nextTime: ctx.currentTime + 0.1 };
    timer = setInterval(tick, TICK_MS);
    tick();
  }

  // ---------- 公開 API ----------

  function setMusic(name) {
    wantedTrack = name;
    syncMusic();
  }

  // 騒動が大きいと BGM が少し速くなる
  function setTension(high) {
    tempoScale = high ? 1.18 : 1;
  }

  function setEnabled(kind, on) {
    enabled[kind] = !!on;
    if (buses) {
      const g = buses[kind].gain;
      g.cancelScheduledValues(ctx.currentTime);
      g.setTargetAtTime(on ? VOLUME[kind] : 0, ctx.currentTime, 0.05);
    }
    if (kind === "music") syncMusic();
  }

  function now() {
    return ctx.currentTime + 0.01;
  }

  const sfx = {
    // 口上を選んだ
    select: function () {
      if (!ready("sfx")) return;
      const t = now();
      pluck(74, t, 0.35, buses.sfx);
      pluck(79, t + 0.06, 0.35, buses.sfx);
    },
    // 次の幕へ（拍子木を二つ）
    next: function () {
      if (!ready("sfx")) return;
      const t = now();
      hyoshigi(t, 0.6, buses.sfx);
      hyoshigi(t + 0.2, 0.6, buses.sfx);
    },
    // 商売開始（太鼓三つ＋拍子木）
    start: function () {
      if (!ready("sfx")) return;
      const t = now();
      taiko(t, 0.8, buses.sfx);
      taiko(t + 0.16, 0.6, buses.sfx);
      taiko(t + 0.32, 0.9, buses.sfx);
      hyoshigi(t + 0.55, 0.7, buses.sfx);
    },
    // 結果スタンプ
    stamp: function (kind) {
      if (!ready("sfx")) return;
      const t = now();
      const bus = buses.sfx;
      if (kind === "bad") {
        noise(t, 0.4, 0.5, "highpass", 1800, 0.5, bus);
        taiko(t, 0.9, bus);
        slide(t + 0.05, 880, 160, 0.7, 0.35, bus);
      } else if (kind === "warm") {
        bell(74, t, 0.35, bus);
        bell(81, t + 0.18, 0.3, bus);
        bell(86, t + 0.36, 0.25, bus);
      } else {
        hyoshigi(t, 0.7, bus);
        [74, 76, 79, 83, 86].forEach(function (m, i) { pluck(m, t + 0.08 + i * 0.06, 0.32, bus); });
      }
    },
    // 売上が入った
    coin: function () {
      if (!ready("sfx")) return;
      coin(now() + 0.25, 0.12, buses.sfx);
    },
    // 幕引き：だんだん速くなる拍子木（柝の頭）
    curtain: function (bad) {
      if (!ready("sfx")) return;
      const t = now();
      const bus = buses.sfx;
      let s = t;
      let gap = 0.32;
      for (let i = 0; i < 12; i++) {
        hyoshigi(s, 0.35 + i * 0.03, bus);
        s += gap;
        gap = Math.max(0.06, gap * 0.78);
      }
      if (bad) {
        slide(s + 0.1, 700, 140, 0.9, 0.35, bus);
      } else {
        taiko(s + 0.1, 0.9, bus);
        [62, 67, 69, 74].forEach(function (m, i) { pluck(m, s + 0.1 + i * 0.12, 0.38, bus); });
      }
    }
  };

  root.TankaAudio = {
    supported: !!AudioCtor,
    unlock: unlock,
    setMusic: setMusic,
    setTension: setTension,
    setEnabled: setEnabled,
    sfx: sfx
  };
})(window);
