let pen = document.querySelector("#pen");
let eraser = document.querySelector("#eraser");

let penOptions = pen.querySelector(".pen-tool-options");
let eraserOptions = eraser.querySelector(".eraser-tool-options");

let penSize = penOptions.querySelector("#pensize");
let eraserSize = eraserOptions.querySelector("#erasersize");

let penColors = penOptions.querySelectorAll(".pen-colors div");

let currentPenSize = 1;
let currentPenColor = 'black';
let currentEraserSize = 1;
let currentEraserColor = 'white';

penSize.addEventListener("change", function() {
    let penSizeValue = penSize.value;
    currentPenSize = penSizeValue;
    ctx.lineWidth = currentPenSize;
});

eraserSize.addEventListener("click", function() {
    let eraserSizeValue = eraserSize.value;
    currentEraserSize = eraserSizeValue;
    ctx.lineWidth = currentEraserSize;
});

for (let i = 0; i < penColors.length; i++) {
    penColors[i].addEventListener("click", function(e) {
        let penColor = e.target.className;
        currentPenColor = penColor;
        ctx.strokeStyle = currentPenColor;
    });
}

pen.addEventListener("click", function() {
    if (pen.classList.contains("active-tool")) {

        penOptions.classList.toggle("hide");
    } else {
        eraser.classList.remove("active-tool");
        eraser.classList.add("fade");
        eraserOptions.classList.add("hide");

        pen.classList.remove("fade");
        pen.classList.add("active-tool");

        ctx.lineWidth = currentPenSize;
        ctx.strokeStyle = currentPenColor;
    }
});

eraser.addEventListener("click", function() {
    if (eraser.classList.contains("active-tool")) {

        eraserOptions.classList.toggle("hide");
    } else {
        pen.classList.remove("active-tool");
        pen.classList.add("fade");
        penOptions.classList.add("hide");

        eraser.classList.add("active-tool");
        eraser.classList.remove("fade");

        ctx.strokeStyle = currentEraserColor;
        ctx.lineWidth = currentEraserSize;
    }
});
