var check1 = document.getElementById('check1'),
    check2 = document.getElementById('check2');

check1.addEventListener('click', function() {
  var input = document.getElementById('input1'),
      regex = /^1[34578]\d{9}$/;
  var value = input.value;
  if (regex.test(value)) {
    alert('这是一个手机号');
  } else {
    alert('这不是一个手机号');
  }
});

check2.addEventListener('click', function() {
  var input = document.getElementById('input2'),
      regex = /\b([A-Za-z]+)\b\s+\b(\1)\b/;
  var value = input.value;
  if (regex.test(value)) {
    alert('含有相邻重复单词');
  } else {
    alert('不含有重复相邻单词');
  }
});
