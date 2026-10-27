// Android アプリに同梱する Web ファイルを www/ にコピーする
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const out = path.join(root, 'www');
const ITEMS = [
  'index.html', 'styles.css', 'icon.svg', 'i18n.js',
  'data', 'logic.js', 'portrait.js', 'audio.js', 'ads.js', 'ads-config.js', 'build-info.js', 'game.js',
];
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);
for (const item of ITEMS) {
  const src = path.join(root, item);
  if (fs.existsSync(src)) fs.cpSync(src, path.join(out, item), { recursive: true });
}

// Google Play / App Store 用のビルドでは本番の広告を使う（ADMOB_PLATFORM=ios なら iOS の ID を確かめる）
const mode = process.env.ADMOB_MODE === 'production' ? 'production' : 'test';
if (mode === 'production') {
  // 本番の広告 ID が未設定のまま、ストア用にビルドしないようにする
  const platform = process.env.ADMOB_PLATFORM === 'ios' ? 'ios' : 'android';
  const ads = fs.readFileSync(path.join(root, 'ads.js'), 'utf8');
  const block = ads.slice(ads.indexOf(`${platform}: {`));
  const prod = (block.match(/production:\s*\{([^}]*)\}/) || [])[1] || '';
  const unitsSet = ['interstitial', 'rewarded', 'banner'].every(k =>
    new RegExp(`${k}:\\s*["']ca-app-pub-\\d+/\\d{10}["']`).test(prod));
  const appIdFile = platform === 'ios' ? 'ios/App/App/Info.plist' : 'android/app/src/main/res/values/strings.xml';
  const appIdSet = !fs.readFileSync(path.join(root, appIdFile), 'utf8').includes('ca-app-pub-3940256099942544');
  if (!unitsSet || !appIdSet) {
    console.error(`本番の AdMob ID（${platform}）が未設定です。ads.js の UNITS.${platform}.production と ${appIdFile} のアプリ ID を設定してください。`);
    process.exit(1);
  }
}
fs.writeFileSync(path.join(out, 'ads-config.js'), `// ビルド時に生成\nwindow.AD_MODE = '${mode}';\n`);

// タイトル画面に出すバージョン（CI では VERSION_NAME / VERSION_CODE を使う）
const version = process.env.VERSION_CODE
  ? `v${process.env.VERSION_NAME || require('../package.json').version} (build ${process.env.VERSION_CODE})`
  : 'dev';
fs.writeFileSync(path.join(out, 'build-info.js'), `// ビルド時に生成\nwindow.APP_VERSION = '${version}';\n`);
console.log(`built web assets into www/ (ads: ${mode}, version: ${version})`);
