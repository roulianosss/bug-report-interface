const bugsList = [{
    "id": "377d5775-529d-40a4-bca0-3f67495c27f8",
    "name": "b",
    "environement": "frontend",
    "description": "test de bug",
    "priority": "1",
    "date": "24/10/2022 17:12:38"
    }
]

const archivedList = [{
    "id": "test",
    "name": "test",
    "environement": "frontend",
    "description": "test de bug",
    "priority": "1",
    "date": "24/10/2022 17:12:38"
    }
]

//Formulaire de creation de bug
const form = document.querySelector('form')
form.addEventListener('submit', handleForm)
function handleForm(e) {
    e.preventDefault()
    createBug(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value)
    form.reset()
}
//fonction de creation apres remplissage formulaire
function createBug(name, description, environement, priority) {
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
            <p>${bug.id.slice(0, 6)}</p>
            <p>${bug.date}</p>
            <p>${bug.name}</p>
            <p>${bug.description}</p>
            <p>${bug.environement}</p>
            <p>${bug.priority}</p>
            <div class="btn-crud-container">
                <div class='edit-bug' id=${bug.id} title='edit' alt='edit'>✏️</div>
                <div class='archive-bug' id=${bug.id} title='archive' alt='archive'>📁</div>
                <div class='delete-bug' id=${bug.id} title='delete' alt='delete'>❌</div>
            
            </div>
        </div>
        `
        const allEditBtn = document.querySelectorAll('.edit-bug')
        allEditBtn.forEach(btn => btn.addEventListener('click', handleEdit))
        const allArchiveBtn = document.querySelectorAll('.archive-bug')
        allArchiveBtn.forEach(btn => btn.addEventListener('click', handleArchive))
        const allRemoveBtn = document.querySelectorAll('.delete-bug')
        allRemoveBtn.forEach(btn => btn.addEventListener('click', handleRemove))
    }
    // affichage archived list
    const displayArchive = document.querySelector('#rows-archives')
    displayArchive.innerHTML = ''
    for (let bug of archivedList) {
        displayArchive.innerHTML += `
        <div class='row' id='${bug.id}'>
            <p>${bug.id.slice(0, 6)}</p>
            <p>${bug.date}</p>
            <p>${bug.name}</p>
            <p>${bug.description}</p>
            <p>${bug.environement}</p>
            <p>${bug.priority}</p>
            <div class="btn-crud-container">
                <div class='unarchive-bug' id=${bug.id} alt='Unarchive'>📁</div>
                <div class='delete-bug' id=${bug.id} alt='delete'>❌</div>
            
            </div>
        </div>
        `
        // const allEditBtn = document.querySelectorAll('.edit-bug')
        // allEditBtn.forEach(btn => btn.addEventListener('click', handleEdit))
        const allArchiveBtn = document.querySelectorAll('.unarchive-bug')
        allArchiveBtn.forEach(btn => btn.addEventListener('click', handleUnarchive))
        const allRemoveBtn = document.querySelectorAll('.delete-bug')
        allRemoveBtn.forEach(btn => btn.addEventListener('click', handleRemoveArchive))
    }
} 
//fonction edition
function handleEdit() {

}
//fontion archivage
function handleArchive(e) {
    const archiveIndex = bugsList.findIndex(bug => bug.id === e.target.getAttribute('id'))
    archivedList.push(bugsList[archiveIndex])
    bugsList.splice(archiveIndex, 1)
    displayBugsList()
}

//function unarchive
function handleUnarchive(e) {
    const archiveIndex = archivedList.findIndex(bug => bug.id === e.target.getAttribute('id'))
    bugsList.push(archivedList[archiveIndex])
    archivedList.splice(archiveIndex, 1)
    displayBugsList()
}


//fonction de gestion de la suppression
function handleRemove(e) {
    const removeIndex = bugsList.findIndex(bug => bug.id === e.target.getAttribute('id'))
    bugsList.splice(removeIndex, 1)
    displayBugsList()
}
//fonction de gestion de supression des archives
function handleRemoveArchive(e) {
    const removeIndex = archivedList.findIndex(bug => bug.id === e.target.getAttribute('id'))
    archivedList.splice(removeIndex, 1)
    displayBugsList()
}

//Fonction de tri
const sortBtns = document.querySelectorAll('.sort-btn')
sortBtns.forEach(btn => btn.addEventListener('click', (e) => sortBugs(e.target.getAttribute('data-attr'))))
let toggleSort = false
const btnsArray = [...sortBtns]
function sortBugs(type) {
    btnsArray.forEach(btn => btn.textContent = btn.textContent.replace(/[▾▴]/gm, ''))
    if (!toggleSort) {
        bugsList.sort((a,b) => (a[type] > b[type]) ? 1 : ((b[type] > a[type]) ? -1 : 0))
        toggleSort = true
        btnsArray.find(btn => btn.getAttribute('data-attr') === type).textContent += '▴'
    } else {
        bugsList.sort((b,a) => (a[type] > b[type]) ? 1 : ((b[type] > a[type]) ? -1 : 0))
        toggleSort = false
        btnsArray.find(btn => btn.getAttribute('data-attr') === type).textContent += '▾'
    }
    console.log([...sortBtns].find(btn => btn.getAttribute('data-attr') === type));
    displayBugsList()
}

displayBugsList()