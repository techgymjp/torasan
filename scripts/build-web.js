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

// Google Play 用のビルドでは本番の広告を使う
const mode = process.env.ADMOB_MODE === 'production' ? 'production' : 'test';
if (mode === 'production') {
  // 本番の広告 ID が未設定のまま Google Play 用にビルドしないようにする
  const ads = fs.readFileSync(path.join(root, 'ads.js'), 'utf8');
  const strings = fs.readFileSync(path.join(root, 'android/app/src/main/res/values/strings.xml'), 'utf8');
  const unitsSet = /production:\s*\{\s*interstitial:\s*'ca-app-pub-[^']+',\s*rewarded:\s*'ca-app-pub-[^']+'/.test(ads);
  const appIdSet = !strings.includes('ca-app-pub-3940256099942544');
  if (!unitsSet || !appIdSet) {
    console.error('本番の AdMob ID が未設定です。ads.js の UNITS.production と strings.xml の admob_app_id を設定してください。');
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
