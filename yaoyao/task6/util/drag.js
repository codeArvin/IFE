// target 拖拽目标id， moveTarget 移动目标id
// how to use
// drag(targetId, moveTargetId)
// targetId: 触发拖拽操作的区域id
// moveTargetId: 拖拽需要移动的区域id
// ----- 注意 ------
// 会给moveTarget节点添加user-select属性，值为none

var drag = function(target, moveTarget) {
  target = document.getElementById(target);
  target.style.cursor = 'all-scroll';
  moveTarget = document.getElementById(moveTarget);

  //拖拽区域可以选中文字会产生影响，所以设置无法选中文字
  ['-moz-','-webkit-','-ms-','-khtml-',''].map(function(prefix) {
    moveTarget.style[prefix + 'user-select'] = 'none';
  });

  // 设置position:absolute
  moveTarget.style.position = 'absolute';


  var fnDown = function(e) {
    e = e || window.event;
    var disX = e.clientX - moveTarget.offsetLeft,
        disY = e.clientY - moveTarget.offsetTop;

    // 防止如果其他功能也设置了onmousemove和onmouseup,先保存起来，drag结束再重新恢复
    var previousOnmousemove = document.onmousemove,
        previousOnmouseup = document.onmouseup;

    document.onmousemove = function(e) {
      e = e || window.event;
      fnMove(e, disX, disY);
    };

    document.onmouseup = function() {
      console.log('mouseup');
      document.onmousemove = previousOnmousemove;
      document.onmouseup = previousOnmouseup;
    };
    console.log('mousedown');
  };

  var fnMove = function(e, disX, disY) {
    var l = e.clientX - disX,
        t = e.clientY - disY,
        // 这里踩了一个大坑，以为document.documentElement.clientHeight和document.body.clientHeight是一样的
        // 都是获取浏览器视窗的高度。但不一样，
        // document.documentElement.clientHeight获取浏览器窗口高度
        // document.body.clientHeight 获取body的高度，这时如果body高度比较低就会出错了
        // 所以把document.documentElement.clientHeight放到前面
        winW = document.documentElement.clientWidth||document.body.clientWidth,
    		winH = document.documentElement.clientHeight||document.body.clientHeight,
        maxW = winW - moveTarget.offsetWidth,
        maxH = winH - moveTarget.offsetHeight;

        // console.log(document.documentElement.clientHeight + ' ' + document.body.clientHeight);

    if (l < 0) {
      l = 0;
    } else if (l > maxW) {
      l = maxW;
    }
    if (t < 0) {
      t = 0;
    } else if (t > maxH) {
      t = maxH;
    }

    moveTarget.style.left = l + 'px';
    moveTarget.style.top = t + 'px';
  };
  target.onmousedown = fnDown;
};
