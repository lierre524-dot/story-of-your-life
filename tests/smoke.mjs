import fs from 'node:fs';
import vm from 'node:vm';
for (const file of ['dist/index.html','dist/demo/index.html','dist/studio/index.html','dist/styles.css','dist/app.js']) {
  if (!fs.existsSync(file) || fs.statSync(file).size < 100) throw new Error(`missing ${file}`);
}
new vm.Script(fs.readFileSync('dist/app.js','utf8'));
for (const route of ['/', '/demo/', '/studio/']) {
  const file=route==='/'?'dist/index.html':`dist${route}index.html`;
  const html=fs.readFileSync(file,'utf8');
  if (!html.includes('/app.js') || !html.includes('id="main"')) throw new Error(`bad shell ${route}`);
}
console.log('smoke: 3 routes, assets, and JavaScript syntax OK');
