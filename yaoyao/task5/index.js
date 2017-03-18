var deg = 0;
var square = document.getElementById('square');
// 真实输入的指令与函数需要的指令的对应
var translate = {
  'TUN LEF': 'tLeft',
  'TUN RIG': 'tRight',
  'TUN BAC': 'tBack',
  'TRA LEF': 'left',
  'TRA TOP': 'top',
  'TRA RIG': 'right',
  'TRA BOT': 'bottom',
  'MOV LEF': 'mLeft',
  'MOV TOP': 'mTop',
  'MOV RIG': 'mRight',
  'MOV BOT': 'mBottom'
}

// 接收角度，设定旋转角度
var setRotate = function(deg) {
  square.style.transform = 'rotate(' + deg + 'deg)';
};

// type两种absolute和relative
var rotate = function(type, direction) {
  if (type === 'relative') {
    switch (direction) {
      case 'tLeft':
        deg -= 90;
        setRotate(deg);
        break;
      case 'tRight':
        deg += 90;
        setRotate(deg);
        break;
      case 'tBack':
        deg += 180;
        setRotate(deg);
        break;
    }
  } else {
    switch (direction) {
      case 'left':
        deg = -90;
        setRotate(deg);
        break;
      case 'right':
        deg = 90;
        setRotate(deg);
        break;
      case 'top':
        deg = 0;
        setRotate(deg);
        break;
      case 'bottom':
        deg = 180;
        setRotate(deg);
        break;
    }
  }
};

// 最初采用的是translate,但后来发现实现不了
// type两种absolute和relative
var move = function(type, value) {
  var top = parseInt(square.style.top),
      left = parseInt(square.style.left),
      headDirection;

  // 判断移动类型：相对relative或者绝对absolute
  if (type === 'relative') {
    headDirection = deg%360;
    console.log(headDirection);
  } else {
    switch (value) {
      case 'top':
        headDirection = 0;
        break;
      case 'right':
        headDirection = 90;
        break;
      case 'bottom':
        headDirection = 180;
        break;
      case 'left':
        headDirection = -90;
        break;
    }
  }

  // 根据方向移动
  switch (headDirection) {
    case 0:
      top = top - 52;
      if (top < 0 || top > 470) return;
      square.style.top = top + 'px';
      break;
    case 90:
    case -270:
      left = left + 52;
      if (left < 0 || left > 470) return;
      square.style.left = left + 'px';
      break;
    case 180:
    case -180:
      top = top + 52;
      if (top < 0 || top > 470) return;
      square.style.top = top + 'px';
      break;
    case -90:
    case 270:
      left = left - 52;
      if (left < 0 || left > 470) return;
      square.style.left = left + 'px';
      break;
  }
};

// 通过id指派命令
var assign = function(id) {
  switch (id) {
    case 'tLeft':
    case 'tRight':
    case 'tBack':
      rotate('relative', id);
      break;
    case 'left':
    case 'right':
    case 'bottom':
    case 'top':
      move('absolute', id);
      break;
    case 'mLeft':
    case 'mTop':
    case 'mRight':
    case 'mBottom':
      var arr = id.split('');
      arr.shift();
      var value = arr.join('').toLowerCase();
      rotate('absolute', value);
      // 动画时间是1s
      setTimeout(function() {
        move('absolute', value);
      }, 1000);
      break;
    case 'go':
      move('relative');
      break;
  }
};

var button = document.getElementById('button'),
    input = document.getElementById('input');

// 为按钮添加click事件
['tLeft', 'tRight', 'tBack', 'left', 'top', 'bottom', 'right', 'mLeft', 'mTop', 'mRight', 'mBottom', 'go'].map(function(id) {
  var btn = document.getElementById(id);
  btn.addEventListener('click', function() {
    assign(id);
  });
});

// 为指令输入框分配事件
button.addEventListener('click', function() {
  var value = input.value;
  input.value = '';

  assign(translate[value]);
});
