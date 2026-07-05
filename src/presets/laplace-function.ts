import { Vector2d } from "../core/vector2d";
import { ScalerFieldFunction } from "../types/scaler-field-function";
import { VectorFieldFunction } from "../types/vector-field-function";


export interface LaplaceFunctionPreset {
    name: string
    latexScalerField: string
    latexGradientField: string
    latexLaplaceField: string
    scalerFieldFunction: ScalerFieldFunction
    gradientFieldFunction: VectorFieldFunction
    laplaceFieldFunction: ScalerFieldFunction

}

export const laplaceFunctionPresets: LaplaceFunctionPreset[] = [
    {
        name: 'Beispiel 1',
        latexScalerField: 'f(x,y) = x^2 + y^2',
        latexGradientField: '\\nabla f(x,y) = (2x,2y)',
        latexLaplaceField: '\\nabla \\cdot \\nabla f(x,y) = 2 + 2 = 4',
        scalerFieldFunction: (vec: Vector2d): number => {
            return vec.x ** 2 + vec.y ** 2
        },
        gradientFieldFunction: (vec: Vector2d): Vector2d => {
            return new Vector2d(2 * vec.x, 2 * vec.y)
        },
        laplaceFieldFunction: (): number => {
            return 4
        }
    },
    {
        name: 'Beispiel 2',
        latexScalerField: 'f(x,y) = x^4 + y^4',
        latexGradientField: '\\nabla f(x,y) = (4x^3,4y^3)',
        latexLaplaceField: '\\nabla \\cdot \\nabla f(x,y) = 12x^2 + 12y^2',
        scalerFieldFunction: (vec: Vector2d): number => {
            return vec.x ** 4 + vec.y ** 4
        },
        gradientFieldFunction: (vec: Vector2d): Vector2d => {
            return new Vector2d(4 * vec.x ** 3, 4 * vec.y ** 3)
        },
        laplaceFieldFunction: (vec: Vector2d): number => {
            return 12 * vec.x ** 2 + 12 * vec.y ** 2
        }
    },
    {
        name: 'Beispiel 3 (Quellenfreies Laplace-Feld)',
        latexScalerField: 'f(x,y) = x - 10',
        latexGradientField: '\\nabla f(x,y) = (1,0)',
        latexLaplaceField: '\\nabla \\cdot \\nabla f(x,y) = 0',
        scalerFieldFunction: (vec: Vector2d): number => {
            return (vec.x - 10)
        },
        gradientFieldFunction: (): Vector2d => {
            return new Vector2d(1, 0)
        },
        laplaceFieldFunction: (): number => {
            return 0
        }
    },
];
