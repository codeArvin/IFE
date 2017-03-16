// 全局变量，当前所选中元素
var select = '';

// 初始化多叉树
var mt = new multiwayTree();
mt.insert(null, 'super');
mt.insert('super', 'car');
mt.insert('super', 'Note');
mt.insert('super', 'Fish');
mt.insert('car', 'Apple');
mt.insert('car', 'Phone');
mt.insert('car', 'Hello');
mt.insert('Apple', 'Pear');
mt.insert('Apple', 'Pig');
mt.insert('Apple', 'Cola');
mt.insert('Apple', 'Soccer');
mt.insert('Hello', 'Book');
mt.insert('Hello', 'School');
mt.insert('Note', 'Human');
mt.insert('Note', 'Program');
mt.insert('Human', 'Code');
mt.insert('Human', 'Operate');
mt.insert('Human', 'Man');
mt.insert('Program', 'Bement');
mt.insert('Program', 'Glass');
mt.insert('Bement', 'Cat');

// 清空所有颜色
var clear = function() {
  var divs = document.getElementsByTagName('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].style.backgroundColor = 'white';
  }
};

// 将多叉树渲染到界面上
var createDiv = function(key) {
  var div = document.createElement('DIV');
  div.innerText = key;
  div.id = key;
  div.className = 'flex';
  // 绑定点击时间
  div.addEventListener('click', function(e) {
    e.stopPropagation();
    clear();
    div.style.backgroundColor = 'pink';
    select = div.id;
  });
  return div;
};
var renderNode = function(node) {
  if(!node || !node.children.length) return;
  var parent = document.getElementById(node.id);
  for (var i = 0; i < node.children.length; i++) {
    var child = node.children[i];
    var div = createDiv(child.id);
    parent.appendChild(div);
    renderNode(child);
  }
};

var render = function() {
  var root = mt.getRoot();
  var container = document.getElementById('container');
  // 在重绘页面时候发现的问题，每次重绘前要清空页面
  // 清空页面
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
  var rootDiv = createDiv(root.id);
  container.appendChild(rootDiv);
  renderNode(root);
};
// 渲染
render();

// 遍历（递归，深度，广度），绑定事件
['recursiveTraverse', 'dfsTraverse', 'bfsTraverse'].map(function(id) {
  var button = document.getElementById(id);
  button.addEventListener('click', function() {
    var n = 1;
    mt[id](function(node) {
      var div = document.getElementById(node.id);
      setTimeout(function() {
        div.style.backgroundColor = 'red';
        setTimeout(function() {
          div.style.backgroundColor = 'white';
        }, 500);
      }, (n++)*500);
    });
  });
});



// 遍历搜索(递归，深度，广度)，绑定事件
['recursiveTraverse', 'dfsTraverse', 'bfsTraverse'].map(function(id) {
  var searchButton = document.getElementById(id + 'Search');
  searchButton.addEventListener('click', function() {
    var n = 1;
    // 由于我们不能停止递归，所以设定一个color值，在找到所查询值后改为white,使表面上看起来停止查询了
    var color = 'red';
    var input = document.getElementById('input');
    var searchText = input.value;
    input.value = '';
    if (searchText === '') {
      alert('请输入有效值！');
      return;
    }
    // 动画前清空所有颜色值
    mt[id](function(node) {
      var div = document.getElementById(node.id);
      div.style.backgroundColor = 'white';
    });
    // 当找到查询值的时候将isFind设置成1
    var isFind = 0;
    mt[id](function(node) {
      var div = document.getElementById(node.id);
      setTimeout(function() {
        if (node.id === searchText) {
          isFind = 1;
          color = 'white';
          div.style.backgroundColor = 'orange';
          return;
        }
        div.style.backgroundColor = color;
        setTimeout(function() {
          div.style.backgroundColor = 'white';
        }, 500);
      }, (n++)*500);
    });
    // 不知道如何在前面异步函数结束后才运行后面函数，只好也设置成定时器的形式
    setTimeout(function() {
      if(!isFind) {
        alert('No Match!');
      }
      console.log('I check!');
    }, (++n)*500);

  });
});

// add delete
var addBtn = document.getElementById('add'),
    deleteBtn = document.getElementById('delete'),
    body = document.body,
    panel = document.getElementById('panel');
    
// 在panel区域去除body的click事件
panel.addEventListener('click', function(e) {
  e.stopPropagation();
});

// 当鼠标点击其他区域时，清空颜色，重置select
body.addEventListener('click', function() {
  // 最初是用clear来清空颜色，后来发现如果在遍历的时候点击其他位置会干扰遍历的颜色显示
  // 所以改为判断当前是否有选中元素，有则清空，没有则不清空
  // clear();
  if (select !== '') {
    clear();
    select = '';
    console.log('reset select');
    return;
  }
  return;
});

addBtn.addEventListener('click', function() {
  var addInput = document.getElementById('addInput');
  var addKey = addInput.value;
  addInput.value = '';
  if (addKey === '') {
    alert('请输入要添加元素的Key值');
    return;
  } else if (select === '') {
    alert('请选中要添加子元素的节点');
    return;
  }
  mt.insert(select,addKey);
  select = '';
  render();
});

deleteBtn.addEventListener('click', function() {
  if (!select) {
    alert('请选中一个元素！');
    return;
  }
  mt.delete(select);
  // 重新渲染界面
  render();
});
