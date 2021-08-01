import {List} from "./modules/list.js";
import {ListItem} from "./modules/listItem.js";
import {Add} from "./modules/add.js";
import {Save} from "./modules/save.js";

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

const add = new Add(list);
const save = new Save(list);

let onClickSave = () => {
    const item = new ListItem(textInputElement.value)
    list.populateWithElement(item)
    item.save()
    textInputElement.remove()
};

add.afterDestroy = () => {
    const save = new Save(onClickSave)
    save.afterDestroy = () => new Add(onClickAdd)
}
