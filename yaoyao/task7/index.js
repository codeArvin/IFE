// 用法 写的很混乱，脑子也很混乱。。。。。
// var table = new Table(arr, fnArr);
// arr: 表格信息的二维数组
// fnArr: 表头对应列的函数数组。
// 对应位置数字含义：0,对应列表头不需要排序功能;1,使用默认排序函数(升序);
// 可以自定义排序函数，放在数组对应列即可。函数参数有两个，
// 第一个为需要排序的对应列信息(不含表头)，第二个为信息对应的行数据，需要返回表格主体信息的二维数组
// 1--- arr = [
//      ['姓名', '语文', '数学', '英语', '总分'],
//      ['小明', 80, 90, 70, 240],
//      ['小红', 90, 60, 90, 240],
//      ['小亮', 60, 100, 70, 230]
//    ];
// 2--- fnArr = [1, 1, 0, 1, sort];
// 3--- sort = function(sortArr, arr) {
//        var len = sortArr.length;
//
//        for (var i = len; i > 0; i--) {
//          for (var j = 0; j < len; j++) {
//            if (sortArr[j] > sortArr[j + 1]) {
//              var temp = sortArr[j];
//              sortArr[j] = sortArr[j + 1];
//              sortArr[j + 1] = temp;
//
//              temp = arr[j];
//              arr[j] = arr[j + 1];
//              arr[j + 1] = temp;
//            }
//          }
//        }
//        return arr;
//      };
var Table = function(arr, fnArr) {
  var arr = arr,
      body = document.body,
      table = document.createElement('TABLE');

  table.id = "sortTable"

  var createTable = function() {
    var thead = '<thead><tr>',
        tbody = '<tbody>',
        th, tr, td;

    // 生成thead
    arr[0].map(function(ele, index) {
      th = '<th id="th' + index++ + '">' + ele + '</th>';
      thead += th;
    });
    thead += '</tr></thead>';

    // 生成tbody
    for (var i = 1; i < arr.length; i++) {
      tr = '<tr>'
      arr[i].map(function(ele) {
        td = '<td>'+ ele + '</td>';
        tr += td;
      });
      tr += '</tr>';
      tbody += tr;
    }
    tbody += '</tbody>';

    // 生成table
    table.innerHTML = thead + tbody;
  }

  var defaultFn = function(sortArr, arr) {
    var len = sortArr.length;

    for (var i = len; i > 0; i--) {
      for (var j = 0; j < len; j++) {
        if (sortArr[j] > sortArr[j + 1]) {
          // 不能实现swap函数。。。。
          var temp = sortArr[j];
          sortArr[j] = sortArr[j + 1];
          sortArr[j + 1] = temp;

          temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  };

  var bindSort = function() {
    var n = arr.length;
    arr[0].map(function(ele, index) {
      var th = document.getElementById('th' + index),
          sortArr = [];
      for (var i = 1; i < n; i++) {
        sortArr.push(arr[i][index]);
      }
      if (fnArr[index] !== 0) {
        th.className = 'sort';
        th.addEventListener('click', function() {
          // 这里写的很混乱
          var arr0 = arr[0];
          arr.shift();
          if (fnArr[index] === 1) {
            arr = defaultFn(sortArr, arr);
          } else {
            arr = fnArr[index](sortArr, arr);
          }
          arr.unshift(arr0);
          insert();
        });
      }
    });
  }

  // 插入页面并绑定排序功能
  var insert = function() {
    createTable();
    body.appendChild(table);
    bindSort();
  };

  this.insert = function() {
    insert();
  };
};

var arr = [
  ['姓名', '语文', '数学', '英语', '总分'],
  ['小明', 80, 90, 70, 240],
  ['小红', 90, 60, 90, 240],
  ['小亮', 60, 100, 70, 230]
];

var fnArr = [0, 1, 1, 1, 1];


var table = new Table(arr, fnArr);
table.insert();
