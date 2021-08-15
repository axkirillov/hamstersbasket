class ListItem {
    id;
    text;
    checked = false;

    constructor(text, checked = false) {
        this.text = text;
        this.checked = checked;
    }

    async save() {
        const options = {
            method: 'POST',
            body: JSON.stringify({text: this.text, checked: this.checked})
        };

        const response = await fetch('/data/add', options)
        if (response.ok) {
            const data = await response.json()
            this.id = data.id
        }
    }
}

export {ListItem}