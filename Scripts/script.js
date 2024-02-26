let canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;

    drawLinesFromDB();
});

let ctx = canvas.getContext("2d");

let linesDB = [];
let redoLinesDB = [];
let isPenDown = false;
let line = [];

canvas.addEventListener("mousedown", function(e) {
    if (redoLinesDB.length) {
        redoLinesDB = [];
    }
    redo.classList.add('fade');

    console.log("Inside mouse down");
    isPenDown = true;
    let x = e.clientX;
    let y = e.clientY - 100;
    ctx.beginPath();
    ctx.moveTo(x, y);
    let pointObject = {
        x: x,
        y: y,
        type: "md",
        lineWidth: ctx.lineWidth,
        strokeStyle: ctx.strokeStyle,
    };
    line.push(pointObject);
});

canvas.addEventListener("mousemove", function(e) {
    if (isPenDown) {
        console.log("Inside mousemove");
        let x = e.clientX;
        let y = e.clientY - 100;
        ctx.lineTo(x, y);
        ctx.stroke();

        let pointObject = {
            x: x,
            y: y,
            type: "mm",
        };
        line.push(pointObject);
    }
});

canvas.addEventListener("mouseup", function(e) {
    console.log("mouseup");
    isPenDown = false;

    linesDB.push(line);
    line = [];

    console.log(linesDB);
});


const chk = document.getElementById('chk');
const toolContent = document.querySelector('.tools-content');
const toolContainer = document.querySelector('.tools-container');
const toggleDiv = document.querySelector('.label');
const ball = document.querySelector('.ball');
const copyright = document.querySelector('.copyright');

chk.addEventListener('change', () => {
    console.log('checkbox changed');
    canvas.classList.toggle('canvas-dark');
    toolContent.classList.toggle('tools-content-dark');
    toolContainer.classList.toggle('tools-container-dark');
    toggleDiv.classList.toggle('night');
    ball.classList.toggle('dark-ball');
    copyright.classList.toggle('cr-color');
    
    if (taskbarDiv) {
        taskbarDiv.classList.toggle('dark-s-taskbar');
        taskbarDiv.classList.toggle('light-s-taskbar');
    }

    penOptions.classList.toggle('tool-options-dark');
    eraserOptions.classList.toggle('tool-options-dark');
    
    changeCanvas();

    if (canvas.classList.contains('canvas-dark')) {
        console.log('toggle check - dark theme');
        if (currentPenColor == 'black') {
            currentPenColor = 'white';   
        }
        currentEraserColor = 'black';
        if (pen.classList.contains("active-tool")) {
            ctx.strokeStyle = currentPenColor;
        } else {
            ctx.strokeStyle = currentEraserColor;
        }
    } else {
        console.log('toggle check - light theme');
        if (currentPenColor == 'white') {
            currentPenColor = 'black';
        }
        currentEraserColor = 'white';
        if (pen.classList.contains("active-tool")) {
            ctx.strokeStyle = currentPenColor;
        } else {
            ctx.strokeStyle = currentEraserColor;
        }
    }

    penColors[0].classList.toggle('black');
    penColors[0].classList.toggle('white');
});

function changeCanvas() {
    if (canvas.classList.contains('canvas-dark')) {
        console.log('black canvas');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        alterPointObjectStroke();
    } else {
        console.log('white canvas');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        alterPointObjectStroke();
    }
}

