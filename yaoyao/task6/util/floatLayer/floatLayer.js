// API
// 1- var floatLayer = new FloatLayer(info)
// 2- 传入info来定义浮出层的头部，主体，两个按钮的文字部分和其他配置信息
      // info = {
      //   'text': {
      //     'title': '这是头部',
      //     'body': '这是主体部分',
      //     'buttons': {
      //       'submit': '确认',
      //       'cancel': '取消'
      //     }
      //   },
      //   'config': {
      //     'scroll': false
      //   }
      // };
// 3- this.show() 显示浮出层
// 4- this.remove() 移除浮出层
// warning: 可能会发生id命名冲突产生bug
var FloatLayer = function(info) {
  var floatLayer = '<div id="floatLayer">' +
     '<div id="head">' + info.text.title + '</div>' +
     '<div class="body">' + info.text.body + '</div>' +
     '<div class="buttons">' +
       '<button id="submit">' + info.text.buttons.submit + '</button>' +
       '<button id="cancel">' + info.text.buttons.cancel + '</button>' +
     '</div>' +
   '</div>' +
   '<div id="layer"></div>';

  var body = document.body;
  var box = document.createElement('DIV');
  box.id = 'box';
  box.innerHTML = floatLayer;
  body.appendChild(box);
  var that = this;
  var layer = document.getElementById('layer');
  layer.addEventListener('click', function() {
    that.remove();
  });

  var boxNode = document.getElementById('box');
  this.show = function() {
    body.style.overflow = info.config.scroll ? 'auto' : 'hidden';
    boxNode.style.display = 'block';
  };

  this.remove = function() {
    body.style.overflow = !info.config.scroll ? 'auto' : 'hidden';
    boxNode.style.display = 'none';
  };
};
