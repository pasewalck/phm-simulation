import { MathFunction } from "../types/math-function";


export interface TaylorFunctionPreset {
    name: string
    latex: string
    fn: MathFunction
    forceDevelopmentPoint: number | undefined
}

export const taylorFunctionPresets: TaylorFunctionPreset[] = [
    {
        name: 'e-Funktion',
        latex: 'f(x) = e^x',
        fn: (x: number): number => {
            return Math.E ** x
        },
        forceDevelopmentPoint: undefined
    },
    {
        name: 'Kosinus',
        latex: 'f(x) = cos(x)',
        fn: (x: number): number => {
            return Math.cos(x)
        },
        forceDevelopmentPoint: undefined
    },
    {
        name: 'Sinus',
        latex: 'f(x) = sin(x)',
        fn: (x: number): number => {
            return Math.sin(x)
        },
        forceDevelopmentPoint: undefined
    },
    {
        name: 'Arkussinus',
        latex: 'f(x) = sin^{-1}(x)',
        fn: (x: number): number => {
            return Math.asin(x)
        },
        forceDevelopmentPoint: 0
    },
];
