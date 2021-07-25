let data = [
//{text: string, checked: bool}
]

let response = await fetch("/data");

if (response.ok) {
    data = await response.json();
} else {
    alert("HTTP-Error: " + response.status);
}


const list = document.getElementById("list");

let populateListWithElement = (element) => {
    let label = document.createElement("label");
    label.className = "flex-middle";
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox"
    inputElement.checked = element.checked
    label.appendChild(inputElement)
    label.append(document.createTextNode(element.text))
    list.appendChild(label);
};

data.forEach(
    populateListWithElement
)

let saveTextToElement = (event) => {
    if (event.code === "Enter") {
        console.log(event.target.value)
    }
};

const add = document.getElementById("add")
let addTextField = () => {
    let inputElement = document.createElement("input");
    inputElement.type = "text"
    list.appendChild(inputElement)
    inputElement.addEventListener("keydown", saveTextToElement)
};
add.addEventListener("click", addTextField)
