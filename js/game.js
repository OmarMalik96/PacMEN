// Create the canvas
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/pac_background2.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/pac_hero2.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/pac_monster1.png";

// Food image
var foodReady = false;
var foodImage = new Image();
foodImage.onload = function () {
	foodReady = true;
};


// Game objects
var hero = {
	speed: 256,
	n:0 // movement in pixels per second
};
var monster = {
	speed: 100
};

var food = {

};
var monstersCaught = 0;
var foodEaten = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));

	food.x = 32 + (Math.random() * (canvas.width - 64));
	food.y = 32 + (Math.random() * (canvas.height - 64));
};

var resetFood = function() {
    food.x = 32 + (Math.random() * (canvas.width - 64));
	food.y = 32 + (Math.random() * (canvas.height - 64));

}



// Update game objects
var update = function (modifier) {
	if (38 in keysDown || 87 in keysDown) { // Player holding up
		hero.n = 1;
		if(hero.x > 218 && hero.x < 250 && hero.y <=26){
			hero.y= 415;
		}
		else if(hero.y > 25){
			hero.y -= hero.speed * modifier;
		}
	}
	else if (40 in keysDown || 83 in keysDown) { // Player holding down
		hero.n = 3;
		if(hero.x > 218 && hero.x < 250 && hero.y >=414){
			hero.y= 26;
		}
		else if(hero.y < 415){
			hero.y += hero.speed * modifier;
		}
	}
	else if (37 in keysDown || 65 in keysDown) { // Player holding left
		hero.n = 2;
		if(hero.y > 188 && hero.y < 225 && hero.x <= 26){
			hero.x= 459;
		}
		else if(hero.x > 25){
		hero.x -= hero.speed * modifier;
	}
	}
	else if (39 in keysDown || 68 in keysDown) { // Player holding right
		hero.n = 0;
		if(hero.y > 188 && hero.y < 225 && hero.x >= 459){
			hero.x= 26;
		}
		else if( hero.x < 460 ){
			hero.x += hero.speed * modifier;
		}
	}

	var deltax = Math.floor(hero.x - monster.x);
	var deltay = Math.floor(hero.y - monster.y);
	if (Math.abs(deltax) > Math.abs(deltay)){
		if (deltax > 0){
			monster.x += monster.speed * modifier;
		}
		if (deltax < 0){
			monster.x -= monster.speed * modifier;
		}
	    } else{
		if (deltay > 0){
			monster.y += monster.speed * modifier;
		}
		if (deltay < 0){
			monster.y -= monster.speed * modifier;
		}
	}


	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
	if (

		hero.x <= (food.x + 25)
		&& food.x <= (hero.x + 25)
		&& hero.y <= (food.y + 25)
		&& food.y <= (hero.y + 25)

	) {

		++foodEaten;
		food.x = 32 + (Math.random() * (canvas.width - 64));
		food.y = 32 + (Math.random() * (canvas.height - 64));
        resetFood();
	}
};



// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage,  32 * (hero.n), 0,32, 32, hero.x,  hero.y, 32, 32);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
     if (foodReady) {
        ctx.drawImage(foodImage, food.x, food.y);

    }
	ctx.beginPath();
	ctx.arc(food.x,food.y,5,0,2*Math.PI);
	ctx.fill();




	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("HP: " + (foodEaten-monstersCaught), 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
