var time = 30; // my display in seconds
var interval;
var wireColors = ['blue', 'green', 'white', 'red', 'yellow'];
var wiresToCut = [];

 

document.addEventListener("DOMContentLoaded", function() {
  //generate randomly which wires need cutting
  for(var i = 0; i < wireColors.length; i++){
  	wiresToCut.push({color: wireColors[i], cut: Math.random()> 0.5});
	}

	console.log('wires created:', wiresToCut[0], wiresToCut [1], wiresToCut [2], wiresToCut [3], wiresToCut [4]);
  
	//add click event for cutting wire

	var wireImages = document.querySelectorAll('#box img'); 
	for ( var i = 0; i < wireImages.length; i++){
		//addEventListener
		wireImages[i].addEventListener('click', clickWire);


	}
	// //add a click event listener for my reset button
	// document.GetElementById('reset').addEventListener('click', resetGame);


  //start timer!
  interval = setInterval(tick, 1000);
 

});





function tick(){
	console.log('tick');
	time -= 1;
	console.log(time);
	document.getElementById('timer').innerText = time;
	if(time<=0){
		//game over
		//stop the interval
		clearInterval(interval);

		//game over
		gameOver();
		var explosion = document.getElementById('explode');
		explosion.play();
	}
};



function addAllEventListenders(){
	//add click event for cutting wire

	var wireImages = document.querySelectorAll('#box img'); 
	for ( var i = 0; i < wireImages.length; i++){
		//addEventListener
		wireImages[i].addEventListener('click', clickWire);
	}
}


function removeAllEventListeners(){
	//add click event for cutting wire

	var wireImages = document.querySelectorAll('#box img'); 
	for ( var i = 0; i < wireImages.length; i++){
		//addEventListener
		wireImages[i].removeEventListener('click', clickWire);
	}

}

function doneCuttingWires(){
	//check if no wires need to be cut(none have cut == true)
	for(var i=0; i <wiresToCut.length; i++){
		if(wiresToCut[i].cut){
			return false;
		}
	}
	return true;

}





function clickWire(){
	console.log('wire clicked');
	console.log(this.id);

	//change the img src to th cut version of the wireImages
	this.src = './img/cut-' + this.id + "-wire.png";

	//add audio electricy
	var electricSound = document.getElementById('electricity');
	electricSound.play();

	//check if wire should hav been cut or not
	if(wireIsGood(this.id)){
		//good
		console.log('SAFE');
		this.removeEventListener('click', clickWire); //dont allow multiple clicks
	}else {
		//bad
		console.log('NOT SAFE');
		clearInterval(interval);
		gameOver();
		var yay = document.getElementById('cheer');
		var sirenSound = document.getElementById('siren');
		yay.play();
		yay.addEventListener('ended', function(){
			sirenSound.play();
		})
		sirenSound.loop = true

	}
}

function wireIsGood(color){
	for (var i = 0; i<wiresToCut ; i++){
		//check if im looking at the right color
		if(color === wiresToCut[i].color){
			if(wiresToCut[i].cut){
				wiresToCut[i].cut = false;
				return true;
			}
			return false;
		}
	}
}

function gameOver(){
	//explode background
	//remove unexploded class from body
	document.getElementsByTagName('body')[0].classList.remove('unexploded');
	//add an exploded class to body
	document.getElementsByTagName('body')[0].classList.add('exploded');
	//stop wires from being clicked on
	removeAllEventListeners();
}

