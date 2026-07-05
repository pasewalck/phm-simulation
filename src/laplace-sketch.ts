import './style.css'
import { Plot } from './core/plot'
import { Dropdown } from './components/dropdown'
import { laplaceFunctionPresets } from './presets/laplace-function'
import { LatexDisplay } from './components/latex'

const inputs = document.getElementById('g2-inputs')!

const visuals1 = document.getElementById('g2-visuals-1')!
const visuals2 = document.getElementById('g2-visuals-2')!
const visuals3 = document.getElementById('g2-visuals-3')!


const fnDropdown = new Dropdown(inputs, {
  presets: laplaceFunctionPresets,
  label: 'Funktion',
  default: 0,
  itemLabel: (p) => p.name,
})

const formulaDisplay1 = new LatexDisplay(inputs, fnDropdown.selected.latexScalerField)
const formulaDisplay2 = new LatexDisplay(inputs, fnDropdown.selected.latexGradientField)
const formulaDisplay3 = new LatexDisplay(inputs, fnDropdown.selected.latexLaplaceField)

fnDropdown.onChange((preset) => {
  formulaDisplay1.set(preset.latexScalerField)
  formulaDisplay2.set(preset.latexGradientField)
  formulaDisplay3.set(preset.latexLaplaceField)

})


new Plot(visuals1, (plot) => {
  plot.drawScalerfield(fnDropdown.selected.scalerFieldFunction, { step: 0.5 })

}, {
  mathHeight: 6,
  mathWidth: 6,
  gridStep: 0.5,
})

new Plot(visuals2, (plot) => {
  plot.drawVectorfield(fnDropdown.selected.gradientFieldFunction, { step: 0.5 })

}, {
  mathHeight: 6,
  mathWidth: 6,
  gridStep: 0.5,
})

new Plot(visuals3, (plot) => {
  plot.drawScalerfield(fnDropdown.selected.laplaceFieldFunction, { step: 0.5 })

}, {
  mathHeight: 6,
  mathWidth: 6,
  gridStep: 0.5,
})