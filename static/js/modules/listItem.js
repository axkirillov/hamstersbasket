class ListItem {
    text;
    checked = false;

    constructor(text, checked = false) {
        this.text = text;
        this.checked = checked;
    }

    save() {
        const options = {
            method: 'POST',
            body: JSON.stringify({text: this.text, checked: this.checked})
        };
        fetch('/data/add', options).then(r => console.log(r))
    }
}

export {ListItem}