import {List} from "./modules/list.js";
import {Add} from "./modules/add.js";
import {Save} from "./modules/save.js";
import {Clear} from "./modules/clear.js";

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

new Add(list);
new Save(list);
new Clear(list)
