const bugsList = [{
    "id": "377d5775-529d-40a4-bca0-3f67495c27f8",
    "name": "b",
    "environement": "frontend",
    "description": "test de bug",
    "priority": "1",
    "date": "24/10/2022 17:12:38",
    'number': 2

    }
]

//Formulaire de creation
const form = document.querySelector('form')
form.addEventListener('submit', handleForm)
function handleForm(e) {
    e.preventDefault()
    createBug(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value)
    form.reset()
}
//fonction de creation apres remplissage formulaire
function createBug(name, environement, description, priority) {
    bugsList.push({
        id: crypto.randomUUID(),
        name: name,
        environement: environement,
        description: description,
        priority: priority,
        date: new Date().toLocaleString().split('T')[0]
    })
    displayBugsList()
}
//affichage de la liste de bug
const displayBugs = document.querySelector('#rows')
function displayBugsList() {
    displayBugs.innerHTML = ''
    for (let bug of bugsList) {
        displayBugs.innerHTML += `
        <div class='row' id='${bug.id}'>
            <div class='delete-bug' id=${bug.id}>✖</div>
            <p>${bug.id.slice(0, 6)}</p>
            <p>${bug.date}</p>
            <p>${bug.name}</p>
            <p>${bug.description}</p>
            <p>${bug.environement}</p>
            <p>${bug.priority}</p>
        </div>
        `
        const allRemoveBtn = document.querySelectorAll('.delete-bug')
        allRemoveBtn.forEach(btn => btn.addEventListener('click', handleRemove))
    }
} 
//fonction de gestion de la suppression
function handleRemove(e) {
    const removeIndex = bugsList.findIndex(bug => bug.id === e.target.getAttribute('id'))
    bugsList.splice(removeIndex, 1)
    displayBugsList()
}
//Fonction de tri
const sortBtns = document.querySelectorAll('.sort-btn')
sortBtns.forEach(btn => btn.addEventListener('click', (e) => sortBugs(e.target.getAttribute('data-attr'))))
let toggleSort = false
function sortBugs(type) {
    if (!toggleSort) {
        bugsList.sort((a,b) => (a[type] > b[type]) ? 1 : ((b[type] > a[type]) ? -1 : 0))
        toggleSort = true
    } else {
        bugsList.sort((b,a) => (a[type] > b[type]) ? 1 : ((b[type] > a[type]) ? -1 : 0))
        toggleSort = false
    }
    displayBugsList()
}

displayBugsList()