// 头像框需要比头像大约 20%，但被 .content-container img 的 max-width:100% 压回等大
const fs = require('fs');

const cssPath = 'D:\\project\\DST_BlueArchive_wiki-main\\css\\developer.css';
let css = fs.readFileSync(cssPath, 'utf8');

const old = '.dev-avatar .u-w120 {\n'
  + '    top: 0 !important;\n'
  + '    height: auto !important;\n'
  + '}\n';
const neu = '.dev-avatar .u-w120 {\n'
  + '    top: 0 !important;\n'
  + '    height: auto !important;\n'
  + '    /* 覆盖 .content-container img 的 max-width: 100%，\n'
  + '       头像框要比头像大一圈才能完整包住 */\n'
  + '    max-width: none !important;\n'
  + '}\n';

const n = css.split(old).length - 1;
if (n !== 1) {
  console.log('FAIL 目标规则匹配 ' + n + ' 次，未修改');
} else {
  css = css.replace(old, neu);
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('OK 已补上 max-width: none');
}
