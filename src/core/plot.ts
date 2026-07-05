import p5 from 'p5'

export interface PlotOptions {
  canvasWidth?: number
  canvasHeight?: number
  margin?: number
  mathWidth?: number
  mathHeight?: number
  xOffset?: number
  yOffset?: number
  grid?: boolean
  gridStep?: number
  gridStepX?: number
  gridStepY?: number
}

export interface PointOptions {
  color?: p5.Color
  size?: number
  label?: string | null
  labelColor?: p5.Color
  labelSize?: number
  showCoords?: boolean
}

export interface LineOptions {
  color?: p5.Color
  weight?: number
  style?: 'solid' | 'dashed' | 'dotted'
}

export interface FunctionOptions {
  color?: p5.Color
  weight?: number
  step?: number
  showPoints?: boolean
  pointColor?: p5.Color
  pointSize?: number
}

export interface ParametricOptions {
  color?: p5.Color
  weight?: number
}

export interface AngleArcOptions {
  color?: p5.Color
  weight?: number
  showLabel?: boolean
  labelColor?: p5.Color
}

export type DrawCallback = (plot: Plot, time: number) => void

interface ScreenPoint {
  x: number
  y: number
}

export class Plot {
  width: number
  height: number
  margin: number
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  time: number
  private p!: p5

  constructor(
    canvasContainer: string | HTMLElement,
    draw: DrawCallback = () => { },
    { canvasWidth = 500, canvasHeight = 500, margin = 10, mathWidth = 10, mathHeight = 10, xOffset = 0, yOffset = 0, gridStep = 1, gridStepX = undefined, gridStepY = undefined }: PlotOptions = {}
  ) {
    this.width = canvasWidth
    this.height = canvasHeight
    this.margin = margin
    this.xMin = -mathWidth / 2 + xOffset
    this.xMax = mathWidth / 2 + xOffset
    this.yMin = -mathHeight / 2 + yOffset
    this.yMax = mathHeight / 2 + yOffset
    this.time = 0

    new p5((p: p5) => {
      this.p = p

      p.setup = () => {
        const canvas = p.createCanvas(canvasWidth, canvasHeight)
        canvas.parent(canvasContainer)
      }

      p.draw = () => {
        this.time += 1.0 / this.frameRate()
        p.background(255);
        if (grid)
          this.drawGrid(gridStep, gridStepX, gridStepY)
        draw(this, this.time)
      }
    })
  }

  toScreenX(mathX: number): number {
    return this.p.map(mathX, this.xMin, this.xMax, this.margin, this.width - this.margin)
  }

  toScreenY(mathY: number): number {
    return this.p.map(mathY, this.yMin, this.yMax, this.height - this.margin, this.margin)
  }

  frameRate(): number {
    return this.p.frameRate()
  }

  toMathX(screenX: number): number {
    return this.p.map(screenX, this.margin, this.width - this.margin, this.xMin, this.xMax)
  }

  toMathY(screenY: number): number {
    return this.p.map(screenY, this.height - this.margin, this.margin, this.yMin, this.yMax)
  }

  toScreen(mathX: number, mathY: number): ScreenPoint {
    return {
      x: this.toScreenX(mathX),
      y: this.toScreenY(mathY)
    }
  }

  color(v1: number, v2: number, v3: number, alpha?: number): p5.Color {
    return this.p.color(v1, v2, v3, alpha)
  }

  toMath(screenX: number, screenY: number): ScreenPoint {
    return {
      x: this.toMathX(screenX),
      y: this.toMathY(screenY)
    }
  }

