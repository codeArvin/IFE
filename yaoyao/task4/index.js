// 不知道为什么，这个任务用了好长时间

var headDirection = 'top';
var square = document.getElementById('square');

var squareRotate = function(deg) {
  switch (deg) {
    case 0:
      headDirection = 'top';
      break;
    case 90:
      headDirection = 'right';
      break;
    case 180:
      headDirection = 'bottom';
      break;
    case -90:
      headDirection = 'left';
      break;
  }
  //console.log(headDirection);
  square.style.transform = 'rotate(' + deg + 'deg)';
};

var rotate = function(direction) {
  switch (headDirection) {
    case 'top':
      switch (direction) {
        case 'tLeft':
          squareRotate(-90);
          break;
        case 'tRight':
          squareRotate(90);
          break;
        case 'tBack':
          squareRotate(180);
          break;
      }
      break;
    case 'right':
      switch (direction) {
        case 'tLeft':
          squareRotate(0);
          break;
        case 'tRight':
          squareRotate(180);
          break;
        case 'tBack':
          squareRotate(-90);
          break;
      }
      break;
    case 'bottom':
      switch (direction) {
        case 'tLeft':
          squareRotate(90);
          break;
        case 'tRight':
          squareRotate(-90);
          break;
        case 'tBack':
          squareRotate(0);
          break;
      }
      break;
    case 'left':
      switch (direction) {
        case 'tLeft':
          squareRotate(180);
          break;
        case 'tRight':
          squareRotate(0);
          break;
        case 'tBack':
          squareRotate(90);
          break;
      }
      break;
  }
};

// 最初采用的是translate,但后来发现实现不了
var move = function() {
  var top = square.style.top,
      left = square.style.left;
  top = top === '' ? 1 : parseInt(top);
  left = left === '' ? 1 : parseInt(left);
  switch (headDirection) {
    case 'top':
      top = top - 52;
      if (top < 0 || top > 468) return;
      square.style.top = top + 'px';
      break;
    case 'right':
      left = left + 52;
      if (left < 0 || left > 468) return;
      square.style.left = left + 'px';
      // console.log(left);
      // console.log(square.style.left);
      break;
    case 'bottom':
      top = top + 52;
      if (top < 0 || top > 468) return;
      square.style.top = top + 'px';
      break;
    case 'left':
      left = left - 52;
      if (left < 0 || left > 468) return;
      square.style.left = left + 'px';
      break;
  }
};

var button = document.getElementById('button'),
    input = document.getElementById('input');

['tLeft', 'tRight', 'tBack', 'go'].map(function(id) {
  var btn = document.getElementById(id);
  btn.addEventListener('click', function() {
    if (id === 'go') {
      move();
    } else {
      rotate(id);
    }
  });
});

button.addEventListener('click', function() {
  var value = input.value;
  input.value = '';
  switch (value) {
    case 'GO':
      move();
      break;
    case 'TUN LEF':
      rotate('tLeft');
      break;
    case 'TUN RIG':
      rotate('tRight');
      break;
    case 'TUN BAC':
      rotate('tBack');
      break;
  }
});
