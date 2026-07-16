import { MathFunction } from "../types/math-function";


export interface TaylorFunctionPreset {
    name: string
    latex: string
    fn: MathFunction
}

export const taylorFunctionPresets: TaylorFunctionPreset[] = [
    {
        name: 'Beispiel 1',
        latex: 'f(x) = x^2',
        fn: (x: number): number => {
            return x ** 2
        }
    },
    {
        name: 'Beispiel 2',
        latex: 'f(x) = sin(x)',
        fn: (x: number): number => {
            return Math.sin(x)
        }
    },
];
