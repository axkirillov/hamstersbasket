class Add {
    element;
    afterDestroy

    constructor(list) {
        this.element = document.getElementById("add")
        this.element.addEventListener("click", () => {
            if (!list.textInputElement) {
                list.textInputElement = document.createElement("input");
                list.textInputElement.type = "text"
                list.appendChild(list.textInputElement)
            }
        })
    }
}

export {Add}