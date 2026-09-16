import { MathFunction } from "../types/math-function";


export interface MeanValueTheoremFunctionPreset {
    name: string
    latex: string
    fn: MathFunction
    fnDerivative: MathFunction
    fnDerivativeInverse?: MathFunction
}

export const meanValueTheoremFunctionPresets: MeanValueTheoremFunctionPreset[] = [
    {
        name: 'e-Funktion',
        latex: 'f(x) = e^x',
        fn: (x: number): number => {
            return Math.E ** x
        },
        fnDerivative: (x: number): number => {
            return Math.E ** x
        },
        fnDerivativeInverse: (x: number): number => {
            return Math.log(x)
        },
    },
    {
        name: 'Quadratfunktion',
        latex: 'f(x) = x^2',
        fn: (x: number): number => {
            return x ** 2
        },
        fnDerivative: (x: number): number => {
            return 2 * x
        },
        fnDerivativeInverse: (x: number): number => {
            return Math.sqrt(x)
        },
    },
    {
        name: 'Sinus',
        latex: 'f(x) = x^2',
        fn: (x: number): number => {
            return Math.sin(x) * 4
        },
        fnDerivative: (x: number): number => {
            return Math.cos(x) * 4
        },
        fnDerivativeInverse: (x: number): number => {
            return Math.acos(x * 4)
        },
    },
    {
        name: 'Polynom',
        latex: 'f(x) = \\frac{1}{2}x^3 + x',
        fn: (x: number): number => {
            return 0.5 * (x ** 3) + x
        },
        fnDerivative: (x: number): number => {
            return 1.5 * (x ** 2) + 1
        }
    }
];
