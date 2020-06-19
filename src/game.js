// instance variables
var s;
var scl = 20;
var token;

// sets up the game
function setup() {
  // makes the board for the game and sets the speed
  createCanvas(scl * 30, scl * 30);
  frameRate(scl / 2);

  // initializes the snake and first token
  s = new Snake();
  pickLocation();

  // starting location of the snake
  s.x = width / 2;
  s.y = height / 2;
}

// picks the location to place a token at the start and when one is eaten
function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
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

// resets the snake's size and amount of token's collected
function gameOver() {
  // will hopefully say game over at some point
  wait(3000);

  // restart size
  s.total = 0;
  s.tail = [];

  // restart speed
  s.xSpeed = 0;
  s.ySpeed = 0;

  // restart location
  s.x = width / 2;
  s.y = height / 2;
}

// checks if the game is over if the snake collides with itself or the walls
function checkGameOver() {
  if (s.x < 0 || s.y > width - scl) {
    gameOver();
    return true;
  } else if (s.x < 0 || s.y > height - scl) {
    gameOver();
    return true;
  } else if (s.snakeCollision()) {
    gameOver();
    return true;
  }
  return false;
}

function draw() {
  background(26, 27, 32);

  // draws new tokens when previous one eaten
  if (s.eat(token)) {
    pickLocation();
  }

  checkGameOver();
  s.update();
  s.show();

  fill(255, 100, 0);
  rect(token.x, token.y, scl, scl);
}

// movements of the snake available
function keyPressed() {
  if (!checkGameOver()) {
    if (keyCode === UP_ARROW) {
      if (s.ySpeed != 1) {
        s.dir(0, -1);
      }
    } else if (keyCode === DOWN_ARROW) {
      if (s.ySpeed != -1) {
        s.dir(0, 1);
      }
    } else if (keyCode === LEFT_ARROW) {
      if (s.xSpeed != 1) {
        s.dir(-1, 0);
      }
    } else if (keyCode === RIGHT_ARROW) {
      if (s.xSpeed != -1) {
        s.dir(1, 0);
      }
    }
  }
}
