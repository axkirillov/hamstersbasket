import {List} from "./modules/list.js";
import {Button} from "./modules/button.js";
import {Clear} from "./modules/clear.js";
import {ListItem} from "./modules/listItem.js";

const list = new List();
const add = new Button('add');
const save = new Button('save');
save.hide();
new Clear(list)

add.onClick(
    () => {
        if (!list.textInputElement) {
            list.textInputElement = document.createElement("input");
            list.textInputElement.type = "text"
            list.appendChild(list.textInputElement)
        }
        add.hide()
        save.show()
    }
)

save.onClick(
    () => {
        const item = new ListItem(list.textInputElement.value)
        list.populateWithElement(item)
        item.save()
        list.textInputElement.remove()
        list.textInputElement = undefined
        add.show()
        save.hide()
    }
)

