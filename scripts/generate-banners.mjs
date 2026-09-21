import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

// Optional build tool only: npm install --no-save --package-lock=false sharp
// An existing sharp installation may be supplied with SHARP_MODULE_PATH.
const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_MODULE_PATH || 'sharp');
const bannerDir = new URL('../assets/banners/', import.meta.url);
const sourceDir = new URL('source/', bannerDir);
await mkdir(sourceDir, { recursive: true });
const logo = (await readFile(new URL('../assets/brand/logo-original.jpg', import.meta.url))).toString('base64');
const ink = '#111710', lime = '#D2FF00', paper = '#F0F3E8', muted = '#A5B29F';
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;');
const text = (x, y, value, size = 24, fill = paper, weight = 400, extra = '') =>
  `<text x="${x}" y="${y}" fill="${fill}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" ${extra}>${esc(value)}</text>`;
const mono = (x, y, value, fill = muted, size = 16) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-family="Consolas, monospace" font-size="${size}" letter-spacing="2">${esc(value)}</text>`;
const line = (x1, y1, x2, y2, stroke = '#374133') => `<path d="M${x1} ${y1}H${x2}" transform="translate(0 ${y2-y1})" stroke="${stroke}" fill="none"/>`;
const wrap = (height, title, body) => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1600" height="${height}" viewBox="0 0 1600 ${height}" role="img"><title>${esc(title)}</title>${body}</svg>`;
const grid = Array.from({ length: 12 }, (_, i) => `<path d="M${930+i*56} 104V650" stroke="#263020" opacity=".55"/>`).join('')
  + Array.from({ length: 10 }, (_, i) => `<path d="M930 ${104+i*56}H1544" stroke="#263020" opacity=".55"/>`).join('');

const hero = wrap(720, 'ComptyAI — Turn token activity into compute.', `
  <rect width="1600" height="720" fill="${ink}"/>
  ${grid}
  <rect x="64" y="48" width="12" height="28" fill="${lime}"/>
  ${text(94, 72, 'ComptyAI', 29, paper, 700)}
  ${mono(1130, 68, 'ROBINHOOD CHAIN', lime)}
  ${line(64, 104, 1536, 104)}
  ${mono(64, 152, 'COMPUTE ACCESS PROTOCOL')}
  ${text(60, 257, 'Turn token', 98, paper, 700, 'letter-spacing="-4"')}
  ${text(60, 365, 'activity into', 98, paper, 700, 'letter-spacing="-4"')}
  ${text(60, 473, 'compute.', 98, lime, 700, 'letter-spacing="-4"')}
  ${text(66, 533, 'Protocol revenue. GPU capacity. Holder access.', 25, muted)}
  <rect x="64" y="587" width="294" height="48" rx="24" fill="${lime}"/>
  ${text(90, 618, 'Hold tokens. Get compute.', 20, ink, 700)}
  ${mono(64, 680, '001 / FROM ACTIVITY TO UTILITY', muted, 14)}
  <rect x="982" y="155" width="518" height="478" fill="${ink}" stroke="#728451"/>
  <image x="996" y="169" width="450" height="450" xlink:href="data:image/jpeg;base64,${logo}"/>
  <rect x="1458" y="169" width="28" height="450" fill="${lime}"/>
  <path d="M960 200V134H1026 M1455 654H1521V588" stroke="${lime}" stroke-width="3" fill="none"/>
  ${mono(1010, 677, 'POWERED BY PARTICIPATION', muted, 14)}
`);

