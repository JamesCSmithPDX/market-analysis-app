var prodImage = function(fileSrc, name) {
    this.fileSrc = fileSrc;
    this.name = name;
    this.voteTotal = 0;
};

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

var btn = document.getElementById("testName");
btn.addEventListener("click", function() {
    document.getElementById('intro').className = "hide";
    document.getElementsByTagName('form')[0].className = "hide";
    userName = this.form.name.value;
    var textNode = document.createTextNode(userName + ", click on the image you like best.");
    document.getElementById('username').appendChild(textNode);
    getRandomNum();
});

var randomArray = new Array();
var testArray = new Array();
var voteCount = 0;


function getRandomNum() {
    // document.getElementById('begin').style.display = "none";
    randomArray = [];
    for (var i = 0; i < 3; i++) {
        var randomImage = Math.floor(Math.random() * (imageArray.length));
        var imageChoice = imageArray[randomImage];
        if (testArray[0] == 'undefined' || testArray[1] == 'undefined' || testArray[2] == 'undefined') {
          createImageArray();
        } else if (imageChoice == testArray[0] || imageChoice == testArray[1] || imageChoice == testArray[2]) {
            i -= 1;
            continue;
        } else {
            createImageArray();
        };


        function createImageArray() {
            var imgPick = imageChoice.fileSrc
            randomArray.push(imageChoice);
            imageArray.splice(randomImage, 1);
          };
        };
    testArray.splice(0, 3, randomArray[0], randomArray[1], randomArray[2]);
    displayImage(randomArray);
    imageArray = imageArray.concat(randomArray)

};

function displayImage(randomArray) {
    document.getElementById("img").innerHTML = "";
    for (var x = 0; x < randomArray.length; x++) {
        var imgId = randomArray[x].name;
        var imgEl = document.getElementById("img");
        imgEl.innerHTML += "<img id = '" + imgId.trim() + "' src=\"" + randomArray[x].fileSrc + "\">";
        imgEl.addEventListener("click", countVote);
    };
};

totalClicks = 0;

function countVote() {
    console.log("Image Clicked:" + event.target.id);
    for(var photoIndex = 0; photoIndex < imageArray.length; photoIndex++) {
      if(imageArray[photoIndex].name == event.target.id) {
        imageArray[photoIndex].voteTotal++;
        console.log(imageArray[photoIndex].voteTotal);
        break;
      }
    }
    totalClicks++
    if (totalClicks < 15) {
    getRandomNum();
  } else {
    document.getElementById('username').className = "hide";
    document.getElementById("img").innerHTML = "";
    var voteEl = document.getElementById("img");
    voteEl.innerHTML += userName + " you reached " + totalClicks + " votes!";
  }
};


// for(i = 0; i < imageArray.length; i++) {
  // console.log(imageArray[i].voteTotal);
// }
