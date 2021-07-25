let data = [
//{text: string, checked: bool}
]

let response = await fetch("/data");

if (response.ok) {
    data = await response.json();
} else {
    alert("HTTP-Error: " + response.status);
}


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

