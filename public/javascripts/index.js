//Background color picker
let backgroundColorPicker = document.getElementById('backgroundColorPicker');
let penColorPicker = document.getElementById('penColorPicker');

//Subscribe to color changes
backgroundColorPicker.addEventListener("input", onBackgroundColorPickerChange, false);

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
    console.log(invertedColor);
    document.getElementsByTagName("BODY")[0].style.color = invertedColor;

 }