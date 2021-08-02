export class Clear {
    constructor(list) {
        const button = document.getElementById("clear")
        button.addEventListener('click', () => {
            const htmlCollection = list.list.getElementsByTagName('label')
            const elements = Array.from(htmlCollection);
            elements.forEach((element) => {
                if (element.firstChild.checked) {
                    fetch('/data/delete/' + element.id, {
                        method: 'DELETE',
                    }).then(r => console.log(r))
                    element.remove()
                }
            })
        })
    }
}