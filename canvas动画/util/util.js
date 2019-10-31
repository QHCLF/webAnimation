window.util = {};//将util定义为window的一个属性，属性值为对象

window.util.captureMouse = function(el){//定义捕获坐标的方法
    let mouse = {x: 0, y: 0};

    el.addEventListener('mousemove', function(event){
        let x, y;
        if(event.pageX || event.pageY){//获取鼠标位于当前屏幕的位置，并做兼容处理
            x = event.pageX;
            y = event.pageY;
        }else{
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        //当前的左边值减去元素的偏移位置，即为鼠标位于当前canvas的位置
        x -= el.offsetLeft;
        y -= el.offsetTop;

        mouse.x = x;
        mouse.y = y;
    }, false);

    return mouse;
}

window.util.captureTouch = function(el){//触摸事件
    let  touch = {
        x: null,
        y: null,
        isPressed: false,
        event: null
    }
    const body_scrollLeft = document.body.scrollLeft,
    el_scrollLeft = document.documentElement.scrollLeft,
    body_scrollTop = document.body.scrollTop,
    el_scrollTop = document.documentElement.scrollTop,
    offsetLeft = el.offsetLeft,
    offsetTop = el.offsetTop;
    
    el.addEventListener('touchstart', function(event){
        touch.isPressed = true;
        touch.event = event;
    }, false);

    el.addEventListener('touchend', function(event){
        touch.isPressed = false;
        touch.x = null;
        touch.y = null;
        touch.event = event;
    }, false);

    el.addEventListener('touchmove', function(event){
        let x, y, touch_event = event.touches[0];//第一次touch

        if(touch_event.pageX || touch_event.pageY){
            x = touch_event.pageX;
            y = touch_event.pageY;
        }else{
            x = touch_event.clientX + body_scrollLeft + el_scrollLeft;
            y = touch_event.clientY + body_scrollTop +el_scrollTop;
        }

        //减去偏移量
        x -= offsetLeft;
        y -= offsetTop;

        touch.x = x;
        touch.y = y;
        touch.event = event;
    }, false);

    return touch;
}

window.util.parseColor = function (color, toNumber) {
    if (toNumber === true) {
      if (typeof color === 'number') {
        return (color | 0); //chop off decimal
      }
      if (typeof color === 'string' && color[0] === '#') {
        color = color.slice(1);
      }
      return window.parseInt(color, 16);
    } else {
      if (typeof color === 'number') {
        color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
      }
      return color;
    }
  };
  

// 对requestAnimationFrame处理兼容

if(!window.requestAnimationFrame){
    window.requestAnimationFrame = (
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame  ||
        Window.msRequestAnimationFrame  ||
        function(callback){
            return window.setTimeout(callback, 17);
        });
}

//动画循环取消
if(!window.cancelAnimationFrame){
    window.cancelAnimationFrame = (
        window.cancelRequestAnimationFrame || 
        window.webkitCancelAnimationFrame || 
        window.webkitCancelRequestAnimationFrame || 
        window.mozCancelAnimationFrame ||
         window.mozCancelRequestAnimationFrame || 
        window.msCancelAnimationFrame ||
         window.msCancelRequestAnimationFrame || 
        window.clearTimeout
    ); 
}