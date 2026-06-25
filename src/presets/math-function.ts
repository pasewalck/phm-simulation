import { MathFunction } from "../types/math-function";


export interface FunctionPreset {
    name: string;
    formel: string;
    funktion: MathFunction;
}

export const functionPresets: FunctionPreset[] = [
    {
        name: 'Sägezahn (4x)',
        formel: 'f(t) = 1 + \\frac{|(4t) \\bmod 2\\pi|}{2\\pi} \\cdot 0.5',
        funktion: (t) => 1 + Math.abs((t * 4) % (Math.PI * 2)) / (Math.PI * 2) * 0.5
    },
    {
        name: 'Sägezahn (2x)',
        formel: 'f(t) = 1 + \\frac{|(2t) \\bmod 2\\pi|}{2\\pi} \\cdot 0.5',
        funktion: (t) => 1 + Math.abs((t * 2) % (Math.PI * 2)) / (Math.PI * 2) * 0.5
    },
    {
        name: 'Kosinus (8x)',
        formel: 'f(t) = \\frac{\\cos(8t)}{2} + 1',
        funktion: (t) => Math.cos(t * 8) / 2 + 1
    },
    {
        name: 'Kosinus',
        formel: 'f(t) = \\frac{\\cos(t)}{2} + 1',
        funktion: (t) => Math.cos(t)
    },
    {
        name: 'Sinus (2x)',
        formel: 'f(t) = \\frac{\\sin(2t)}{2} + 1',
        funktion: (t) => Math.sin(t * 2) / 2 + 1
    },
    {
        name: 'Rechtecksignal (4x)',
        formel: 'f(t) = \\begin{cases} 1 & |(4t) \\bmod 2\\pi| > \\pi \\\\ 0 & \\text{sonst} \\end{cases} + 0.5',
        funktion: (t) => (Math.abs((t * 4) % (Math.PI * 2)) > Math.PI ? 1 : 0) + 0.5
    },
    {
        name: 'Abs. Sinus',
        formel: 'f(t) = |\\sin(t)|',
        funktion: (t) => Math.abs(Math.sin(t))
    },
    {
        name: 'Gerade',
        formel: 'f(t) = 1',
        funktion: () => 1
    },
];
