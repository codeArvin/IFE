// 基于上次任务的这次任务感觉数据逻辑方面比较混乱，有时间好好重构一下
// 工具函数
var addHandle = function(target) {
  target.addEventListener('click', function() {
    var action = {
      type: 'count',
      number: target.innerHTML,
      target: target
    }
    func(action);
  })
};

var func = function(action) {
  var ul = document.getElementById('ul');
  // 限制队列数量最多为60
  if (ul.childNodes.length >= 60) {
    alert('队列已满！(max 60)');
    return;
  }
  if (action.number) {
    var li = document.createElement('LI');
    li.style.height = action.number + 'px';
    li.innerHTML = action.number;
    li.id = action.number;
    addHandle(li);
  }
  switch (action.type) {
    case 'count':
      ul.removeChild(action.target);
      setTimeout(function() {
        alert('删除元素高度为：' + action.number);
      }, 200);
      console.log('count');
      break;
    case 'lInsert':
      var first = ul.firstChild;
      ul.insertBefore(li, ul.firstChild);
      console.log('lInsert');
      break;
    case 'rInsert':
      ul.appendChild(li);
      console.log('rInsert');
      break;
    case 'lOut':
      if (!ul.hasChildNodes()) {
        setTimeout(function() {
          alert('no number exist below');
        }, 200);
        return;
      }
      var text = ul.firstChild.style.height;
      ul.removeChild(ul.firstChild);
      setTimeout(function() {
        alert('删除元素高度为：' + text);
      }, 200);
      console.log('lOut');
      break;
    case 'rOut':
      if (!ul.hasChildNodes()) {
        setTimeout(function() {
          alert('no number exist below');
        }, 200);
        return;
      }
      var text = ul.lastChild.style.height;
      ul.removeChild(ul.lastChild);
      setTimeout(function() {
        alert('删除元素高度为：' + text);
      }, 200);
      console.log('rOut');
      break;
    default:
      break;
  }
}

// 为li和button绑定click事件
var lInsertBtn = document.getElementById('lInsert'),
    rInsertBtn = document.getElementById('rInsert'),
    lOutBtn = document.getElementById('lOut'),
    rOutBtn = document.getElementById('rOut'),
    sort = document.getElementById('sort'),
    li = document.getElementById('ul').getElementsByTagName('li');

for (var i = 0; i < li.length; i++) {
  // 为初始li赋予高度值，和id
  var number = Math.floor(Math.random() * 91 + 10);
  li[i].style.height = number + 'px';
  li[i].innerHTML = number;
  li[i].id = number;
  addHandle(li[i]);
}

lInsertBtn.addEventListener('click', function() {
  var input = document.getElementById('input');
  var number = input.value;
  input.value = '';
  if (isNaN(number) || number === '') {
    alert('Please input a number');
    return;
  }
  // 输入限制10-100数字
  if (number < 10 || number > 100) {
    alert('number valid 10 to 100!');
    return;
  }
  var action = {
    type: 'lInsert',
    number: number
  }
  func(action);
});

rOutBtn.addEventListener('click', function() {
  var action = {
    type: 'rOut',
    number: false
  }
  func(action);
});

rInsertBtn.addEventListener('click', function() {
  var input = document.getElementById('input');
  var number = input.value;
  input.value = '';
  if (isNaN(number)  || number === '') {
    alert('Please input a number');
    return;
  }
  if (number < 10 || number > 100) {
    alert('number valid 10 to 100!');
    return;
  }
  var action = {
    type: 'rInsert',
    number: number
  }
  func(action);
});

lOutBtn.addEventListener('click', function() {
  var action = {
    type: 'lOut',
    number: false
  }
  func(action);
});

// 排序可视化
// 最初的想法是在每次排序进行元素交换的时候设置setTimeout交换don元素，使用了闭包，在元素个数小的时候可以，但多的时候就会出错，目前还没想出来原因
var bubbleSort = function() {
  var li = document.getElementById('ul').getElementsByTagName('li');
  var liArr = [];
  var snapshoot = [];
  for (var i = 0; i < li.length; i++) {
    liArr.push(li[i].innerHTML);
  }
  for (var m = liArr.length; m > 0; m--) {
    for (var n = 0; n < m; n++) {
      if (liArr[n-1] > liArr[n]) {
        var temp = liArr[n-1];
        liArr[n-1] = liArr[n];
        liArr[n] = temp;
        // 将每次交换后的数组加入快照数组
        // 第一次是直接push数组的，但是会出问题，push参数不能为数组？？？后来改为json的方式
        snapshoot.push(JSON.parse(JSON.stringify(liArr)));
      }
    }
  }
  // 排序后返回快照数组
  return snapshoot;
}

sort.addEventListener('click', function() {
  // 将render放在函数内定义以便可以访问到timer
  var render = function(snapshoot) {
      var snap = snapshoot.shift();
      var html = '';
      var ul = document.getElementById('ul');
      var li = ul.getElementsByTagName('LI');
      snap.map(function(li) {
        html += '<li id="' + li + '" style="height: ' + li + 'px;">' + li + '</li>';
      });
      ul.innerHTML = html;
      console.log(snap);
      if (snapshoot.length === 0 ) {
        clearInterval(timer);
        // 在重新排序后为每个元素绑定click事件，最开始忘记了。。。。
        for (var i = 0; i < li.length; i++) {
          addHandle(li[i]);
        }
      }
  }

  var snapshoot = bubbleSort();
  var timer = setInterval(function() {
    render(snapshoot);
  }, 500);
});
