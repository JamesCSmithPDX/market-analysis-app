var prodImage = function(fileName) {
    this.fileName = fileName;
    this.fileLocation = function() {
      var file = "<img src="'img/'""
      file += fileName + ">"
    };
    this.voteTotal = 0;
  };

var imageArray = new Array();
imageArray.push(new prodImage("bag.jpg"));
imageArray.push(new prodImage("banana.jpg"));
imageArray.push(new prodImage("boots.jpg"));
imageArray.push(new prodImage("chair.jpg"));

var btn = document.getElementById("testName");
btn.addEventListener("click", function() {
  console.log("click");
  document.getElementById('intro').className = "hide";
  document.getElementsByTagName('form').className = "hide";
});

var btn2 = document.getElementById("testName");
btn.addEventListener("click", function() {

// for(var index = 0; index < 15; index++) {
  var randomArray = new Array();
  for(var i = 0; i < 3; i++) {
    var randomImage = Math.floor(Math.random() * (imageArray.length));
    console.log(randomImage);
    var imgPick = imageArray.slice(randomImage)
    randomArray.push(imgPick);
    document.getElementById('img').innerHTML(imgPick.fileLocation);


//     if(randomImage !== randomArray[i - 1]) {
//     randomArray.push(randomImage)
//     var imageChoice = imageArray[randomImage]
//   } else {
//     (i--);
//   }
// console.log(randomArray);
}
// }
console.log(randomArray);

});
