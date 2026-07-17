import { MathFunction } from "../types/math-function"

export interface TaylorCoefficient {
  index: number
  derivedValue: number
  developmentPoint: number
}

export async function calcCoefficientFull(fn: MathFunction, k: number, developmentPoint: number): Promise<TaylorCoefficient> {

  return {
    index: k,
    derivedValue: await nthDerivative(fn, k, developmentPoint) / fact(k),
    developmentPoint: developmentPoint
  }

}

function fact(n: number): number {
  if (n <= -1)
    throw new Error("n is -1")
  if (n == 0 || n == 1) {
    return 1;
  }

  return n * fact(n - 1);
}

function binom(n: number, k: number): number {
  return fact(n) / (fact(k) * fact(n - k))
}

async function nthDerivative(fn: MathFunction, n: number, x0: number, h = 0.1): Promise<number> {
  var sum = 0;
  const mid = n / 2;
  for (let k = 0; k <= n; k++) {
    await yieldToMain()
    const sign = (k % 2 === 0) ? 1 : -1;
    const coeff = sign * binom(n, k);
    const offset = (mid - k) * h;
    sum += coeff * fn(x0 + offset);
  }

  return sum / Math.pow(h, n)
}

function yieldToMain(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0))
}

export async function calcCoefficients(
  fn: MathFunction,
  depth: number = 20,
  developmentPoint: number = 0,
  coefficientsRef: TaylorCoefficient[],
): Promise<void> {

  for (let i = 0; i <= depth * 2; i += 1) {
    coefficientsRef.push(await calcCoefficientFull(fn, i, developmentPoint))
    await yieldToMain()
  }
}

export function evalSeries(x: number, coefficients: TaylorCoefficient[]): number {
  let v = 0
  for (let i = 0; i < coefficients.length; i++) {
    var coefficient = coefficients[i]
    v += coefficient.derivedValue * (x - coefficient.developmentPoint) ** coefficient.index
  }
  return v
}
