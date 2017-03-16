var multiwayTree = function() {
  var Node = function(key) {
    this.id = key;
    this.name = key;
    this.parentId = null;
    this.children = [];
  };

  var root = null;

  // insert a node
  var insertNode = function(node, newNode) {
    if (node.id === newNode.parentId) {
      node.children.push(newNode);
      console.log(newNode.id + ' addto ' + node.id);
    } else {
      for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
        insertNode(child, newNode);
      }
    }
  };

  this.insert = function(parentId, key) {
    var newNode = new Node(key);
    newNode.parentId = parentId;

    if (root === null) {
      root = newNode;
    } else {
      insertNode(root, newNode);
    }
  };

  // recursive traverse
  var recursiveTraverseNode = function(node, callback) {
    if (!node) return;
    callback(node);
    for(var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      recursiveTraverseNode(child, callback);
    }
  };

  this.recursiveTraverse = function(callback) {
    recursiveTraverseNode(root, callback);
  }

  // BFS Breadth First Search
  this.bfsTraverse = function(callback) {
    var queue = [], item;
    if (!root) return;
    callback(root);
    if (root.children.length) {
      queue = queue.concat(root.children);
    }

    while (queue.length) {
      item = queue.shift();
      callback(item);
      if (item.children.length) {
        queue = queue.concat(item.children);
      }
    }
  }

  // DFS Depth First Search
  this.dfsTraverse = function(callback) {
    var stack = [], item;
    if (!root) return;
    callback(root);
    if (root.children.length) {
      stack = stack.concat(root.children);
    }
    while (stack.length) {
      item = stack.pop();
      callback(item);
      if (item.children.length) {
        var children = item.children;
        for (var i = 0; i < children.length; i++) {
          // 这里出错了，unshift方法是直接修改原数组的！！！！
          // 而concat不修改原数组，拼接的数组作为返回值返回！！！！
          // stack = stack.unshift(children[i]);
          stack.push(children[i]);
        }
      }
    }
  }

  // getRoot
  this.getRoot = function() {
    return root;
  }
}

// var mt = new multiwayTree();
// mt.insert(null, 'super');
// mt.insert('super', 'car');
// mt.insert('super', 'Note');
// mt.insert('super', 'Fish');
// mt.insert('car', 'Apple');
// mt.insert('car', 'Phone');
// mt.insert('car', 'Hello');
// mt.insert('Apple', 'Pear');
// mt.insert('Apple', 'Pig');
// mt.insert('Apple', 'Cola');
// mt.insert('Apple', 'Soccer');
// mt.insert('Hello', 'Book');
// mt.insert('Hello', 'School');
// mt.insert('Note', 'Human');
// mt.insert('Note', 'Program');
// mt.insert('Human', 'Code');
// mt.insert('Human', 'Operate');
// mt.insert('Human', 'Man');
// mt.insert('Program', 'Bement');
// mt.insert('Program', 'Glass');
// mt.insert('Bement', 'Cat');
//
// console.log(mt.getRoot());
//
// mt.recursiveTraverse(function(key) {
//   console.log(key);
// });
