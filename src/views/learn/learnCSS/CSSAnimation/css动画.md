css 中的动画实际上包含两个内容：

- transition：过渡动画——为一个元素在不同状态之间切换的时候定义不同的过渡效果。
- animation：关键帧动画——通过关键帧来定义动画的每一帧，实现更加复杂的动画效果。

# 一、transition 过渡动画

transition 过渡动画通过将属性的一个属性值在指定时间内平滑过渡到另一个属性值来实现动画效果。

transition 属性是一个简写属性，用于设置四个过渡属性：
- [transition-property](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-property)：规定设置过渡效果的 CSS 属性的名称。
- [transition-duration](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-duration)：规定完成过渡效果需要多少秒或毫秒。
- [transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)：规定速度效果的速度曲线。
- [transition-delay](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-delay)：规定在过渡效果开始作用之前需要等待的时间
- transition-behavior：规定元素在过渡期间是如何被中断的。

举个简单例子，当鼠标悬停在一个元素上时，改变元素的背景颜色：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        .target {
            transition: background-color 0.5s
        }

        .target:hover {
            background-color: #a2a1a1;
            color: #daf7d0;
        }
    </style>
</head>
<body>
<a class="target">Hover over me</a>
</body>
</html>
```

这里的 `transition: background-color 0.5s;` 表示当元素的background-color属性值发生变化时，过渡时间为 0.5s。

更加复杂一点的例子：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        .target {
            width: 200px;
            padding: 5px;
            border: 1px solid black;
            border-radius: 5px;
            text-align: left;
            color: black;
            transition: background-color 0.5s, color 0.1s, width 0.5s ease-out;
            transition-delay: 0.2s, 0.5s, 0s;
        }

        .target:hover {
            width: 100vw;
            padding: 5px;
            border: 1px solid white;
            border-radius: 5px;
            color: white;
            background-color: #908f8f;
            text-align: center;
        }
    </style>
</head>
<body>
<div class="target">Hover over me</div>
</body>
</html>
```

这里我们对多个属性进行了过渡设置，并且在其中一些属性上设置了不同的过渡时间和过渡函数，甚至还为不同的过度属性设置了不同的延迟时间。

# 二、animation 关键帧动画
与 transition 过渡关注属性起始值、结束值和过度时间不同，animation 关键帧动画则是通过关键帧来定义动画的每一帧，能实现更加复杂的动画效果。

animation 属性是一个简写属性，用于设置六个动画属性：
- [animation-name](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-name)：规定需要绑定到选择器的 keyframe 名称。
- [animation-duration](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-duration)：规定完成动画所花费的时间，以秒或毫秒计。
- [animation-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-timing-function)：规定动画的速度曲线。
- [animation-delay](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-delay)：规定在动画开始之前的延迟。
- [animation-iteration-count](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-iteration-count)：规定动画应该播放的次数。
- [animation-direction](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-direction)：规定是否应该轮流反向播放动画。
- [animation-fill-mode](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-fill-mode)：规定动画在播放之前和之后如何将样式应用于其目标。
- [animation-play-state](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-play-state)：规定动画是否正在运行或暂停。

举个简单例子，让一个元素在 2s 内从左边移动到右边：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        @keyframes move {
            from {
                margin-top: 0;
            }
            to {
                margin-top: 100%;
            }
        }

        .target {
            width: 100px;
            height: 100px;
            background-color: #a2a1a1;
            animation: move 2s infinite linear;
        }
    </style>
</head>
<body>
<div class="target"></div>
</body>
</html>
```
这里通过 @keyframes 定义了一个名为 move 的动画，从左边移动到右边，然后通过 animation 属性将这个动画绑定到元素上。
- 在定义关键帧时，可以用 % 来表示动画的进度（from 和 to 分别表示 0% 和 100%），如：
    ```css
    @keyframes move {
        0% {
            margin-left: 0;
        }
        50% {
            margin-left: 50%;
        }
        100% {
            margin-left: 100%;
        }
    }
    ```
  
- 如果某一个关键帧出现了重复的定义，且重复的关键帧中的 CSS 属性值不同，则以最后一次定义的属性为准。

这里用 animation 属性将关键帧动画绑定到元素上，其值为 `move 2s infinite linear`，表示使用名为 move 的关键帧动画，动画时间为 2s，无限循环播放，速度曲线为线性。

更加复杂一点的例子：

实现二维码扫描效果: 中间显示一个方框，方框内部有一个扫描线在方框内部上下来回移动, 方框内部的还有一条扫描线在方框内部左右来回移动。
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        @keyframes scan {
            0% {
                top: 10%;
            }
            50% {
                box-shadow: 0 0 20px rgba(255, 255, 0, 1);
            }
            100% {
                top: 90%;
            }
        }

        @keyframes scan2 {
            0% {
                left: 10%;
            }
            50% {
                box-shadow: 0 0 20px rgba(255, 255, 0, 1);
            }
            100% {
                left: 90%;
            }
        }

        .target {
            width: 200px;
            height: 200px;
            position: relative;
            padding: 10px;
            background: linear-gradient(to left, #908f8f, #908f8f) left top no-repeat,
            linear-gradient(to bottom, #908f8f, #908f8f) left top no-repeat,
            linear-gradient(to left, #908f8f, #908f8f) right top no-repeat,
            linear-gradient(to bottom, #908f8f, #908f8f) right top no-repeat,
            linear-gradient(to left, #908f8f, #908f8f) left bottom no-repeat,
            linear-gradient(to bottom, #908f8f, #908f8f) left bottom no-repeat,
            linear-gradient(to left, #908f8f, #908f8f) right bottom no-repeat,
            linear-gradient(to left, #908f8f, #908f8f) right bottom no-repeat;
            background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
        }

        .scan {
            width: calc(100% - 20px);
            height: 2px;
            background-color: #79fa4a;
            position: absolute;
            animation: scan 2s infinite ease-in-out alternate;
            /* 水平居中 */
            top: 50%;
        }

        .scan2 {
            width: 2px;
            height: calc(100% - 20px);
            background-color: #ff5151;
            position: absolute;
            animation: scan2 2s infinite ease-in-out alternate;
            /* 垂直居中 */
            left: 50%;
        }
    </style>
</head>
<body>
<div class="target">
    <div class="scan"></div>
    <div class="scan2"></div>
</div>
</body>
</html>
```

```html
<!DOCTYPE html>

<html>

<head>

<meta charset="utf-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">

</head>

<body>

<canvas id="content" width="1250px" height="602px"></canvas>

</body>

</html>

<script>

var cav = document.getElementById('content');

var w = window.screen.width;

var h = window.screen.height;

var yPositions = Array(300).join(0).split('');

var ctx = cav.getContext('2d');

var draw = function(){


ctx.fillStyle = 'rgba(0,0,0,.05)';

ctx.fillRect(0,0,w,h);

ctx.fillStyle = 'green';

ctx.font = '20px';


yPositions.map(function(y,index){

text = String.fromCharCode(1e2+Math.random()*330);

x = index*10;

cav.getContext('2d').fillText(text,x,y);

if(y>Math.random()*1e4){

yPositions[index]=0;

}else{

yPositions[index]=y+10;

}

});


}

setInterval('draw()',30);

</script>
```




