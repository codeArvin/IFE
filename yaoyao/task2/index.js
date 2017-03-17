var text = {
  a: {
    normal: '必填：长度为4~16个字符',
    success: '名称可用',
    fail: {
      0: '名称不能为空',
      1: '长度应为4~16'
    }
  },
  b: {
    normal: '请输入密码，必须含有英文，数字，不可含有其他特殊字符，长度在6~13',
    success: '密码可用',
    fail: {
      0: '密码不能为空',
      1: '密码缺少英文',
      2: '密码缺少数字',
      3: '密码不应含有特殊字符',
      4: '密码长度应该在6~13'
    }
  },
  c: {
    normal: '再次输入相同密码',
    success: '密码输入一致',
    fail: {
      0: '两次输入密码不一致'
    }
  },
  d: {
    normal: '请输入邮箱地址',
    success: '邮箱格式正确',
    fail: {
      0: '邮箱格式不正确'
    }
  },
  e: {
    normal: '请输入手机号码',
    success: '手机格式正确',
    fail: {
      0: '手机格式不正确'
    }
  }
};

var success = function(id, input, show) {
  input.style.border = '2px green solid';
  show.style.color = 'green';
  show.innerText = text[id].success;
};

var fail = function(id, failId, input, show) {
  input.style.border = '2px red solid';
  show.style.color = 'red';
  show.innerText = text[id].fail[failId];
};

var check = {
  a: function(id, input, show) {
    var value = input.value;
    if (value === '') {
      fail(id, 0, input, show);
      return;
    }
    var arr = value.split('');
    var regex = /[\u0391-\uFFE5]/;
    var len = 0;
    arr.map(function(str) {
      if (regex.test(str)) {
        len += 2;
      } else {
        len += 1;
      }
    });
    if (len > 3 && len < 17) {
      success(id, input, show);
    } else {
      fail(id, 1, input, show);
    }
  },

  b: function(id, input, show) {
    var value = input.value,
        regex1 = /[A-Za-z]/,
        regex2 = /[0-9]/,
        regex3 = /[^A-Za-z0-9]/,
        isEnglishOK, isNumberOK, isNoOtherOK, isLengthOK;
    if (value === '') {
      fail(id, 0, input, show);
      return;
    }
    isEnglishOK = regex1.test(value);
    isNumberOK = regex2.test(value);
    isNoOtherOK = !regex3.test(value);
    isLengthOK = value.length > 5 && value.length < 14;
    if (isEnglishOK && isNumberOK && isNoOtherOK && isLengthOK) {
      success(id, input, show);
    } else if (!isEnglishOK) {
      fail(id, 1, input, show);
    } else if (!isNumberOK) {
      fail(id, 2, input, show);
    } else if (!isNoOtherOK) {
      fail(id, 3, input, show);
    } else if (!isLengthOK) {
      fail(id, 4, input, show);
    }
  },

  c: function(id, input, show) {
    var value = input.value;
    var psw = document.getElementById('b').value;
    if (value !== psw) {
      fail(id, 0, input, show);
    } else {
      success(id, input, show);
    }
  },

  d: function(id, input, show) {
    // 校验规则， 含有@和.且.必须在@之后不相邻，.不在最后一位，以com结尾
    var value = input.value;
    var atIndex = value.indexOf('@');
    var dotIndex = value.indexOf('.');
    var regex = /com$/;
    var isComOK = regex.test(value);
    var isAtOK = atIndex > -1;
    var isDotOK = dotIndex > -1 && dotIndex !== value.length - 1;
    var isDotAfterAtOK = dotIndex - atIndex > 1;
    if (isAtOK && isDotOK && isDotAfterAtOK && isComOK) {
      success(id, input, show);
    } else {
      fail(id, 0, input, show);
    }
  },

  e: function(id, input, show) {
    var value = input.value;
    // 规则比较简单
    var regex = /^1[34578]\d{9}$/;
    isTelOK = regex.test(value);
    if (isTelOK) {
      success(id, input, show);
    } else {
      fail(id, 0, input, show);
    }
  }
};

['a', 'b', 'c', 'd', 'e'].map(function(id) {
  var input = document.getElementById(id);
  var show = document.getElementById(id + 'Show');

  input.addEventListener('focus', function() {
    input.style.border = '1px rgb(63, 195, 195) solid';
    show.style.color = "gray";
    show.innerText = text[id].normal;
  });

  input.addEventListener('blur', function() {
    check[id](id, input, show);
  });

});

// 提交全局校验
var submit = document.getElementById('submit');
submit.addEventListener('click', function() {
  var isOK;
  ['a', 'b', 'c', 'd', 'e'].map(function(id) {
    var input = document.getElementById(id);
    var show = document.getElementById(id + 'Show');
    check[id](id, input, show);
    if (show.style.color === 'red') {
      isOK = false;
    }
  });
  if (isOK) {
    alert('提交成功');
  } else {
    alert('提交失败');
  }
});
