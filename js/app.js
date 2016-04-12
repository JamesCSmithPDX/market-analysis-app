// Product image object constructor
var prodImage = function(fileSrc, name) {
    this.fileSrc = fileSrc;
    this.name = name;
    this.label = name;
    this.y = 0;
    this.idName = name.replace(/\s/g, '');
};

// Initialize objects and create array
var imageArray = new Array();
imageArray.push(new prodImage("img/bag.jpg", "Bag"));
imageArray.push(new prodImage("img/banana.jpg", "Banana"));
imageArray.push(new prodImage("img/boots.jpg", "Boots"));
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
imageArray.push(new prodImage("img/wine_glass.jpg", "Wine Glass"));

var userName = "";

// Clone imageArray
var availablePhotos = new Array();
for (var index = 0; index < imageArray.length; index++) {
    availablePhotos.push(imageArray[index]);
}

// Start market analysis app
function newGameUser() {
    var btn = document.getElementById("testName");
    btn.addEventListener("click", function() {
        document.getElementById('intro').id = "hide";
        document.getElementsByTagName('form')[0].className = "hide";
        userName = this.form.name.value;
        var textNode = document.createTextNode(userName + ", click on the image you like best.");
        document.getElementById('username').appendChild(textNode);
        this.form.name.value = "";
        getRandomNum();
    });
};

newGameUser()


var randomArray = new Array();
var testArray = new Array();
var voteCount = 0;

// Random selection of images
function getRandomNum() {
    randomArray = [];
    for (var i = 0; i < 3; i++) {
        var randomImage = Math.floor(Math.random() * (availablePhotos.length));
        var imageChoice = availablePhotos[randomImage];
        if (testArray[0] == 'undefined' || testArray[1] == 'undefined' || testArray[2] == 'undefined') { // First itme through run
            createImageArray();
        } else if (imageChoice == testArray[0] || imageChoice == testArray[1] || imageChoice == testArray[2]) {
            i -= 1; //rerun if a duplicate from previous round
            continue;
        } else {
            createImageArray();
        };

        //get image form array; store in randomArray, splice from cloned imageArray
        function createImageArray() {
            var imgPick = imageChoice.fileSrc
            randomArray.push(imageChoice);
            availablePhotos.splice(randomImage, 1);
        };
    };
    availablePhotos = availablePhotos.concat(randomArray) //add images back into array
    testArray.splice(0, 3, randomArray[0], randomArray[1], randomArray[2]); //store images to check next round
    displayImage(randomArray);
};

function displayImage(randomArray) {
    document.getElementById("img").innerHTML = "";
    for (var x = 0; x < randomArray.length; x++) {
        var imgId = randomArray[x].idName;
        var imgEl = document.getElementById("img");
        imgEl.innerHTML += "<img id = '" + imgId + "' src=\"" + randomArray[x].fileSrc + "\">";
        imgEl.addEventListener("click", countVote);
    };
};

totalClicks = 0;
// count vote rounds 15
function countVote() {
    console.log("Image Clicked:" + event.target.id);
    for (var photoIndex = 0; photoIndex < imageArray.length; photoIndex++) {
        if (imageArray[photoIndex].idName == event.target.id) {
            imageArray[photoIndex].y++;
            console.log(imageArray[photoIndex].y);
            break;
        };
    };
    totalClicks++;
    //check rounds; tell user where they are in 15 rounds
    if (totalClicks < 15) {
        var totalClickEl = document.getElementById("count");
        totalClickEl.innerHTML = "<p> Click #" + totalClicks + " only " + (15 - totalClicks) + " to go! </p>";
        getRandomNum();
    } else {
        document.getElementById('username').className = "hide";
        document.getElementById('count').className = "hide";
        document.getElementById('reset').setAttribute("id", "newGame");
        document.getElementById("img").innerHTML = "";
        var voteEl = document.getElementById("img");
        voteEl.innerHTML += "<h2>" + userName + ", you reached " + totalClicks + " votes! </h2>";
        chart.render();
        endOfGame();
    };
};
//user chart
window.onload = function() {
    CanvasJS.addColorSet("downTown", ["#3b5998",
        "#8b9dc3",
        "#f7f7f7",
        "#ffffff",
    ]);
    chart = new CanvasJS.Chart("chartContainer", {
        colorSet: "downTown",
        backgroundColor: "#dfe3ee",
        theme: "theme2",
        axisX: {
            labelFontColor: "white",
        },
        title: {
            text: "Clicks Per Photo",
            fontFamily: "Verdana",
            fontColor: "white",
        },
        data: [ //array of dataSeries
            /*** Change type "column" to "bar", "area", "line" or "pie"***/
            {
                type: "column",
                dataPoints: imageArray,
                indexLabel: "{y}",
                indexLabelPlacement: "outside",
                indexLabelFontColor: "white",
            }
        ]
    });
}

//reset game and store votes in localStorage
function endOfGame() {
    var btnNewGame = document.getElementById("newGame");
    btnNewGame.addEventListener("click", function() {
        for (var i = 0; i < imageArray.length; i++) {
            var name = imageArray[i].idName;
            if (localStorage.getItem(name)) {
                var prevClicks = parseInt(localStorage.getItem(name));
                prevClicks += imageArray[i].y;
                localStorage.setItem(name, prevClicks);
            } else {
                localStorage.setItem(name, imageArray[i].y);
            };
        };
        window.location.reload();
    });
};
