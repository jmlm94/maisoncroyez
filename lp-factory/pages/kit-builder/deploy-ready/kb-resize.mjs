import { chromium } from 'playwright';
import fs from 'fs';
const src=process.argv[2], out=process.argv[3], W=parseInt(process.argv[4]||'160');
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox']});
const page = await b.newPage();
const data='data:image/png;base64,'+fs.readFileSync(src).toString('base64');
const jpg = await page.evaluate(async ([data,W])=>{
  const img=new Image(); img.src=data; await img.decode();
  const h=Math.round(W*img.height/img.width);
  const c=document.createElement('canvas'); c.width=W; c.height=h;
  c.getContext('2d').drawImage(img,0,0,W,h);
  return c.toDataURL('image/jpeg',0.82);
},[data,W]);
fs.writeFileSync(out, Buffer.from(jpg.split(',')[1],'base64'));
await b.close();
console.log('resized to', W, '->', out, fs.statSync(out).size, 'bytes');
