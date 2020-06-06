const paths = [];
let currentPath = [];
let color = "#000000";
let weight = 5;
let socket = io.connect();

//Hex inverter
function invertHex(hex) {
    const sliced = hex.slice(1);
    const inverted = (Number(`0x1${sliced}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
    return '#' + inverted;
}

//Color picker
const penColorPicker = document.getElementById('penColorPicker');

//Subscribe to color changes
penColorPicker.addEventListener("change", onPenColorPickerChange, false);

//Handle background color change
function onBackgroundColorPickerChange(event) {
    //Change background accordingly
    background = event.target.color;
    document.getElementsByTagName("BODY")[0].style.backgroundColor = event.target.value;

    //Get invert color and set the body text color
    const invertedColor = invertHex(event.target.value);
    document.getElementsByTagName("BODY")[0].style.color = invertedColor;
}

//Hadnle pen color picker change
function onPenColorPickerChange(event) {
    //Change pen color
    color = event.target.value;
}

//Pencil size slider
const pencilSizeSlider = document.getElementById('brush-size');

//Slider onchange
pencilSizeSlider.onchange = (event) => {
    weight = event.target.value;
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    noFill();

    //Listen for socket emits from server
    socket.on('canvasChange', function (data) {
        console.log(data);
        currentPath.push(data);
    })

    if (mouseIsPressed) {
        const point = {
            x: mouseX,
            y: mouseY,
            color: color,
            weight: weight
        };
        currentPath.push(point);

        //Send path
        socket.emit('canvasChange', point);
    }

    paths.forEach(path => {
        beginShape();
        path.forEach(point => {
            stroke(point.color);
            strokeWeight(point.weight);
            vertex(point.x, point.y);
        });
        endShape();
    });
}

function mousePressed() {
    currentPath = [];
    paths.push(currentPath);
}



