class List {
    list;

    constructor() {
        this.list = document.getElementById("list");
    }

    populateWithElement = (element) => {
        let label = document.createElement("label");
        label.className = "flex-middle";
        let inputElement = document.createElement("input");
        inputElement.type = "checkbox"
        inputElement.checked = element.checked
        label.appendChild(inputElement)
        label.append(document.createTextNode(element.text))
        this.list.appendChild(label);
    }

    appendTextField(onEnter) {
        return () => {
            let inputElement = document.createElement("input");
            inputElement.type = "text"
            this.list.appendChild(inputElement)
            inputElement.addEventListener("keydown", onEnter)
        }
    }
}

export {List}