//Set up canvas
let canvas = new fabric.Canvas('canvas');
canvas.setHeight(window.innerHeight);
canvas.setWidth(window.innerWidth);
canvas.isDrawingMode = true;
canvas.freeDrawingBrush.width = 5;
canvas.freeDrawingBrush.color = "#ffffff";

//Background color picker
let backgroundColorPicker = document.getElementById('backgroundColorPicker');
let penColorPicker = document.getElementById('penColorPicker');

//Subscribe to color changes
backgroundColorPicker.addEventListener("input", onBackgroundColorPickerChange, false);
penColorPicker.addEventListener("change", onPenColorPickerChange, false);

//Hex inverter
function invertHex(hex) {
    let sliced = hex.slice(1);
    let inverted = (Number(`0x1${sliced}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
    return '#' + inverted;
}

//Handle background color change
function onBackgroundColorPickerChange(event) {
    //Change background accordingly
    document.getElementsByTagName("BODY")[0].style.backgroundColor = event.target.value;

    //Get invert color and set the body text color
    let invertedColor = invertHex(event.target.value);
    document.getElementsByTagName("BODY")[0].style.color = invertedColor;
}

//Hadnle pen color picker change
function onPenColorPickerChange(event) {
    //Change pen color
    canvas.freeDrawingBrush.color = event.target.value;
}

//Pencil size slider
let pencilSizeSlider = document.getElementById('brush-size');


//Slider onchange
pencilSizeSlider.onchange = (event) => {
    canvas.freeDrawingBrush.width = event.target.value;
}








//Canvas and context

