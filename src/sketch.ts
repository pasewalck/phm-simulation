import './style.css'
import { Plot } from './core/plot'
import { Slider } from './components/slider'
import { Dropdown } from './components/dropdown'
import { LatexDisplay } from './components/latex'
import { calcCoefficientParts, calcCoefficients, evalSeries, type FourierCoefficient } from './core/fourier-series'
import { functionPresets } from "./presets/math-function"
import { quiltyPresets } from "./presets/fourier-quality"

const inputs = document.getElementById('g2-inputs')!
const visuals1 = document.getElementById('g2-visuals-1')!
const visuals2 = document.getElementById('g2-visuals-2')!
const visuals3 = document.getElementById('g2-visuals-3')!

let fourierCoefficients: FourierCoefficient[] = []

const fnDropdown = new Dropdown(inputs, {
  presets: functionPresets,
  label: 'Funktion',
  default: 0,
  itemLabel: (p) => p.name,
})
const qualityDropdown = new Dropdown(inputs, {
  presets: quiltyPresets,
  label: 'Qualität',
  default: 1,
  itemLabel: (p) => p.name,
})

const formulaDisplay = new LatexDisplay(inputs, functionPresets[0].formel)

fnDropdown.onChange((preset) => {
  formulaDisplay.set(preset.formel)
})

const wSlider = new Slider(inputs, { label: '(Darstellung) Zeige mir Folgenglied', min: 1, max: 9, step: 1, default: 1 })
const folgenTiefe = new Slider(inputs, { label: '(Analyse) Folgentiefe', min: 10, max: 40, step: 10, default: 20 })

const calcFourier = async () => {
  fnDropdown.disabled = true
  folgenTiefe.disabled = true
  qualityDropdown.disabled = true
  fourierCoefficients = []
  await calcCoefficients(fnDropdown.selected.funktion, folgenTiefe.value, fourierCoefficients, qualityDropdown.selected.internalResolution)
  qualityDropdown.disabled = false
  fnDropdown.disabled = false
  folgenTiefe.disabled = false
}

fnDropdown.onChange(async () => {
  await calcFourier()
})

qualityDropdown.onChange(async () => {
  await calcFourier()
})

folgenTiefe.onChange(async () => {
  await calcFourier()
})

new Plot(visuals1, (plot, time) => {
  var w = wSlider.value

  var speed = 0.5 / w
  var depth = (time * speed) - Math.floor(time * speed)

  const { realParts: realParte, imaginaryParts: imaginaryParte, realPartSum, imaginaryPartSum }
    = calcCoefficientParts(fnDropdown.selected.funktion, w, depth, qualityDropdown.selected.displayResolution)

  plot.drawPoint(realPartSum / realParte.length, imaginaryPartSum / imaginaryParte.length)
  plot.drawLine(0, 0, plot.last(realParte), plot.last(imaginaryParte), { color: plot.color(330, 100, 100) })
  plot.drawPath(realParte, imaginaryParte)
}, {
  mathHeight: 4,
  mathWidth: 4,
  gridStep: 0.5,
})

new Plot(visuals2, (plot) => {
  plot.drawPath(fourierCoefficients.sort((a, b) => a.index - b.index).map(fourierCoeff => fourierCoeff.index), fourierCoefficients.map(fourierCoeff => fourierCoeff.magnitude))
}, {
  xOffset: 5,
  yOffset: 0,
  mathHeight: 4,
  canvasHeight: 200,
  mathWidth: 10,
  gridStepY: 10,
})

new Plot(visuals3, (plot) => {
  plot.drawFunction((t) => evalSeries(t, fourierCoefficients))
}, {
  mathHeight: 6,
  canvasHeight: 300,
  yOffset: 2,
  mathWidth: 20,
  gridStepX: Math.PI

})

calcFourier()
