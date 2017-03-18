var city = {
  '北京': ['北京大学0', '北京大学1', '北京大学2', '北京大学3', '北京大学4'],
  '上海': ['上海大学0', '上海大学1', '上海大学2', '上海大学3', '上海大学4'],
  '深圳': ['深圳大学0', '深圳大学1', '深圳大学2', '深圳大学3', '深圳大学4'],
  '广州': ['广州大学0', '广州大学1', '广州大学2', '广州大学3', '广州大学4'],
  '珠海': ['珠海大学0', '珠海大学1', '珠海大学2', '珠海大学3', '珠海大学4']
};

var clearShow = function() {
  var show = document.getElementById('show');
  while (show.hasChildNodes()) {
    show.removeChild(show.firstChild);
  }
};

var insertInput = function() {
  var show = document.getElementById('show');

  // 清空show
  clearShow();

  var span = document.createElement('SPAN'),
      input = document.createElement('INPUT');

  span.innerText = '就业单位';
  input.type = 'text';
  show.appendChild(span);
  show.appendChild(input);
};

var createOption = function(key) {
  var option = document.createElement('OPTION');
  option.value = key;
  option.innerText = key;
  return option;
};

var insertSelect = function() {
    var show = document.getElementById('show');

    // 清空show
    clearShow();

    // 创建select元素并插入页面
    var citySelect = document.createElement('SELECT'),
        schoolSelect = document.createElement('SELECT'),
        span = document.createElement('SPAN');

    citySelect.id = "citySelect";
    schoolSelect.id = "schoolSelect";
    span.innerText = '学校';
    show.appendChild(span);
    show.appendChild(citySelect);
    show.appendChild(schoolSelect);


    citySelect = document.getElementById('citySelect');
    schoolSelect = document.getElementById('schoolSelect');

    // 为citySelect,schoolSelect插入option
    for (var key in city) {
      var option = createOption(key);
      citySelect.add(option);
    }

    var school = city['北京'];
    for (var i = 0; i < school.length; i++) {
      option1 = createOption(school[i]);
      schoolSelect.add(option1);
    }

    // 为citySelect绑定change事件
    citySelect.addEventListener('change', function() {
      var value = citySelect.value;
      var school = city[value];

      // 清空schoolSelect原option
      // 原来这里设置length为0就可以了
      schoolSelect.length = 0;
      // 为schoolSelect插入option
      for (var i = 0; i < school.length; i++) {
        var option = createOption(school[i]);
        schoolSelect.add(option);
      }
    });

};

// 为radio绑定click事件
var student = document.getElementById('student'),
    notStudent = document.getElementById('notStudent');

student.addEventListener('click', function() {
  insertSelect();
});

notStudent.addEventListener('click', function() {
  insertInput();
});

// 初始化页面
insertSelect();