  drawGrid(gridStep: number = 1, gridStepX: any = undefined, gridStepY: any = undefined): void {
    const gridWeight = 1
    const axisWeight = 2
    const labelSize = 10
    gridStepX = gridStepX != undefined ? gridStepX : gridStep
    gridStepY = gridStepY != undefined ? gridStepY : gridStep

    this.p.strokeWeight(gridWeight)
    this.p.stroke(this.p.color(50, 50, 50))

    for (let x = Math.ceil(this.xMin / gridStepX) * gridStepX; x <= this.xMax; x += gridStepX) {
      const screenX = this.toScreenX(x)
      this.p.line(screenX, this.margin, screenX, this.height - this.margin)
    }

    for (let y = Math.ceil(this.yMin / gridStepY) * gridStepY; y <= this.yMax; y += gridStepY) {
      const screenY = this.toScreenY(y)
      this.p.line(this.margin, screenY, this.width - this.margin, screenY)
    }

    this.p.strokeWeight(axisWeight)
    this.p.stroke(this.p.color(10, 10, 10))

    const yZero = this.toScreenY(0)
    this.p.line(this.margin, yZero, this.width - this.margin, yZero)

    const xZero = this.toScreenX(0)
    this.p.line(xZero, this.margin, xZero, this.height - this.margin)

    this.p.fill(this.p.color(0, 0, 0))
    this.p.noStroke()
    this.p.textSize(labelSize)

    for (let x = Math.ceil(this.xMin / gridStepX) * gridStepX; x <= this.xMax; x += gridStepX) {
      this.p.textAlign(x < 0 ? this.p.LEFT : this.p.RIGHT, this.p.BOTTOM)
      if (x !== 0) {
        this.p.text(Math.ceil(gridStepX * 10) == Math.ceil(Math.PI * 10) ? `${x / gridStepX}π` : this.p.nf(x, undefined, Math.ceil(1 / gridStepX - 1)), this.toScreenX(x) + (x < 0 ? 3 : -3), this.toScreenY(0) - 3)
      }
    }

    for (let y = Math.ceil(this.yMin / gridStepY) * gridStepY; y <= this.yMax; y += gridStepY) {
      this.p.textAlign(this.p.LEFT, y > 0 ? this.p.TOP : this.p.BOTTOM)
      if (y !== 0) {
        this.p.text(Math.ceil(gridStepY * 10) == Math.ceil(Math.PI * 10) ? `${y / gridStepY}π` : this.p.nf(y, undefined, Math.ceil(1 / gridStepY - 1)), this.toScreenX(0) + 3, this.toScreenY(y) + (y > 0 ? 3 : -3))
      }
    }
  }

  drawPoint(mathX: number, mathY: number, options: PointOptions = {}): void {
    const defaults: PointOptions = {
      color: this.p.color(255, 0, 0),
      size: 8,
      label: null,
      labelColor: this.p.color(0),
      labelSize: 12,
      showCoords: false
    }

    const opts = { ...defaults, ...options }
    const screen = this.toScreen(mathX, mathY)

    this.p.fill(opts.color!)
    this.p.noStroke()
    this.p.circle(screen.x, screen.y, opts.size!)

    if (opts.label || opts.showCoords) {
      this.p.fill(opts.labelColor!)
      this.p.noStroke()
      this.p.textSize(opts.labelSize!)
      this.p.textAlign(this.p.LEFT, this.p.BOTTOM)

      let labelText = opts.label || ''
      if (opts.showCoords) {
        labelText += ` (${this.p.nf(mathX, 1, 2)}, ${this.p.nf(mathY, 1, 2)})`
      }

      if (labelText) {
        this.p.text(labelText, screen.x + opts.size! / 2 + 5, screen.y - 5)
      }
    }
  }

  last(array: any[]): any {
    return array[array.length - 1]
  }

  drawLine(x1: number, y1: number, x2: number, y2: number, options: LineOptions = {}): void {
    const defaults: LineOptions = {
      color: this.p.color(0, 0, 255),
      weight: 2,
      style: 'solid'
    }

    const opts = { ...defaults, ...options }
    const p1 = this.toScreen(x1, y1)
    const p2 = this.toScreen(x2, y2)

    this.p.stroke(opts.color!)
    this.p.strokeWeight(opts.weight!)

    if (opts.style === 'dashed') {
      this.p.drawingContext.setLineDash([8, 4])
    } else if (opts.style === 'dotted') {
      this.p.drawingContext.setLineDash([2, 4])
    } else {
      this.p.drawingContext.setLineDash([])
    }

    this.p.line(p1.x, p1.y, p2.x, p2.y)
    this.p.drawingContext.setLineDash([])
  }

