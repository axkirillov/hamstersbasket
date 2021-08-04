export class Clear {
    constructor(list) {
        const button = document.getElementById("clear")
        button.addEventListener('click', () => {
            const htmlCollection = list.root.getElementsByTagName('label')
            const elements = Array.from(htmlCollection);
            elements.forEach((element) => {
                if (element.firstChild.checked) {
                    fetch('/data/delete/' + element.id, {
                        method: 'DELETE',
                    }).then()
                    element.remove()
                }
            })
        })
    }
}