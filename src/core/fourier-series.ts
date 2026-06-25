import { MathFunction } from "../types/math-function"

export interface FourierCoefficient {
  index: number
  realPart: number
  imaginaryPart: number
  magnitude: number
}

export async function calcCoefficientFull(fn: MathFunction, index: number, resolution: number = 0.001): Promise<FourierCoefficient> {

  const freq = index
  let realPartSum = 0
  let imaginaryPartSum = 0
  let counter = 0

  const step = resolution / Math.max(Math.abs(freq), resolution)
  const totalSteps = Math.ceil((Math.PI * 2) / Math.abs(step))
  const yieldInterval = Math.max(10000, Math.ceil(totalSteps / 5))
  for (let t = 0; t >= -Math.PI * 2 * 8; t -= step) {
    const x = Math.cos(t * freq) * fn(t)
    const y = Math.sin(t * freq) * fn(t)
    realPartSum += x
    imaginaryPartSum += y
    counter++
    if (counter % yieldInterval === 0) await yieldToMain()
  }

  const realPart = realPartSum / counter
  const imaginaryPart = imaginaryPartSum / counter
  return {
    index: index,
    realPart: realPart,
    imaginaryPart: imaginaryPart,
    magnitude: Math.sqrt(realPart ** 2 + imaginaryPart ** 2),
  }
}
export function calcCoefficientParts(fn: MathFunction, index: number, depth: number = 1, resolution: number = 0.001): { realParts: number[], imaginaryParts: number[], realPartSum: number, imaginaryPartSum: number } {

  var realParts: number[] = []
  var imaginaryParts: number[] = []

  var realPartSum = 0
  var imaginaryPartSum = 0
  var step = resolution / index
  for (var t = 0; t >= - depth * 2 * Math.PI; t -= step) {
    const realPart = Math.cos(t * index) * fn(t)
    const imaginaryPart = Math.sin(t * index) * fn(t)
    realParts.push(realPart)
    imaginaryParts.push(imaginaryPart)
    realPartSum += realPart
    imaginaryPartSum += imaginaryPart
  }

  return { realParts, imaginaryParts, realPartSum, imaginaryPartSum }
}

function yieldToMain(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0))
}

export async function calcCoefficients(
  fn: MathFunction,
  depth: number = 20,
  coefficientsRef: FourierCoefficient[],
  resolution: number = 0.001
): Promise<void> {

  for (let i = 0; i < depth * 2; i += 1) {
    var index = ((i % 2) == 0 ? 1 : -1) * Math.ceil(i / 2.0)
    coefficientsRef.push(await calcCoefficientFull(fn, index, resolution))
    await yieldToMain()
  }
}

export function evalSeries(t: number, coefficients: FourierCoefficient[]): number {
  let v = 0
  for (let i = 0; i < coefficients.length; i++) {
    var coefficient = coefficients[i]
    v += coefficient.realPart * Math.cos(t * coefficient.index) + coefficient.imaginaryPart * Math.sin(t * coefficient.index)
  }
  return v
}