const stages = [
  ['TOKEN', 'ACTIVITY', 'The starting signal'],
  ['PROTOCOL', 'FEES', 'Revenue is collected'],
  ['COMPUTE', 'TREASURY', 'A budget for capacity'],
  ['GPU', 'RENTALS', 'Capacity is funded'],
  ['HOLDER', 'ACCESS', 'Credits become utility'],
];
const flow = wrap(418, 'Token activity to protocol fees to treasury to GPU rentals to holder access', `
  <rect width="1600" height="418" fill="${ink}"/>
  ${mono(64, 48, 'THE COMPTYAI COMPUTE LOOP', lime, 15)}
  ${text(62, 108, 'One loop. Real utility.', 44, paper, 700)}
  ${stages.map(([a,b,c], i) => {
    const x = 64 + i*301;
    return `<rect x="${x}" y="150" width="266" height="196" rx="8" fill="${i===4?lime:'#1D271A'}" stroke="${i===4?lime:'#3C4C33'}"/>
    ${mono(x+22, 184, `0${i+1}`, i===4?ink:lime, 17)}
    ${text(x+22, 230, a, 28, i===4?ink:paper, 700)}
    ${text(x+22, 264, b, 28, i===4?ink:paper, 700)}
    ${text(x+22, 316, c, 18, i===4?'#304014':muted)}
    ${i<4?`<path d="M${x+275} 246h17m-6-6 6 6-6 6" fill="none" stroke="${lime}" stroke-width="2"/>`:''}`;
  }).join('')}
  ${mono(64, 389, 'VALUE MOVES TOWARD USABLE COMPUTE.', muted, 14)}
`);

const access = wrap(430, 'Hold tokens. Get compute.', `
  <rect width="1600" height="430" fill="${paper}"/>
  <rect x="0" y="0" width="13" height="430" fill="${lime}"/>
  ${mono(64, 63, 'COMPUTE AS HOLDER UTILITY', '#4A5940', 15)}
  ${text(60, 164, 'Hold tokens.', 73, ink, 700, 'letter-spacing="-2"')}
  ${text(60, 248, 'Get compute.', 73, ink, 700, 'letter-spacing="-2"')}
  ${text(64, 317, 'A funded allowance for your next AI workload.', 23, '#4A5940')}
  ${mono(64, 390, 'ELIGIBLE HOLDERS / DEFINED CAPACITY', '#4A5940', 13)}
  ${[['01','Snapshot','Eligible balances','set your weight.'],['02','Get credits','A funded pool','sets your allowance.'],['03','Run jobs','Reserve capacity.','Settle actual use.']].map(([n,title,a,b],i)=>{
    const x=735+i*269;
    return `<rect x="${x}" y="91" width="243" height="260" rx="8" fill="${i===2?ink:'#E1E7D5'}"/>
    <circle cx="${x+42}" cy="139" r="21" fill="${lime}"/>
    ${text(x+28,145,n,16,ink,700)}
    ${text(x+23,214,title,29,i===2?paper:ink,700)}
    ${text(x+23,263,a,20,i===2?muted:'#4A5940')}
    ${text(x+23,292,b,20,i===2?muted:'#4A5940')}`;
  }).join('')}
`);

const manifesto = wrap(332, 'We do not accumulate tokens. We accumulate compute.', `
  <rect width="1600" height="332" fill="${lime}"/>
  ${mono(64, 53, 'THE COMPTYAI PRINCIPLE', ink, 15)}
  ${text(60, 126, 'We don’t accumulate tokens.', 49, ink, 400, 'letter-spacing="-1"')}
  ${text(60, 204, 'We accumulate compute.', 64, ink, 700, 'letter-spacing="-2"')}
  ${line(64, 256, 1536, 256, '#8CAA00')}
  ${text(64, 298, 'ComptyAI', 23, ink, 700)}
  ${mono(1040, 296, 'HOLD TOKENS. GET COMPUTE.', ink, 14)}
  <g fill="none" stroke="${ink}" stroke-width="3"><rect x="1310" y="77" width="150" height="132"/><rect x="1331" y="98" width="108" height="90"/>
  ${Array.from({length:5},(_,i)=>`<path d="M${1324+i*30} 59v18m0 132v18 M1292 ${87+i*28}h18m150 0h18"/>`).join('')}
  <path d="m1370 116-21 28 21 28m30-56 21 28-21 28m-10-57-12 58"/></g>
`);

for (const [name, svg] of [['01-hero',hero],['02-compute-flow',flow],['03-holder-access',access],['04-manifesto',manifesto]]) {
  await writeFile(new URL(`${name}.svg`,sourceDir), svg);
  await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(new URL(`${name}.png`,bannerDir)));
  console.log(`Generated ${name}.svg + .png`);
}
