class Snake {
  constructor() {
    // instance variables
    this.x = 0;
    this.y = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.score = 0;
    this.tail = [];

    // checks to see if the snake collected the token
    this.eat = function (pos) {
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.score++;
        return true;
      } else {
        return false;
      }
    };

    // handles the direction in which the snake is moving
    this.dir = function (x, y) {
      this.xSpeed = x;
      this.ySpeed = y;
    };

    // checks to see if the snake ran into itself
    this.snakeCollision = function () {
      for (var i = 0; i < this.tail.length; i++) {
        var pos = this.tail[i];
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
          return true;
        }
      }
      return false;
    };

    // lengthens the snake once a token is collected
    this.update = function () {
      if (this.score === this.tail.length) {
        for (var i = 0; i < this.tail.length - 1; i++) {
          this.tail[i] = this.tail[i + 1];
        }
      }
      this.tail[this.score - 1] = createVector(this.x, this.y);

      this.x = this.x + this.xSpeed * scl;
      this.y = this.y + this.ySpeed * scl;
    };

    // representation of the snake on the board
    this.show = function () {
      fill(223, 229, 239);
      for (var i = 0; i < this.tail.length; i++) {
        rect(this.tail[i].x, this.tail[i].y, scl, scl);
      }

      rect(this.x, this.y, scl, scl);
    };
  }
}
