const data = {}

const root = document.getElementById("root");
let label = document.createElement("label");
label.className = "flex-middle";
let inputElement = document.createElement("input");
inputElement.type = "checkbox"
label.appendChild(inputElement)
label.append(document.createTextNode("Bananas"))
// label.innerText = "Bananas"
root.appendChild(label);