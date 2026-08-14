import sharp from 'sharp'
import { mkdirSync } from 'fs'

const OUT = 'scratch'
mkdirSync(OUT, { recursive: true })

const mockup = 'IMG_4770.png' // 1024 x 1536
const card = 'IMG_4675.png' // 1659 x 948

async function crop(src, name, left, top, width, height) {
  await sharp(src)
    .extract({ left: Math.round(left), top: Math.round(top), width: Math.round(width), height: Math.round(height) })
    .toFile(`${OUT}/${name}.png`)
  console.log('wrote', name, { left, top, width, height })
}

// Mockup full-width bands to locate sections vertically
const bands = [
  ['band-00', 0, 1024, 260],
  ['band-01', 260, 1024, 260],
  ['band-02', 520, 1024, 260],
  ['band-03', 780, 1024, 260],
  ['band-04', 1040, 1024, 260],
  ['band-05', 1300, 1024, 236],
]
for (const [name, top, w, h] of bands) {
  await crop(mockup, name, 0, top, w, h)
}

// Card halves
await crop(card, 'card-left', 0, 0, 900, 948)
await crop(card, 'card-right', 830, 0, 829, 948)
