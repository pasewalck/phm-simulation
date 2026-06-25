type EventMap = Record<string, any[]>

export class EventEmitter<E extends EventMap> {
    private listeners: { [K in keyof E]?: Set<(...args: E[K]) => void> } = {}

    on<K extends keyof E>(event: K, cb: (...args: E[K]) => void): this {
        if (!this.listeners[event]) this.listeners[event] = new Set()
        this.listeners[event]!.add(cb)
        return this
    }

    emit<K extends keyof E>(event: K, ...args: E[K]): void {
        this.listeners[event]?.forEach(cb => cb(...args))
    }

    off<K extends keyof E>(event: K, cb: (...args: E[K]) => void): void {
        this.listeners[event]?.delete(cb)
    }

    clear(): void {
        this.listeners = {}
    }
}