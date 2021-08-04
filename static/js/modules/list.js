class List {
    root;

    constructor() {
        this.root = document.getElementById("list");

        this.populateList().then();
    }

    async populateList() {
        let data = [
            //{text: string, checked: bool}
        ]
        let response = await fetch("/data");
        if (response.ok) {
            data = await response.json();
        } else {
            alert("HTTP-Error: " + await response.text());
        }

        data.forEach(
            this.populateWithElement
        )
    }

    populateWithElement = (element) => {
        let label = document.createElement("label");
        label.className = "flex-middle";
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox"
        checkbox.checked = element.checked
        checkbox.addEventListener('click', () => {
            fetch('/data/update/' + element.id, {method: 'UPDATE'}).then()
        })
        label.appendChild(checkbox)
        label.append(document.createTextNode(element.text))
        label.id = element.id
        this.root.appendChild(label);
    }

    appendChild(child) {
        this.root.appendChild(child)
    }
}

export {List}