
let items = document.getElementsByClassName('item')
items = Array.prototype.slice.call(items)

const sandbox = document.getElementById('item-sandbox')
const preview = document.getElementById('preview')

let increment = 25
let activeItem

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function dragElement(item) {
    let pos1, pos2, pos3, pos4 = 0
    item.onmousedown = dragMouseDown

    function dragMouseDown(e) {
        activeItem = e.target.id
        console.log(activeItem)
        item.style.pointerEvents = 'none'

        e = e || window.event
        e.preventDefault()

        pos3 = e.clientX;
        pos4 = e.clientY

        document.onmouseup = closeDragElement
        document.onmousemove = elementDrag
    }

    function elementDrag(e) {
        e = e || window.event
        e.preventDefault()

        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY

        if (getRight(item) > window.innerWidth) {
            preview.style.display = 'block'
            preview.style.left = (window.innerWidth - 250) + 'px'
            preview.style.top = '0px'
            preview.style.height = window.innerHeight + 'px'
            preview.style.width = '250px'
        }

        if (getLeft(item) < 0) { 
            preview.style.display = 'block'
            preview.style.left = '0px'
            preview.style.top = '0px'
            preview.style.height = window.innerHeight + 'px'
            preview.style.width = '250px'
        }

        if (getBottom(item) > window.innerHeight) {
            preview.style.display = 'block'
            preview.style.left = '0px'
            preview.style.top = (window.innerHeight - 250) + 'px'
            preview.style.height = '250px'
            preview.style.width = window.innerWidth + 'px'
        }
        //set a flag for collide true so closeDragElement can animate item to preview values

        item.style.top = (item.offsetTop - pos2) + 'px'
        item.style.left = (item.offsetLeft - pos1) + 'px'
    }

    function closeDragElement() {
        document.onmouseup = null
        document.onmousemove = null
        activeItem = null

        item.style.pointerEvents = 'auto'
    }
}

function getLeft(item) {
    return parseInt(item.style.left)
}
function getRight(item) {
    var val = parseInt(item.style.left.substring(0, item.style.left.length - 2))
    return (val + item.offsetWidth)
}
function getBottom(item) {
    var val = parseInt(item.style.top.substring(0, item.style.top.length - 2))
     return(val + item.offsetHeight)
}

items.map(function(item) {
    item.style.backgroundColor = getRandomColor()
    item.style.top = (item.offsetTop + increment) + 'px'
    item.style.left = (item.offsetLeft + increment) + 'px'
    increment = increment + 25
    dragElement(document.getElementById(item.id))
})


function dropItem(e, flag) {
    let item = document.getElementById(activeItem)
    if(item) {
        if(flag) {
            //play animation for append
            e.target.appendChild(item)
        } else {
            sandbox.appendChild(item)
        }
    }
}
function addItem() {
    let newId = items.length
    let newItem = document.createElement('div')

    newItem.className = 'item'
    newItem.id = 'item-' + newId
    newItem.style.backgroundColor = getRandomColor()
    newItem.style.top = (items[(newId - 1)].offsetTop + 25) + 'px'
    newItem.style.left = (items[(newId - 1)].offsetLeft + 25) + 'px'

    dragElement(newItem)

    sandbox.appendChild(newItem)
    items.push(newItem)
}