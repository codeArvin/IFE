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

// 将多叉树渲染到界面上
var createDiv = function(key) {
  var div = document.createElement('DIV');
  div.innerText = key;
  div.id = key;
  div.className = 'flex';
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
