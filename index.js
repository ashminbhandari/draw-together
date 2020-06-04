console.log('here');

//Set up canvas
let canvas = new fabric.Canvas('canvas');

//Drawing mode
canvas.isDrawingMode = true;

//Free draw brush width and color
canvas.freeDrawingBrush.width = 5;
canvas.freeDrawingBrush.color = "#000000";

//On canvas change
canvas.on('after:render', canvasModifiedCallback);
function canvasModifiedCallback () {

}

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
    canvas.backgroundColor = event.target.value;
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

let socket = io.connect();

socket.emit('message', 'ashmin');

socket.on('message', function(message) {
    console.log(message);
})