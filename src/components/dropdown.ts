import { EventEmitter } from "../core/event-emitter"

export interface DropdownOptions<T> {
  presets: T[]
  default?: number
  label: string
  itemLabel: (item: T) => string
}

export class Dropdown<T> {
  private _selectedIndex: number
  private presets: T[]
  private wrapper: HTMLDivElement
  private select: HTMLSelectElement

  private events = new EventEmitter<{
    change: [value: T, index: number]
  }>()

  constructor(parent: HTMLElement, options: DropdownOptions<T>) {
    this._selectedIndex = options.default ?? 0

    this.wrapper = document.createElement('div')
    this.wrapper.className = 'gx-dropdown-wrapper'

    const label = document.createElement('span')
    label.className = 'gx-dropdown-label'
    label.textContent = options.label

    this.select = document.createElement('select')
    this.select.className = 'gx-dropdown-select'

    options.presets.forEach((preset, i) => {
      const option = document.createElement('option')
      option.value = String(i)
      option.textContent = options.itemLabel(preset)
      this.select.appendChild(option)
    })

    this.presets = options.presets

    this.select.value = String(this._selectedIndex)

    this.select.addEventListener('change', () => {
      this._selectedIndex = parseInt(this.select.value)
      this.events.emit("change", this.presets[this._selectedIndex], this._selectedIndex)
    })

    this.wrapper.appendChild(label)
    this.wrapper.appendChild(this.select)

    let container = parent.querySelector('#gx-inputs')
    if (!container) {
      container = document.createElement('div')
      container.id = 'gx-inputs'
      parent.appendChild(container)
    }
    container.appendChild(this.wrapper)
  }

  get wrapperEl(): HTMLDivElement {
    return this.wrapper
  }

  get selectedIndex(): number {
    return this._selectedIndex
  }
  get selected(): T {
    return this.presets[this.selectedIndex]
  }

  get disabled(): boolean {
    return this.select.disabled
  }

  set disabled(v: boolean) {
    this.select.disabled = v
  }

  onChange(cb: (item: T, index: number) => void): this {
    this.events.on("change", cb)
    return this
  }

  destroy(): void {
    this.events.clear()
    this.wrapper.remove()
  }
}
