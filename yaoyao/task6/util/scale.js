// scale
// how to use
// scale(target.id, config);
// target.id: 需要添加拖拽缩放功能的元素id
// config: 是一个对象，格式如下
// -- range: 必须 target的宽高范围，类型为number
// -- canEdge: 必须 target哪几个边可以进行拖拽，有八个方位，如果数组为空则默认八个方位都可以拖拽
// -- s: 可选，不设置默认为5 灵敏度值，鼠标在边界多少范围触发可以拖拽，默认为5
// config = {
//   'range': [minWidth, maxWidth, minHeight, maxHeight],
//   'canEdge': ['n','ne','e','se','s','sw','w','nw'],
//   's': 5
// }
// 注意！！！！！
// 使用scale需要对进行拖拽缩放的节点进行某些设置，防止某些不应该出现的现象
// 1-- position: absolute; 我们需要设置left和top来实现某些拖拽的实现
// 2-- margin: 0; 存在margin时候如果拖拽需要改变left和top会出现不好的现象
// 3-- user-select: none; 如果在拖拽的时候选中了文字会导致onmouseup出现些问题
// 4-- display不为none





// 设为全局，方便访问
// edge: 当前鼠标在哪个边界; nowEdge: 开始拖拽的时候鼠标所在边界
// range: 拖拽放大限制范围; s: target边界范围的灵敏度值
// canEdge: 哪些边需要有拖拽功能
var edge, nowEdge, range = {}, s = 5,
    canEdge = ['n','ne','e','se','s','sw','w','nw'];

// 用来保存拖拽最初的target四边位置信息
var targetInfo = {
  't': 0,
  'r': 0,
  'b': 0,
  'l': 0
  // 'mT': 0,
  // 'mR': 0,
  // 'mB': 0,
  // 'mL': 0
};

// 判断数值是否在范围内，包含边界
var isRange = function(value, min, max) {
  if (value >= min && value <= max) {
    return true;
  } else {
    return false;
  }
};

// 判断当前鼠标在target的哪个边界位置
var whichEdge = function(l, t, tW, tH, tL, tT) {
  var horizontalDiff = l - tL,
      verticalDiff = t - tT;

  var filterEdge;

  // var out = 'horizontalDiff: ' + horizontalDiff + ', ' + 'verticalDiff: ' + verticalDiff;
  // console.log(out);

  // return 的值采用东南西北的简写，方便后面指定cursor的值
  // 这里可以考虑加一个灵敏度
  // 加入灵敏度 sensitivity
  if (isRange(horizontalDiff, -s, s)) {
    if (isRange(verticalDiff, -s, s)) {
      filterEdge = 'nw';
    } else if (isRange(verticalDiff, s + 1, tH - s)) {
      filterEdge = 'w';
    } else if (isRange(verticalDiff, tH - s + 1, tH + s)) {
      filterEdge = 'sw';
    } else {
      filterEdge = 'none';
    }
  } else if (isRange(horizontalDiff, s + 1, tW - s)) {
    if (isRange(verticalDiff, -s, s)) {
      filterEdge = 'n';
    } else if (isRange(verticalDiff, tH - s + 1, tH + s)) {
      filterEdge = 's';
    } else {
      filterEdge = 'none';
    }
  } else if (isRange(horizontalDiff, tW - s + 1, tW + s)) {
    if (isRange(verticalDiff, -s, s)) {
      filterEdge = 'ne';
    } else if (isRange(verticalDiff, s + 1, tH - s)) {
      filterEdge = 'e';
    } else if (isRange(verticalDiff, tH - s + 1, tH + s)) {
      filterEdge = 'se';
    } else {
      filterEdge = 'none';
    }
  } else {
    filterEdge = 'none';
  }

  if (canEdge.indexOf(filterEdge) === -1) {
    filterEdge = 'none';
  }

  return filterEdge;
};

