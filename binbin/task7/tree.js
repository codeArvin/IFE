// 二叉树初始化并插入值
var tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

var createDiv = function(key) {
  var div = document.createElement('DIV');
  div.innerHTML = '<span>'+key+'</span>';
  div.id = key;
  div.className = 'flex';
  return div;
};

// 将二叉树内容渲染到页面上
var render = function(node) {
  var parent = document.getElementById(node.key);
  if (node.left !== null) {
    var left = createDiv(node.left.key);
    parent.appendChild(left);
    render(node.left);
  }
  if (node.right !== null) {
    var right = createDiv(node.right.key);
    parent.appendChild(right);
    render(node.right);
  }
};

var renderTree = function() {
  var root = tree.getRoot();
  var rootDiv = createDiv(root.key);
  var container = document.getElementById('container');
  container.appendChild(rootDiv);
  render(root);
};
// 渲染
renderTree();

// 绑定事件，设定延迟器
['inOrder', 'preOrder', 'postOrder'].map(function(id) {
  var button = document.getElementById(id);
  button.addEventListener('click', function() {
    var n = 1;
    console.log(id + 'Traverse:')
    tree[id+'Traverse'](function(key) {
      var div = document.getElementById(key);
      setTimeout(function() {
        console.log(key);
        div.style.backgroundColor = 'red';
        setTimeout(function() {
          div.style.backgroundColor = 'white';
        }, 1000);
      }, (n++)*1000);
    });
  });
});
