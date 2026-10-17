/*
 * 立ち絵（紙芝居風 SVG）の生成
 * 人物データの look（色・髪型）と表情から SVG 要素を組み立てる。
 * 文字列の innerHTML は使わず、要素を一つずつ生成する。
 */
(function (root) {
  "use strict";

  const NS = "http://www.w3.org/2000/svg";
  const INK = "#2b1a10";

  function el(name, attrs, parent) {
    const node = document.createElementNS(NS, name);
    Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (parent) parent.appendChild(node);
    return node;
  }

  function line(attrs, parent) {
    return el("path", Object.assign({ fill: "none", stroke: INK, "stroke-width": 3, "stroke-linecap": "round" }, attrs), parent);
  }

  function drawHair(g, look, layer) {
    const h = look.hair;
    const s = { fill: h, stroke: INK, "stroke-width": 3, "stroke-linejoin": "round" };
    switch (look.hairStyle) {
      case "bun":
        if (layer === "back") el("circle", Object.assign({ cx: 60, cy: 24, r: 13 }, s), g);
        else el("path", Object.assign({ d: "M30 64 Q28 28 60 28 Q92 28 90 64 Q86 44 60 42 Q34 44 30 64Z" }, s), g);
        break;
      case "bob":
        if (layer === "back") el("path", Object.assign({ d: "M26 82 Q22 26 60 24 Q98 26 94 82 Z" }, s), g);
        else el("path", Object.assign({ d: "M30 62 Q34 30 60 30 Q86 30 90 62 Q78 48 66 44 Q52 52 30 62Z" }, s), g);
        break;
      case "long":
        if (layer === "back") el("path", Object.assign({ d: "M26 112 Q20 26 60 24 Q100 26 94 112 Z" }, s), g);
        else el("path", Object.assign({ d: "M30 66 Q30 30 60 28 Q90 30 90 66 Q80 40 62 40 Q48 50 30 66Z" }, s), g);
        break;
      case "perm":
        if (layer === "back") {
          [[34, 40], [48, 28], [64, 26], [80, 32], [90, 48], [30, 58], [92, 64]].forEach(function (p) {
            el("circle", Object.assign({ cx: p[0], cy: p[1], r: 12 }, s), g);
          });
        }
        break;
      case "cap":
        if (layer === "front") {
          el("path", Object.assign({ d: "M30 54 Q32 24 60 24 Q88 24 90 54 Z" }, s, { fill: look.accent }), g);
          el("path", Object.assign({ d: "M28 54 L100 54 Q98 62 86 60 L28 58 Z" }, s, { fill: look.accent }), g);
        }
        break;
      case "headband":
        if (layer === "front") {
          el("path", Object.assign({ d: "M30 70 Q28 52 34 46 L36 64Z" }, s), g);
          el("path", Object.assign({ d: "M90 70 Q92 52 86 46 L84 64Z" }, s), g);
          el("path", Object.assign({ d: "M29 48 Q60 38 91 48 L91 56 Q60 46 29 56 Z" }, s, { fill: look.accent }), g);
          el("path", Object.assign({ d: "M88 50 L102 42 L100 54 Z" }, s, { fill: look.accent }), g);
        }
        break;
      case "slick":
        if (layer === "front") el("path", Object.assign({ d: "M30 62 Q26 26 62 26 Q94 28 90 60 Q88 40 70 36 Q50 34 30 62Z" }, s), g);
        break;
      default: // short
        if (layer === "front") el("path", Object.assign({ d: "M30 62 Q28 26 60 26 Q92 26 90 62 Q84 42 60 40 Q36 42 30 62Z" }, s), g);
    }
  }

  function drawFace(g, expression) {
    // 眉
    if (expression === "angry") {
      line({ d: "M40 50 L54 56" }, g);
      line({ d: "M80 50 L66 56" }, g);
    } else if (expression === "surprised") {
      line({ d: "M40 46 Q47 40 54 46" }, g);
      line({ d: "M66 46 Q73 40 80 46" }, g);
    } else {
      line({ d: "M41 52 Q47 49 53 52" }, g);
      line({ d: "M67 52 Q73 49 79 52" }, g);
    }
    // 目
    if (expression === "happy") {
      line({ d: "M41 64 Q47 57 53 64" }, g);
      line({ d: "M67 64 Q73 57 79 64" }, g);
      el("ellipse", { cx: 40, cy: 76, rx: 6, ry: 3.5, fill: "#e8806a", opacity: 0.6 }, g);
      el("ellipse", { cx: 80, cy: 76, rx: 6, ry: 3.5, fill: "#e8806a", opacity: 0.6 }, g);
    } else if (expression === "surprised") {
      el("circle", { cx: 47, cy: 62, r: 6, fill: "#fff", stroke: INK, "stroke-width": 2.5 }, g);
      el("circle", { cx: 73, cy: 62, r: 6, fill: "#fff", stroke: INK, "stroke-width": 2.5 }, g);
      el("circle", { cx: 47, cy: 62, r: 2.2, fill: INK }, g);
      el("circle", { cx: 73, cy: 62, r: 2.2, fill: INK }, g);
    } else {
      el("ellipse", { cx: 47, cy: 63, rx: 3, ry: 4, fill: INK }, g);
      el("ellipse", { cx: 73, cy: 63, rx: 3, ry: 4, fill: INK }, g);
    }
    // 鼻
    line({ d: "M60 66 Q63 72 59 74", "stroke-width": 2 }, g);
    // 口
    if (expression === "happy") {
      el("path", { d: "M48 82 Q60 96 72 82 Z", fill: "#8c2a1e", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round" }, g);
    } else if (expression === "angry") {
      line({ d: "M50 88 Q60 80 70 88" }, g);
    } else if (expression === "surprised") {
      el("ellipse", { cx: 60, cy: 86, rx: 6, ry: 8, fill: "#8c2a1e", stroke: INK, "stroke-width": 3 }, g);
    } else {
      line({ d: "M52 84 Q60 88 68 84" }, g);
    }
  }

  function drawPerson(svg, look, expression) {
    const g = el("g", {}, svg);
    drawHair(g, look, "back");
    // 体
    el("path", { d: "M8 150 Q12 104 60 102 Q108 104 112 150 Z", fill: look.clothes, stroke: INK, "stroke-width": 3 }, g);
    el("path", { d: "M46 104 L60 124 L74 104", fill: "none", stroke: look.accent, "stroke-width": 5 }, g);
    el("rect", { x: 52, y: 92, width: 16, height: 14, fill: look.skin, stroke: INK, "stroke-width": 3 }, g);
    // 顔
    el("ellipse", { cx: 60, cy: 66, rx: 30, ry: 33, fill: look.skin, stroke: INK, "stroke-width": 3 }, g);
    drawHair(g, look, "front");
    drawFace(g, expression);
    return g;
  }

  function drawCrowd(svg, look, expression) {
    const palette = [
      { skin: look.skin, hair: "#2b1a10", hairStyle: "short", clothes: "#6b5a48", accent: "#c8102e" },
      { skin: "#f4cfa8", hair: "#4a4a4a", hairStyle: "bun", clothes: "#3f6a7a", accent: "#f2e6c8" },
      { skin: "#dca77c", hair: "#1c1c1c", hairStyle: "cap", clothes: "#8c6a2a", accent: "#2f5aa0" }
    ];
    const spots = [[-22, 18, 0.62], [44, 18, 0.62], [11, 34, 0.78]];
    spots.forEach(function (p, i) {
      const g = drawPerson(svg, palette[i], i === 2 ? expression : (expression === "angry" ? "angry" : "normal"));
      g.setAttribute("transform", "translate(" + p[0] + " " + p[1] + ") scale(" + p[2] + ")");
    });
  }

  function render(container, character, expression) {
    while (container.firstChild) container.removeChild(container.firstChild);
    const svg = el("svg", { viewBox: "0 0 120 150", role: "presentation", focusable: "false" });
    if (character.look.hairStyle === "crowd") drawCrowd(svg, character.look, expression);
    else drawPerson(svg, character.look, expression);
    container.appendChild(svg);
  }

  root.TankaPortrait = { render: render };
})(window);
