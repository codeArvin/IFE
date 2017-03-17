var success = function(input, show) {
  input.style.border = '2px green solid';
  show.style.color = 'green';
  show.innerText = '名称格式正确';
};

var fail = function(input, show) {
  input.style.border = '2px red solid';
  show.style.color = 'red';
  show.innerText = '名称格式不正确';
};

var text = {
  a: '必填：长度为4~16个字符',
  b: '每个英文字母、数字、英文符号长度为1',
  c: '每个汉字、中文符号长度为2'
};

var check = {
  a: function(input, show) {
    var value = input.value;
    var number = value.split('').length;
    if (number >= 4 && number <= 16) {
      success(input, show);
    } else {
      fail(input, show);
    }
  },

  b: function(input, show) {
    var regex1 = /[a-zA-Z]+/g,
        regex2 = /[0-9]+/g,
        regex3 = /[\u0391-\uFFE5a-zA-Z0-9]+/,
        regex4 = /[\u0391-\uFFE5]+/;
    var value = input.value;
    // 没有输入，或输入只含有中文字符，格式错误
    var arr = value.split(regex4).filter(function(str) {return str !== ''});
    var isOnlyChinese = arr.length === 0;
    if (value === '' || isOnlyChinese) {
      fail(input, show);
      return;
    }
    // 英文字母检验
    var english = value.match(regex1);
    if (english) {
      var isEnglishOK = english.every(function(str) {return str.length === 1});
    } else {
      var isEnglishOK = true;
    }
    // 数字检验
    var number = value.match(regex2);
    if (number) {
      var isNumberOK = number.every(function(str) {return str.length === 1});
    } else {
      var isNumberOK = true;
    }
    // 英文字符检验，把除了英文字母，数字，全角字符的都看做英文字符
    var symbol = value.split(regex3);
    symbol = symbol.filter(function(str) {return str !== ''});
    var isSymbolOK = symbol.every(function(str) {return str.length === 1});

    // 整体检验
    if (isEnglishOK && isNumberOK && isSymbolOK) {
      success(input, show);
    } else {
      fail(input, show);
    }
  },

  c: function(input, show) {
    // [\u4e00-\u9fa5]中文汉字，[\u0391-\uFFE5]全角字符，包括中文符号和中文汉字
    // 没有找到匹配中文符号的正则，只好自己分离出来，好麻烦。。。。。
    // regex1用来作为split的参数，以连续中文汉字作为分隔符
    // regex2用来匹配出输入字符串中全角字符，用作进一步处理
    // regex3用来匹配输入字符串中中文汉字
    var regex1 = /[\u4e00-\u9fa5]+/,
        regex2 = /[\u0391-\uFFE5]+/g,
        regex3 = /[\u4e00-\u9fa5]+/g;
    var value = input.value;

    // arr为筛选出来的全角字符
    var arr = value.match(regex2);
    // 输入为空或不含有全角字符
    if (value === '' || arr === null) {
      fail(input, show);
      return;
    }
    var symbol = [];
    // 将全角字符中中文汉字作为分隔符，得到的就是中文符号的数组，添加入symbol数组中
    arr.map(function(str) {
      symbol = symbol.concat(str.split(regex1));
    });
    // 不知道为啥会出现'',filter去除
    symbol = symbol.filter(function(str) {
      if (str === '') {
        return false;
      }
      return true;
    });
    var chinese = value.match(regex3);
    var isChineseOK = chinese.every(function(str) { return str.length === 2});
    var isSymbolOK = symbol.every(function(str) {return str.length === 2});
    if (isChineseOK && isSymbolOK) {
      success(input, show);
    } else {
      fail(input, show);
    }
  }
};

['a', 'b', 'c'].map(function(id) {
  var input = document.getElementById(id);
  var show = document.getElementById(id + 'Show');
  var btn = document.getElementById(id + 'Btn');

  input.addEventListener('focus', function() {
    input.style.border = '1px rgb(63, 195, 195) solid';
    show.style.color = "gray";
    show.innerText = text[id];
  });

  input.addEventListener('blur', function() {
    input.style.border = '1px lightgray solid';
  });

  btn.addEventListener('click', function() {
    switch (id) {
      case 'a':
        check.a(input, show);
        break;
      case 'b':
        check.b(input, show);
        break;
      case 'c':
        check.c(input, show);
        break;
    }
  });
});
