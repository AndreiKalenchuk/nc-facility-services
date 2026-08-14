import sharp from 'sharp'
import { mkdirSync } from 'fs'

const OUT = 'public/assets'
mkdirSync(OUT, { recursive: true })

const mockup = 'IMG_4770.png' // 1024 x 1536
const card = 'IMG_4675.png' // 1659 x 948

async function crop(src, name, box) {
  await sharp(src)
    .extract({
      left: Math.round(box.left),
      top: Math.round(box.top),
      width: Math.round(box.width),
      height: Math.round(box.height),
    })
    .png()
    .toFile(`${OUT}/${name}.png`)
}

/* ---------- Logo + hero from the business card ---------- */
// 1) Extract a generous region around the logo.
// 2) Paint white over the decorative diagonal streak in the empty top-right
//    corner (clear of the logo artwork and swoosh).
// 3) Auto-trim surrounding whitespace so the logo is tight and clean.
const logoBox = { left: 70, top: 46, width: 762, height: 470 }
const coverW = 138
const coverH = 285
const cover = await sharp({
  create: {
    width: coverW,
    height: coverH,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  },
})
  .png()
  .toBuffer()
const coveredLogo = await sharp(card)
  .extract({
    left: logoBox.left,
    top: logoBox.top,
    width: logoBox.width,
    height: logoBox.height,
  })
  .composite([{ input: cover, left: logoBox.width - coverW, top: 0 }])
  .png()
  .toBuffer()
await sharp(coveredLogo)
  .trim({ background: '#ffffff', threshold: 12 })
  .extend({ top: 10, bottom: 10, left: 14, right: 14, background: '#ffffff' })
  .png()
  .toFile(`${OUT}/logo.png`)

await crop(card, 'logo-mark', { left: 180, top: 68, width: 472, height: 300 })
await crop(card, 'hero-office', { left: 1035, top: 14, width: 624, height: 332 })

/* ---------- White footer logo from the mockup ---------- */
await crop(mockup, 'logo-white', { left: 56, top: 1386, width: 186, height: 106 })

/* ---------- Service icons (glyphs only) from the mockup ---------- */
const centers = [160, 336, 512, 688, 864]
const iconW = 120
const rows = [
  { top: 536, height: 70 }, // row 1
  { top: 674, height: 58 }, // row 2
]
let idx = 1
for (const row of rows) {
  for (const cx of centers) {
    await crop(mockup, `icon-${idx}`, {
      left: cx - iconW / 2,
      top: row.top,
      width: iconW,
      height: row.height,
    })
    idx += 1
  }
}

/* ---------- Why Choose Us building + benefit icons ---------- */
await crop(mockup, 'why-building', { left: 305, top: 786, width: 213, height: 250 })

const benefitCenters = [596, 745, 896]
const benefitNames = ['benefit-satisfaction', 'benefit-licensed', 'benefit-flexible']
for (let i = 0; i < benefitCenters.length; i += 1) {
  await crop(mockup, benefitNames[i], {
    left: benefitCenters[i] - 45,
    top: 825,
    width: 90,
    height: 82,
  })
}

console.log('Assets written to', OUT)

/* ---------- Build a verification montage ---------- */
async function tile(name) {
  const buf = await sharp(`${OUT}/${name}.png`)
    .resize(120, 90, { fit: 'contain', background: '#eef2f7' })
    .toBuffer()
  return buf
}
const names = [
  'icon-1', 'icon-2', 'icon-3', 'icon-4', 'icon-5',
  'icon-6', 'icon-7', 'icon-8', 'icon-9', 'icon-10',
  'benefit-satisfaction', 'benefit-licensed', 'benefit-flexible', 'why-building', 'logo-white',
]
const cols = 5
const tileW = 124
const tileH = 94
const montageRows = Math.ceil(names.length / cols)
const composites = []
for (let i = 0; i < names.length; i += 1) {
  const buf = await tile(names[i])
  composites.push({
    input: buf,
    left: (i % cols) * tileW + 2,
    top: Math.floor(i / cols) * tileH + 2,
  })
}
await sharp({
  create: {
    width: cols * tileW,
    height: montageRows * tileH,
    channels: 4,
    background: '#ffffff',
  },
})
  .composite(composites)
  .png()
  .toFile('scratch/preview-icons.png')
console.log('Preview montage written to scratch/preview-icons.png')
