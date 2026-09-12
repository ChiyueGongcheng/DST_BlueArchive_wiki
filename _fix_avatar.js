// 开发者页头像框：改为自动适应容器并居中
// 1) 给两个头像框外层 div 加 .dev-avatar 类
// 2) 在 developer.css 中让内层 flex 容器撑满，图片由居中决定位置（去掉硬编码 top 偏移）
const fs = require('fs');
const path = require('path');

const root = 'D:\\project\\DST_BlueArchive_wiki-main\\';
const htmlPath = root + 'childweb\\yuzu_developer.html';
const cssPath = root + 'css\\developer.css';

// ---- HTML ----
let html = fs.readFileSync(htmlPath, 'utf8');
const htmlNotes = [];
for (const img of ['toon.jpg', 'yue.jpg']) {
  const oldTag = '<div style="background-image: url(../image/yuzu/developer/' + img + ');';
  const newTag = '<div class="dev-avatar" style="background-image: url(../image/yuzu/developer/' + img + ');';
  const n = html.split(oldTag).length - 1;
  if (n !== 1) { htmlNotes.push(img + ':match' + n + '(skip)'); continue; }
  html = html.replace(oldTag, newTag);
  htmlNotes.push(img + ':ok');
}
if (htmlNotes.every(x => x.indexOf(':ok') > 0)) {
  fs.writeFileSync(htmlPath, html, 'utf8');
}
console.log('HTML  ' + htmlNotes.join('  '));

// ---- CSS ----
const MARK = '/* ---------- 开发者头像框：自动适应容器 ---------- */';
const block = '\n' + MARK + '\n'
  + '/* Steam 头像框比头像大一圈，靠 flex 居中自动对齐，\n'
  + '   不再依赖 .u-w120 里硬编码的 top 偏移（容器尺寸或图片比例变化就会错位） */\n'
  + '.dev-avatar {\n'
  + '    position: relative;\n'
  + '}\n'
  + '\n'
  + '.dev-avatar .u-flex-ini {\n'
  + '    width: 100%;\n'
  + '    height: 100%;\n'
  + '}\n'
  + '\n'
  + '.dev-avatar .u-w120 {\n'
  + '    top: 0 !important;\n'
  + '    height: auto !important;\n'
  + '}\n';

let css = fs.readFileSync(cssPath, 'utf8');
if (css.indexOf(MARK) >= 0) {
  console.log('CSS   已存在，跳过');
} else {
  css = css.replace(/\s*$/, '') + '\n' + block;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('CSS   OK 追加头像框适配');
}
