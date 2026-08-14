import { createRequire } from 'module'
import { promisify } from 'util'
import { writeFileSync } from 'fs'
import sharp from 'sharp'

const require = createRequire(import.meta.url)
const potrace = require('potrace')
const trace = promisify(potrace.trace)

const OUT = 'public/assets'
const ICON_BLUE = '#2360b6'

const options = {
  color: ICON_BLUE,
  background: 'transparent',
  threshold: 165,
  turdSize: 2,
  turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY,
  alphaMax: 1,
  optCurve: true,
  optTolerance: 0.2,
}

const names = [
  'icon-1', 'icon-2', 'icon-3', 'icon-4', 'icon-5',
  'icon-6', 'icon-7', 'icon-8', 'icon-9', 'icon-10',
  'benefit-satisfaction', 'benefit-licensed', 'benefit-flexible',
]

for (const name of names) {
  const src = `${OUT}/${name}.png`
  // Flatten onto white and upscale with smoothing so the trace is crisp.
  const pre = await sharp(src)
    .flatten({ background: '#ffffff' })
    .resize({ width: 900, kernel: 'lanczos3' })
    .grayscale()
    .normalise()
    .png()
    .toBuffer()

  let svg = await trace(pre, options)
  // Make the SVG scale to its container (transparent background).
  svg = svg.replace(/<svg /, '<svg preserveAspectRatio="xMidYMid meet" ')
  writeFileSync(`${OUT}/${name}.svg`, svg)
  console.log('traced ' + name)
}

console.log('Done. SVG icons written to', OUT)