  drawPath(x: number[], y: number[], options: LineOptions = {}): void {
    const defaults: LineOptions = {
      color: this.p.color(0, 0, 255),
      weight: 2,
      style: 'solid'
    }

    const opts = { ...defaults, ...options }

    this.p.stroke(opts.color!)
    this.p.strokeWeight(opts.weight!)
    this.p.noFill()
    this.p.beginShape()

    for (let i = 0; i < x.length; i++) {
      const xi = x[i]
      const yi = y[i]
      if (yi >= this.yMin && yi <= this.yMax && xi >= this.xMin && xi <= this.xMax) {
        const screen = this.toScreen(xi, yi)
        this.p.vertex(screen.x, screen.y)
      }
    }
    this.p.endShape()
  }

  drawFunction(fn: (x: number) => number, options: FunctionOptions = {}): void {
    const defaults: FunctionOptions = {
      color: this.p.color(255, 0, 0),
      weight: 2,
      step: 0.05,
      showPoints: false,
      pointColor: this.p.color(255, 0, 0),
      pointSize: 3
    }

    const opts = { ...defaults, ...options }

    this.p.stroke(opts.color!)
    this.p.strokeWeight(opts.weight!)
    this.p.noFill()
    this.p.beginShape()

    for (let x = this.xMin; x <= this.xMax; x += opts.step!) {
      const y = fn(x)
      if (y >= this.yMin && y <= this.yMax) {
        const screen = this.toScreen(x, y)
        this.p.vertex(screen.x, screen.y)
      }
    }

    this.p.endShape()
  }

  drawParametric(
    fnX: (t: number) => number,
    fnY: (t: number) => number,
    tStart: number,
    tEnd: number,
    tStep: number,
    options: ParametricOptions = {}
  ): void {
    const defaults: ParametricOptions = {
      color: this.p.color(255, 0, 0),
      weight: 2
    }

    const opts = { ...defaults, ...options }

    this.p.stroke(opts.color!)
    this.p.strokeWeight(opts.weight!)
    this.p.noFill()
    this.p.beginShape()

    for (let t = tStart; t <= tEnd; t += tStep) {
      const x = fnX(t)
      const y = fnY(t)
      if (x >= this.xMin && x <= this.xMax && y >= this.yMin && y <= this.yMax) {
        const screen = this.toScreen(x, y)
        this.p.vertex(screen.x, screen.y)
      }
    }

    this.p.endShape()
  }

  drawAngleArc(
    centerX: number,
    centerY: number,
    startAngle: number,
    endAngle: number,
    radius: number,
    options: AngleArcOptions = {}
  ): void {
    const defaults: AngleArcOptions = {
      color: this.p.color(0, 255, 0),
      weight: 1.5,
      showLabel: false,
      labelColor: this.p.color(0)
    }

    const opts = { ...defaults, ...options }
    const screen = this.toScreen(centerX, centerY)
    const screenRadius = (radius / (this.xMax - this.xMin)) * (this.width - 2 * this.margin)

    if (opts.showLabel) {
      const edge = this.toScreen(
        centerX + Math.cos(endAngle) * radius,
        centerY + Math.sin(endAngle) * radius
      )
      this.p.textAlign(
        Math.cos(endAngle) > 0 ? this.p.LEFT : this.p.RIGHT,
        Math.sin(endAngle) > 0 ? this.p.BOTTOM : this.p.TOP
      )
      this.p.fill(opts.labelColor!)
      this.p.noStroke()
      this.p.text(` ${this.p.nf(endAngle, 1, 2)}`, edge.x, edge.y)
    }

    this.p.noFill()
    this.p.stroke(opts.color!)
    this.p.strokeWeight(opts.weight!)
    this.p.arc(screen.x, screen.y, screenRadius * 2, screenRadius * 2, -endAngle, -startAngle)
  }
}
