import { MathFunction } from "../types/math-function";


export interface TaylorFunctionPreset {
    name: string
    latex: string
    fn: MathFunction
}

export const taylorFunctionPresets: TaylorFunctionPreset[] = [
    {
        name: 'e-Funktion',
        latex: 'f(x) = e^x',
        fn: (x: number): number => {
            return Math.E ** x
        }
    },
    {
        name: 'Kosinus',
        latex: 'f(x) = cos(x)',
        fn: (x: number): number => {
            return Math.cos(x)
        }
    },
    {
        name: 'Sinus',
        latex: 'f(x) = sin(x)',
        fn: (x: number): number => {
            return Math.sin(x)
        }
    },
    {
        name: 'Arkussinus',
        latex: 'f(x) = sin^{-1}(x)',
        fn: (x: number): number => {
            return Math.asin(x)
        }
    },
];
