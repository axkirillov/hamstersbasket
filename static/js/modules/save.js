class Save {
    constructor() {
        this.element = document.getElementById("save")
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

export {Save}