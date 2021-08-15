class Button {
    element;

    constructor(elementId) {
        this.element = document.getElementById(elementId)
    }

    onClick(closure) {
        this.element.addEventListener("click", closure)
    }

    hide() {
        this.element.style.display = "none"
    }

    show() {
        this.element.style.display = ""
    }
}

export {Button}