import {ListItem} from "./listItem.js";

class Save {
    afterDestroy;

    constructor(list) {
        this.element = document.getElementById("save")
        this.element.addEventListener("click", () => {
            const item = new ListItem(list.textInputElement.value)
            list.populateWithElement(item)
            item.save()
            list.textInputElement.remove()
            list.textInputElement = undefined
        })
    }
}

export {Save}