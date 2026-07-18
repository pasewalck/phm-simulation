import './style.css'
import { Plot } from './core/plot'
import { Dropdown } from './components/dropdown'
import { LatexDisplay } from './components/latex'
import { calcCoefficients, evalSeries, TaylorCoefficient } from './core/taylor-series'
import { taylorFunctionPresets } from './presets/taylor-function'
import { Slider } from './components/slider'

const inputs = document.getElementById('g2-inputs')!

const visuals1 = document.getElementById('g2-visuals-1')!

let taylorCoefficients: TaylorCoefficient[] = []

const fnDropdown = new Dropdown(inputs, {
  presets: taylorFunctionPresets,
  label: 'Funktion',
  default: 0,
  itemLabel: (p) => p.name,
})

const formulaDisplay = new LatexDisplay(inputs, taylorFunctionPresets[0].latex)

fnDropdown.onChange((preset) => {
  formulaDisplay.set(preset.latex)
})

const x0Slider = new Slider(inputs, { label: 'Entwickungspunkt', min: -3, max: 3, step: 0.5, default: 0 })
const folgenTiefe = new Slider(inputs, { label: 'Tiefe', min: 2, max: 6, step: 1, default: 2 })

const calc = async () => {
  fnDropdown.disabled = true
  folgenTiefe.disabled = true
  x0Slider.disabled = true
  taylorCoefficients = []

  if (fnDropdown.selected.forceDevelopmentPoint != undefined)
    x0Slider.setValueSilent(fnDropdown.selected.forceDevelopmentPoint)

  await calcCoefficients(fnDropdown.selected.fn, folgenTiefe.value, x0Slider.value, taylorCoefficients)

  if (fnDropdown.selected.forceDevelopmentPoint == undefined)
    x0Slider.disabled = false
  fnDropdown.disabled = false
  folgenTiefe.disabled = false
}

fnDropdown.onChange(async () => {
  await calc()
})

x0Slider.onChange(async () => {
  await calc()
})

folgenTiefe.onChange(async () => {
  await calc()
})

calc()

new Plot(visuals1, (plot) => {
  plot.drawFunction((t) => evalSeries(t, taylorCoefficients))
}, {
  mathHeight: 6,
  mathWidth: 6,
  gridStep: 0.5,
})
