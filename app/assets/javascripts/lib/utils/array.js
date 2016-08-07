if (!Array.prototype.flatten) {
  Array.prototype.flatten = function() {
    var len = this.length;
    var arr = [];
    for (var i = 0; i < len; i++) {
      if (this[i] instanceof Array) {
        arr = arr.concat(this[i]);
      } else {
        arr.push(this[i]);
      }
    }

    return arr;
  };
}
