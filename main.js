
let items = document.getElementsByClassName('item')
let itemsID = []
items = Array.prototype.slice.call(items)

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

items.map(function(item) {
    item.style.backgroundColor = getRandomColor()
    item.style.top = (item.offsetTop + increment) + 'px'
    item.style.left = (item.offsetLeft + increment) + 'px'
    increment = increment + 25
    dragElement(document.getElementById(item.id))
})

function dropItem(e) {
    let item = document.getElementById(activeItem)
    if(item) {
        e.target.appendChild(item)
    }
}