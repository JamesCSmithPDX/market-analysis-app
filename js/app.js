var prodImage = function(fileSrc, name) {
    this.fileSrc = fileSrc;
    this.name = name;
    this.voteTotal = 0;
};

var imageArray = new Array();
imageArray.push(new prodImage("img/bag.jpg", "Bag"));
console.log(imageArray[0].fileSrc);
imageArray.push(new prodImage("img/banana.jpg", "Banana"));
imageArray.push(new prodImage("img/boots.jpg", "Boots"));
imageArray.push(new prodImage("img/chair.jpg", "Chair"));
imageArray.push(new prodImage("img/chair.jpg", "Chair"));
imageArray.push(new prodImage("img/cthulhu.jpg", "Cthulhu"));
imageArray.push(new prodImage("img/dragon.jpg", "Dragon"));
imageArray.push(new prodImage("img/pen.jpg", "Pen"));
imageArray.push(new prodImage("img/scissors.jpg", "Scissors"));
imageArray.push(new prodImage("img/shark.jpg", "Shark"));
imageArray.push(new prodImage("img/sweep.jpg", "Sweep"));
imageArray.push(new prodImage("img/unicorn.jpg", "Unicorn"));
imageArray.push(new prodImage("img/usb.jpg", "USB"));
imageArray.push(new prodImage("img/water_can.jpg", "Water Can"));
imageArray.push(new prodImage("img/wine_glass.jpg", "wine Glass"));



var btn = document.getElementById("testName");
btn.addEventListener("click", function() {
    console.log("click");
    document.getElementById('intro').className = "hide";
    document.getElementsByTagName('form')[0].className = "hide";
    var textNode = document.createTextNode(this.form.name.value + ", click on the image you like best.");
    document.getElementById('username').appendChild(textNode);
});

var randomArray = new Array();
var testArray = new Array();

var btn2 = document.getElementById("begin");
btn2.addEventListener("click", getRandomNum);
document.getElementById('intro').className = "hide";


function getRandomNum() {
    randomArray = [];
    console.log(typeof testArray);
    console.log(testArray[0]);
    for (var i = 0; i < 3; i++) {
        var randomImage = Math.floor(Math.random() * (imageArray.length));
        var imageChoice = imageArray[randomImage];
        if (testArray[0] == 'undefined') {
            console.log("empty array");
            createImageArray();
        } else if (imageChoice == testArray[0] || imageChoice == testArray[1] || imageChoice == testArray[2]) {
            i--;
        } else {
            createImageArray();
        }
    };

    function createImageArray() {
        var imgPick = imageChoice.fileSrc
        randomArray.push(imageChoice);
        imageArray.splice(randomImage, 1);
        console.log(imgPick);
    }

    testArray.splice(0, 3, randomArray[0], randomArray[1], randomArray[2]);
    displayImage(randomArray);
    imageArray = imageArray.concat(randomArray)
};


function displayImage(randomArray) {
    document.getElementById("img").innerHTML = "";
    for (var x = 0; x < 3; x++) {
        document.getElementById("img").innerHTML += "<img src=\"" + randomArray[x].fileSrc + "\">";
    }
};
