class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];

    this.eat = function (pos) {
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total++;
        return true;
      } else {
        return false;
      }
    };

    this.dir = function (x, y) {
      this.xSpeed = x;
      this.ySpeed = y;
    };

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

    this.update = function () {
      if (this.total === this.tail.length) {
        for (var i = 0; i < this.tail.length - 1; i++) {
          this.tail[i] = this.tail[i + 1];
        }
      }
      this.tail[this.total - 1] = createVector(this.x, this.y);

      this.x = this.x + this.xSpeed * scl;
      this.y = this.y + this.ySpeed * scl;
    };

    this.show = function () {
      fill(223, 229, 239);
      for (var i = 0; i < this.tail.length; i++) {
        rect(this.tail[i].x, this.tail[i].y, scl, scl);
      }

      rect(this.x, this.y, scl, scl);
    };
  }
}
