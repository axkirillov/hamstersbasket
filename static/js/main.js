class Element {
    constructor(text, checked) {
        this.text = text;
        this.checked = checked;
    }
    text
    checked
}

const data = [
    new Element("bread", false),
    new Element("butter", true),
    new Element("milk", false),
]

const root = document.getElementById("root");

data.forEach(
    (element) => {
        let label = document.createElement("label");
        label.className = "flex-middle";
        let inputElement = document.createElement("input");
        inputElement.type = "checkbox"
        inputElement.checked = element.checked
        label.appendChild(inputElement)
        label.append(document.createTextNode(element.text))
        root.appendChild(label);
    }
)

