let canvas
let context
let brush = 'circle'
let size = 5
let mouse_down = false;

window.addEventListener('load', init, false)

function init() {
    canvas = document.getElementById('canvas')
    context = canvas.getContext('2d')
    context.globalAlpha = 1 / 2

    function on_mouse_down(event) {
        mouse_down = true
        paint(event.offsetX, event.offsetY)
    }

    function on_mouse_move(event) {
        if (mouse_down) paint(event.offsetX, event.offsetY)
    }

    function on_mouse_up(event) {
        mouse_down = false
        paint(event.offsetX, event.offsetY)
    }

    canvas.addEventListener('mousedown', on_mouse_down)
    canvas.addEventListener('touchstart', on_mouse_down)
    canvas.addEventListener('mousemove', on_mouse_move)
    canvas.addEventListener('touchmove', on_mouse_move)
    canvas.addEventListener('mouseup', on_mouse_up)
    canvas.addEventListener('touchend', on_mouse_up)

    const color_selector = document.querySelector('#color_input')
    color_selector.addEventListener('input', function(event) {
        context.fillStyle = event.target.value
    })
    const size_selector = document.querySelector('#size_input')
    size_selector.addEventListener('input', function(event) {
        size = event.target.value
    })
    const opacity_selector = document.querySelector('#opacity_input')
    opacity_selector.addEventListener('input', function(event) {
        context.globalAlpha = event.target.value / 100
    })
}

function paint(x, y) {
    switch (brush) {
        case 'circle':
            context.beginPath()
            context.arc(x, y, size / 2, 0, 2 * Math.PI)
            context.fill()
            break;
        case 'square':
            context.fillRect(x - size / 2, y - size / 2, size, size)
    }
}

function circle_brush() {
    brush = 'circle'
}

function square_brush() {
    brush = 'square'
}

function fill_canvas() {
    context.fillRect(0, 0, canvas.width, canvas.height)
}

function save_image() {
    let link = document.createElement('a')
    link.download = 'canvas.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
    link = null
}