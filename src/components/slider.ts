import { EventEmitter } from "../core/event-emitter"

export interface SliderOptions {
  label: string
  min: number
  max: number
  dynamicClamp?: Function
  step: number
  default: number
}

export class Slider {
  private _value: number
  private options: SliderOptions
  private wrapper: HTMLDivElement
  private input: HTMLInputElement
  private valueDisplay: HTMLSpanElement
  private displayDecimals: number

  private events = new EventEmitter<{
    input: [value: number]
    change: [value: number]
  }>()

  constructor(parent: HTMLElement, options: SliderOptions) {
    this._value = options.default
    this.options = options

    this.displayDecimals = options.step.toString().includes(".") ? options.step.toString().split(".")[1].length : 0

    this.wrapper = document.createElement('div')
    this.wrapper.className = 'gx-slider-wrapper'

    const label = document.createElement('span')
    label.className = 'gx-slider-label'
    label.textContent = this.options.label + ' '

    this.valueDisplay = document.createElement('span')
    this.valueDisplay.className = 'gx-slider-value'
    this.valueDisplay.textContent = this.options.default.toFixed(this.displayDecimals)
    label.appendChild(this.valueDisplay)

    this.input = document.createElement('input')
    this.input.type = 'range'
    this.input.className = 'gx-slider-input'
    this.input.min = String(this.options.min)
    this.input.max = String(this.options.max)
    this.input.step = String(this.options.step)
    this.input.value = String(this.options.default)

    this.input.addEventListener('input', () => {
      const v = parseFloat(this.input.value)
      this._value = this.options.dynamicClamp ? this.options.dynamicClamp(v) : v
      if (v != this._value)
        this.input.value = String(this._value)
      this.valueDisplay.textContent = this._value.toFixed(this.displayDecimals)
      this.events.emit('input', this._value)
    })

    this.input.addEventListener('change', () => {
      const v = parseFloat(this.input.value)
      this._value = this.options.dynamicClamp ? this.options.dynamicClamp(v) : v
      if (v != this._value)
        this.input.value = String(this._value)
      this.valueDisplay.textContent = this._value.toFixed(this.displayDecimals)
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
    this.valueDisplay.textContent = this._value.toFixed(this.displayDecimals)
    this.events.emit('change', this._value)
  }

  setValueSilent(v: number) {
    this._value = v
    this.input.value = String(v)
    this.valueDisplay.textContent = this._value.toFixed(this.displayDecimals)
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
