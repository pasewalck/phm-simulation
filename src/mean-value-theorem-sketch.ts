import './style.css'
import { Plot } from './core/plot'
import { Dropdown } from './components/dropdown'
import { LatexDisplay } from './components/latex'
import { Slider } from './components/slider'
import { meanValueTheoremFunctionPresets } from './presets/mean-value-theorem-function'

const inputs = document.getElementById('g2-inputs')!

const visuals1 = document.getElementById('g2-visuals-1')!
const visuals2 = document.getElementById('g2-visuals-2')!

const fnDropdown = new Dropdown(inputs, {
  presets: meanValueTheoremFunctionPresets,
  label: 'Funktion',
  default: 0,
  itemLabel: (p) => p.name,
})

let x0s: number[] = []



const formulaDisplay = new LatexDisplay(inputs, meanValueTheoremFunctionPresets[0].latex)

fnDropdown.onChange((preset) => {
  formulaDisplay.set(preset.latex)
})

const aSlider = new Slider(inputs, {
  label: 'Intervalgrenze-a', min: -2, max: 2, step: 0.5, default: 0, dynamicClamp: (v: number) => {
    return Math.min(bSlider.value - 0.5, v)
  }
})
const bSlider = new Slider(inputs, {
  label: 'Intervalgrenze-b', min: -2, max: 2, step: 0.5, default: 2, dynamicClamp: (v: number) => {
    return Math.max(aSlider.value + 0.5, v)
  }
})

const getPointsOfValue = async (fnDerivative: Function, a: number, b: number, s: number, depth = 40): Promise<number> => {
  let step = (b - a)
  let c = a + step / 2
  if (fnDerivative(c) == s || depth == 0)
    return c
  else if (fnDerivative(a) < fnDerivative(b) ? (s < fnDerivative(c)) : (s > fnDerivative(c)))
    return await getPointsOfValue(fnDerivative, a, c, s, depth - 1)
  else
    return await getPointsOfValue(fnDerivative, c, b, s, depth - 1)
}

const calc = async () => {
  let fn = fnDropdown.selected.fn
  let fnDerivative = fnDropdown.selected.fnDerivative
  let a = aSlider.value
  let b = bSlider.value
  let s = (fn(b) - fn(a)) / (b - a)
  x0s = []
  yieldToMain()
  let step = 0.25
  for (let x = a; x < b; x += step) {
    if (fnDerivative(x) == s && a != x)
      x0s.push(x)
    else if ((fnDerivative(x) < s && s < fnDerivative(x + step)) || (fnDerivative(x) > s && s > fnDerivative(x + step))) {
      let x0 = await getPointsOfValue(fnDerivative, x, x + step, s)
      x0s.push(x0)
      console.log(x, x, x + step, x0)

    }
  }
}

function yieldToMain(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0))
}

fnDropdown.onChange(async () => {
  await calc()
})

aSlider.onChange(async () => {
  await calc()
})

bSlider.onChange(async () => {
  await calc()
})

aSlider.onInput(async () => {
  await calc()
})

bSlider.onInput(async () => {
  await calc()
})

await calc()



new Plot(visuals1, (plot) => {
  let fn = fnDropdown.selected.fn
  plot.drawFunction((t) => fn(t), { color: plot.color(250, 0, 0) })
  let a = aSlider.value
  let b = bSlider.value
  let s = (fn(b) - fn(a)) / (b - a)

  x0s.forEach(x0 => {
    let secanteFn = (x: number) => {
      return (x - a) * s + fn(a)
    }
    plot.drawLine(a, secanteFn(a), b, secanteFn(b), { color: plot.color(0, 0, 200) })
    plot.drawPoint(a, secanteFn(a), { color: plot.color(250, 0, 0) })
    plot.drawPoint(b, secanteFn(b), { color: plot.color(250, 0, 0) })
    let d = fn(x0) - secanteFn(x0)
    plot.drawLine(a, secanteFn(a) + d, b, secanteFn(b) + d, {
      color: plot.color(0, 200, 0)
    })
    plot.drawPoint(x0, fn(x0), { color: plot.color(0, 200, 0) })
  });

}, {
  mathHeight: 20,
  mathWidth: 5,
  gridStep: 0.5,
  gridStepY: 2,
})

new Plot(visuals2, (plot) => {
  let fn = fnDropdown.selected.fn
  let fnDerivative = fnDropdown.selected.fnDerivative
  plot.drawFunction((t) => fnDerivative(t), { color: plot.color(250, 0, 0) })
  let a = aSlider.value
  let b = bSlider.value
  let s = (fn(b) - fn(a)) / (b - a)
  x0s.forEach(x0 => {
    plot.drawLine(a, s, b, s, {
      color: plot.color(0, 200, 0)
    })
    plot.drawPoint(x0, s, { color: plot.color(0, 200, 0) })
    plot.drawPoint(a, fnDerivative(a), { color: plot.color(250, 0, 0) })
    plot.drawPoint(b, fnDerivative(b), { color: plot.color(250, 0, 0) })
  })
}, {
  mathHeight: 20,
  mathWidth: 5,
  gridStep: 0.5,
  gridStepY: 2,
})
