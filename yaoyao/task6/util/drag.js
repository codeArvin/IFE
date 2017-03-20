// target 拖拽目标id， moveTarget 移动目标id
// how to use
// drag(targetId, moveTargetId)
// targetId: 触发拖拽操作的区域id
// moveTargetId: 拖拽需要移动的区域id
var drag = function(target, moveTarget) {
  target = document.getElementById(target);
  moveTarget = document.getElementById(moveTarget);

  moveTarget.style.position = 'absolute';
  var fnDown = function(e) {
    e = e || window.event;
    var disX = e.clientX - moveTarget.offsetLeft,
        disY = e.clientY - moveTarget.offsetTop;
    target.onmousemove = function(e) {
      e = e || window.event;
      fnMove(e, disX, disY);
    };

    target.onmouseup = function() {
      console.log('mouseup');
      target.onmousemove = null;
      target.onmouseup = null;
    };
    console.log('mousedown');
  };

  var fnMove = function(e, disX, disY) {
    var l = e.clientX - disX,
        t = e.clientY - disY,
        winW = document.body.offsetWidth || document.documentElement.offsetWidth,
        winH = document.body.offsetHeight || document.documentElement.offsetHeight,
        maxW = winW - moveTarget.offsetWidth,
        maxH = winH - moveTarget.offsetHeight;

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
