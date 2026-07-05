

export class Vector2d {
    private _x: number
    private _y: number

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    get x(): number {
        return this._x
    }
    get y(): number {
        return this._y
    }

    get magnetude(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    get norm(): Vector2d {
        return new Vector2d(this.x / this.magnetude, this.y / this.magnetude)
    }

    dotProduct(vec: Vector2d): number {
        return vec.x * this.x + vec.y * this.y
    }

    multiplied(scaler: number): Vector2d {
        return new Vector2d(scaler * this.x, scaler * this.y)
    }

    turn90(): Vector2d {
        return new Vector2d(this.y, -this.x)
    }

    turn(angle: number): Vector2d {
        const base1 = this
        const base2 = this.turn90()

        const c1 = base1.norm.multiplied(Math.cos(angle))
        const c2 = base2.norm.multiplied(Math.sin(angle))

        return new Vector2d(c1.x + c2.x, c1.y + c2.y)
    }
}