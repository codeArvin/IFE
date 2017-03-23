var div = document.getElementById('root'),
    menu = document.getElementById('customMenu');
    liArr = menu.getElementsByTagName('LI');

for (var i = 0; i < liArr.length; i++) {
  (function(li){
    li.addEventListener('click', function() {
      menu.style.display = 'none';
      var text = li.innerText;
      alert('菜单选项的名称是：' + text);
    });
  })(liArr[i]);
}

div.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  e.returnValue = false;

  menu.style.display = 'block';

  var width = menu.offsetWidth,
      height = menu.offsetHeight,
      X = e.clientX,
      Y = e.clientY,
      winW = document.documentElement.clientWidth || document.body.clientWidth,
      winH = document.documentElement.clientHeight || document.body.clientHeight,
      x, y;

  if (X + width > winW) {
    x = X - width;
  } else {
    x = X;
  }

  if (Y + height > winH) {
    y = Y - height;
  } else {
    y = Y;
  }

  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
});

div.addEventListener('click', function() {
  menu.style.display = 'none';
});
