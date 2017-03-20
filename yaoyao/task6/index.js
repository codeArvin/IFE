var info = {
  'text': {
    'title': '这是头部',
    'body': '这是主体部分',
    'buttons': {
      'submit': '确认',
      'cancel': '取消'
    }
  },
  'config': {
    'scroll': false
  }
};
var config = {
  'range': [200, 600, 200, 600],
  'canEdge': []
};

var floatLayer = new FloatLayer(info);
var show = document.getElementById('show');
show.addEventListener('click', function() {
  floatLayer.show();

  // 添加拖拽放大缩小功能
  // 因为scale需要节点display不为none，所以在这里添加
  scale('floatLayer', config);
});

// 为节点添加拖拽功能
drag('head', 'floatLayer');
