// global variables
var s;
var token;
var endGame = false;
var scl = 20;
var fr = 10;
var wd = 600;
var ht = 600;
var collectTokenS;
var gameOverS;
var leftRightS;
var upDownS;
var myFont;

// loads the sounds and font to be used later on in the game
function preload() {
  // loading font
  myFont = loadFont("assets/Inter-Light.ttf");

  // loading sounds
  soundFormats("mp3");
  collectTokenS = loadSound("assets/sounds/collectToken");
  gameOverS = loadSound("assets/sounds/gameOver");
  leftRightS = loadSound("assets/sounds/left-right");
  upDownS = loadSound("assets/sounds/up-down");

  // set volumes for each of the sounds
  gameOverS.setVolume(0.5);
  collectTokenS.setVolume(0.3);
  upDownS.setVolume(0.3);
  leftRightS.setVolume(0.3);
}

// sets up the game
function setup() {
  // makes the board for the game and sets the speed
  createCanvas(wd, ht + 50);
  frameRate(fr);

  // initializes the snake and first token
  s = new Snake();
  pickLocation();

  // starting location of the snake
  s.x = wd / 2;
  s.y = ht / 2;

  let hammer = new Hammer(document.body, {
    preventDefault: false,
  });

  hammer.get("swipe").set({
    direction: Hammer.DIRECTION_ALL,
  });

  hammer.on("swipe", keyPressed);
}

// picks the location to place a token at the start and when one is eaten
function pickLocation() {
  var cols = floor(ht / scl);
  var rows = floor(wd / scl);
  token = createVector(floor(random(cols)), floor(random(rows)));
  token.mult(scl);
}

// makes the user wait a specific amount of time
function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

// checks if the game is over if the snake collides with itself or the walls
function checkGameOver() {
  if (s.x < 0 || s.y > ht - scl) {
    endGame = true;
  } else if (s.x > wd - scl || s.y < 0) {
    endGame = true;
  } else if (s.snakeCollision()) {
    endGame = true;
  }
}

// ends the game and lets player know how to play again
function gameOver() {
  // game over sound
  gameOverS.play();

  // stops snake movement
  s.xSpeed = 0;
  s.ySpeed = 0;

  // game over message
  text("Game Over! Click to restart.", 180, ht + 35);

  // stops redrawing the frame
  noLoop();
}

// resets the snake's size and amount of token's collected
function restartGame() {
  endGame = false;

  // restarts the speed of the game
  fr = 10;
  frameRate(fr);

  // restarts size
  s.score = 0;
  s.tail = [];

  // restarts location
  s.x = wd / 2;
  s.y = ht / 2;
  loop();
}

// main function, pieces everything together
function draw() {
  stroke(223, 229, 239);
  background(26, 27, 32);

  // draws new tokens when previous one eaten and makes the game a bit faster
  if (s.eat(token)) {
    collectTokenS.play();
    fr += 0.5;
    frameRate(fr);
    pickLocation();
  }

  // shows the snake on the screen
  s.update();
  s.show();

  // token being placed on the board each time
  fill(255, 100, 0);
  rect(token.x, token.y, scl, scl);

  // score section
  fill(29, 30, 36);
  rect(0, width, width, 50);

  // score, aka the amount of tokens picked up
  textSize(32);
  textFont(myFont);
  fill(223, 229, 239);
  text("Score: " + s.score, 10, ht + 35);

  // continuous check for the end of the game
  checkGameOver();
  if (endGame) {
    gameOver();
  }
}

// checks if the mouse has been pressed to restart the game
function mousePressed() {
  if (endGame) {
    restartGame();
  }
}

// movements of the snake available
function keyPressed() {
  if (!endGame) {
    if (
      keyCode === UP_ARROW ||
      keyCode === 87 ||
      (event && event.direction == 8)
    ) {
      if (s.ySpeed != 1) {
        upDownS.play();
        s.dir(0, -1);
      }
    } else if (
      keyCode === DOWN_ARROW ||
      keyCode === 83 ||
      (event && event.direction == 16)
    ) {
      if (s.ySpeed != -1) {
        upDownS.play();
        s.dir(0, 1);
      }
    } else if (
      keyCode === LEFT_ARROW ||
      keyCode === 65 ||
      (event && event.direction == 2)
    ) {
      if (s.xSpeed != 1) {
        leftRightS.play();
        s.dir(-1, 0);
      }
    } else if (
      keyCode === RIGHT_ARROW ||
      keyCode === 68 ||
      (event && event.direction == 4)
    ) {
      if (s.xSpeed != -1) {
        leftRightS.play();
        s.dir(1, 0);
      }
    }
  }
}
