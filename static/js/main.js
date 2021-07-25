import {List} from "./modules/list.js";
import {ListItem} from "./modules/listItem.js";

let data = [
//{text: string, checked: bool}
]

let response = await fetch("/data");

if (response.ok) {
    data = await response.json();
} else {
    alert("HTTP-Error: " + await response.text());
}

const list = new List();

data.forEach(
    list.populateWithElement
)

let saveTextToElement = (event) => {
    if (event.code === "Enter") {
        const target = event.target;
        const item = new ListItem(target.value)
        list.populateWithElement(item)
        item.save()
        target.remove()
    }
};

const add = document.getElementById("add")
add.addEventListener("click", list.appendTextField(saveTextToElement))