// 目前元素不能添加margin，不然会出错
// 还没想出比较好的解决方法,所以一开始会将节点margin设为0
// 传入range，target方法缩小的范围，minWidth,minHeight不可小于0，包含边界值
// 类型为number
// range = [minWidth, maxWidth, minHeight, maxHeight]
var scale = function(target, config) {
  target = document.getElementById(target);

  // 设置range 和 canEdge
  range = {
    'width': [config.range[0], config.range[1]],
    'height': [config.range[2], config.range[3]]
  };

  canEdge = config.canEdge.length === 0 ? canEdge : config.canEdge;

  s = config.s || s;

  // 对需要进行拖拽缩放的节点进行某些设置，防止某些不应该出现的现象
  // position: absolute; 我们需要设置left和top来实现某些拖拽的实现
  // margin: 0; 存在margin时候如果拖拽需要改变left和top会出现不好的现象
  // user-select: none; 如果在拖拽的时候选中了文字会导致onmouseup出现些问题
  var left = target.offsetLeft,
      top = target.offsetTop;

  target.style.position = 'absolute';
  target.style.left = left + 'px';
  target.style.top = top + 'px';

  target.style.margin = 0;

  // -moz-user-select: none; /*火狐*/
  // -webkit-user-select: none; /*webkit浏览器*/
  // -ms-user-select: none; /*IE10*/
  // -khtml-user-select: none; /*早期浏览器*/
  // user-select: none;
  ['-moz-','-webkit-','-ms-','-khtml-',''].map(function(prefix) {
    target.style[prefix + 'user-select'] = 'none';
  });

  // 最开始在这里获取target left和right，若第一次target隐藏就会出现问题，left和top始终都不会变了
  // 所以left和top的检测放在onmousemove函数里，虽然可能会浪费效率
  // 又一次被自己的智商折服。。。。。
  // 应该随时检测target的left、top、width、height，
  // 如果target最开始设置none的时候他的width、height、offsetLeft、offsetTop都是零，
  // 所以不能在这里进行检测，应该都在onmousemove函数里进行检测！！！
  // var tW = target.offsetWidth,
  //     tH = target.offsetHeight;
  var shouldScale = false;

  var setAttr = function(obj) {
    for (var key in obj) {
      if (key === 'width' || key === 'height') {
        if (!isRange(obj[key], range[key][0], range[key][1])) {
          return;
        }
      }
      target.style[key] = obj[key] + 'px';
    }
  };

  document.onmousedown = function () {
    shouldScale = true;
    // 保存鼠标按下时的edge，防止鼠标移动过快无法拖拽放大缩小
    nowEdge = edge;

    // 保存target信息
    var tL = target.offsetLeft,
        tT = target.offsetTop,
        tW = target.offsetWidth,
        tH = target.offsetHeight;
    targetInfo = {
      't': tT,
      'r': tL + tW,
      'b': tT + tH,
      'l': tL
    };
  };

  document.onmouseup = function() {
    shouldScale = false;
    nowEdge = 'none';
  };

  document.onmousemove = function(e) {
    e = e || window.event;
    var l = e.clientX,
        t = e.clientY,
        tL = target.offsetLeft,
        tT = target.offsetTop,
        tW = target.offsetWidth,
        tH = target.offsetHeight;

    edge = whichEdge(l, t, tW, tH, tL, tT);

    target.style.cursor = edge === 'none' ? 'auto' : edge + '-resize';
    if (shouldScale) {
      var top, left, width, height;
      switch (nowEdge) {
        case 'n':
          height = targetInfo.b - t;
          top = t;
          setAttr({
            'height': height,
            'top': top
          });
          break;
        case 'ne':
          width = l - targetInfo.l;
          height = targetInfo.b - t;
          top = t;
          setAttr({
            'width': width,
            'height': height,
            'top': top
          });
          break;
        case 'e':
          width = l - targetInfo.l;
          setAttr({
            'width': width
          });
          break;
        case 'se':
          width = l - targetInfo.l;
          height = t - targetInfo.t;
          setAttr({
            'width': width,
            'height': height
          });
          break;
        case 's':
          height = t - targetInfo.t;
          setAttr({
            'height': height
          });
          break;
        case 'sw':
          width = targetInfo.r - l;
          height = t - targetInfo.t;
          left = l;
          setAttr({
            'width': width,
            'height': height,
            'left': left
          });
          break;
        case 'w':
          width = targetInfo.r - l;
          left = l;
          setAttr({
            'width': width,
            'left': left
          });
          break;
        case 'nw':
          width = targetInfo.r - l;
          height = targetInfo.b - t;
          top = t;
          left = l;
          setAttr({
            'width': width,
            'height': height,
            'left': left,
            'top': top
          });
          break;
      }
    }
  };
};
