//Set up canvas
const canvas = new fabric.Canvas('canvas');

//Drawing mode
canvas.isDrawingMode = true;

//Free draw brush width and color
canvas.freeDrawingBrush.width = 5;
canvas.freeDrawingBrush.color = "#000000";

//On canvas change
canvas.on('object:added', canvasModifiedCallback);

//Set up a socket connection with our server
const socket = new io.connect();

//Set up listener and draw
socket.on('canvasChange', function(objectAdded) {
    fabric.util.enlivenObjects([objectAdded], function(objects) {
        objects.forEach(function (o) {
            canvas.add(o);
        });
    });
});

//Call up server when canvas changes with the change
function canvasModifiedCallback(e) {
    const objectAdded = e.target;
    socket.emit('canvasChange', objectAdded);
}

//Background color picker
const backgroundColorPicker = document.getElementById('backgroundColorPicker');
const penColorPicker = document.getElementById('penColorPicker');

//Subscribe to color changes
backgroundColorPicker.addEventListener("input", onBackgroundColorPickerChange, false);
penColorPicker.addEventListener("change", onPenColorPickerChange, false);

//Hex inverter
function invertHex(hex) {
    const sliced = hex.slice(1);
    const inverted = (Number(`0x1${sliced}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
    return '#' + inverted;
}

//Handle background color change
function onBackgroundColorPickerChange(event) {
    //Change background accordingly
    canvas.backgroundColor = event.target.value;
    document.getElementsByTagName("BODY")[0].style.backgroundColor = event.target.value;

    //Get invert color and set the body text color
    const invertedColor = invertHex(event.target.value);
    document.getElementsByTagName("BODY")[0].style.color = invertedColor;
}

//Hadnle pen color picker change
function onPenColorPickerChange(event) {
    //Change pen color
    canvas.freeDrawingBrush.color = event.target.value;
}

//Pencil size slider
const pencilSizeSlider = document.getElementById('brush-size');

//Slider onchange
pencilSizeSlider.onchange = (event) => {
    canvas.freeDrawingBrush.width = event.target.value;
}










