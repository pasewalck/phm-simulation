import { render } from 'katex'

export class LatexDisplay {
  private el: HTMLDivElement
  private elContent: HTMLDivElement
  private elCopy: HTMLButtonElement
  private latex: string | undefined

  constructor(parent: HTMLElement, latex: string | undefined = undefined) {
    this.el = document.createElement('div')
    this.elContent = document.createElement('div')
    this.elCopy = document.createElement('button')
    this.latex = latex

    this.el.className = 'gx-latex-display'
    this.elContent.className = 'gx-latex-display-conent'
    this.elCopy.className = 'gx-latex-display-copy'

    this.elCopy.textContent = "Kopieren"

    parent.appendChild(this.el)
    this.el.appendChild(this.elContent)
    this.el.appendChild(this.elCopy)

    this.elCopy.addEventListener('click', () => {
      if (!this.latex) return;
      navigator.clipboard.writeText(this.latex);
    })

    if (latex)
      this.set(latex)
  }

  set(latex: string): void {
    this.latex = latex
    try {
      render(latex, this.elContent, { displayMode: false, throwOnError: false })
    } catch {
      this.elContent.textContent = latex
    }
  }

  destroy(): void {
    this.el.remove()
  }
}
