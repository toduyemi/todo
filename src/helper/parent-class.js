/**
 * Base class 
 */
export class Listener {
    /**
     * listeners will listen for dom changes such as project or 
     * task form and then bind event listeners
     */
    constructor() {
        this._listeners = [];
    }

    addChangeListener(handler) {
        this._listeners.push(handler);
    }

    raiseChange() {
        this._listeners.forEach(listener => listener());
    }
}