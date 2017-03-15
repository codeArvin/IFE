// BST 二叉搜索树：只允许在左侧节点储存比父节点小的值，右侧节点储存比父节点大的值
// API
// 1- insert(key) 插入值为key的节点
// 2- search(key) 查找值为key的节点，返回true or false
// 3- inOrderTraverse(callback) 中序遍历执行callback
// 4- preOrderTraverse(callback) 先序遍历执行callback
// 5- postOrderTraverse(callback) 后序遍历执行callback
// 6- minKey() 返回最小节点的值
// 7- minNode() 返回最小节点
// 8- maxKey() 返回最大节点的值
// 9- maxNode() 返回最大节点
// 10- remove(key) 移除值为key的节点
var BinarySearchTree = function() {
  var Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  };

  var root = null;

  // getRoot 返回root
  this.getRoot = function() {
    return root;
  }

  // insert a Node 返回其父元素key
  var insertNode = function(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else if (newNode.key > node.key) {
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    } else {
      return ;
    }
  }

  this.insert = function(key) {
    var newNode = new Node(key);

    if (root === null) {
      root = newNode;
    } else {
      insertNode(root, newNode);
    }
  };

  // inOrderTraverse
  var inOrderTraverseNode = function(node, callback) {
    if (node !== null) {
      inOrderTraverseNode(node.left, callback);
      callback(node.key);
      inOrderTraverseNode(node.right, callback);
    }
  }

  this.inOrderTraverse = function(callback) {
    inOrderTraverseNode(root, callback);
  };

  // preOrderTraverse
  var preOrderTraverseNode = function(node, callback) {
    if (node !== null) {
      callback(node.key);
      preOrderTraverseNode(node.left, callback);
      preOrderTraverseNode(node.right, callback);
    }
  };

  this.preOrderTraverse = function(callback) {
    preOrderTraverseNode(root, callback);
  };

  // postOrderTraverse
  var postOrderTraverseNode = function(node, callback) {
    if (node !== null) {
      postOrderTraverseNode(node.left, callback);
      postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  };

  this.postOrderTraverse = function(callback) {
    postOrderTraverseNode(root, callback);
  };

  // minNode
  var getMinNode = function(node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node;
    }
    return null
  };

  this.minNode = function() {
    return getMinNode(root);
  }

  this.minKey = function() {
    return getMinNode(root).key;
  };

  // maxNode
  var getMaxNode = function(node) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right;
      }
      return node;
    }
    return null;
  };

  this.maxNode = function() {
    return getMaxNode(root);
  }

  this.maxKey = function() {
    return getMaxNode(root).key;
  };

  // searchNode
  var searchNode = function(node, key) {
    if (node === null) {
      return false;
    }
    if (key < node.key) {
      return searchNode(node.left, key);
    } else if (key > node.key) {
      return searchNode(node.right, key);
    } else {
      return true;
    }
  };

  this.search = function(key) {
    return searchNode(root, key);
  };

  // remove a node
  var removeNode = function(node, key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = removeNode(node.left, key);

      return node;
    } else if (key > node.key) {
      node.right = removeNode(node.right, key);

      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      } else if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      } else {
        var minRightKey = getMinNode(node.right).key;
        node.key = minRightKey;
        node.right = removeNode(node.right, minRightKey);
        return node;
      }
    }
  };

  this.remove = function(key) {
    root = removeNode(root, key);
  };
};

// module.exports = BinarySearchTree;

// test code
// var tree = new BinarySearchTree();
// tree.insert(11);
// tree.insert(7);
// tree.insert(15);
// tree.insert(5);
// tree.insert(3);
// tree.insert(9);
// tree.insert(8);
// tree.insert(10);
// tree.insert(13);
// tree.insert(12);
// tree.insert(14);
// tree.insert(20);
// tree.insert(18);
// tree.insert(25);
// tree.insert(6);
// var print = function(key) {
//   console.log(key);
// }
// console.log('inOrderTraverse');
// tree.inOrderTraverse(print);
// console.log('preOrderTraverse');
// tree.preOrderTraverse(print);
// console.log('postOrderTraverse');
// tree.postOrderTraverse(print);
// console.log('insert 6');
// tree.insert(6);
// tree.inOrderTraverse(print);
// console.log('remove 6');
// tree.remove(6);
// tree.inOrderTraverse(print);
// console.log('min Node: '+tree.minNode());
// console.log('min Key: '+tree.minKey());
// console.log('max Node: '+tree.maxNode());
// console.log('max Key: '+tree.maxKey());
// console.log('search 100: '+tree.search(100));
// console.log('search 13: '+tree.search(13));
