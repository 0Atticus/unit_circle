let angle = 0;
const circle = document.getElementById('circle');
const lines = document.getElementsByClassName("line");
let rotations = [0, 60, 45, 30, 90, 315, 300, 270, 240, 225, 210, 180, 150, 135, 120, 330];
let rotation_info = ["90° , π/2", "150° , 5π/3", "135° , 3π/4","120° , 2π/3", "180° , π", "45° , π/4", "30° , π/6", "0° or 360° , 2π", "330° , 11π/6", "315° , 7π/4", "300° , 5π/3", "270° , 3π/2", "240° , 4π/3", "225° , 5π/4", "210° , 7π/6", "60° , π/3"];
let clickCount = 0;
let scrollSpeed = 3;


function getCurrentRotation(el){
    var st = window.getComputedStyle(el, null);
    var tm = st.getPropertyValue("-webkit-transform") ||
             st.getPropertyValue("-moz-transform") ||
             st.getPropertyValue("-ms-transform") ||
             st.getPropertyValue("-o-transform") ||
             st.getPropertyValue("transform") ||
             "none";
    if (tm != "none") {
      var values = tm.split('(')[1].split(')')[0].split(',');
      var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
      return (angle < 0 ? angle + 360 : angle); 
    }
    return 0;
  }



document.getElementsByTagName("body")[0].addEventListener("click", function() {

    if (!clickCount) {


    for (var i = 0; i < lines.length; i ++) {
        lines[i].style.animation = "explode 1s";
    }
    setTimeout(() => {for (var i = 0; i < lines.length; i ++) {
        lines[i].style.background = "white";

        var rotation = getCurrentRotation(document.getElementById("circle"));


        if (rotations.includes(rotation)) {
            console.log("check");
            index = rotations.indexOf(rotation);
            info = rotation_info[index];
            console.log(index, info);
            document.getElementById("info").innerHTML = info;
            document.getElementById("info").style.color = "white"
        } else {
            document.getElementById("info").style.color = "#202024";
        }


    }}, 1000);

    lines[4].style.animation = "explode_red 1s";
    lines[4].style.zIndex = "1";
    setTimeout(() => {lines[4].style.background = "red"}, 1000);

    clickCount ++;
} else {
    null;
}

});

const degreesToRadians = (deg) => {

    return (`${deg}° ≈ ${((deg * (Math.PI/180)) / Math.PI)}π`);

}


const processRotation = (deg) => {

    if (deg + 90 < 360) {
        return deg + 90
    } else if (deg + 90 > 360) {
        return deg - 270;
    }
}


document.onwheel = function(e) {

    if (e.deltaY) {
        e.preventDefault();
        angle += e.deltaY > 0 ? scrollSpeed : -scrollSpeed;
        circle.style.transform = "rotate(" + angle + "deg)";
        
        var rotation = getCurrentRotation(document.getElementById("circle"));


        if (rotations.includes(rotation)) {
            console.log("check");
            index = rotations.indexOf(rotation);
            info = rotation_info[index];
            console.log(index, info);
            document.getElementById("info").innerHTML = info;
            document.getElementById("info").style.color = "white"
        } else {
            document.getElementById("info").innerHTML = degreesToRadians(processRotation(rotation));
        }
        
        

    }

}




rotations.forEach(i => {

    var line = document.createElement("div");
    line.className = "line";
    document.getElementsByTagName("div")[0].appendChild(line);
    line.style.transform = "rotate(" + i + "deg)";


});