import { EventEmitter } from "../core/event-emitter"

export interface SliderOptions {
  label: string
  min: number
  max: number
  step: number
  default: number
}

export class Slider {
  private _value: number
  private wrapper: HTMLDivElement
  private input: HTMLInputElement
  private valueDisplay: HTMLSpanElement

  private events = new EventEmitter<{
    input: [value: number]
    change: [value: number]
  }>()

  constructor(parent: HTMLElement, options: SliderOptions) {
    this._value = options.default

    this.wrapper = document.createElement('div')
    this.wrapper.className = 'gx-slider-wrapper'

    const label = document.createElement('span')
    label.className = 'gx-slider-label'
    label.textContent = options.label + ' '

    this.valueDisplay = document.createElement('span')
    this.valueDisplay.className = 'gx-slider-value'
    this.valueDisplay.textContent = String(options.default)
    label.appendChild(this.valueDisplay)

    this.input = document.createElement('input')
    this.input.type = 'range'
    this.input.className = 'gx-slider-input'
    this.input.min = String(options.min)
    this.input.max = String(options.max)
    this.input.step = String(options.step)
    this.input.value = String(options.default)

    this.input.addEventListener('input', () => {
      this._value = parseFloat(this.input.value)
      this.valueDisplay.textContent = String(this._value)
      this.events.emit('input', this._value)
    })

    this.input.addEventListener('change', () => {
      this._value = parseFloat(this.input.value)
      this.valueDisplay.textContent = String(this._value)
      this.events.emit('change', this._value)
    })

    this.wrapper.appendChild(label)
    this.wrapper.appendChild(this.input)

    let slidersContainer = parent.querySelector('#gx-sliders')
    if (!slidersContainer) {
      slidersContainer = document.createElement('div')
      slidersContainer.id = 'gx-sliders'
      slidersContainer.className = 'gx-sliders-container'
      parent.appendChild(slidersContainer)
    }
    slidersContainer.appendChild(this.wrapper)
  }

  get value(): number {
    return this._value
  }

  set value(v: number) {
    this._value = v
    this.input.value = String(v)
    this.valueDisplay.textContent = String(v)
    this.events.emit('change', this._value)
  }

  onInput(cb: (value: number) => void): this {
    this.events.on('input', cb);
    return this
  }

  onChange(cb: (value: number) => void): this {
    this.events.on('change', cb);
    return this
  }

  destroy(): void {
    this.events.clear()
    this.wrapper.remove()
  }

  get disabled(): boolean {
    return this.input.disabled
  }

  set disabled(v: boolean) {
    this.input.disabled = v
  }
}
