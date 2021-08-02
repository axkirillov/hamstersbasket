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
        label.id = element.id
        this.list.appendChild(label);
    }

    appendChild(child) {
        this.list.appendChild(child)
    }
}

export {List}