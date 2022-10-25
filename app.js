const bugsList = [
    {
        "id": "1232ffd2-a39a-495a-afdd-2995021cf72d",
        "name": "Bug de son",
        "environement": "frontend",
        "description": "Plus de son",
        "priority": "2",
        "date": "25/10/2022 16:16:58"
    },
    {
        "id": "d8df3408-4fab-43d1-be4b-ba47477041bb",
        "name": "Bug d affichage",
        "environement": "frontend",
        "description": "plus d affichage",
        "priority": "3",
        "date": "25/10/2022 16:17:27"
    },
    {
        "id": "4e3eae5f-9d4a-4597-86dc-296cb9ae4aec",
        "name": "Connection a la BDD",
        "environement": "backend",
        "description": "BDD HS",
        "priority": "5",
        "date": "25/10/2022 16:18:20"
    },
    {
        "id": "a7104fb3-2c7d-49b6-86b4-1268ba4c6a89",
        "name": "Bug d API",
        "environement": "backend",
        "description": "L api retourne un erreur",
        "priority": "4",
        "date": "25/10/2022 16:18:54"
    },
    {
        "id": "ccd91ccf-e1b7-4bb9-8901-7ee41cf4c7ea",
        "name": "Bug de cerveau",
        "environement": "frontend",
        "description": "Changer le liquide céphalo rachidien",
        "priority": "1",
        "date": "25/10/2022 16:19:43"
    }
]

const archivedList = []

//Formulaire de creation de bug
const inputs = document.querySelectorAll('input')
inputs.forEach(input => input.addEventListener('focus', (e) => e.target.setAttribute('placeholder', '')))
inputs.forEach(input => input.addEventListener('focusout', (e) => e.target.setAttribute('placeholder', e.target.getAttribute('name'))))
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
    console.log(bugsList)
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
                <div class='delete-archive-bug' id=${bug.id} alt='delete'>❌</div>
            
            </div>
        </div>
        `
        const allArchiveBtn = document.querySelectorAll('.unarchive-bug')
        allArchiveBtn.forEach(btn => btn.addEventListener('click', handleUnarchive))
        const allRemoveBtn = document.querySelectorAll('.delete-archive-bug')
        allRemoveBtn.forEach(btn => btn.addEventListener('click', handleRemoveArchive))
    }
} 
//fonction edition
const editOverlay = document.querySelector('#overlay')
function handleEdit(e) {
    
    editOverlay.style.visibility = 'visible'
    const editIndex = bugsList.findIndex(bug => bug.id === e.target.getAttribute('id'))
    editOverlay.innerHTML = `
    <form>
        <!-- <label for="name">Name:</label> -->
        <input type="text" id="name" value="${bugsList[editIndex].name}" required>
        <input type="text" name="description" id="description" value='${bugsList[editIndex].description}' required></input>
        <select name="environement" id="environement" placeholder="Environement">
            <option value="frontend" ${bugsList[editIndex].environement === 'frontend' ? 'selected' : ''}>Frontend</option>
            <option value="backend" ${bugsList[editIndex].environement === 'backend' ? 'selected' : ''}>Backend</option>
        </select>
        <select name="priority" id="priority" value='${bugsList[editIndex].priority}' >
            <option value="">Priority:</option>
            <option value="1" ${bugsList[editIndex].priority === '1' ? 'selected' : ''}>1</option>
            <option value="2" ${bugsList[editIndex].priority === '2' ? 'selected' : ''}>2</option>
            <option value="3" ${bugsList[editIndex].priority === '3' ? 'selected' : ''}>3</option>
            <option value="4" ${bugsList[editIndex].priority === '4' ? 'selected' : ''}>4</option>
            <option value="5" ${bugsList[editIndex].priority === '5' ? 'selected' : ''}>5</option>
        </select>
        <button id="submit-edit-btn">EDIT BUG</button>
    </form>
    `
    const editBtn = document.querySelector('#overlay form')
    editBtn.addEventListener('submit', (e) => {
        e.preventDefault()
        bugsList[editIndex].name = e.target[0].value
        bugsList[editIndex].description = e.target[1].value
        bugsList[editIndex].environement = e.target[2].value
        bugsList[editIndex].priority = e.target[3].value
        editOverlay.style.visibility = 'hidden'
        displayBugsList()
    })
    
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
    displayBugsList()
}

displayBugsList()

document.querySelectorAll('')