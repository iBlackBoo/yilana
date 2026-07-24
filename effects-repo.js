// Auto-generated from P:/github/javaScript by _gen.js
// 每项含 repo(原始文件路径) 与 code(主HTML源码)，由 index.html 以 iframe 内嵌展示。
window.REPO_EFFECTS = [
  {
    id:'repo1', icon:'🌨️', title:"飘雪", desc:"Canvas 飘雪动画", group:'particle',
    repo:{ dir:"", file:"飘雪.html", rel:'%E9%A3%98%E9%9B%AA.html' },
    code:`<!DOCTYPE html>
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>飘雪</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
            font-family:"微软雅黑";
            font-size:13px;
            color:#ffffff;
        }
        body{
            background:#00a0fc;
            overflow:hidden;
        }
    </style>
</head>
<body>

</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
//    窗口大小
    var oPageX=window.screen.width;
    var oPageY=window.screen.height;
    var aSnow=[];
//    雪花模板
    function snow(x,y,xspeed,yspeed,xsin,size){//x水平位置,y垂直位置,xspeed水平步距,yspeed垂直步距,xsin振幅,size雪花大小
        this.node=document.createElement('div');
        this.x=x;
        this.y=y;
        this.xspeed=xspeed;
        this.yspeed=yspeed;
        this.xsin=xsin;
        this.size=size;
        this.createSnow=function(){
            this.node.style.position='absolute';
            this.node.style.top=this.y+'px';
            this.node.style.left=this.x+'px';
            this.node.innerHTML='*';
            document.body.appendChild(this.node);
        };
        this.createSnow();
        this.snowMove=function(){
            this.node.style.top=parseInt(this.node.style.top)+this.yspeed+'px';//垂直方向运动
            this.node.style.left=parseInt(this.node.style.left)+this.xsin*Math.sin(this.xspeed)+'px';
            this.node.style.fontSize=this.size+'px';
//            this.node.style.color='rgb('+Math.ceil(Math.random()*255)+','+Math.ceil(Math.random()*255)+','+Math.ceil(Math.random()*255)+')';
        };
    }
//    创建雪花
    function createSnow(){
        aSnow.push(new snow(Math.random()*oPageX,-50,0.02+Math.random()/10,1+Math.random(),Math.random()*30,20+Math.random()*30));
    }
    setInterval(createSnow,1000);//一秒钟创建一个雪花
//    雪花移动函数
    function snowMove(){
        for(var j=0;j<aSnow.length;j++){
            aSnow[j].snowMove();
            if(parseInt(aSnow[j].node.style.top)>oPageY || parseInt(aSnow[j].node.style.left)>oPageX){
                aSnow[j].node.parentNode.removeChild(aSnow[j].node);
                aSnow.splice(j,1);
            }
        }
    }
    setInterval(snowMove,10);
<\/script>
</html>`
  },
  {
    id:'repo2', icon:'📊', title:"Canvas 仪表盘", desc:"Canvas 绘制的仪表盘", group:'visual',
    repo:{ dir:"", file:"仪表盘.html", rel:'%E4%BB%AA%E8%A1%A8%E7%9B%98.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        #test,#hehe{
            width: 100%;
            height: 500px;
        }
    </style>
</head>
<body>
<div id="test"></div>
<div id="hehe"></div>
</body>
<script src="js/jquery.min.js"><\/script>
<script src="js/echarts-all.js"><\/script>
<script>
    var myChart1;
    var option = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['最高','最低']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {readOnly:false},
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : true,
                data : function (){
                    var list = [];
                    for (var i = 1; i <= 30; i++) {
                        list.push('2013-03-' + i);
                    }
                    return list;
                }()
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [

            {
                name:'最低',
                type:'bar',
                data:function (){
                    var list = [];
                    for (var i = 1; i <= 5; i++) {
                        list.push(Math.round(Math.random()* 10));
                    }
                    return list;
                }()
            }
        ]
    };
    myChart=echarts.init(document.getElementById('test'));
    myChart.setOption(option);
    var ecConfig = echarts.config;
    myChart1=echarts.init(document.getElementById('hehe'));
    myChart.on(ecConfig.EVENT.HOVER, function(params){
        var data=params.value;
        var option1 = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            series : [
                {
                    name:'业务指标',
                    type:'gauge',
                    startAngle: 180,
                    endAngle: 0,
                    center : ['50%', '90%'],    // 默认全局居中
                    radius : 320,
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            width: 200
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        splitNumber: 10,   // 每份split细分多少段
                        length :12,        // 属性length控制线长
                    },
                    axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                        formatter: function(v){
                            switch (v+''){
                                case '10': return '低';
                                case '50': return '中';
                                case '90': return '高';
                                default: return '';
                            }
                        },
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: '#fff',
                            fontSize: 15,
                            fontWeight: 'bolder'
                        }
                    },
                    pointer: {
                        width:50,
                        length: '90%',
                        color: 'rgba(255, 255, 255, 0.8)'
                    },
                    title : {
                        show : true,
                        offsetCenter: [0, '-60%'],       // x, y，单位px
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: '#fff',
                            fontSize: 30
                        }
                    },
                    detail : {
                        show : true,
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderWidth: 0,
                        borderColor: '#ccc',
                        width: 100,
                        height: 40,
                        offsetCenter: [0, -40],       // x, y，单位px
                        formatter:'{value}%',
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontSize : 50
                        }
                    },
                    data:[{value: data*10, name: '完成率'}]
                }
            ]
        };
        option1.series[0].data[0].value = data;
        myChart1.setOption(option1,true);
    });
//    myChart.on(ecConfig.EVENT.DATA_ZOOM, eConsole);
//    myChart.on(ecConfig.EVENT.LEGEND_SELECTED, eConsole);
//    myChart.on(ecConfig.EVENT.MAGIC_TYPE_CHANGED, eConsole);
//    myChart.on(ecConfig.EVENT.DATA_VIEW_CHANGED, eConsole);

<\/script>
</html>`
  },
  {
    id:'repo3', icon:'🔢', title:"数字滚动停止", desc:"数字逐一停止的滚动效果", group:'game',
    repo:{ dir:"", file:"数字逐一停止.html", rel:'%E6%95%B0%E5%AD%97%E9%80%90%E4%B8%80%E5%81%9C%E6%AD%A2.html' },
    code:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div class="num"></div>
</body>
<script src="../javaScript/checkbox/js/jquery-1.9.1.min.js"><\/script>
<script>
    function showScore($ele, num, secand, pause){ //second  按照秒数，动画运行多少秒
        if (!secand) { secand = 2;}
        if (!pause) { pause = 20;}

        var len = String(num).length;

        var temnum, times = 0 , stepTimes, max ;
        var numArr = String(num).split("");


        function getRandom(n){
            var num = Math.floor(Math.random()*(Math.pow(10, n)-1 - Math.pow(10, n-1))+Math.pow(10, n-1));

            if (String(num).length !== n) {num = getRandom(n);}

            return num;
        }

        function setValue(num, pause, secand){//second 运行多少秒后停止
            var len = String(num).length, j=0;

            if (!stepTimes) {
                max = Math.ceil(secand*1000/len);
                stepTimes = Math.ceil(max/pause);
            }

            temnum = "";
            setTimeout(function(){
                for (var i = 1; i <= len; i++) {
                    if (times >= stepTimes*i) {
                        j++;
                        temnum += numArr[i-1]+"";
                    }else{
                        break;
                    }
                };

                if (j < len) {
                    $ele.html(temnum+""+getRandom(len-j));
                }else{
                    $ele.html(temnum);
                }


                if (times >= max || j >= len) {return;};

                setValue(num, pause, secand);
                times++;

            }, pause);


        }

        setValue(num, pause, secand);

    }

    showScore($(".num"), 2344, 1.5, 10);
<\/script>
</html>`
  },
  {
    id:'repo4', icon:'🧮', title:"数组去重", desc:"JS 数组去重演示", group:'component',
    repo:{ dir:"", file:"数组去重.html", rel:'%E6%95%B0%E7%BB%84%E5%8E%BB%E9%87%8D.html' },
    code:`<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8"/>
    <title>窗口登陆效果-蚂蚁部落</title>
    <script type="text/javascript">
        Array.prototype.deleteEle=function()
        {
            var obj={};  //建立一个空对象
            var newArr=[];
            var i,j;
            for(i=0;i<this.length;i++)
            {
                if(typeof(obj[this[i]])=="undefined")  //将数组里面的元素作为属性名，如果obj不包含属性名，则建立属性名:''这样的json键值对(如'1':''),经过该for循环之后obj={'1':'','2':'','3':'','4':'','5':'','6':'','8':''}。其实这一步已经去重了。
                {
                    obj[this[i]]="";
                }
            }
            for(j in obj)
            {
                newArr.push(j);  //将不重复的属性名添加到新数组里面并返回值
            }
            return newArr;
        };
        var theArray=new Array(1,2,3,4,5,6,8,5,4);
        document.write(theArray.deleteEle());
//  不用原型
        function test(arr)
        {
            var obj={};
            var newArr=[];
            var i,j;
            for(i=0;i<arr.length;i++)
            {
                if(typeof(obj[arr[i]])=="undefined")  //
                {
                    obj[arr[i]]="";
                }
            }
            for(j in obj)
            {
                newArr.push(j);
            }
            return newArr;
        }
        var test1=test(['1','3','5','123123','2','3']);
        console.log(test1);
    <\/script>
</head>
<body >

</body>
</html>`
  },
  {
    id:'repo5', icon:'📜', title:"滚动标题", desc:"浏览器标题栏文字滚动", group:'text',
    repo:{ dir:"", file:"滚动title.html", rel:'%E6%BB%9A%E5%8A%A8title.html' },
    code:`<!DOCTYPE html>
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title></title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
            font-family:'微软雅黑';
        }
        img{
            float:left;
        }
    </style>
</head>
<body>

</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
    var position=0;
    var message='^_^欢迎浏览本网站';
    var x=2*(60/message.length);//要保证是两倍
    var newStr='';
    for(var i=0;i<x;i++){
        newStr+=message;
    }
    function titleTex(){
        var title=newStr.substring(position,position+60);
        position++;
        if(position==60){//刚好截取到尾巴
            position=0;
        }
        document.title=title;
    }
    setInterval(titleTex,150);
<\/script>
</html>`
  },
  {
    id:'repo6', icon:'🐍', title:"贪吃蛇", desc:"经典贪吃蛇小游戏", group:'game',
    repo:{ dir:"", file:"贪吃蛇.html", rel:'%E8%B4%AA%E5%90%83%E8%9B%87.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        #container{
            width: 1000px;
            height: 550px;
            border: 1px solid #000;
            margin: 100px auto;
        }
        #ground{
            width: 1000px;
            height: 500px;
            position: relative;
        }
        #button{
            float: right;
            height: 50px;
            line-height: 50px;
        }
        button{
            width: 50px;
            height: 20px;
            cursor: pointer;
        }
        .block{
            width: 20px;
            height: 20px;
            background: #2abad9;
            float: left;
        }
        .snakeBody{
            width: 20px;
            height: 20px;
            position: absolute;
            background: #f57926;
        }
        .food{
            width: 20px;
            height: 20px;
            background: green;
            position: absolute;
        }
    </style>
</head>
<body>
<div id="container">
    <div id="ground"></div>
    <div id="gameControl">
        <div id="button">
            <button id="start">开始</button>
            <button id="pause">暂停</button>
        </div>
    </div>
</div>
</body>
<script>
    var timer;
    window.onload=function(){
        createGrass();
        createSnake();
        createFood();
        document.getElementById('start').onclick=function(){
            clearInterval(timer);  //防止多次点击开始
            timer=setInterval(function(){
                snakeMove(diRection);
            },150);
            snakeMove(diRection);
        };
        document.getElementById('pause').onclick=function(){
            clearInterval(timer);
        };
    };
    //创建草坪
    function createGrass(){
        var oGround=document.getElementById('ground');
        var oDiv;
        for(var i=0;i<50;i++){
            for(var j=0;j<25;j++){
                oDiv=document.createElement('div');
                oDiv.className='block';
                oGround.appendChild(oDiv);
            }
        }
    }
    //创建蛇
    var snakeBody=[],oFood,diRection='left';
    function createSnake(){
        var oGround=document.getElementById('ground');
        var oDiv;
        for(var i=0;i<3;i++){
            oDiv=document.createElement('div');
            oDiv.className='snakeBody';
            oDiv.style.left=(i+40)*20+'px';
            oDiv.style.top='60px';
            oGround.appendChild(oDiv);
            snakeBody.push(oDiv);
        }
    }
    //创建食物
    function createFood(){
        var flag=true;  //该标识用于判断生成的div是否和蛇身div重合
        var oGround=document.getElementById('ground');
//        var oDiv;
        var len=snakeBody.length;
        var iLeft,iTop;
        oFood=document.createElement('div');
        oFood.className='food';
        iLeft=parseInt(Math.random()*49)*20;
        iTop=parseInt(Math.random()*24)*20;
        for(var i=0;i<len;i++){
            if(snakeBody[i].offsetLeft == iLeft && snakeBody[i].offsetTop == iTop){  //可console.log(snakeBody[i]),其中是按照offsetLeft和offsetTop来确定方块位置的
                flag=false;
                break;
            }
        }
        if(flag==true){
            oFood.style.left=iLeft+'px';
            oFood.style.top=iTop+'px';
            oGround.appendChild(oFood);
        }else{
            createFood();  //若生成的div有重合则再次调用自身
        }
    }
    //蛇运动
    function snakeMove(direction){  //direction用于作为蛇移动的四个方向的判断
        var snakeHead=snakeBody[0];  //获取蛇头
        diRection=direction;  //用于防止比如蛇身本来往左边走，但是向右按钮仍然有效的情况
        for(var i=snakeBody.length-1;i>0;i--){  //移动说白了就是后面的div使用它前一个div的位置
            snakeBody[i].style.left=snakeBody[i-1].offsetLeft+'px';
            snakeBody[i].style.top=snakeBody[i-1].offsetTop+'px';
        }
        switch (direction){  //蛇头的位置
            case 'left':snakeHead.style.left=snakeHead.offsetLeft-20+'px';break;
            case 'right':snakeHead.style.left=snakeHead.offsetLeft+20+'px';break;
            case 'up':snakeHead.style.top=snakeHead.offsetTop-20+'px';break;
            case 'down':snakeHead.style.top=snakeHead.offsetTop+20+'px';break;
        }
        //蛇头碰壁
        if(snakeHead.offsetLeft == -20 || snakeHead.offsetLeft == 1000 || snakeHead.offsetTop == -20 || snakeHead.offsetTop == 500){
            clearInterval(timer);
            if(confirm('再来一次?')){
                window.location.reload();
            }
        }
        //蛇碰到自身
        for(var j=1;j<snakeBody.length;j++){
            if(snakeHead.offsetLeft == snakeBody[j].offsetLeft && snakeHead.offsetTop == snakeBody[j].offsetTop){
                clearInterval(timer);
                if(confirm('再来一次')){
                    window.location.reload();
                }
            }
        }
        //吃掉食物
        if(snakeHead.offsetLeft==oFood.offsetLeft && snakeHead.offsetTop==oFood.offsetTop){
            oFood.className='snakeBody snake-block';  //食物变成和蛇身一样的颜色
            console.log(snakeBody[snakeBody.length-1].offsetTop);
            switch (direction){  //把oFood的坐标采用最后一个div的坐标
                case 'left':oFood.style.left=snakeBody[snakeBody.length-1].offsetLeft+'px';break;
                case 'right':oFood.style.left=snakeBody[snakeBody.length-1].offsetLeft+'px';break;
                case 'up':oFood.style.top=snakeBody[snakeBody.length-1].offsetTop+'px';break;
                case 'down':oFood.style.top=snakeBody[snakeBody.length-1].offsetTop+'px';break;
            }
            snakeBody.push(oFood);  //这里最好用push把吃掉的div添加到蛇尾,添加到头部有一个问题，吐过实物div是靠边生成，那么吃掉后会超出墙范围或者直接撞墙
            createFood();
        }
    }
    //上下左右操作
    document.onkeydown=function(e){  //document不要换成window，出滚动条的话，window会导致窗口移动
        var event=e || window.event;
        var direction=event.keyCode;
        switch (direction){
            case 37:
                if(diRection != 'right'){
                    snakeMove('left');
                }
            break;  //左
            case 39:
                if(diRection != 'left'){
                    snakeMove('right');
                }
            break;  //右
            case 38:
                if(diRection != 'down'){
                    snakeMove('up');
                }
            break;  //上
            case 40:if(diRection != 'up'){
                snakeMove('down');
            }
            break;  //下
        }
    }
<\/script>
</html>`
  },
  {
    id:'repo7', icon:'📝', title:"输入框抖动", desc:"校验失败时输入框抖动", group:'interact',
    repo:{ dir:"", file:"输入框抖动.html", rel:'%E8%BE%93%E5%85%A5%E6%A1%86%E6%8A%96%E5%8A%A8.html' },
    code:`<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8"/>
    <title>窗口登陆效果-蚂蚁部落</title>
    <style type="text/css">
        #win
        {
            position:relative;
            width:100px;
            height:100px;
            background-color:#666;
        }
    </style>
    <script type="text/javascript">
        var a=['top','left'];
        var b=0;
        var u;
        function fudu()
        {
            win.style[a[b%2]]=(b++)%4<2?"0px":"4px";
            if(b>15)
            {
                clearInterval(u);
                b=0
            }
        }
        function zd()
        {
            clearInterval(u);
            u=setInterval(fudu,32)
        }
        window.onload=function()
        {
            var bt=document.getElementById("bt");
            var win=document.getElementById("win");
            bt.onclick=zd;
        }
    <\/script>
</head>
<body >
<button id="bt">点击振动</button>
<div id="win"></div>
</body>
</html>`
  },
  {
    id:'repo8', icon:'🪟', title:"iframe 自适应高度", desc:"iframe 随内容自适应高度", group:'component',
    repo:{ dir:"", file:"iframe改变高度.html", rel:'iframe%E6%94%B9%E5%8F%98%E9%AB%98%E5%BA%A6.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<input type="button" value="页面1"/>
<input type="button" value="页面2"/>
<iframe id="iframePage" src="1.html" frameborder="0" scrolling="no"></iframe>
</body>
<script>
//  contentWindow所有浏览器支持，contentDocument IE不支持;  window.parant当前页面的父页面，window.top当前页面的最外层页面
//  iframe防钓鱼:if(window!=window.top){window.top.location.href=window.location.href} 如果最顶层页面不是当前页面，就把最顶层网址指向当前页面网址
    window.onload=function(){
        var oIframe=document.getElementById('iframePage');
        var aBtn=document.getElementsByTagName('input');
        changeHeight();
        function changeHeight(){
            setTimeout(function(){  //必须加一个延迟，不然高度改变会和页面加载冲突，事先不了高度变化
                oIframe.height=oIframe.contentWindow.document.body.offsetHeight;
            },100);
        }
        aBtn[0].onclick=function(){
            oIframe.src='1.html';
            changeHeight();
        };
        aBtn[1].onclick=function(){
            oIframe.src='2.html';
            changeHeight();
        };
    };
<\/script>
</html>`
  },
  {
    id:'repo9', icon:'🧊', title:"3D 图片切换", desc:"3D 翻转图片切换展示", group:'visual',
    repo:{ dir:"3D图片切换", file:"3D图片切换.html", rel:'3D%E5%9B%BE%E7%89%87%E5%88%87%E6%8D%A2/3D%E5%9B%BE%E7%89%87%E5%88%87%E6%8D%A2.html' },
    code:`<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>
<style id="css">
body,ul,ol{ margin:0;padding:0; list-style:none;}
.box{width:800px; margin:50px auto; 
}
.picList{ width:800px;height:360px;-webkit-perspective:800px; }
.picList li{ width:25px;height:360px;float:left;position:relative;-webkit-transform-style:preserve-3d; -webkit-transform:translateZ(-180px);}
.picList a{ width:100%; height:360px; position:absolute; left:0;top:0;}
.picList span{ width:360px;height:360px; background:#333; position:absolute; top:0;}
.picList li a:nth-of-type(1){ background:url(img/1.jpg) no-repeat; -webkit-transform:translateZ(180px);}
.picList li a:nth-of-type(2){ background:url(img/2.jpg) no-repeat; -webkit-transform:translateZ(-180px) rotateX(90deg); -webkit-transform-origin:top;}
.picList li a:nth-of-type(3){ background:url(img/3.jpg) no-repeat;-webkit-transform:translateZ(-180px) rotateX(180deg);}
.picList li a:nth-of-type(4){ background:url(img/4.jpg) no-repeat;-webkit-transform-origin:bottom;-webkit-transform: translateZ(-180px) rotateX(-90deg);}
.picList li span:nth-of-type(1){ left:0; -webkit-transform-origin:left;-webkit-transform:translateZ(180px) rotateY(90deg);}
.picList li span:nth-of-type(2){right:0; -webkit-transform-origin:right;-webkit-transform:translateZ(180px) rotateY(-90deg);}
#btn{padding:50px; height:30px;}
#btn li{ width:30px;height:30px; background:#000; color:#fff; font:bold 16px/30px Arial; text-align:center; float:left; margin:0 10px; border-radius:50%;}
#btn .active{ background:#f60;}
</style>
<script>
window.onload=function()
{
	var oPic=document.getElementById("pic");
	var oCss=document.getElementById("css");
	var aBtn=document.getElementById("btn").getElementsByTagName("li");
	var iLiW=25;
	var iLength=oPic.clientWidth/iLiW;
	var aLi=[];
	var sHtml="";
	var sCss="";
	var iZindex=0;
	var iNow=0;
	for(var i=0;i<iLength;i++)
	{
		i>iLength/2?iZindex--:iZindex++;
		sCss+=".picList li:nth-of-type("+(i+1)+"){z-index:"+iZindex+";}.picList li:nth-of-type("+(i+1)+") a{background-position:-"+i*iLiW+"px 0px;}"
	}
	oCss.innerHTML+=sCss;
	for(var i=0;i<iLength;i++)
	{
		sHtml+='<li><a href="#"></a><a href="#"></a><a href="#"></a><a href="#"></a><span></span><span></span></li>';
	}
	oPic.innerHTML=sHtml;
	aLi=oPic.getElementsByTagName("li");
	for(var i=0;i<aBtn.length;i++)
	{
		aBtn[i].onclick=(function(a){
			return function()
			{
				aBtn[iNow].className="";
				for(var i=0;i<aLi.length;i++)
				{
					aLi[i].style.transition=Math.abs(a-iNow)*0.5+"s "+i*80+"ms all ease";
					aLi[i].style.WebkitTransform="translateZ(-180px) rotateX(-"+a*90+"deg)";
				}
				iNow=a;
				aBtn[iNow].className="active";
			};
		})(i);
	}
}
<\/script>
</head>
<body>
<div class="box">
	<ul class="picList" id="pic">
    	
    </ul>
    <ol id="btn">
    	<li class="active">1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ol>
</div>
</body>
</html>
`
  },
  {
    id:'repo10', icon:'🚪', title:"9 种推拉门", desc:"多种推拉门展开效果", group:'component',
    repo:{ dir:"9种推拉门", file:"demo.html", rel:'9%E7%A7%8D%E6%8E%A8%E6%8B%89%E9%97%A8/demo.html' },
    code:`﻿<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>特效实验室-yilana.cn</title>
<style>
body,ul,ol{margin:0;padding:0;}
li{ list-style:none;}
img{ border:none; vertical-align:top; }
#box{width:470px;height:150px; position:relative; margin:30px auto; overflow:hidden;}
ul{ width:470px; position:absolute;left:0; top:0; z-index:1;}
ul li{width:470px; display:none;}
ol{z-index:2; width:120px; position:absolute;right:10px; bottom:10px;}
ol li{ width:20px;height:20px; float:left;margin:0 2px; display:inline; background:#fff; color:#f60; line-height:20px; text-align:center;}
ol .active{ background:#f60; color:#fff;}
</style>
<script>
window.onload = function(){
	var oUl = document.getElementsByTagName('ul')[0];
	var aLiUl = oUl.getElementsByTagName('li');
	
	var oOl = document.getElementsByTagName('ol')[0];
	var aLiOl = oOl.getElementsByTagName('li');
	
	for(var i=0;i<aLiOl.length;i++){
		aLiOl[i].index = i;
		aLiOl[i].onmouseover = function(){
			for(var i=0;i<aLiOl.length;i++){
				aLiOl[i].className = '';
				aLiUl[i].style.display = 'none';
			}
			this.className = 'active';
			aLiUl[this.index].style.display = 'block';
		};
	}
	
};
<\/script>
</head>
<body>
<div id="box">
	<ul>
    	<li style="display:block"><img src="images/1.jpg" alt=""/></li>
        <li><img src="images/2.jpg" alt=""/></li>
        <li><img src="images/3.jpg" alt=""/></li>
        <li><img src="images/4.jpg" alt=""/></li>
        <li><img src="images/5.jpg" alt=""/></li>
    </ul>
    <ol>
    	<li class="active">1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ol>
</div>
</body>
</html>
`
  },
  {
    id:'repo11', icon:'🎬', title:"animate.css 动画", desc:"animate.css 动画库演示", group:'visual',
    repo:{ dir:"animate.css", file:"1.html", rel:'animate.css/1.html' },
    code:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="css/animate.min.css">
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        #login{
            width: 300px;
            height: 300px;
            border: 1px solid red;
        }
        .animated.tada{
            -webkit-animation-duration:.3s;  /*可以在这里改动画的持续时间，延迟时间和执行次数等*/
        }
    </style>
</head>
<body>
<div id="login">
    <input type="text">
    <button>登录</button>
</div>
</body>
<script src="js/jquery-1.9.1.min.js"><\/script>
<script>
//  git地址：https://github.com/daneden/animate.css
    $('button').on('click',function(){
        var $login=$('#login');
        var name= $.trim($('input').val());
        if(name==''){
            $login.addClass('animated tada').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
                $(this).removeClass('animated tada');
            });  //one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){}相当于回调
        }
    });
<\/script>
</html>`
  },
  {
    id:'repo12', icon:'🔤', title:"字母入场动画", desc:"AnimatedLetters 字母动画", group:'text',
    repo:{ dir:"AnimatedLetters", file:"index.html", rel:'AnimatedLetters/index.html' },
    code:`<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Animated Letters | Demo 1 | Codrops</title>
		<meta name="description" content="Demo 1 of the letters.js plugin for animating SVG letters creatively." />
		<meta name="keywords" content="letters.js, plugin, SVG, letter, animation, segment, web design, demo" />
		<meta name="author" content="Codrops" />
		<link rel="shortcut icon" href="favicon.ico">
		<link rel="stylesheet" type="text/css" href="css/normalize.css" />
		<link rel="stylesheet" type="text/css" href="css/demo.css" />
		<!--[if IE]>
			<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"><\/script>
		<![endif]-->
		<script>
			document.documentElement.className = 'js';
		<\/script>
		<script src="js/segment.min.js"><\/script>
		<script src="js/d3-ease.v0.6.js"><\/script>
		<script src="js/letters.js"><\/script>
	</head>
	<body class="demo-1">
		<!-- SVG icons -->
		<svg class="hidden">
			<symbol id="icon-play" viewBox="0 0 60 60">
				<path d="m53.48 27.435l-42.807-26.52c-3.119-2.047-5.672-.541-5.672 3.346v51.48c0 3.885 2.553 5.391 5.672 3.346l42.807-26.52c0 0 1.521-1.07 1.521-2.566s-1.521-2.566-1.521-2.566" />
			</symbol>
		</svg>
		<!-- /SVG icons -->
		<div class="container">
			<section class="content">
				<ul class="list">
					<li class="list__item color-1">
						<h3 class="list__text">ashin</h3>
						<button class="control__button control__button--play" aria-label="Trigger animation">
							<svg class="control__vector" aria-hidden="true" role="img" viewBox="0 0 60 60">
								<use xlink:href="#icon-play"></use>
							</svg>
						</button>
					</li>
					<li class="list__item color-2">
						<h3 class="list__text">bogyoke</h3>
						<button class="control__button control__button--play" aria-label="Trigger animation">
							<svg class="control__vector" aria-hidden="true" role="img" viewBox="0 0 60 60">
								<use xlink:href="#icon-play"></use>
							</svg>
						</button>
					</li>
					<li class="list__item color-3">
						<h3 class="list__text">nang</h3>
						<button class="control__button control__button--play" aria-label="Trigger animation">
							<svg class="control__vector" aria-hidden="true" role="img" viewBox="0 0 60 60">
								<use xlink:href="#icon-play"></use>
							</svg>
						</button>
					</li>
					<li class="list__item color-8">
						<h3 class="list__text">maung</h3>
						<button class="control__button control__button--play" aria-label="Trigger animation">
							<svg class="control__vector" aria-hidden="true" role="img" viewBox="0 0 60 60">
								<use xlink:href="#icon-play"></use>
							</svg>
						</button>
					</li>
					<li class="list__item color-4">
						<h3 class="list__text">Tekkatho</h3>
						<button class="control__button control__button--play" aria-label="Trigger animation">
							<svg class="control__vector" aria-hidden="true" role="img" viewBox="0 0 24 24">
								<use xlink:href="#icon-play"></use>
							</svg>
						</button>
					</li>
					<li class="list__item color-5">
						<h3 class="list__text">sawbwa</h3>
						<button class="control__button control__button--play" aria-label="Trigger animation">
							<svg class="control__vector" aria-hidden="true" role="img" viewBox="0 0 60 60">
								<use xlink:href="#icon-play"></use>
							</svg>
						</button>
					</li>
					<li class="list__item color-6">
						<h3 class="list__text">binnya</h3>
						<button class="control__button control__button--play" aria-label="Trigger animation">
							<svg class="control__vector" aria-hidden="true" role="img" viewBox="0 0 60 60">
								<use xlink:href="#icon-play"></use>
							</svg>
						</button>
					</li>
					<li class="list__gap">
						<p>In the following effects we also use <a href="http://mojs.io/">mo.js</a> for additional animations:</p>
					</li>
					<li class="list__item color-7">
						<h3 class="list__text">thakin</h3>
						<button class="control__button control__button--play" aria-label="Trigger animation">
							<svg class="control__vector" aria-hidden="true" role="img" viewBox="0 0 60 60">
								<use xlink:href="#icon-play"></use>
							</svg>
						</button>
					</li>
					<li class="list__item color-9">
						<h3 class="list__text">zeya</h3>
						<button class="control__button control__button--play" aria-label="Trigger animation">
							<svg class="control__vector" aria-hidden="true" role="img" viewBox="0 0 60 60">
								<use xlink:href="#icon-play"></use>
							</svg>
						</button>
					</li>
					<li class="list__item color-10">
						<h3 class="list__text">sanda</h3>
						<button class="control__button control__button--play" aria-label="Trigger animation">
							<svg class="control__vector" aria-hidden="true" role="img" viewBox="0 0 60 60">
								<use xlink:href="#icon-play"></use>
							</svg>
						</button>
					</li>
					<li class="list__item list__item--burst color-11">
						<h3 class="list__text">duwa</h3>
						<button class="control__button control__button--play" aria-label="Trigger animation">
							<svg class="control__vector" aria-hidden="true" role="img" viewBox="0 0 24 24">
								<use xlink:href="#icon-play"></use>
							</svg>
						</button>
					</li>
					<li class="list__item list__item--burst color-12">
						<h3 class="list__text">sao</h3>
						<button class="control__button control__button--play" aria-label="Trigger animation">
							<svg class="control__vector" aria-hidden="true" role="img" viewBox="0 0 24 24">
								<use xlink:href="#icon-play"></use>
							</svg>
						</button>
					</li>
				</ul>
			</section>
			 Related demos
			<section class="content content--related">
				<p>If you enjoyed this demo you might also like:</p>
				<a class="media-item" href="http://tympanus.net/Development/TextStylesHoverEffects/">
					<img class="media-item__img" src="img/related/LinkStylesHoverEffects.jpg">
					<h3 class="media-item__title">Text Styles &amp; Hover Effects</h3>
				</a>
				<a class="media-item" href="http://tympanus.net/Development/InlineAnchorStyles/">
					<img class="media-item__img" src="img/related/InlineLinkStyles.png">
					<h3 class="media-item__title">Inline Anchor Styles</h3>
				</a>
			</section>
		</div>
		<!-- /container -->
		<script>
//  网址http://www.w2bc.com/article/105480
		(function() {  //这一段没用啊感觉，反正把每个效果独立出来的话没这段话没影响
			var decoLetter = new Letters(document.querySelector('.deco'), {
				size: 1000,
				weight: 5,
				color: '#212028',
				//color: '#63646B',
				duration: 2,
				fade:0,
				easing: d3_ease.easeExpOut.ease
			});
			decoLetter.hideInstantly();
			setTimeout(function() {
				decoLetter.show();
			}, 200);
		})();
		<\/script>
		<script src="js/mo.min.js"><\/script>
		<script src="js/demo-1.js"><\/script>
	</body>
</html>
`
  },
  {
    id:'repo13', icon:'🍎', title:"Apple 产品动画", desc:"Apple 风格产品展示动画", group:'visual',
    repo:{ dir:"apple", file:"index.html", rel:'apple/index.html' },
    code:`<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>apple 最新产品展示效果</title>
<style type="text/css">
*{margin:0;padding:0;}
body{background:#EBEBED;_position:relative;_height:100%;}
img{border:none;display:block;}
li{list-style:none;}
.page{
	-webkit-box-shadow: rgba(0,0,0,0.3) 0 1px 3px;
	-moz-box-shadow: rgba(0,0,0,0.3) 0 1px 3px;
	box-shadow: rgba(0,0,0,0.3) 0 1px 3px; 
	background:#FFFFFF;
	border-color: #E5E5E5 #DBDBDB #D2D2D2;
	border-style: solid;
	border-width: 1px;
	margin:5px auto 0;
	width:980px;
}
.miaov_box{
	overflow: hidden;
	position: relative;
	width: 820px;
	z-index: 0;
	height:158px;
	margin: 0 70px;
}
.miaov_box_head{
	width: 1680px;	
}
.miaov_box_head li{
	width:140px; 
	float:left;
	text-align: center;
}
a{
	text-decoration:none;
	font: 12px/18px "Lucida Grande","Lucida Sans Unicode",Helvetica,Arial,Verdana,sans-serif;
	color:#7F7F7F;
}
.miaov_box_head li a:hover{color:#333;}
.miaov_box_foot{
	height:30px; 
	text-align:center; 
	background:#fff; 
	overflow:hidden;
	background:url(img/nav_bg.png) no-repeat 0 0;
	background:-moz-linear-gradient(center bottom, rgba(223,223,223,1) 0%, rgba(242,242,242,1) 66%, rgba(242,242,242,1) 90%, rgba(230,230,230,1) 93%, rgba(190,190,190,1) 96%, rgba(150,150,150,1) 100%);
	background:-webkit-gradient(linear, left bottom, left top, from(rgba(223,223,223,1)), color-stop(66%, rgba(242,242,242,1)), color-stop(90%, rgba(242,242,242,1)), color-stop(93%, rgba(230,230,230,1)), color-stop(96%, rgba(210,210,210,1)), to(rgba(140,140,140,1)));
	border-bottom:1px solid #ebebeb;
	position:relative;
}
.caret{
	background: url(img/caret_active.gif) no-repeat scroll 0 0;
    display: block;
    height: 8px;
    margin: 0 0 -8px -7px;
    position: absolute;
    width: 15px;
}
.miaov_box_foot a{
 	display: inline-block;
    margin: 0 15px;
    padding: 8px 0 6px;
	cursor:pointer;
    text-shadow: 0 1px 0 #FFFFFF;
}
.miaov_box_foot .show{
    cursor: default;
    color:#2B2B2B;	
}
.miaov_box_foot a:hover{color:#000;}
.miaov{height:36px;line-height:26px;text-align:center;position:fixed;_position:absolute;bottom:0;width:100%;}
.miaov a{color:#777;font-size:16px;}
.miaov a:hover{color:#555;}
.miaov_head{height:36px;width:980px;overflow:hidden;margin:0 auto;}
.miaov_head .left{float:left;}
.miaov_head .right{float:right;}
.miaov_head a{line-height:36px;color:#777;}
.miaov_head a:hover{color:#555;}
</style>
<script type="text/javascript" src="miaov.js"><\/script>
<script type="text/javascript">
function getByClass(oParent, sClass)
{
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var i=0;
	
	for(i=0;i<aEle.length;i++)
	{
		if(aEle[i].className==sClass)
		{
			aResult.push(aEle[i]);
		}
	}
	
	return aResult;
}

window.onload=function ()
{
	var oDiv=document.getElementById('div1');
	var aLi=getByClass(oDiv, 'miaov_box_head')[0].getElementsByTagName('li');
	var aBtn=getByClass(oDiv, 'miaov_box_foot')[0].getElementsByTagName('a');
	var oCaret=getByClass(oDiv, 'caret')[0];
	var aPos=[];
	var timer=null;
	var i=0;
	
	for(i=0;i<aLi.length;i++)
	{
		aLi[i].index=i;
		aPos[i]=aLi[i].offsetLeft;
	}
	
	for(i=0;i<aLi.length;i++)
	{
		aLi[i].style.position='absolute';
		aLi[i].style.left=aPos[i]+'px';
	}
	
	aBtn[0].onclick=function ()
	{
		var i=aLi.length-1;
		
		clearTimeout(timer);
		
		function next()
		{
			var obj=aLi[i];
			if(i>=aLi.length/2)
			{
				miaovStartMove(aLi[i], {left: 900}, MIAOV_MOVE_TYPE.FLEX);
				timer=setTimeout(next, 100);
				i--;
			}
			else
			{
				timer=setTimeout(next2, 150);
			}
		}
		
		function next2()
		{
			if(i>=0)
			{
				miaovStartMove(aLi[i], {left: aPos[i]}, MIAOV_MOVE_TYPE.FLEX);
				timer=setTimeout(next2, 100);
			}
			i--;
		}
		
		next();
		
		aBtn[1].className='';
		this.className='show';
		miaovStartMove(oCaret, {left: this.offsetLeft+this.offsetWidth/2}, MIAOV_MOVE_TYPE.BUFFER);
	};
	
	aBtn[1].onclick=function ()
	{
		var i=0;
		
		clearTimeout(timer);
		
		function next()
		{
			var obj=aLi[i];
			if(i<aLi.length/2)
			{
				miaovStartMove(aLi[i], {left: -200}, MIAOV_MOVE_TYPE.FLEX);
				timer=setTimeout(next, 100);
				i++;
			}
			else if(i==aLi.length/2)
			{
				timer=setTimeout(next2, 150);
			}
		}
		
		function next2()
		{
			if(i<aLi.length)
			{
				miaovStartMove(aLi[i], {left: aPos[i-aLi.length/2]}, MIAOV_MOVE_TYPE.FLEX);
				timer=setTimeout(next2, 100);
			}
			i++;
		}
		
		next();
		
		aBtn[0].className='';
		this.className='show';
		miaovStartMove(oCaret, {left: this.offsetLeft+this.offsetWidth/2}, MIAOV_MOVE_TYPE.BUFFER);
	};
};
<\/script>
</head>

<body>
<div class='miaov_head'>
	<a href="http://www.sitejs.com" target="_blank" class='left'>网页特效　http://www.sitejs.com</a>
	<a href="http://www.sitejs.com" target="_blank" class='right'>网页素材</a>
</div>
<div id="div1" class="page">
	<div class="miaov_box">
			<ul class="miaov_box_head">
				<li><a href="http://www.sitejs.com"><img src="img/1.jpg" alt=""/>iPod shuffle</a></li>
				<li><a href="http://www.sitejs.com"><img src="img/2.jpg" alt=""/>iPod nano</a></li>
				<li><a href="http://www.sitejs.com"><img src="img/3.jpg" alt=""/>iPod classic</a></li>
				<li><a href="http://www.sitejs.com"><img src="img/4.jpg" alt=""/>iPod touch</a></li>
				<li><a href="http://www.sitejs.com"><img src="img/5.jpg" alt=""/>Apple TV</a></li>
				<li><a href="http://www.sitejs.com"><img src="img/6.jpg" alt=""/>Accessories</a></li>
				<li><a href="http://www.sitejs.com"><img src="img/7.jpg" alt=""/>Download iTunes 10</a></li>
				<li><a href="http://www.sitejs.com"><img src="img/8.jpg" alt=""/>iTunes Gift Cards</a></li>
				<li><a href="http://www.sitejs.com"><img src="img/9.jpg" alt=""/>Nike + iPod</a></li>
				<li><a href="http://www.sitejs.com"><img src="img/10.jpg" alt=""/>(PRODUCT) RED</a></li>
				<li><a href="http://www.sitejs.com"><img src="img/11.jpg" alt=""/>MobileMe</a></li>
				<li><a href="http://www.sitejs.com"><img src="img/12.jpg" alt=""/>In-Ear Headphones</a></li>
			</ul>
	</div>
	<div class="miaov_box_foot">
		<span style="left: 424px;" class="caret"></span>
		<a class="show">Products</a>
		<a>iTunes and more</a>
	</div>
</div>
</body>
</html>
`
  },
  {
    id:'repo14', icon:'☑️', title:"复选框动效", desc:"自定义复选框动画", group:'component',
    repo:{ dir:"checkbox", file:"checkbox.html", rel:'checkbox/checkbox.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .checkBoxClass{
            display: none;
        }
        .checkBoxLabel{
            background: url("images/UnCheck.png") no-repeat;
            padding-left: 30px;
            padding-top: 3px;
            margin: 5px;
            height: 25px;
            width: 50px;
            display: block;
            cursor: pointer;
        }
        .checkBoxLabel:hover{
            text-decoration: underline;
        }
        .checkBoxSelected{
            background: url("images/Check.png") no-repeat;
        }
    </style>
</head>
<body>
<input id="checkbox1" class="checkBoxClass" type="checkbox"/>
<label for="checkbox1" class="checkBoxLabel">选项1</label>
<input id="checkbox2" class="checkBoxClass" type="checkbox"/>
<label for="checkbox2" class="checkBoxLabel">选项2</label>
</body>
<script src="js/jquery-1.9.1.min.js"><\/script>
<script>
    $('.checkBoxClass').on('change',function(){
        if($(this).is(':checked')){
            $(this).next().addClass('checkBoxSelected');
        }else{
            $(this).next().removeClass('checkBoxSelected');
        }
    });
<\/script>
</html>`
  },
  {
    id:'repo15', icon:'✋', title:"元素拖拽", desc:"鼠标拖拽元素", group:'interact',
    repo:{ dir:"cookie,jsonp,拖拽等综合", file:"拖拽.html", rel:'cookie%2Cjsonp%2C%E6%8B%96%E6%8B%BD%E7%AD%89%E7%BB%BC%E5%90%88/%E6%8B%96%E6%8B%BD.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>拖拽</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
        }

        img{
            width:300px;
            height:200px;

        }
        div{
            position:absolute;
            width:300px;
            height:200px;
            border:1px solid red;
        }
    </style>
</head>
<body>
<div id="test">
    11111111111111
    <img src="han1.jpg" alt=""/>
</div>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
    $(function(){
        var mydiv=document.getElementById('test');
        mydiv.onmousedown=function(e){
            var ev=e||window.event;
            var disX=ev.clientX-mydiv.offsetLeft;
            var disY=ev.clientY-mydiv.offsetTop;
            if(mydiv.setCapture){
                mydiv.setCapture();//解决IE8以下文本层问题
            }
            document.onmousemove=function(e){
                var ev=e||window.event;
                mydiv.style.left=ev.clientX-disX+'px';
                mydiv.style.top=ev.clientY-disY+'px';
            };
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
                if(mydiv.releaseCapture){
                    mydiv.releaseCapture();
                }
            };
            return false;
        }
    });
<\/script>
</html>`
  },
  {
    id:'repo16', icon:'🍎', title:"自由落体", desc:"物理自由落体模拟", group:'game',
    repo:{ dir:"cookie,jsonp,拖拽等综合", file:"自由落体.html", rel:'cookie%2Cjsonp%2C%E6%8B%96%E6%8B%BD%E7%AD%89%E7%BB%BC%E5%90%88/%E8%87%AA%E7%94%B1%E8%90%BD%E4%BD%93.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>自由落体</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
        }
        #mydiv{
            width:100px;
            height:100px;
            background:red;
            position:absolute;
        }
    </style>
</head>
<body>
<input id="mybtn" type="button" value="点击"/>
<div id="mydiv"></div>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
    $(function(){
        var btn=document.getElementById('mybtn');
        var mydiv=document.getElementById('mydiv');
        var iSpeed=0;
        var timer=null;
        btn.onclick=function(){
            startMove();
        };
        function startMove(){
            clearInterval(timer);
            timer=setInterval(function(){
                iSpeed+=3;//加速运动，模拟下落过程
                var T=mydiv.offsetTop+iSpeed;
                if(T>=(document.documentElement.clientHeight-mydiv.offsetHeight)){
                    T=document.documentElement.clientHeight-mydiv.offsetHeight;
                    iSpeed=-iSpeed;
                    iSpeed*=0.75;//摩擦系数，相当于每次弹回都会损失速度
                }
                mydiv.style.top=T+'px';
            },30)
        }
    });
<\/script>
</html>`
  },
  {
    id:'repo17', icon:'💥', title:"碰撞检测", desc:"元素碰撞检测", group:'game',
    repo:{ dir:"cookie,jsonp,拖拽等综合", file:"碰撞.html", rel:'cookie%2Cjsonp%2C%E6%8B%96%E6%8B%BD%E7%AD%89%E7%BB%BC%E5%90%88/%E7%A2%B0%E6%92%9E.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>碰撞</title>
    <!--<link rel="stylesheet" href="css/test.css">-->
    <style type="text/css">
        *{
            margin:0;
            padding:0;
        }
        #mydiv{
            width:100px;
            height:100px;
            background:red;
            position:absolute;
        }
    </style>
</head>
<body>
<div id="mydiv"></div>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
    $(function(){
        var mydiv=document.getElementById('mydiv');
        var iSpeedX=10;
        var iSpeedY=10;
        startMove();
        function startMove(){
            setInterval(function(){
                var newLeft=mydiv.offsetLeft+iSpeedX;
                var newTop=mydiv.offsetTop+iSpeedY;
                if(newTop<=0){
                    newTop=0;
                    iSpeedY=-iSpeedY;
                }
                if(newTop>=(document.documentElement.clientHeight-mydiv.offsetHeight)){//在带有<!DOCTYPE>的页面中用documentElement取代document.body
                    newTop=document.documentElement.clientHeight-mydiv.offsetHeight;
                    iSpeedY=-iSpeedY;
                }
                if(newLeft<=0){
                    newLeft=0;
                    iSpeedX=-iSpeedX;
                }
                if(newLeft>=(document.documentElement.clientWidth-mydiv.offsetWidth)){
                    newLeft=document.documentElement.clientWidth-mydiv.offsetWidth;
                    iSpeedX=-iSpeedX;
                }
                mydiv.style.left=newLeft+'px';//原生js中px不能少
                mydiv.style.top=newTop+'px';
            },20);
        }
    });
<\/script>
</html>`
  },
  {
    id:'repo18', icon:'🗺️', title:"ECharts 地图", desc:"ECharts 地图扩展实例", group:'visual',
    repo:{ dir:"echarts-实例/地图扩展", file:"map.html", rel:'echarts-%E5%AE%9E%E4%BE%8B/%E5%9C%B0%E5%9B%BE%E6%89%A9%E5%B1%95/map.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        #main{
            width: 100%;
            height: 400px;
        }
    </style>
</head>
<body>
<div id="main"></div>
</body>
<script src="js/jquery-1.9.1.min.js"><\/script>
<!--1.直接js引入的话，echarts必须用下面的-->
<script src="js/echarts-all.js"><\/script>
<script>
    var cityMap={
        "成都市":"510100"
    };
    var mapType=[];
    var mapGeoData = echarts.util.mapData.params;
    for (var city in cityMap) {
        mapType.push(city);
        // 自定义扩展图表类型
        mapGeoData.params[city] = {//city
            getGeoJson: (function (c) {//city对应的县级数据
                var geoJsonName = cityMap[c];
                return function (callback) {
                    $.getJSON('js/' + geoJsonName + '.json', callback);
                }
            })(city)
        }
    }


    option = {
        dataRange: {
            min: 0,
            max: 2500,
            x: 'left',
            y: 'bottom',
            color: ['orange','yellow'],
            text:['高','低'],           // 文本，默认为数值文本
            calculable : true
        },
        tooltip : {
            trigger: 'item',
            formatter: '{b}'
        },
        series : [
            {
                type: 'map',
                mapType: '成都市',
                selectedMode : 'single',
                itemStyle:{
                    normal:{label:{show:true}},
                    emphasis:{label:{show:true}}
                },
                data:[
                    {'name':'温江区','value':'1000'}
                ]
            }
        ]
    };

    var myChart=echarts.init(document.getElementById('main'));
    myChart.setOption(option);



<\/script>
</html>`
  },
  {
    id:'repo19', icon:'🏷️', title:"ECharts 标签", desc:"ECharts 标签引入实例", group:'visual',
    repo:{ dir:"echarts-实例/标签引入", file:"map.html", rel:'echarts-%E5%AE%9E%E4%BE%8B/%E6%A0%87%E7%AD%BE%E5%BC%95%E5%85%A5/map.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        #main{
            width: 100%;
            height: 400px;
        }
    </style>
</head>
<body>
<div id="main"></div>
</body>
<script src="js/jquery-1.9.1.min.js"><\/script>
<!--1.直接js引入的话，echarts必须用下面的-->
<script src="js/echarts-all.js"><\/script>
<script>
option = {
    tooltip : {
        trigger: 'item'
    },
    toolbox: {
        show : true,
        orient: 'vertical',
        x:'right',
        y:'center',
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false}
        }
    },
    series : [
        {
            tooltip: {
                trigger: 'item',
                formatter: '{b}'
            },
            name: '选择器',
            type: 'map',
            mapType: 'china',
            mapLocation: {
                x: 'left',
                y: 'top',
                width: '30%'
            },
            roam: true,
            selectedMode : 'single',
            itemStyle:{
                //normal:{label:{show:true}},
                emphasis:{label:{show:true}}
            },
            data:[
                {name: '北京', selected:false},
                {name: '天津', selected:false},
                {name: '上海', selected:false},
                {name: '重庆', selected:false},
                {name: '河北', selected:false},
                {name: '河南', selected:false},
                {name: '云南', selected:false},
                {name: '辽宁', selected:false},
                {name: '黑龙江', selected:false},
                {name: '湖南', selected:false},
                {name: '安徽', selected:false},
                {name: '山东', selected:false},
                {name: '新疆', selected:false},
                {name: '江苏', selected:false},
                {name: '浙江', selected:false},
                {name: '江西', selected:false},
                {name: '湖北', selected:false},
                {name: '广西', selected:false},
                {name: '甘肃', selected:false},
                {name: '山西', selected:false},
                {name: '内蒙古', selected:false},
                {name: '陕西', selected:false},
                {name: '吉林', selected:false},
                {name: '福建', selected:false},
                {name: '贵州', selected:false},
                {name: '广东', selected:false},
                {name: '青海', selected:false},
                {name: '西藏', selected:false},
                {name: '四川', selected:false},
                {name: '宁夏', selected:false},
                {name: '海南', selected:false},
                {name: '台湾', selected:false},
                {name: '香港', selected:false},
                {name: '澳门', selected:false}
            ]
        }
    ],
    animation: false
};
var ecConfig = echarts.config;  //2.这里不能用模块化写法
var myChart=echarts.init(document.getElementById('main'));
myChart.setOption(option, true);  //3.必须要初始化一次
myChart.on(ecConfig.EVENT.MAP_SELECTED, function (param){
    var selected = param.selected;
    var selectedProvince;
    var name;
    for (var i = 0, l = option.series[0].data.length; i < l; i++) {
        name = option.series[0].data[i].name;
        option.series[0].data[i].selected = selected[name];
        if (selected[name]) {
            selectedProvince = name;
        }
    }
    if (typeof selectedProvince == 'undefined') {
        option.series.splice(1);
        option.legend = null;
        option.dataRange = null;
        myChart.setOption(option, true);
        return;
    }
    option.series[1] = {
        name: '随机数据',
        type: 'map',
        mapType: selectedProvince,
        itemStyle:{
            normal:{label:{show:true}},
            emphasis:{label:{show:true}}
        },
        mapLocation: {
            x: '35%'
        },
        roam: true,
        data:[
            {name: '重庆市',value: Math.round(Math.random()*1000)},
            {name: '北京市',value: Math.round(Math.random()*1000)},
            {name: '天津市',value: Math.round(Math.random()*1000)},
            {name: '上海市',value: Math.round(Math.random()*1000)},
            {name: '香港',value: Math.round(Math.random()*1000)},
            {name: '澳门',value: Math.round(Math.random()*1000)},
            {name: '巴音郭楞蒙古自治州',value: Math.round(Math.random()*1000)},
            {name: '和田地区',value: Math.round(Math.random()*1000)},
            {name: '哈密地区',value: Math.round(Math.random()*1000)},
            {name: '阿克苏地区',value: Math.round(Math.random()*1000)},
            {name: '阿勒泰地区',value: Math.round(Math.random()*1000)},
            {name: '喀什地区',value: Math.round(Math.random()*1000)},
            {name: '塔城地区',value: Math.round(Math.random()*1000)},
            {name: '昌吉回族自治州',value: Math.round(Math.random()*1000)},
            {name: '克孜勒苏柯尔克孜自治州',value: Math.round(Math.random()*1000)},
            {name: '吐鲁番地区',value: Math.round(Math.random()*1000)},
            {name: '伊犁哈萨克自治州',value: Math.round(Math.random()*1000)},
            {name: '博尔塔拉蒙古自治州',value: Math.round(Math.random()*1000)},
            {name: '乌鲁木齐市',value: Math.round(Math.random()*1000)},
            {name: '克拉玛依市',value: Math.round(Math.random()*1000)},
            {name: '阿拉尔市',value: Math.round(Math.random()*1000)},
            {name: '图木舒克市',value: Math.round(Math.random()*1000)},
            {name: '五家渠市',value: Math.round(Math.random()*1000)},
            {name: '石河子市',value: Math.round(Math.random()*1000)},
            {name: '那曲地区',value: Math.round(Math.random()*1000)},
            {name: '阿里地区',value: Math.round(Math.random()*1000)},
            {name: '日喀则地区',value: Math.round(Math.random()*1000)},
            {name: '林芝地区',value: Math.round(Math.random()*1000)},
            {name: '昌都地区',value: Math.round(Math.random()*1000)},
            {name: '山南地区',value: Math.round(Math.random()*1000)},
            {name: '拉萨市',value: Math.round(Math.random()*1000)},
            {name: '呼伦贝尔市',value: Math.round(Math.random()*1000)},
            {name: '阿拉善盟',value: Math.round(Math.random()*1000)},
            {name: '锡林郭勒盟',value: Math.round(Math.random()*1000)},
            {name: '鄂尔多斯市',value: Math.round(Math.random()*1000)},
            {name: '赤峰市',value: Math.round(Math.random()*1000)},
            {name: '巴彦淖尔市',value: Math.round(Math.random()*1000)},
            {name: '通辽市',value: Math.round(Math.random()*1000)},
            {name: '乌兰察布市',value: Math.round(Math.random()*1000)},
            {name: '兴安盟',value: Math.round(Math.random()*1000)},
            {name: '包头市',value: Math.round(Math.random()*1000)},
            {name: '呼和浩特市',value: Math.round(Math.random()*1000)},
            {name: '乌海市',value: Math.round(Math.random()*1000)},
            {name: '海西蒙古族藏族自治州',value: Math.round(Math.random()*1000)},
            {name: '玉树藏族自治州',value: Math.round(Math.random()*1000)},
            {name: '果洛藏族自治州',value: Math.round(Math.random()*1000)},
            {name: '海南藏族自治州',value: Math.round(Math.random()*1000)},
            {name: '海北藏族自治州',value: Math.round(Math.random()*1000)},
            {name: '黄南藏族自治州',value: Math.round(Math.random()*1000)},
            {name: '海东地区',value: Math.round(Math.random()*1000)},
            {name: '西宁市',value: Math.round(Math.random()*1000)},
            {name: '甘孜藏族自治州',value: Math.round(Math.random()*1000)},
            {name: '阿坝藏族羌族自治州',value: Math.round(Math.random()*1000)},
            {name: '凉山彝族自治州',value: Math.round(Math.random()*1000)},
            {name: '绵阳市',value: Math.round(Math.random()*1000)},
            {name: '达州市',value: Math.round(Math.random()*1000)},
            {name: '广元市',value: Math.round(Math.random()*1000)},
            {name: '雅安市',value: Math.round(Math.random()*1000)},
            {name: '宜宾市',value: Math.round(Math.random()*1000)},
            {name: '乐山市',value: Math.round(Math.random()*1000)},
            {name: '南充市',value: Math.round(Math.random()*1000)},
            {name: '巴中市',value: Math.round(Math.random()*1000)},
            {name: '泸州市',value: Math.round(Math.random()*1000)},
            {name: '成都市',value: Math.round(Math.random()*1000)},
            {name: '资阳市',value: Math.round(Math.random()*1000)},
            {name: '攀枝花市',value: Math.round(Math.random()*1000)},
            {name: '眉山市',value: Math.round(Math.random()*1000)},
            {name: '广安市',value: Math.round(Math.random()*1000)},
            {name: '德阳市',value: Math.round(Math.random()*1000)},
            {name: '内江市',value: Math.round(Math.random()*1000)},
            {name: '遂宁市',value: Math.round(Math.random()*1000)},
            {name: '自贡市',value: Math.round(Math.random()*1000)},
            {name: '黑河市',value: Math.round(Math.random()*1000)},
            {name: '大兴安岭地区',value: Math.round(Math.random()*1000)},
            {name: '哈尔滨市',value: Math.round(Math.random()*1000)},
            {name: '齐齐哈尔市',value: Math.round(Math.random()*1000)},
            {name: '牡丹江市',value: Math.round(Math.random()*1000)},
            {name: '绥化市',value: Math.round(Math.random()*1000)},
            {name: '伊春市',value: Math.round(Math.random()*1000)},
            {name: '佳木斯市',value: Math.round(Math.random()*1000)},
            {name: '鸡西市',value: Math.round(Math.random()*1000)},
            {name: '双鸭山市',value: Math.round(Math.random()*1000)},
            {name: '大庆市',value: Math.round(Math.random()*1000)},
            {name: '鹤岗市',value: Math.round(Math.random()*1000)},
            {name: '七台河市',value: Math.round(Math.random()*1000)},
            {name: '酒泉市',value: Math.round(Math.random()*1000)},
            {name: '张掖市',value: Math.round(Math.random()*1000)},
            {name: '甘南藏族自治州',value: Math.round(Math.random()*1000)},
            {name: '武威市',value: Math.round(Math.random()*1000)},
            {name: '陇南市',value: Math.round(Math.random()*1000)},
            {name: '庆阳市',value: Math.round(Math.random()*1000)},
            {name: '白银市',value: Math.round(Math.random()*1000)},
            {name: '定西市',value: Math.round(Math.random()*1000)},
            {name: '天水市',value: Math.round(Math.random()*1000)},
            {name: '兰州市',value: Math.round(Math.random()*1000)},
            {name: '平凉市',value: Math.round(Math.random()*1000)},
            {name: '临夏回族自治州',value: Math.round(Math.random()*1000)},
            {name: '金昌市',value: Math.round(Math.random()*1000)},
            {name: '嘉峪关市',value: Math.round(Math.random()*1000)},
            {name: '普洱市',value: Math.round(Math.random()*1000)},
            {name: '红河哈尼族彝族自治州',value: Math.round(Math.random()*1000)},
            {name: '文山壮族苗族自治州',value: Math.round(Math.random()*1000)},
            {name: '曲靖市',value: Math.round(Math.random()*1000)},
            {name: '楚雄彝族自治州',value: Math.round(Math.random()*1000)},
            {name: '大理白族自治州',value: Math.round(Math.random()*1000)},
            {name: '临沧市',value: Math.round(Math.random()*1000)},
            {name: '迪庆藏族自治州',value: Math.round(Math.random()*1000)},
            {name: '昭通市',value: Math.round(Math.random()*1000)},
            {name: '昆明市',value: Math.round(Math.random()*1000)},
            {name: '丽江市',value: Math.round(Math.random()*1000)},
            {name: '西双版纳傣族自治州',value: Math.round(Math.random()*1000)},
            {name: '保山市',value: Math.round(Math.random()*1000)},
            {name: '玉溪市',value: Math.round(Math.random()*1000)},
            {name: '怒江傈僳族自治州',value: Math.round(Math.random()*1000)},
            {name: '德宏傣族景颇族自治州',value: Math.round(Math.random()*1000)},
            {name: '百色市',value: Math.round(Math.random()*1000)},
            {name: '河池市',value: Math.round(Math.random()*1000)},
            {name: '桂林市',value: Math.round(Math.random()*1000)},
            {name: '南宁市',value: Math.round(Math.random()*1000)},
            {name: '柳州市',value: Math.round(Math.random()*1000)},
            {name: '崇左市',value: Math.round(Math.random()*1000)},
            {name: '来宾市',value: Math.round(Math.random()*1000)},
            {name: '玉林市',value: Math.round(Math.random()*1000)},
            {name: '梧州市',value: Math.round(Math.random()*1000)},
            {name: '贺州市',value: Math.round(Math.random()*1000)},
            {name: '钦州市',value: Math.round(Math.random()*1000)},
            {name: '贵港市',value: Math.round(Math.random()*1000)},
            {name: '防城港市',value: Math.round(Math.random()*1000)},
            {name: '北海市',value: Math.round(Math.random()*1000)},
            {name: '怀化市',value: Math.round(Math.random()*1000)},
            {name: '永州市',value: Math.round(Math.random()*1000)},
            {name: '邵阳市',value: Math.round(Math.random()*1000)},
            {name: '郴州市',value: Math.round(Math.random()*1000)},
            {name: '常德市',value: Math.round(Math.random()*1000)},
            {name: '湘西土家族苗族自治州',value: Math.round(Math.random()*1000)},
            {name: '衡阳市',value: Math.round(Math.random()*1000)},
            {name: '岳阳市',value: Math.round(Math.random()*1000)},
            {name: '益阳市',value: Math.round(Math.random()*1000)},
            {name: '长沙市',value: Math.round(Math.random()*1000)},
            {name: '株洲市',value: Math.round(Math.random()*1000)},
            {name: '张家界市',value: Math.round(Math.random()*1000)},
            {name: '娄底市',value: Math.round(Math.random()*1000)},
            {name: '湘潭市',value: Math.round(Math.random()*1000)},
            {name: '榆林市',value: Math.round(Math.random()*1000)},
            {name: '延安市',value: Math.round(Math.random()*1000)},
            {name: '汉中市',value: Math.round(Math.random()*1000)},
            {name: '安康市',value: Math.round(Math.random()*1000)},
            {name: '商洛市',value: Math.round(Math.random()*1000)},
            {name: '宝鸡市',value: Math.round(Math.random()*1000)},
            {name: '渭南市',value: Math.round(Math.random()*1000)},
            {name: '咸阳市',value: Math.round(Math.random()*1000)},
            {name: '西安市',value: Math.round(Math.random()*1000)},
            {name: '铜川市',value: Math.round(Math.random()*1000)},
            {name: '清远市',value: Math.round(Math.random()*1000)},
            {name: '韶关市',value: Math.round(Math.random()*1000)},
            {name: '湛江市',value: Math.round(Math.random()*1000)},
            {name: '梅州市',value: Math.round(Math.random()*1000)},
            {name: '河源市',value: Math.round(Math.random()*1000)},
            {name: '肇庆市',value: Math.round(Math.random()*1000)},
            {name: '惠州市',value: Math.round(Math.random()*1000)},
            {name: '茂名市',value: Math.round(Math.random()*1000)},
            {name: '江门市',value: Math.round(Math.random()*1000)},
            {name: '阳江市',value: Math.round(Math.random()*1000)},
            {name: '云浮市',value: Math.round(Math.random()*1000)},
            {name: '广州市',value: Math.round(Math.random()*1000)},
            {name: '汕尾市',value: Math.round(Math.random()*1000)},
            {name: '揭阳市',value: Math.round(Math.random()*1000)},
            {name: '珠海市',value: Math.round(Math.random()*1000)},
            {name: '佛山市',value: Math.round(Math.random()*1000)},
            {name: '潮州市',value: Math.round(Math.random()*1000)},
            {name: '汕头市',value: Math.round(Math.random()*1000)},
            {name: '深圳市',value: Math.round(Math.random()*1000)},
            {name: '东莞市',value: Math.round(Math.random()*1000)},
            {name: '中山市',value: Math.round(Math.random()*1000)},
            {name: '延边朝鲜族自治州',value: Math.round(Math.random()*1000)},
            {name: '吉林市',value: Math.round(Math.random()*1000)},
            {name: '白城市',value: Math.round(Math.random()*1000)},
            {name: '松原市',value: Math.round(Math.random()*1000)},
            {name: '长春市',value: Math.round(Math.random()*1000)},
            {name: '白山市',value: Math.round(Math.random()*1000)},
            {name: '通化市',value: Math.round(Math.random()*1000)},
            {name: '四平市',value: Math.round(Math.random()*1000)},
            {name: '辽源市',value: Math.round(Math.random()*1000)},
            {name: '承德市',value: Math.round(Math.random()*1000)},
            {name: '张家口市',value: Math.round(Math.random()*1000)},
            {name: '保定市',value: Math.round(Math.random()*1000)},
            {name: '唐山市',value: Math.round(Math.random()*1000)},
            {name: '沧州市',value: Math.round(Math.random()*1000)},
            {name: '石家庄市',value: Math.round(Math.random()*1000)},
            {name: '邢台市',value: Math.round(Math.random()*1000)},
            {name: '邯郸市',value: Math.round(Math.random()*1000)},
            {name: '秦皇岛市',value: Math.round(Math.random()*1000)},
            {name: '衡水市',value: Math.round(Math.random()*1000)},
            {name: '廊坊市',value: Math.round(Math.random()*1000)},
            {name: '恩施土家族苗族自治州',value: Math.round(Math.random()*1000)},
            {name: '十堰市',value: Math.round(Math.random()*1000)},
            {name: '宜昌市',value: Math.round(Math.random()*1000)},
            {name: '襄樊市',value: Math.round(Math.random()*1000)},
            {name: '黄冈市',value: Math.round(Math.random()*1000)},
            {name: '荆州市',value: Math.round(Math.random()*1000)},
            {name: '荆门市',value: Math.round(Math.random()*1000)},
            {name: '咸宁市',value: Math.round(Math.random()*1000)},
            {name: '随州市',value: Math.round(Math.random()*1000)},
            {name: '孝感市',value: Math.round(Math.random()*1000)},
            {name: '武汉市',value: Math.round(Math.random()*1000)},
            {name: '黄石市',value: Math.round(Math.random()*1000)},
            {name: '神农架林区',value: Math.round(Math.random()*1000)},
            {name: '天门市',value: Math.round(Math.random()*1000)},
            {name: '仙桃市',value: Math.round(Math.random()*1000)},
            {name: '潜江市',value: Math.round(Math.random()*1000)},
            {name: '鄂州市',value: Math.round(Math.random()*1000)},
            {name: '遵义市',value: Math.round(Math.random()*1000)},
            {name: '黔东南苗族侗族自治州',value: Math.round(Math.random()*1000)},
            {name: '毕节地区',value: Math.round(Math.random()*1000)},
            {name: '黔南布依族苗族自治州',value: Math.round(Math.random()*1000)},
            {name: '铜仁地区',value: Math.round(Math.random()*1000)},
            {name: '黔西南布依族苗族自治州',value: Math.round(Math.random()*1000)},
            {name: '六盘水市',value: Math.round(Math.random()*1000)},
            {name: '安顺市',value: Math.round(Math.random()*1000)},
            {name: '贵阳市',value: Math.round(Math.random()*1000)},
            {name: '烟台市',value: Math.round(Math.random()*1000)},
            {name: '临沂市',value: Math.round(Math.random()*1000)},
            {name: '潍坊市',value: Math.round(Math.random()*1000)},
            {name: '青岛市',value: Math.round(Math.random()*1000)},
            {name: '菏泽市',value: Math.round(Math.random()*1000)},
            {name: '济宁市',value: Math.round(Math.random()*1000)},
            {name: '德州市',value: Math.round(Math.random()*1000)},
            {name: '滨州市',value: Math.round(Math.random()*1000)},
            {name: '聊城市',value: Math.round(Math.random()*1000)},
            {name: '东营市',value: Math.round(Math.random()*1000)},
            {name: '济南市',value: Math.round(Math.random()*1000)},
            {name: '泰安市',value: Math.round(Math.random()*1000)},
            {name: '威海市',value: Math.round(Math.random()*1000)},
            {name: '日照市',value: Math.round(Math.random()*1000)},
            {name: '淄博市',value: Math.round(Math.random()*1000)},
            {name: '枣庄市',value: Math.round(Math.random()*1000)},
            {name: '莱芜市',value: Math.round(Math.random()*1000)},
            {name: '赣州市',value: Math.round(Math.random()*1000)},
            {name: '吉安市',value: Math.round(Math.random()*1000)},
            {name: '上饶市',value: Math.round(Math.random()*1000)},
            {name: '九江市',value: Math.round(Math.random()*1000)},
            {name: '抚州市',value: Math.round(Math.random()*1000)},
            {name: '宜春市',value: Math.round(Math.random()*1000)},
            {name: '南昌市',value: Math.round(Math.random()*1000)},
            {name: '景德镇市',value: Math.round(Math.random()*1000)},
            {name: '萍乡市',value: Math.round(Math.random()*1000)},
            {name: '鹰潭市',value: Math.round(Math.random()*1000)},
            {name: '新余市',value: Math.round(Math.random()*1000)},
            {name: '南阳市',value: Math.round(Math.random()*1000)},
            {name: '信阳市',value: Math.round(Math.random()*1000)},
            {name: '洛阳市',value: Math.round(Math.random()*1000)},
            {name: '驻马店市',value: Math.round(Math.random()*1000)},
            {name: '周口市',value: Math.round(Math.random()*1000)},
            {name: '商丘市',value: Math.round(Math.random()*1000)},
            {name: '三门峡市',value: Math.round(Math.random()*1000)},
            {name: '新乡市',value: Math.round(Math.random()*1000)},
            {name: '平顶山市',value: Math.round(Math.random()*1000)},
            {name: '郑州市',value: Math.round(Math.random()*1000)},
            {name: '安阳市',value: Math.round(Math.random()*1000)},
            {name: '开封市',value: Math.round(Math.random()*1000)},
            {name: '焦作市',value: Math.round(Math.random()*1000)},
            {name: '许昌市',value: Math.round(Math.random()*1000)},
            {name: '濮阳市',value: Math.round(Math.random()*1000)},
            {name: '漯河市',value: Math.round(Math.random()*1000)},
            {name: '鹤壁市',value: Math.round(Math.random()*1000)},
            {name: '大连市',value: Math.round(Math.random()*1000)},
            {name: '朝阳市',value: Math.round(Math.random()*1000)},
            {name: '丹东市',value: Math.round(Math.random()*1000)},
            {name: '铁岭市',value: Math.round(Math.random()*1000)},
            {name: '沈阳市',value: Math.round(Math.random()*1000)},
            {name: '抚顺市',value: Math.round(Math.random()*1000)},
            {name: '葫芦岛市',value: Math.round(Math.random()*1000)},
            {name: '阜新市',value: Math.round(Math.random()*1000)},
            {name: '锦州市',value: Math.round(Math.random()*1000)},
            {name: '鞍山市',value: Math.round(Math.random()*1000)},
            {name: '本溪市',value: Math.round(Math.random()*1000)},
            {name: '营口市',value: Math.round(Math.random()*1000)},
            {name: '辽阳市',value: Math.round(Math.random()*1000)},
            {name: '盘锦市',value: Math.round(Math.random()*1000)},
            {name: '忻州市',value: Math.round(Math.random()*1000)},
            {name: '吕梁市',value: Math.round(Math.random()*1000)},
            {name: '临汾市',value: Math.round(Math.random()*1000)},
            {name: '晋中市',value: Math.round(Math.random()*1000)},
            {name: '运城市',value: Math.round(Math.random()*1000)},
            {name: '大同市',value: Math.round(Math.random()*1000)},
            {name: '长治市',value: Math.round(Math.random()*1000)},
            {name: '朔州市',value: Math.round(Math.random()*1000)},
            {name: '晋城市',value: Math.round(Math.random()*1000)},
            {name: '太原市',value: Math.round(Math.random()*1000)},
            {name: '阳泉市',value: Math.round(Math.random()*1000)},
            {name: '六安市',value: Math.round(Math.random()*1000)},
            {name: '安庆市',value: Math.round(Math.random()*1000)},
            {name: '滁州市',value: Math.round(Math.random()*1000)},
            {name: '宣城市',value: Math.round(Math.random()*1000)},
            {name: '阜阳市',value: Math.round(Math.random()*1000)},
            {name: '宿州市',value: Math.round(Math.random()*1000)},
            {name: '黄山市',value: Math.round(Math.random()*1000)},
            {name: '巢湖市',value: Math.round(Math.random()*1000)},
            {name: '亳州市',value: Math.round(Math.random()*1000)},
            {name: '池州市',value: Math.round(Math.random()*1000)},
            {name: '合肥市',value: Math.round(Math.random()*1000)},
            {name: '蚌埠市',value: Math.round(Math.random()*1000)},
            {name: '芜湖市',value: Math.round(Math.random()*1000)},
            {name: '淮北市',value: Math.round(Math.random()*1000)},
            {name: '淮南市',value: Math.round(Math.random()*1000)},
            {name: '马鞍山市',value: Math.round(Math.random()*1000)},
            {name: '铜陵市',value: Math.round(Math.random()*1000)},
            {name: '南平市',value: Math.round(Math.random()*1000)},
            {name: '三明市',value: Math.round(Math.random()*1000)},
            {name: '龙岩市',value: Math.round(Math.random()*1000)},
            {name: '宁德市',value: Math.round(Math.random()*1000)},
            {name: '福州市',value: Math.round(Math.random()*1000)},
            {name: '漳州市',value: Math.round(Math.random()*1000)},
            {name: '泉州市',value: Math.round(Math.random()*1000)},
            {name: '莆田市',value: Math.round(Math.random()*1000)},
            {name: '厦门市',value: Math.round(Math.random()*1000)},
            {name: '丽水市',value: Math.round(Math.random()*1000)},
            {name: '杭州市',value: Math.round(Math.random()*1000)},
            {name: '温州市',value: Math.round(Math.random()*1000)},
            {name: '宁波市',value: Math.round(Math.random()*1000)},
            {name: '舟山市',value: Math.round(Math.random()*1000)},
            {name: '台州市',value: Math.round(Math.random()*1000)},
            {name: '金华市',value: Math.round(Math.random()*1000)},
            {name: '衢州市',value: Math.round(Math.random()*1000)},
            {name: '绍兴市',value: Math.round(Math.random()*1000)},
            {name: '嘉兴市',value: Math.round(Math.random()*1000)},
            {name: '湖州市',value: Math.round(Math.random()*1000)},
            {name: '盐城市',value: Math.round(Math.random()*1000)},
            {name: '徐州市',value: Math.round(Math.random()*1000)},
            {name: '南通市',value: Math.round(Math.random()*1000)},
            {name: '淮安市',value: Math.round(Math.random()*1000)},
            {name: '苏州市',value: Math.round(Math.random()*1000)},
            {name: '宿迁市',value: Math.round(Math.random()*1000)},
            {name: '连云港市',value: Math.round(Math.random()*1000)},
            {name: '扬州市',value: Math.round(Math.random()*1000)},
            {name: '南京市',value: Math.round(Math.random()*1000)},
            {name: '泰州市',value: Math.round(Math.random()*1000)},
            {name: '无锡市',value: Math.round(Math.random()*1000)},
            {name: '常州市',value: Math.round(Math.random()*1000)},
            {name: '镇江市',value: Math.round(Math.random()*1000)},
            {name: '吴忠市',value: Math.round(Math.random()*1000)},
            {name: '中卫市',value: Math.round(Math.random()*1000)},
            {name: '固原市',value: Math.round(Math.random()*1000)},
            {name: '银川市',value: Math.round(Math.random()*1000)},
            {name: '石嘴山市',value: Math.round(Math.random()*1000)},
            {name: '儋州市',value: Math.round(Math.random()*1000)},
            {name: '文昌市',value: Math.round(Math.random()*1000)},
            {name: '乐东黎族自治县',value: Math.round(Math.random()*1000)},
            {name: '三亚市',value: Math.round(Math.random()*1000)},
            {name: '琼中黎族苗族自治县',value: Math.round(Math.random()*1000)},
            {name: '东方市',value: Math.round(Math.random()*1000)},
            {name: '海口市',value: Math.round(Math.random()*1000)},
            {name: '万宁市',value: Math.round(Math.random()*1000)},
            {name: '澄迈县',value: Math.round(Math.random()*1000)},
            {name: '白沙黎族自治县',value: Math.round(Math.random()*1000)},
            {name: '琼海市',value: Math.round(Math.random()*1000)},
            {name: '昌江黎族自治县',value: Math.round(Math.random()*1000)},
            {name: '临高县',value: Math.round(Math.random()*1000)},
            {name: '陵水黎族自治县',value: Math.round(Math.random()*1000)},
            {name: '屯昌县',value: Math.round(Math.random()*1000)},
            {name: '定安县',value: Math.round(Math.random()*1000)},
            {name: '保亭黎族苗族自治县',value: Math.round(Math.random()*1000)},
            {name: '五指山市',value: Math.round(Math.random()*1000)}
        ]
    };
    option.legend = {
        x:'right',
        data:['随机数据']
    };
    option.dataRange = {
        orient: 'horizontal',
        x: 'right',
        min: 0,
        max: 1000,
        color:['orange','yellow'],
        text:['高','低'],           // 文本，默认为数值文本
        splitNumber:0
    };
    myChart.setOption(option, true);  //4.点击之后还要再次初始化
})
<\/script>
</html>`
  },
  {
    id:'repo20', icon:'📡', title:"ECharts 雷达图", desc:"ECharts 雷达图实例", group:'visual',
    repo:{ dir:"echarts-实例/雷达图", file:"雷达图.html", rel:'echarts-%E5%AE%9E%E4%BE%8B/%E9%9B%B7%E8%BE%BE%E5%9B%BE/%E9%9B%B7%E8%BE%BE%E5%9B%BE.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<div id="radar" style="width: 500px;height: 500px;margin: 0 auto;"></div>
</body>
<script src="../js/jquery-1.9.1.min.js"><\/script>
<script src="../js/echarts-all.js"><\/script>
<script>
    test = echarts.init(document.getElementById('radar'));
    test.showLoading({  //载入动画
        text : '请稍等',
        effect : 'whirling',
        textStyle : {
            fontSize : 14
        }
    });
    var option = {
        color : ['#a9e2fb'],  //控制边框和面积色
        tooltip : {
            trigger: 'axis',
            formatter: function(params){
                return params[0].indicator+'：'+params[0].value;
            },
            textStyle:{
                fontSize:'12px'
            }
        },
        toolbox: {
            show : true,
            feature : {
                restore : {show: true}
            },
            orient:'vertical',
            y:'center'
        },
        calculable: true,
        polar : [
            {
                indicator : [
                    { text : '声誉度' },
                    { text : '口感' },
                    { text : '功能关注度' },
                    { text : '市场占有率' },
                    { text : '品牌' }
                ],
                center : ['50%','50%'],  //控制圆心位置
                radius : 150,
                startAngle: 90,
                splitNumber: 8,
                name : {
                    formatter: '{value}',
                    textStyle: {color:'#000'}
                },
                scale: true,
                type: 'circle',
                axisLine: {            // 坐标轴线
                    show: true,        // 默认显示，属性show控制显示与否
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: '#d6dee6',
                        width: 1,
                        type: 'solid'
                    }
                },
                splitArea : {
                    show : true,
                    areaStyle : {
                        color: ['#edf2f5','#ffffff']
                    }
                }
            }
        ],
        series : [
            {
                name: '雷达图',
                type: 'radar',
                itemStyle: {
                    emphasis: {
                        lineStyle: {
                            width: 4
                        }
                    },
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data : [
                    {
                        value : [100, 8, 0.40, -80, 200],
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    type: 'solid'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    };
    setTimeout(function (){
        test.hideLoading();
        test.setOption(option);
    },1000);
<\/script>
</html>`
  },
  {
    id:'repo21', icon:'📜', title:"全屏滚动 fullPage", desc:"fullPage 整屏滚动", group:'visual',
    repo:{ dir:"fullPage/fullpage实例", file:"fullPage.html", rel:'fullPage/fullpage%E5%AE%9E%E4%BE%8B/fullPage.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="css/jquery.fullPage.css"/>
    <link rel="stylesheet" href="css/index.css"/>
</head>
<body>
<div id="fullPage">
    <div class="section section1">
        <h1>它，终于来了。</h1>
        <p>为了充分发挥体积小巧以及佩戴于手腕的优势，Apple Watch带来全新的科技和互动方式。它可以让你更快速便捷地完成一些早已习惯的事，也<br/>可实现过去根本无法企及的新功能。因此，这将会是焕然一新的使用体验，也将实现与你前所未有的贴近。</p>
        <div class="link-box">
            <a href="#">进一步了解</a>
        </div>
    </div>
    <div class="section section2">
        <h1>真正与你贴近的个人设备</h1>
        <div class="link-box">
            <a href="#">进一步了解</a>
        </div>
    </div>
    <div class="section section3">
        <h1>非同一般的精准计时</h1>
        <p>高级手表向来以计时精准为本，Apple Watch更是如此。它与iPhone配合使用，同全球标准时间的误差不超过50毫秒。而且，你可以对<br/>表盘进行个性化设定，以更具个性和意义的方式显示时间，使其更贴近你的生活和日程需要。</p>
        <div class="link-box">
            <a href="#">进一步了解计时</a>
        </div>
    </div>
    <div class="section section4">
        <h1>在三个特点鲜明的系列中找到你的风格</h1>
        <div class="row">
            <div class="col">
                <div class="pic-box primary">
                    <img src="images/primary_large_2x.jpg"/>
                </div>
                <div class="apple-box">
                    <img src="images/apple.png"/>
                    <span>WATCH</span>
                </div>
                <p>不锈钢或深空黑色不锈钢表壳，蓝宝石水晶镜面，搭配多款时尚表带。</p>
                <div class="link-box">
                    <a href="#">了解更多</a>
                </div>
            </div>
            <div class="col">
                <div class="pic-box sport">
                    <img src="images/sport_large_2x.jpg"/>
                </div>
                <div class="apple-box">
                    <img src="images/apple.png"/>
                    <span>WATCH</span>
                    <span style="font-weight: normal;">SPORT</span>
                </div>
                <p>银色或深空灰色的阳极氧化铝金属外壳，强化 Icon-X 玻璃，搭配靓丽柔<br/>韧的表带。</p>
                <div class="link-box">
                    <a href="#">了解更多</a>
                </div>
            </div>
            <div class="col">
                <div class="pic-box edition">
                    <img src="images/edition_large_2x.jpg"/>
                </div>
                <div class="apple-box">
                    <img src="images/apple.png"/>
                    <span>WATCH</span>
                    <span style="font-weight: normal;">EDITION</span>
                </div>
                <p>18K 黄金或玫瑰金表壳，蓝宝石水晶镜面，搭配精雕细琢的表带及表<br/>扣。</p>
                <div class="link-box">
                    <a href="#">了解更多</a>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
<script src="js/jquery-1.9.1.min.js"><\/script>
<script src="js/jquery.fullPage.min.js"><\/script>
<script src="js/move.js"><\/script>
<script>
    $('#fullPage').fullpage({
        verticalCentered:false,
        navigation:true,
        navigationPosition:'right',
        scrollingSpeed:500,
        continuousVertical:true,
        afterRender:function(){
            move('.section h1').scale(1.5).duration('0.5s').end();
            move('.section p').set('margin-top','5%').duration('0.5s').end();
        },
        afterLoad:function(anchorLink,index){
            switch(index){
                case 1:
                    move('.section1 h1').scale(1.5).duration('0.5s').end();
                    move('.section1 p').set('margin-top','5%').duration('0.5s').end();
                    break;
                case 2:
                    move('.section2 h1').scale(0.7).duration('0.5s').end();
                    break;
                case 3:
                    move('.section3 h1').set('margin-left','0%').duration('0.5s').end();
                    move('.section3 p').set('margin-left','0%').duration('0.5s').end();
                    break;
                case 4:
                    move('.section4 .primary').rotate(360).duration('0.5s').end(function(){
                        move('.section4 .sport').rotate(360).duration('0.5s').end(function(){
                            move('.section4 .edition').rotate(360).duration('0.5s').end();
                        });
                    });
                    break;
            }
        },
        onLeave:function(index,nextIndex,direction ){
            switch(index){
                case 1:
                    move('.section1 h1').scale(1).duration('0.5s').end();
                    move('.section1 p').set('margin-top','900px').duration('0.5s').end();
                    break;
                case 2:
                    move('.section2 h1').scale(1).duration('0.5s').end();
                    break;
                case 3:
                    move('.section3 h1').set('margin-left','-150%').duration('0.5s').end();
                    move('.section3 p').set('margin-left','150%').duration('0.5s').end();
                    break;
                case 4:
                    move('.section4 .primary').rotate(-360).duration('0.5s').end();
                    move('.section4 .sport').rotate(-360).duration('0.5s').end();
                    move('.section4 .edition').rotate(-360).duration('0.5s').end();
                    break;
            }
        }
    });
<\/script>
</html>`
  },
  {
    id:'repo22', icon:'✨', title:"滚动入场动画", desc:"jQuery-aniview 滚动显现", group:'visual',
    repo:{ dir:"jQuery-aniview", file:"index.html", rel:'jQuery-aniview/index.html' },
    code:`﻿<!doctype html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>jQuery页面滚动元素进入视口发生动画特效插件|DEMO_爱编程w2bc.com</title>
	<link rel="stylesheet" type="text/css" href="css/animate.css">
	<link rel="stylesheet" type="text/css" href="http://libs.useso.com/js/bootstrap/3.2.0/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/styles/tomorrow.min.css">
	<link rel="stylesheet" type="text/css" href="css/default.css">
	<link rel="stylesheet" type="text/css" href="css/styles.css">
	<!--[if IE]>
		<script src="http://libs.useso.com/js/html5shiv/3.7/html5shiv.min.js"><\/script>
	<![endif]-->
</head>
<body>
	<article class="htmleaf-container">

		<div class="container">
			<div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <h1 class="text-center title">jQuery AniView</h1>
                    <p class="text-center">A jQuery plugin that works in harmony with animate.css in order to enable animations only when content comes into view.</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-md-offset-3 text-center">
                    <p class="text-center aniview description" av-animation="fadeInUp">
                        jQuery AniView is a minimal (~1KB) jQuery plugin that allows you to add animations to your
                        webpages with nothing more than a class identifier and a single data attribute. There are also a couple of optional... options.<br><br>Scroll down to see how it works!
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-md-offset-3 aniview" av-animation="slideInLeft">
                    <h3>Initialisation:</h3>
                    <pre class="code javascript">$('.aniview').AniView();</pre>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-md-offset-3 aniview" av-animation="slideInUp">
                    <h3>Options:</h3>
                    <pre class="code javascript">
var options = {
    animateThreshold: 100,
    scrollPollInterval: 20
}
$('.aniview').AniView(options);</pre>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-md-offset-3 aniview slow options-table" av-animation="fadeIn">
                    <table class="table table-striped table-bordered">
                        <tr>
                            <td>Option</td><td>Type</td><td>Description</td><td>Default</td>
                        </tr>
                        <tr>
                            <td>animateThreshold</td><td>int</td><td>+ve numbers delay the animation sequence until the specified number pixels have come into view. -ve numbers will trigger the animation sequence prior to the element coming into view.</td><td>0</td>
                        </tr>
                        <tr>
                            <td>scrollPollInterval</td><td>int</td><td>The frequency at which the user scrolling is 'polled' i.e. tested. This is in milliseconds (ms) and is an extension jQuery's in-built 'scroll' event/handler.</td><td>20</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-md-offset-3 aniview" av-animation="slideInRight">
                    <h3>Markup:</h3>
                    <pre class="code html">&lt;div class="aniview" av-animation="slideInRight"&gt;&lt;/div&gt;</pre>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-md-offset-3 aniview more-info" av-animation="bounceInLeft">
                    <p>
                        As you scroll down the page, each animation is triggered when the threshold is met.
                        i.e. when it comes into view by way of the bottom of the user's screen (viewport).
                    </p>
                    <p>
                        Since it uses the freakin awesome <a target="_blank" href="https://daneden.github.io/animate.css/"><span class="animatecss-link">animate.css</span></a> -
                        it supports all of the same animations that <em>it</em> does.
                    </p>
                    <p>
                        All you have to do is simply declare what you want to use via the <em>av-animation</em> attribute.
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-md-offset-3 aniview box red" av-animation="rotateInUpLeft">
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-md-offset-3 aniview box green" av-animation="rotateInUpRight">
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-md-offset-3 aniview box blue" av-animation="rotateInUpLeft">
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-md-offset-3 aniview custom-classes" av-animation="slideInLeft">
                    <p>You could even set up some custom animation classes so that animations occur in a specific order, e.g:</p>
                    <pre class="code css">
.fast {
    -vendor-animation-duration: 1s;
    -vendor-animation-delay: 0s;
}
.slow {
    -vendor-animation-duration: 3s;
    -vendor-animation-delay: 1s;
}
.reallyslow {
    -vendor-animation-duration: 6s;
    -vendor-animation-delay: 3s;
}</pre>
                </div>
            </div>
            <div class="row">
            	<div class="col-md-3 aniview small-box slow" av-animation="rotateInUpLeft">
            		<img src="img/1.jpg" alt="..." class="img-thumbnail">
            	</div>
            	<div class="col-md-3 aniview small-box fast" av-animation="slideInLeft">
            		<img src="img/1.jpg" alt="..." class="img-thumbnail">
            	</div>
            	<div class="col-md-3 aniview small-box fast" av-animation="rotateInUpRight">
            		<img src="img/1.jpg" alt="..." class="img-thumbnail">
            	</div>
            	<div class="col-md-3 aniview small-box slow" av-animation="fadeIn">
            		<img src="img/1.jpg" alt="..." class="img-thumbnail">
            	</div>
            </div>
            <div class="row">
                <div class="col-md-6 col-md-offset-3 aniview small-box red fast" av-animation="fadeIn">
                    &lt;div class="aniview fast" av-animation="fadeIn"&gt;
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-md-offset-3 aniview small-box green slow" av-animation="fadeIn">
                    &lt;div class="aniview slow" av-animation="fadeIn"&gt;
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-md-offset-3 aniview small-box blue reallyslow" av-animation="fadeIn">
                    &lt;div class="aniview reallyslow" av-animation="fadeIn"&gt;
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-md-offset-3 aniview conclusion" av-animation="fadeInUp">
                    That should be enough to get you up and running! Check it out!
                </div>
            </div>

		</div>
<script src="/scripts/2bc/_gg_980_90.js" type="text/javascript"><\/script>
	</article>
	
	<script src="http://libs.useso.com/js/jquery/2.1.1/jquery.min.js" type="text/javascript"><\/script>
	<script>window.jQuery || document.write('<script src="js/jquery-2.1.1.min.js"><\\/script>')<\/script>
	<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.5/highlight.min.js"><\/script>
	<script type="text/javascript" src="http://libs.useso.com/js/bootstrap/3.2.0/js/bootstrap.min.js"><\/script>
	<script type="text/javascript" src="js/jquery.aniview.min.js"><\/script>
	<script type="text/javascript">
		$(document).ready(function(){
			var i={animateThreshold:100};
			$(".aniview").AniView(i);
			$(".code").each(function(i,e){hljs.highlightBlock(e)})});
	<\/script>
</body>
</html>`
  },
  {
    id:'repo23', icon:'🛒', title:"加入购物车(飞入)", desc:"天猫式加入购物车飞入动画", group:'component',
    repo:{ dir:"jQuery仿天猫完美加入购物车", file:"index.html", rel:'jQuery%E4%BB%BF%E5%A4%A9%E7%8C%AB%E5%AE%8C%E7%BE%8E%E5%8A%A0%E5%85%A5%E8%B4%AD%E7%89%A9%E8%BD%A6/index.html' },
    code:`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
        <title>jQuery仿天猫完美加入购物车</title>
        <meta name="keywords" content="jquery购物车,加入购物车" />
        <meta name="description" content="jquery加入购物车帅气效果,和天猫、聚美优品类似" />
        <link rel="stylesheet" type="text/css" href="http://www.sucaihuo.com/jquery/css/common.css" />
        <link rel="stylesheet" type="text/css" href="css/demo.css" />
    </head>
    <body>
        <div class="head">
            <div class="head_inner">
                <a class="logo" href="http://www.sucaihuo.com">
                    <img alt="素材火logo" src="http://www.sucaihuo.com/Public/images/logo.jpg">
                </a>
            </div>
        </div>
        <div class="container">
            <h2 class="title"><a href="http://www.sucaihuo.com/jquery/demo/1/">jQuery仿天猫完美加入购物车</a></h2>
            <div class="demo clearfix">
                <div class="per">
                    <img src="images/1.jpg" width="180" height="240" alt="图片二"/>
                    <h3>¥<span>259.00</span></h3>
                    <div class="title">春款真皮坡跟大码单鞋内增高女士鞋子</div>
                    <a href="javascript:void(0);" class="button orange addcart">加入购物车</a>
                </div>
                <div class="per">
                    <img src="images/2.jpg" width="180" height="240" alt="图片二"/>
                    <h3>¥<span>136.00</span></h3>
                    <div class="title">韩国代购情侣棉衣棉服女款韩版羊羔毛大衣</div>
                    <a href="javascript:void(0);" class="button orange addcart">加入购物车</a>
                </div>
                <div class="per">
                    <img src="images/3.jpg" width="180" height="240" alt="图片三"/>
                    <h3>¥<span>¥728.00</span></h3>
                    <div class="title">冬季运动情侣羽绒棉马甲男士薄马甲</div>
                    <a href="javascript:void(0);" class="button orange addcart">加入购物车</a>
                </div>
                <div class="per">
                    <img src="images/4.jpg" width="180" height="240" alt="图片四"/>
                    <h3>¥<span>119.00</span></h3>
                    <div class="title">原创-城市简约文艺纯色棉麻新中式小立领</div>
                    <a href="javascript:void(0);" class="button orange addcart">加入购物车</a>
                </div>
            </div>
        </div>
        <div class="cart-sidebar">
            <div class="cart">
                <i id="icon-cart"></i>
                <span>购物车</span>
            </div>
        </div>
        <div id="tip">成功加入购物车！</div>
        <div class="foot">
            Powered by sucaihuo.com  本站皆为作者原创，转载请注明原文链接：<a href="http://www.sucaihuo.com" target="_blank">www.sucaihuo.com</a>
        </div>
        <script type="text/javascript" src="http://www.sucaihuo.com/Public/js/other/jquery.js"><\/script>
        <script src="js/jquery.fly.min.js"><\/script>
        <!--[if lte IE 9]>
        <script src="js/requestAnimationFrame.js"><\/script>
        <![endif]-->
        <script type="text/javascript">
            $(function() {
                var offset = $("#icon-cart").offset();
                $(".addcart").click(function(event) {
                    var img = $(this).parent().children('img').attr('src');//获取当前点击图片链接
                    var flyer = $('<img class="flyer-img" src="' + img + '">');//抛物体对象
                    flyer.fly({
                        start: {
                            left: event.pageX, //抛物体起点横坐标
                            top: event.pageY////抛物体起点纵坐标
                        },
                        end: {
                            left: offset.left + 10, //抛物体终点横坐标
                            top: offset.top + 10, //抛物体终点纵坐标
                        },
                        onEnd: function() {
                            $("#tip").show().animate({width: '200px'}, 300).fadeOut(500);//成功加入购物车动画效果
                            this.destory();//销毁抛物体
                        }
                    });
                });
            });
        <\/script>
    </body>
</html>


`
  },
  {
    id:'repo24', icon:'🥧', title:"圆形统计图", desc:"jQuery 圆形统计插件", group:'visual',
    repo:{ dir:"jQuery圆形统计插件", file:"circle.html", rel:'jQuery%E5%9C%86%E5%BD%A2%E7%BB%9F%E8%AE%A1%E6%8F%92%E4%BB%B6/circle.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="css/jquery.circliful.css"/>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .box{
            position: relative;
            width: 150px;
            height: 150px;
        }
        .myStat1,.myStat2,.myStat3{
            position: absolute;
        }
        .myStat2{
            top: 10px;
            left: 10px;
        }
        .myStat3{
            top: 20px;
            left: 20px;
        }
    </style>
</head>
<body>
<div class="box">
    <div class="myStat1"></div>
    <div class="myStat2"></div>
    <div class="myStat3"></div>
</div>
<div class="box">
    <div class="myStat1"></div>
    <div class="myStat2"></div>
    <div class="myStat3"></div>
</div>
</body>
<script src="js/jquery-1.9.1.min.js"><\/script>
<script src="js/jquery.circliful.min.js"><\/script>
<script>
//    data-dimension="250" data-text="35%" data-info="New Clients" data-width="5" data-fontsize="15" data-percent="35" data-fgcolor="#61a9dc" data-bgcolor="#eee"
    $(function(){
        $('.myStat1').attr({
            'data-dimension':150,
            'data-text':'35%',
            'data-width':'3',
            'data-fontsize':'15',
            'data-percent':80.9,
            'data-fgcolor':'#5ba3f0',
            'data-bgcolor':'#e8e9ea'
        }).circliful();
        $('.myStat2').attr({
            'data-dimension':130,
            'data-width':'3',
            'data-fontsize':'15',
            'data-percent':55,
            'data-fgcolor':'#a77ef6',
            'data-bgcolor':'#e8e9ea'
        }).circliful();
        $('.myStat3').attr({
            'data-dimension':110,
            'data-width':'3',
            'data-fontsize':'15',
            'data-percent':25,
            'data-fgcolor':'#ee85ea',
            'data-bgcolor':'#e8e9ea'
        }).circliful();
    });
<\/script>
</html>`
  },
  {
    id:'repo25', icon:'🎡', title:"圆形轮播 roundabout", desc:"roundabout 圆形旋转轮播", group:'visual',
    repo:{ dir:"roundabout", file:"index.html", rel:'roundabout/index.html' },
    code:`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>jQuery.roundabout.js制作图片倾斜层叠切换效果示例页面 - 问说</title>
<link rel="stylesheet" href="css/style.css" />
</head>
<body>
<div id="tour" class="zebra">
	<div class="wrap">
		<div class="switcher-wrap slider">
			<a class="prev jQ_sliderPrev" href=""></a>
			<a class="next jQ_sliderNext" href=""></a>
			<ul id="img-slider" style="height: 750px;border: 1px solid red;">
				<li class="img">
					<img src="images/client.png" />
					<div class="label">Client</div>
				</li>
				<li class="img">
					<img src="images/developer.png" />
					<div class="label">Developer</div>
				</li>
				<li class="img">
					<img src="images/manager.png" />
					<div class="label">Manager</div>
				</li>
				<li class="img">
					<img src="images/tester.png" />
					<div class="label">Tester</div>
				</li>
				<li class="img">
					<img src="images/user.png" />
					<div class="label">Power User</div>
				</li>
			</ul>
			<ul class="switcher jQ_sliderSwitch">
				<li class="active"><a href=""></a></li>
				<li><a href=""></a></li>
				<li><a href=""></a></li>
				<li><a href=""></a></li>
				<li><a href=""></a></li>
			</ul>
		</div>
	</div>
</div>
</body>
<script type="text/javascript" src="js/jquery-1.9.1.min.js"><\/script>
<script type="text/javascript" src="js/jquery.roundabout.js"><\/script>
<script type="text/javascript" src="js/jquery.roundabout_shape.js"><\/script>
<script type="text/javascript" src="js/script.js"><\/script>
</html>`
  },
  {
    id:'repo26', icon:'🎞️', title:"滑块轮播", desc:"slider1.2 图片轮播", group:'visual',
    repo:{ dir:"slider1.2", file:"index.html", rel:'slider1.2/index.html' },
    code:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="css/slider1.2.css">
    <style>
        *{
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
<div id="modelSlider" style="margin: auto;width: 1280px;"></div>
</body>
<script src="js/jquery-1.9.1.min.js"><\/script>
<script src="js/slider1.2.js"><\/script>
<script>
    $("#modelSlider").slider({
        imgs: [  //图片的地址
            "img/1.jpg",
            "img/2.jpg",
            "img/3.jpg",
            "img/4.png",
            "img/5.png",
            "img/6.png"
        ],
//        urls: [  //点击图片跳转到的地址，也可以如下放一段js
//            'javascript:makeDialog("轮显提示或者地址","第1个图",function(){},3)',
//            'javascript:makeDialog("轮显提示或者地址","第2个图",function(){},3)',
//            'javascript:makeDialog("轮显提示或者地址","第3个图",function(){},3)',
//            'javascript:makeDialog("轮显提示或者地址","第4个图",function(){},3)',
//            'javascript:makeDialog("轮显提示或者地址","第5个图",function(){},3)',
//            'javascript:makeDialog("轮显提示或者地址","第6个图",function(){},3)'
//        ],
        scale: 128 / 36,   //图片宽高比   卧槽这里是定义整个box的宽高的，所以#modelSlider只需要给一个宽度就行了
        border: true,   //是否显示分界线
        showBar: true,    //是否可以人工切换  如果只保留一种切换方式，目前只找到一种方法，把源码中的effects数组里面的不需要的方法注释掉。。。应该有其他方法
        x: 10,      //横向格子数
        y: 3,      //纵向格子数
        interval:3000
    });
<\/script>
</html>`
  },
  {
    id:'repo27', icon:'🔠', title:"字母下落", desc:"字母从上落下动画", group:'text',
    repo:{ dir:"word", file:"字母从上落下.html", rel:'word/%E5%AD%97%E6%AF%8D%E4%BB%8E%E4%B8%8A%E8%90%BD%E4%B8%8B.html' },
    code:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .box{
            width: 100%;
            text-align: center;
            height: 400px;
            line-height: 400px;
        }
    </style>
</head>
<body>
<div class="box">
    <h3 class="list_text">ABCD</h3>
</div>
<button>click</button>
</body>
<script src="js/segment.min.js"><\/script>
<script src="js/d3-ease.v0.6.js"><\/script>
<script src="js/letters.js"><\/script>
<script src="js/mo.min.js"><\/script>
<script>
    window.onload=function(){
        var options = [
            {
                size : [400,400,400,400],
                weight : [28,23,18,13],
                color: '#008ad4',
                duration: [1.1,1.2,1.3,1.4],
                delay: 0.05,
                fade: 1.5,
                easing: d3_ease.easeExpInOut.ease
            }
        ];
        var items = [].slice.call(document.querySelectorAll('.box'));
        function init() {
            items.forEach(function(item, pos) {
                var word = item.querySelector('.list_text'),
                    playCtrl=document.getElementsByTagName('button')[0],  //按钮
//                    playCtrl = item.querySelector('button'),
                // initialize the plugin
                    instance = new Letters(word, options[pos]),
                    endPlayCallback = function() {
                        playCtrl.className = 'control__button control__button--play';
                        word.setAttribute('data-state', 'stop');
                    };

                // show word  开始就把文字展现出来，注释掉就是开始为空白
                instance.showInstantly();

                // moo.js configurations for some of the buttons
                var timelines = {};
                var letters = [].slice.call(word.querySelectorAll('svg')),
                        lettersTotal = letters.length,
                        distanceFactor = 40;
                timelines[pos+1] = new mojs.Timeline();
                letters.forEach(function(letter, i) {
                    var ty = -1 * distanceFactor * (lettersTotal - i);
                    tween = new mojs.Tween({
                        duration : 2000,
                        delay: 50 + 50*i,
                        easing: mojs.easing.elastic.out,
                        onUpdate: function(progress) {
                            letter.style.WebkitTransform = letter.style.transform = 'translate3d(0,' + ty * (1-progress) + '%,0)';
                        }
                    });

                    timelines[pos+1].add(tween);
                });

                playCtrl.addEventListener('click', function() {  //给按钮绑定事件
                    if( word.getAttribute('data-state') === 'play' ) {
                        return false;
                    }
                    word.setAttribute('data-state', 'play');
                    playCtrl.className = 'control__button control__button--play control__button--active';
                    instance.hideInstantly();
                    timelines[pos+1].start();
                    instance.show({callback : endPlayCallback});
                });
            });
        }
        init();
    }
<\/script>
</html>`
  },
  {
    id:'repo28', icon:'🔡', title:"字母上升", desc:"字母往上出现动画", group:'text',
    repo:{ dir:"word", file:"字母往上出现.html", rel:'word/%E5%AD%97%E6%AF%8D%E5%BE%80%E4%B8%8A%E5%87%BA%E7%8E%B0.html' },
    code:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .box{
            width: 100%;
            text-align: center;
            height: 400px;
            line-height: 400px;
        }
    </style>
</head>
<body>
<div class="box">
    <h3 class="list_text">sanda</h3>
</div>
<button>click</button>
</body>
<script src="js/segment.min.js"><\/script>
<script src="js/d3-ease.v0.6.js"><\/script>
<script src="js/letters.js"><\/script>
<script src="js/mo.min.js"><\/script>
<script>
    window.onload=function(){
        var options = [
            {
                size : 400,
                weight : 25,
                color: '#008ad4',
                duration: 1.5,
                delay: 0.1,
                easing: d3_ease.easeBounceOut.ease
            }
        ];
        var items = [].slice.call(document.querySelectorAll('.box'));
        function init() {
            items.forEach(function(item, pos) {
                var word = item.querySelector('.list_text'),
                        playCtrl=document.getElementsByTagName('button')[0],  //按钮
//                    playCtrl = item.querySelector('button'),
                // initialize the plugin
                        instance = new Letters(word, options[pos]),
                        endPlayCallback = function() {
                            playCtrl.className = 'control__button control__button--play';
                            word.setAttribute('data-state', 'stop');
                        };

                // show word  开始就把文字展现出来，注释掉就是开始为空白
                instance.showInstantly();

                // moo.js configurations for some of the buttons
                var timelines = {};
                var letters = [].slice.call(word.querySelectorAll('svg')),
                    distanceFactor = 40;
                    timelines[pos+1] = new mojs.Timeline();
                letters.forEach(function(letter, i) {
                    var tween = new mojs.Tween({
                        duration : 1500,
                        delay: 100 + 100*i,
                        easing: mojs.easing.bounce.out,
                        onUpdate: function(progress) {
                            letter.style.WebkitTransform = letter.style.transform = 'translate3d(0,' + distanceFactor * (1-progress) + '%,0)';
                        }
                    });
                    timelines[pos+1].add(tween);
                });

                playCtrl.addEventListener('click', function() {  //给按钮绑定事件
                    if( word.getAttribute('data-state') === 'play' ) {
                        return false;
                    }
                    word.setAttribute('data-state', 'play');
                    playCtrl.className = 'control__button control__button--play control__button--active';
                    instance.hide({
                        duration: 0.6, delay: 0.1, easing: d3_ease.easeExpOut.ease,
                        callback: function() {
                            timelines[pos+1].start();
                            instance.show({callback : endPlayCallback});
                        }
                    });
                });
            });
        }
        init();
    }
<\/script>
</html>`
  },
  {
    id:'repo29', icon:'📝', title:"字母基本动画", desc:"Animate 字母基本应用", group:'text',
    repo:{ dir:"word", file:"最基本应用.html", rel:'word/%E6%9C%80%E5%9F%BA%E6%9C%AC%E5%BA%94%E7%94%A8.html' },
    code:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--这个js貌似下不下来。。IE没有测试过-->
    <!--[if IE]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"><\/script>
    <![endif]-->
</head>
<body>
<div class="my-text">ABCD</div>
<button>click</button>
</body>
<script src="js/segment.min.js"><\/script>
<script src="js/d3-ease.v0.6.js"><\/script>
<script src="js/letters.js"><\/script>
<script>
//  网址http://www.w2bc.com/article/105480

//  所有的参数选项（除了individualDelays）都可以设置为以下的值：
//  单个值：可以被所有字母接收。
//  数组：数组中的第一个元素会被第一个字母接收，第二个元素被第二个字母接收，以此类推。
    var el=document.querySelector('.my-text');
    var options = {
        size: 300,         // Font size, defined by the height of the letters (pixels)  字体大小，根据字体高度来定义的
        weight: 3,         // Font weight (pixels)  字体粗细
        rounded: false,    // Rounded letter endings  字体是否带圆角
        color: '#008ad4',  // Font color  字体颜色
        duration: 1.5,       // Duration of the animation of each letter (seconds)  动画时间
        delay: 0.1,  //[0, 0.05] Delay animation among letters (seconds)  每个字母之间的动画间隔
        fade: 0.1,         // Fade effect duration (seconds)  透明度
        easing: d3_ease.easeCircleInOut.ease,   // Easing function  动画效果
        individualDelays: false               // If false (default), every letter delay increase gradually, showing letters from left to right always. If you want to show letters in a disorderly way, set it to true, and define different delays for the desired letters.  false是字母从左到右依次显示，true是字母同时显示
    };
    var myText = new Letters(el, options);
    document.getElementsByTagName('button')[0].onclick=function(){
        myText.toggle();
//        // Show letters with the default options defined
//        myText.show();
//
//// Hide letters with the default options defined
//        myText.hide();
//
//// Toggle letters with the default options defined
//        myText.toggle();

        // Show letters instantly, without any animation at all
// There is a hideInstantly and toggleInstantly function, too
//        myText.toggle();
//        myText.showInstantly();  // Shortcut for myText.show(0, 0, 0);  要上下两个一起用
    };
<\/script>
</html>`
  },
  {
    id:'repo30', icon:'🖼️', title:"仿淘宝轮播", desc:"淘宝风格图片轮播", group:'visual',
    repo:{ dir:"仿淘宝轮播(无缝做不出来)", file:"轮播.html", rel:'%E4%BB%BF%E6%B7%98%E5%AE%9D%E8%BD%AE%E6%92%AD(%E6%97%A0%E7%BC%9D%E5%81%9A%E4%B8%8D%E5%87%BA%E6%9D%A5)/%E8%BD%AE%E6%92%AD.html' },
    code:`<!DOCTYPE html>
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>轮播</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
            font-family:'微软雅黑';
        }
        .content{
            position:relative;
            margin:0 auto;
            width:520px;
            height:280px;
            overflow:hidden;
        }
        .picBox{
            width:5200px;
        }
        .picBox img{
            float:left;
            cursor:pointer;
        }
        .btns{
            position:absolute;
            z-index:99;
        }
        .circles{
            position:absolute;
            width:300px;
            left:400px;
            top:240px;
        }
        .circles li{
            list-style:none;
            display:inline-block;
            width:15px;
            height:15px;
            border-radius:50%;
            background:#ccc;
            opacity:0.7;
            cursor:pointer;
        }
        .circles .red{
            background:red;
        }
        .left,.right{
            width:40px;
            height:40px;
            background:rgba(0,0,0,0.7);
            position:absolute;
            top:120px;
            cursor:pointer;
            font-size:25px;
            line-height:40px;
            text-align:center;
            color:#ffffff;
        }
        .left{
            left:-40px;
        }
        .right{
            left:520px;
        }
    </style>
</head>
<body>
<div class="content">
    <div class="picBox">
        <img src="img/1.png" alt=""/>
        <img src="img/2.jpg" alt=""/>
        <img src="img/3.jpg" alt=""/>
        <img src="img/4.jpg" alt=""/>
        <img src="img/5.jpg" alt=""/>
    </div>
    <div class="btns">
        <div class="left">&lt;</div>
        <div class="right">&gt;</div>
        <ul class="circles">
            <li class="red"></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</div>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
    var timer;//定时器
    var i=0;//图片编号
//    自动播放
    $('.content').hover(function(){
        clearInterval(timer);
        $('.left').stop(false,true).animate({left:'0px'},200);
        $('.right').stop(false,true).animate({left:'480px'},200);
    },function(){
        $('.left').stop(false,true).animate({left:'-40px'},200);
        $('.right').stop(false,true).animate({left:'520px'},200);
        timer=setInterval(function(){
            i++;
            if(i>4){
                i=0;
            }
            $('.circles li').eq(i).addClass('red').siblings().removeClass('red');
            $('.picBox').stop(false,true).animate({marginLeft:-520*i+'px'},500);
        },1000);
    }).trigger('mouseleave');
//    点击左右
    $('.left').on('click',function(){
       if(!$('.picBox').is(':animated')){
           i--;
           if(i<0){
               i=4;
           }
           $('.circles li').eq(i).addClass('red').siblings().removeClass('red');
           $('.picBox').stop(false,true).animate({marginLeft:-520*i+'px'},500);
       }
    });
    $('.right').on('click',function(){
        if(!$('.picBox').is(':animated')){
            i++;
            if(i>4){
                i=0;
            }
            $('.circles li').eq(i).addClass('red').siblings().removeClass('red');
            $('.picBox').stop(false,true).animate({marginLeft:-520*i+'px'},500);
        }
    });
//    点击li
    $('.circles li').on('click',function(){
        if(!$('.picBox').is(':animated')){
            var picIndex=$(this).index();
            i=picIndex;
            $(this).addClass('red').siblings().removeClass('red');
            $('.picBox').stop(false,true).animate({marginLeft:-520*picIndex+'px'},500);
        }
    });
<\/script>
</html>`
  },
  {
    id:'repo31', icon:'🍏', title:"仿苹果导航", desc:"苹果风格导航菜单", group:'component',
    repo:{ dir:"仿苹果导航菜单", file:"1.html", rel:'%E4%BB%BF%E8%8B%B9%E6%9E%9C%E5%AF%BC%E8%88%AA%E8%8F%9C%E5%8D%95/1.html' },
    code:`<!DOCTYPE html>
<html lang="en">
<head>
    <title></title>
    <style type="text/css">
        body{
            margin:0;
            padding:0
        }
        /*这一层是自己添加的，源代码是直接menu为最外层，但是这样不利于布局*/
        #box{
            width:100%;
            height: 200px;
            position: relative;
        }
        #menu{
            position:absolute;
            width:100%;
            min-width: 1000px;
            bottom:0;
            text-align:center;
        }
    </style>
</head>
<body>
<div id="box">
    <div id="menu">
        <img src="images/1.png" />
        <img src="images/2.png" />
        <img src="images/3.png" />
        <img src="images/4.png" />
        <img src="images/5.png" />
    </div>
</div>
</body>
<script type="text/javascript">
    window.onload = function ()
    {
        var oMenu = document.getElementById("menu");
        var aImg = oMenu.getElementsByTagName("img");
        var aWidth = [];
        var i = 0;
        //保存原宽度, 并设置当前宽度
        for (i = 0; i < aImg.length; i++)
        {
            aWidth.push(aImg[i].offsetWidth);  //当前图片为128px乘128px
            aImg[i].width = parseInt(aImg[i].offsetWidth / 2) ;  //为每一张图片设置新宽度,为原宽度/2
        }
        //鼠标移动事件
        oMenu.onmousemove = function (event)
        {
            var EVENT = event || window.event;
            for (i = 0; i < aImg.length; i++)
            {
                var a = EVENT.clientX - aImg[i].offsetLeft - aImg[i].offsetWidth / 2;
                var b = EVENT.clientY - aImg[i].offsetTop - oMenu.offsetTop - aImg[i].offsetHeight / 2;
                var iScale = 1 - Math.sqrt(a * a + b * b) / 300;
                if (iScale < 0.5) iScale = 0.5;
                aImg[i].width = aWidth[i] * iScale;
            }
        };
    };
<\/script>
</html>`
  },
  {
    id:'repo32', icon:'🔀', title:"事件委托切换", desc:"给未来元素绑定切换事件", group:'component',
    repo:{ dir:"切换(给未来元素添加事件)", file:"切换.html", rel:'%E5%88%87%E6%8D%A2(%E7%BB%99%E6%9C%AA%E6%9D%A5%E5%85%83%E7%B4%A0%E6%B7%BB%E5%8A%A0%E4%BA%8B%E4%BB%B6)/%E5%88%87%E6%8D%A2.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .test{
            width: 150px;
            height: 150px;
            border: 1px solid #d1d1d1;
            overflow: hidden;
            float: left;
        }
        .pic-in{
            width: 50px;
            height: 50px;
            background: #999999;
            position: relative;
            top: 50%;
            left: 50%;
            margin: -25px 0 0 -25px;
            border-radius: 50%;
            cursor: pointer;
        }
    </style>
</head>
<body>
<div class="test"></div>
<div class="test"></div>
</body>
<script src="js/jquery-1.9.1.min.js"><\/script>
<script>
    $(function(){
        $('.test').html('<div class="pic-in"></div>');
    });
    $(document).on('click','.pic-in',function(){  //给未来元素绑定事件
        var index=$(this).index('.pic-in'),_len=$('.pic-in').length,_i;
        if($(this).width()==50){
            for(_i=0;_i<_len;_i++){
                if(_i!=index){
                    $('.pic-in').eq(_i).animate({width:'50px',height:'50px','margin':'-25px 0 0 -25px'},100);
                }
            }
            $(this).animate({width:'350px',height:'350px','margin':'-175px 0 0 -175px'},100);
        }
    });
<\/script>
</html>`
  },
  {
    id:'repo33', icon:'📰', title:"新闻列表滚动", desc:"新闻条目上下滚动", group:'component',
    repo:{ dir:"列表项滚动(多用于新闻条目)", file:"test.html", rel:'%E5%88%97%E8%A1%A8%E9%A1%B9%E6%BB%9A%E5%8A%A8(%E5%A4%9A%E7%94%A8%E4%BA%8E%E6%96%B0%E9%97%BB%E6%9D%A1%E7%9B%AE)/test.html' },
    code:`<!DOCTYPE html>
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>鼠标</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
            font-family:"微软雅黑";
            font-size:13px;
        }
        ul{
            height:50px;
        }
        ul li{
            list-style:none;
            display:block;
        }
        .scrollline{
            height:50px;
            line-height:50px;
            /*border:1px solid red;*/
        }
        .scrollline:hover{
            cursor:pointer;
            text-decoration:underline;
        }
    </style>
</head>
<body>
<div style="height:50px;overflow:hidden;">
    <ul>
        <li class="scrollline">111</li>
        <li class="scrollline">222</li>
        <li class="scrollline">333</li>
        <li class="scrollline">444</li>
        <li class="scrollline">555</li>
    </ul>
</div>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
    var area=$('div');
    var timespan=1000;//1s滚动一次
    var timeID;
    area.hover(function(){//移入清除定时器
        clearInterval(timeID);
    },function(){//移出开启定时器
        timeID=setInterval(function(){
            var moveline=area.find('li:first');//取得li的第一个元素
            var lineheight=moveline.height();//取得要移动的高度
            moveline.animate({marginTop:-lineheight+'px'},500,function(){//将第一个li往上移动50px,移动完后将其添加到ul的末尾,并将其距上一个li的高度设置为0
                moveline.appendTo('ul').css({marginTop:0});
            });
        },timespan);
    }).trigger('mouseleave');//载入页面时自动开始滚动
<\/script>
</html>`
  },
  {
    id:'repo34', icon:'🛒', title:"加入购物车", desc:"加入购物车动效", group:'component',
    repo:{ dir:"加入购物车", file:"加入购物车.html", rel:'%E5%8A%A0%E5%85%A5%E8%B4%AD%E7%89%A9%E8%BD%A6/%E5%8A%A0%E5%85%A5%E8%B4%AD%E7%89%A9%E8%BD%A6.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="css/buyCart.css"/>
</head>
<body>
<div class="main-box">
    <div class="pic-box">
        <img src="img/1.jpg" alt=""/>
        <h3>¥299</h3>
        <div class="btn">加入购物车</div>
    </div>
    <div class="pic-box">
        <img src="img/2.jpg" alt=""/>
        <h3>¥299</h3>
        <div class="btn">加入购物车</div>
    </div>
    <div class="pic-box">
        <img src="img/3.jpg" alt=""/>
        <h3>¥299</h3>
        <div class="btn">加入购物车</div>
    </div>
</div>
<div class="cart-side">
    <div class="cart">
        <i id="icon-cart"></i>
        <span>购物车</span>
    </div>
</div>
<div id="tip">成功加入购物车</div>
</body>
<script src="js/jquery-1.9.1.min.js"><\/script>
<script src="js/jquery.fly.min.js"><\/script>
<script src="js/requestAnimationFrame.js"><\/script>
<script>
    $(function(){
        var _lastPosi=$('#icon-cart').offset();
        $('.btn').on('click',function(event){
            var _imgSrc=$(this).parent().children('img').attr('src');
            var _flyer=$('<img class="flyer-img" src="'+_imgSrc+'"/>');
            _flyer.fly({
                start:{  //抛物体起始位置为鼠标位置
                    left:event.pageX,
                    top:event.pageY
                },
                end:{  //抛物体最终位置
                    left:_lastPosi.left,
                    top:_lastPosi.top
                },
                autoPlay:true,  //是否直接运动,默认true
                speed:1.2,  //越大越快,默认1.2
                vertex_Rtop:20,  //运动轨迹最高点top值,默认20,越小越高
                onEnd:function(){
                    $('#tip').show().animate({width:'200px'},500).fadeOut(500);
                    this.destory();
                }
            });
        });
    });
<\/script>
</html>`
  },
  {
    id:'repo35', icon:'🧭', title:"动感导航", desc:"jQuery 动感导航菜单", group:'component',
    repo:{ dir:"动感十足的jquery导航", file:"index.html", rel:'%E5%8A%A8%E6%84%9F%E5%8D%81%E8%B6%B3%E7%9A%84jquery%E5%AF%BC%E8%88%AA/index.html' },
    code:`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>动感十足的jquery导航</title>
<link rel="stylesheet" type="text/css" href="css/index.css" />
<script type="text/javascript" src="js/jquery.min.js"><\/script>
<script type="text/javascript" src="js/jquery.easing.1.3.js"><\/script>
<script type="text/javascript" src="js/script.js" ><\/script>
</head>
<body>
<div id="wrap">
    <div id="container-wrap"> 
        <div id="littleBoxes" class="littleBoxes">
        <div class="boxlink bg1" style="top: 0px; left: 0px;">
            <a href="">阿里一号</a>
            <div class="boxcontent">
                <p>111111</p>
            </div>
        </div>
        <div class="bg5" style="background-position:-90px 0; top:0px; left:95px;"></div>
        <div class="bg5" style="background-position:-180px 0; top:0px; left:190px;"></div>
        <div class="bg5" style="background-position:-270px 0; top:0px; left:285px;"></div>
        
        <div class="bg5" style="background-position: 0 -90px; top:95px; left:0px;"></div>
        <div class="boxlink bg2" style="top: 95px; left: 95px;">
            <a href="">阿里二号</a>
            <div class="boxcontent">
                <p>22222</p>
            </div>
        </div>
        <div class="bg5" style="background-position:-180px -90px;top:95px;left:190px;"></div>
        <div class="bg5" style="background-position:-270px -90px;top:95px;left:285px;"></div>
        
        <div class="bg5" style="background-position:0 -180px;top:190px;left:0px;"></div>
        <div class="bg5" style="background-position:-90px -180px;top:190px;left:95px;"></div>
        <div class="boxlink bg3" style="top:190px;left:190px;">
            <a href="">阿里三号</a>
            <div class="boxcontent">
                <p>333333333</p>
            </div>
        </div>
        <div class="bg5" style="background-position:-270px -180px;top:190px;left:285px;"></div>
        
        <div class="bg5" style="background-position:0 -270px;top:285px;left:0px;"></div>
        <div class="bg5" style="background-position:-90px -270px;top:285px;left:95px;"></div>
        <div class="bg5" style="background-position:-180px -270px;top:285px;left:190px;"></div>
        <div class="boxlink bg4" style="top:285px;left:285px;">
            <a href="">阿里四号</a>
            <div class="boxcontent">
               <p>444444444</p>
            </div>
        </div>
        </div>
    </div>
</div>

</body>
</html>`
  },
  {
    id:'repo36', icon:'🖼️', title:"图片墙", desc:"画廊式图片墙", group:'visual',
    repo:{ dir:"图片墙", file:"hualang.html", rel:'%E5%9B%BE%E7%89%87%E5%A2%99/hualang.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>画廊</title>
    <link rel="stylesheet" href="css/hualang.css"/>
</head>
<body>
    <div class="wrap" id="wrap">
        <!--<div class="photo photo_center">-->
            <!--<div class="side">-->
                <!--<p class="image">-->
                    <!--<img src="img/han7.jpg" alt=""/>-->
                <!--</p>-->
                <!--<p class="caption">-->
                    <!--图片介绍-->
                <!--</p>-->
            <!--</div>-->
        <!--</div>-->
        <!--<ul class="btn-list">-->
            <!--<li></li>-->
            <!--<li></li>-->
            <!--<li></li>-->
        <!--</ul>-->
    </div>
</body>
<script src="js/jquery-1.9.1.min.js"><\/script>
<script>
    //  模拟后台json，实际情况应该是发送ajax从后台获得相关数据集合后再执行下面
    var img_data=[
        {src:'img/han7.jpg',desc:'图片介绍'},
        {src:'img/han7.jpg',desc:'图片介绍'},
        {src:'img/han7.jpg',desc:'图片介绍'},
        {src:'img/han7.jpg',desc:'图片介绍'},
        {src:'img/han7.jpg',desc:'图片介绍'},
        {src:'img/han7.jpg',desc:'图片介绍'},
        {src:'img/han7.jpg',desc:'图片介绍'},
        {src:'img/han7.jpg',desc:'图片介绍'},
        {src:'img/han7.jpg',desc:'图片介绍'},
        {src:'img/han7.jpg',desc:'图片介绍'},
        {src:'img/han7.jpg',desc:'图片介绍'},
        {src:'img/han7.jpg',desc:'图片介绍'},
        {src:'img/han7.jpg',desc:'图片介绍'},
        {src:'img/han7.jpg',desc:'图片介绍'},
        {src:'img/han7.jpg',desc:'图片介绍'}
    ];
//  加载图片和小圆点
    var img_html='';
    var cirle_list='';
    for(var i=0;i<img_data.length;i++){
        img_html += '<div class="photo">' +
                '<div class="side">' +
                '<p class="image">' +
                '<img src=' + img_data[i].src + ' alt=""/>' +
                '</p>' +
                '<p class="caption">' + img_data[i].desc + '</p>' +
                '</div>' +
                '</div>';
        cirle_list += '<li onclick="photoPosition(this)"></li>';
    }
    cirle_list='<div class="btn-box"><ul class="btn-list">'+cirle_list+'</ul></div>';
    var _wrap=$('#wrap');
    _wrap.append(img_html);
    _wrap.append(cirle_list);
    var _photo=$('.photo');
    var _wrapWidth=_wrap.width();
    var _wrapHeight=_wrap.height();
    var _photoWidth=_photo.eq(0).width();
    var _photoHeight=_photo.eq(0).height();
    function photoPosition(num){
        //  1.所有图片随机摆放
        for(var j=0;j<img_data.length;j++){
            var _top=Math.random()*(_wrapHeight+_photoHeight)-_photoHeight;
            if(j%2==0){  //图片分奇偶是为了左边和右边的图片数量相等或最大差1，避免左右分布不均
                var _Left=Math.random()*((_wrapWidth-_photoWidth)/2+_photoWidth)-_photoWidth;
                _photo.eq(j).css({left:_Left+'px',top:_top+'px'});
            }else{
                var _right=Math.random()*(_wrapWidth+_photoWidth)-_photoWidth;
                _photo.eq(j).css({left:_right+'px',top:_top+'px'});
            }
            _photo[j].style['transform']=_photo[j].style['-webkit-transform']=_photo[j].style['-ms-transform']=_photo[j].style['-moz-transform']='rotate('+(Math.random()*300-150)+'deg)';  //MD360业界奇葩，IE内核竟然要-webkit-transform才支持旋转
        }
//  2.从图片中随机挑一张放在中间(注意顺序不要变。如果先执行放中间就要去图片数组里面去掉中间的那张，那样麻烦)
        var _center;
        if(num){
            _center=$(num).index();
            console.log(_center);
        }else{
            _center=Math.floor(Math.random()*img_data.length);
        }
        _photo.eq(_center).addClass('photo_center').css({left:'50%',top:'50%'});
        _photo[_center].style['transform']=_photo[_center].style['-webkit-transform']=_photo[_center].style['-ms-transform']=_photo[_center].style['-moz-transform']='rotate(0deg)';
    }
    photoPosition();
<\/script>
</html>`
  },
  {
    id:'repo37', icon:'✂️', title:"文字分割", desc:"字符串分割动画", group:'text',
    repo:{ dir:"字符串操作", file:"分割文字.html", rel:'%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%93%8D%E4%BD%9C/%E5%88%86%E5%89%B2%E6%96%87%E5%AD%97.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title></title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
        }
        div{
            width:550px;
        }
        span{
            width:100px;
            height:100px;
            display:inline-block;
            text-align:center;
            line-height:100px;
            font-size:50px;
            margin-bottom:10px;
            margin-right:10px;
        }
    </style>
</head>
<body>
    <div>

    </div>
    <input type="text"/>
    <input type="button" value="提交">
</body>
<script type="text/javascript">
    var myContent=document.getElementsByTagName('div');
    var aBtn=document.getElementsByTagName('input');
    var aColor=["red","#ffff00","blue","green","orange"];//创建颜色数组
    aBtn[1].onclick=function(){
        var str='';
        var myText=aBtn[0].value;
        var textArray=myText.split("");//单个字符切割
        for(var i=0;i<textArray.length;i++){
            str+="<span style='background:"+aColor[i%aColor.length]+"'>"+textArray[i]+"</span>";//颜色每5个一次循环
        }
        myContent[0].innerHTML+=str;
        aBtn[0].value='';
    };
<\/script>
</html>`
  },
  {
    id:'repo38', icon:'🔁', title:"文字替换", desc:"文字替换动画", group:'text',
    repo:{ dir:"字符串操作", file:"文字替换.html", rel:'%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%93%8D%E4%BD%9C/%E6%96%87%E5%AD%97%E6%9B%BF%E6%8D%A2.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title></title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
        }
        div{
            width:550px;
        }
        span{
            background:#ffff00;
        }
    </style>
</head>
<body>
    <div>
        [张万年同志逝世]中国共产党的优秀党员，久经考验的忠诚共产主义战士，无产阶级革命家、军事家，中国人民解放军的卓越领导人，中国共产党第十五届中央政治局委员、书记处书记，中央军委原副主席张万年同志，因病医治无效，于2015年1月14日17时在北京逝世，享年87岁。
    </div>
    <input type="text" placeholder="请输入想要替换的文字"/>
    <input type="text" placeholder="请输入替换的内容"/>
    <input type="button" value="替换"/>
</body>
<script type="text/javascript">
    var oInput=document.getElementsByTagName('input');
    var oDiv=document.getElementsByTagName('div');
    oInput[2].onclick=function(){
        var str=/^\\S+$/;
        var oldCon=oInput[0].value;
        var newCon=oInput[1].value;
        if(!str.test(oldCon)||!str.test(newCon)){
            alert("替换内容不为空");
            return false;
        }
        oDiv[0].innerHTML=oDiv[0].innerHTML.split(oldCon).join("<span>"+newCon+"</span>");
        oInput[0].value="";
        oInput[1].value="";
    };
<\/script>
</html>`
  },
  {
    id:'repo39', icon:'🔆', title:"文字高亮", desc:"高亮显示文字", group:'text',
    repo:{ dir:"字符串操作", file:"高亮文字.html", rel:'%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%93%8D%E4%BD%9C/%E9%AB%98%E4%BA%AE%E6%96%87%E5%AD%97.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title></title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
        }
        div{
            width:550px;
        }
        span{
            background:#ffff00;
        }
    </style>
</head>
<body>
    <div>
        [张万年同志逝世]中国共产党的优秀党员，久经考验的忠诚共产主义战士，无产阶级革命家、军事家，中国人民解放军的卓越领导人，中国共产党第十五届中央政治局委员、书记处书记，中央军委原副主席张万年同志，因病医治无效，于2015年1月14日17时在北京逝世，享年87岁。
    </div>
    <input type="text"/>
    <input type="button" value="查找">
</body>
<script type="text/javascript">
    var oDiv=document.getElementsByTagName('div')[0];
    var myContent=oDiv.innerHTML;
    var aBtn=document.getElementsByTagName('input');
    aBtn[1].onclick=function(){
        var str=/^\\S+$/;
        var myText=aBtn[0].value;
        if(!str.test(myText)){
            return false;
        }
        oDiv.innerHTML=myContent.split(myText).join("<span>"+myText+"</span>");
        aBtn[0].value='';
    }
<\/script>
</html>`
  },
  {
    id:'repo40', icon:'🔍', title:"内容缩放", desc:"介绍内容缩放显示", group:'text',
    repo:{ dir:"字符串操作", file:"介绍内容缩放.html", rel:'%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%93%8D%E4%BD%9C/%E4%BB%8B%E7%BB%8D%E5%86%85%E5%AE%B9%E7%BC%A9%E6%94%BE.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>倒计时</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
        }
        a{
            font-size:12px;
            color:blue;
            cursor:pointer;
        }
        p{
            padding:20px;
            width:450px;
            background: #dcba4c;
        }
    </style>
</head>
<body>
<p>
    <span>
        盗墓派的开山祖师爷，文笔和逻辑性绝对能把盗墓笔记拍死在沙滩上。盗墓笔记开场就是鬼吹灯的同人，
        比如王胖子，特么人物就是直接用的鬼吹灯的胖子，连姓名都不改。怕鬼吹灯的设定盗墓分北派南派，发
        丘中郎将、摸金校尉、搬山道人和卸岭力士。盗墓笔记就直接抄袭了这设定。连特么作者的名字都是直接
        按同人作品来的怒但为什么现在大家谈盗墓就说笔记？？难道就因为鬼吹灯是写完才出书的没有按照网文
        的规矩来？？惊 难道里面少了基情就没戏了？？ 衰个人觉得南派三叔人品不咋地...
    </span>
    <a href="javascript:;">>>收缩</a>
</p>
</body>
<script type="text/javascript">
    var oSpan=document.getElementsByTagName('span');
    var oA=document.getElementsByTagName('a');
    var myText=oSpan[0].innerHTML;
    var oBtn=true;
    oA[0].onclick=function(){
        if(oBtn){
            var newText=myText.substring(0,35);
            oSpan[0].innerHTML=newText+'...';
            oA[0].innerHTML='>>展开';
        }else{
            oSpan[0].innerHTML=myText;
            oA[0].innerHTML='>>收缩';
        }
        oBtn=!oBtn;
    }
<\/script>
</html>`
  },
  {
    id:'repo41', icon:'🧵', title:"字符串综合", desc:"字符串操作综合", group:'text',
    repo:{ dir:"字符串操作", file:"字符串综合.html", rel:'%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%93%8D%E4%BD%9C/%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%BB%BC%E5%90%88.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>字符串综合</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
            font-family:"微软雅黑";
        }
        p{
            margin:100px auto;
            padding:20px;
            width:400px;
            border:5px solid #808080;
            font-size:18px;
        }
        a{
            font-size:14px;
        }
        .btn{
            width:40px;
            height:25px;
            text-align:center;
            line-height:25px;
            border:1px solid #808080;
        }
        .btn{
            background:#dcdcdc;
            padding:5px;
            position:absolute;
            left:50%;              /*让元素居中写法*/
            margin-left:225px;
            top:100px;
            cursor:pointer;
        }
        #ChangeCard{
            width:300px;
            height:100px;
            padding:20px;
            border:5px solid #cd5c5c;
            position:absolute;
            left:50%;             /*让元素居中写法*/
            margin-left:-170px;
            top:300px;
            overflow:hidden;
            display:none;
        }
        .Change_div{
            float:left;
            width:40px;
            height:20px;
            text-align:center;
            line-height:20px;
            padding:5px;
            cursor:pointer;
        }
        .myChange{
            clear:left;
            border-top:2px solid #db7093;
            padding:20px;
        }
        input[type="text"]{
            display:inline-block;
            width:100px;
        }
    </style>
</head>
<body>
<p>
    <span>
        特效实验室是一支独具特色的IT培训团队，特效实验室反对传统IT教育枯燥乏味的教学模式，特效实验室提供一种全新的快乐学习方法！
        2013年底，特效实验室最新推出"远程培训"服务，受到很多朋友们的喜爱与追捧，我们必将更加努力的帮助远程学习的朋友实现技术提升……
    </span>
    <a href="javascript:;">>>收缩</a>
</p>
<div class="btn">查找</div>
<div class="btn" style="top:135px;">替换</div>
<div id="ChangeCard">
    <div class="Change_div">查找</div>
    <div class="Change_div">替换</div>
    <div class="myChange">
        <input class="myContent" type="text"/>
        <input class="do_btn" type="button" value="查找"/>
    </div>
    <div class="myChange">
        <input class="myContent" type="text"/>
        <input class="myContent" type="text"/>
        <input class="do_btn" type="button" value="替换"/>
    </div>
</div>
</body>
<script type="text/javascript">
    var oSpan=document.getElementsByTagName('span');
    var oA=document.getElementsByTagName('a');
    var btn=true;
    var oldContent=oSpan[0].innerHTML;
    oA[0].onclick=function(){//文本展开与收缩
        if(btn){
            oSpan[0].innerHTML=oldContent.substring(0,27)+"......";
            oA[0].innerHTML=">>展开";
        }else{
            oSpan[0].innerHTML=oldContent;
            oA[0].innerHTML=">>收缩";
        }
        btn=!btn;
    };
    var myDiv=document.getElementById("ChangeCard");
    var oBtn=document.getElementsByClassName("btn");
    var Change_div=document.getElementsByClassName("Change_div");
    oBtn[0].onclick =function(){//TMD,要照顾行为页面分离,坚持用原生写出来也是醉了
        myDiv.style.display="block";
        document.getElementsByClassName("Change_div")[0].style.background="#db7093";
        document.getElementsByClassName("Change_div")[1].style.background="#fff";
        document.getElementsByClassName("myChange")[0].style.display="block";
        document.getElementsByClassName("myChange")[1].style.display="none";
    };
    oBtn[1].onclick =function(){
        myDiv.style.display="block";
        document.getElementsByClassName("Change_div")[0].style.background="#fff";
        document.getElementsByClassName("Change_div")[1].style.background="#db7093";
        document.getElementsByClassName("myChange")[0].style.display="none";
        document.getElementsByClassName("myChange")[1].style.display="block";
    };
    Change_div[0].onclick=function(){
        document.getElementsByClassName("Change_div")[0].style.background="#db7093";
        document.getElementsByClassName("Change_div")[1].style.background="#fff";
        document.getElementsByClassName("myChange")[0].style.display="block";
        document.getElementsByClassName("myChange")[1].style.display="none";
    };
    Change_div[1].onclick=function(){
        document.getElementsByClassName("Change_div")[0].style.background="#fff";
        document.getElementsByClassName("Change_div")[1].style.background="#db7093";
        document.getElementsByClassName("myChange")[0].style.display="none";
        document.getElementsByClassName("myChange")[1].style.display="block";
    };
//    下面才是正餐
//    查找
    var do_btns=document.getElementsByClassName("do_btn");
    do_btns[0].onclick=function(){
        var str=/^\\S+$/;
        var myContent=oSpan[0].innerHTML;
        var mySearch=document.getElementsByClassName("myContent")[0].value;
        if(str.test(mySearch)){
            if(myContent.split(mySearch).length==1){
                alert("没有找到");
                document.getElementsByClassName("myContent")[0].value="";//清空
                return false;
            }
            oSpan[0].innerHTML=myContent.split(mySearch).join("<span style='background:#ffff00;'>"+mySearch+"</span>");
            oldContent=oSpan[0].innerHTML;
            document.getElementsByClassName("myContent")[0].value="";//清空
        }else{
            alert("请输入查找内容");
        }
    };
//    替换
    do_btns[1].onclick=function(){
        var str=/^\\S+$/;
        var myContent=oSpan[0].innerHTML;
        var myChange1=document.getElementsByClassName("myContent")[1].value;
        var myChange2=document.getElementsByClassName("myContent")[2].value;
        if(!str.test(myChange1)){
            alert("请输入要替换的内容");
            return false;
        }
        if(!str.test(myChange2)){
            if(confirm("确定要删除吗?")){
                oSpan[0].innerHTML=myContent.split(myChange1).join("<span style='background:orange;'>"+myChange2+"</span>");
                document.getElementsByClassName("myContent")[1].value="";//清空
                return false;
            }
        }
        oSpan[0].innerHTML=myContent.split(myChange1).join("<span style='background:orange;'>"+myChange2+"</span>");
        oldContent=oSpan[0].innerHTML;
        document.getElementsByClassName("myContent")[1].value="";//清空
        document.getElementsByClassName("myContent")[2].value="";
    };
<\/script>
</html>`
  },
  {
    id:'repo42', icon:'☁️', title:"字符云", desc:"文字云 / 词云展示", group:'text',
    repo:{ dir:"字符云", file:"wordCloud.html", rel:'%E5%AD%97%E7%AC%A6%E4%BA%91/wordCloud.html' },
    code:`﻿<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        #test{
            position: relative;
            width: 400px;
            height: 400px;
            margin: 0 auto;
            border: 1px solid red;
        }
    </style>
</head>
<body>
<div id="test"></div>
</body>
<script src="js/wordcloud2.js"><\/script>
<script>
    var list=[];  //list必须是二维数组[[],[]]形式  源码333行开始是控制颜色的代码  父元素的css必须加相对定位，因为字符云是绝对定位的
    for(var i=0;i<20;i++){
        list.push(
                ['test',parseInt(Math.random()*40+20)]  //控制字符大小
        )
    }
    WordCloud(document.getElementById('test'),{list:list});
<\/script>
</html>`
  },
  {
    id:'repo43', icon:'⏱️', title:"延时菜单", desc:"setTimeout 延时菜单", group:'component',
    repo:{ dir:"延时菜单", file:"11-setTimeout实例.html", rel:'%E5%BB%B6%E6%97%B6%E8%8F%9C%E5%8D%95/11-setTimeout%E5%AE%9E%E4%BE%8B.html' },
    code:`<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>

<style>
#qq { width:200px; height:400px; background:#F9C; }
#title { width:240px; height:180px; background:#FC6; position:absolute; top:10px; left:220px; display:none; }
</style>
<script src="miaov.js"><\/script>
<script>
$(function(){
	var qq = $('qq');
	var title = $('title');
	var timer = null;
	
	qq.onmouseover = show;
	qq.onmouseout = hide;
	
	title.onmouseover = show;
	title.onmouseout = hide;
	
	function show(){
		clearInterval( timer );
		title.style.display = 'block';
	}
	function hide(){
		timer = setTimeout(function(){
			title.style.display = 'none';
		}, 200);
	}
});
<\/script>
</head>

<body>

<div id="qq"></div>
<div id="title"></div>

</body>
</html>
`
  },
  {
    id:'repo44', icon:'🚪', title:"推拉门改进", desc:"改进后的推拉门", group:'component',
    repo:{ dir:"推拉门改进", file:"推拉门改进.html", rel:'%E6%8E%A8%E6%8B%89%E9%97%A8%E6%94%B9%E8%BF%9B/%E6%8E%A8%E6%8B%89%E9%97%A8%E6%94%B9%E8%BF%9B.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>推拉门改进</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
        }
        li{
            list-style:none;
        }
        #picLists{
            border:1px solid #000;
            position:relative;
            width:1000px;
            height:400px;
            margin:0 auto;
            overflow:hidden;
        }
        img{
            width:100%;
            height:400px;
            cursor:pointer;
        }
        #picLists ul li{
            position:absolute;
            width:1000px;
            height:400px;
            top:0;
        }
    </style>
</head>
<body>
<div id="picLists">
    <ul>
        <li>
            <img src="han1.jpg" alt=""/>
        </li>
        <li>
            <img src="han2.jpg" alt=""/>
        </li>
        <li>
            <img src="han3.jpg" alt=""/>
        </li>
        <li>
            <img src="han4.jpg" alt=""/>
        </li>
        <li>
            <img src="han5.jpg" alt=""/>
        </li>
    </ul>
</div>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
    $(function(){
        var n=0;
        var myLi=$('#picLists').find('li');
        for(var i=0;i<myLi.length;i++){
            myLi.eq(i).css({left:i*200+'px'});
        }
        myLi.hover(function(){
            var liIndex=$(this).index();
            for(var j=1;j<=liIndex;j++){
                myLi.eq(j).stop().animate({left:j*100+'px'},300);
            }
            for(var j=liIndex+1;j<myLi.length;j++){
                myLi.eq(j).stop().animate({left:500+j*100+'px'},300);
            }
        },function(){
            for(var i=0;i<myLi.length;i++){
                myLi.eq(i).stop().animate({left:i*200+'px'},300);
            }
        });
    });
<\/script>
</html>`
  },
  {
    id:'repo45', icon:'🗳️', title:"辩论投票", desc:"搜狐式辩论投票", group:'component',
    repo:{ dir:"搜狐辩论投票/html", file:"搜狐辩论投票.html", rel:'%E6%90%9C%E7%8B%90%E8%BE%A9%E8%AE%BA%E6%8A%95%E7%A5%A8/html/%E6%90%9C%E7%8B%90%E8%BE%A9%E8%AE%BA%E6%8A%95%E7%A5%A8.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        body{font-size:12px;color:#666;background: #fff;}
        #box_bg{width:440px;height:10px;background:url(../images/bg.gif) no-repeat;padding:24px 48px;margin:0 auto;}
        #container{height:10px;position:relative;}
        .line{height:10px;position:absolute;}
        #white,#green{width:100%;}
        #green{background:url(../images/green.gif) repeat-x #00FF00;height:10px;}
        #red{background:url(../images/red.gif) repeat-x #FF0000;height:10px;width:50%;}
        #white{background-color:yellow}
        #vs{width:40px;height:40px;background:url(../images/vs.gif) no-repeat;line-height:40px;text-align:center;position:absolute;left:205px;top:-10px;display:none}
        .scope{height:24px;text-align:center;}
        .scope span{color:#FF3300;font-weight:bold;padding:0 5px;}
        #all2{margin:0 auto }
        #aa2{float:left}
        #bb2{float:right}
    </style>
</head>
<body>
<div id="box_bg">
    <div id="container">
        <!--绿色条层级在最下面，宽度为100%-->
        <div id="green" class="line"></div>
        <!--红色条在绿色条上面，宽度为50%-->
        <div id="red" class="line"></div>
        <!--白色条在最上边，最开始是遮住红绿色条的-->
        <div id="white" class="line"></div>
        <div id="vs"></div>
    </div>
</div>
<div style="width:440px; margin:0 auto;">
    <div id="aa2" class="scope">正方<span id="aa"></span>票</div>
    <div id="bb2" class="scope">反共<span id="bb"></span>票</div>
    <div id="all2" class="scope">总共<span id="all"></span>票</div>
</div>
</body>
<script src="../js/jquery.min.js"><\/script>
<script>
    $(document).ready(function () {
        var a = 500;  //可以改为动态
        var b = 130;
        $("#white").animate({ width: 0, left: "220px" }, 1000, function () {  //宽度变为0的同时，让位置往左边移动父级(box_bg,container)的一半，正好到中间，形成红绿条同时出现
            $("#vs").fadeIn("slow", function () {
                $("#all").html(a + b);
                $("#aa").html(a);
                $("#bb").html(b);
                var newLeft = a / (a + b) * 440 - 20 + "px"; //计算红绿条的百分比，440为总长度，20为vs宽度的一半
                $("#vs").animate({ left: newLeft }, 1000);
                $("#red").animate({ width: newLeft }, 1000);
            });
        });
    });
<\/script>
</html>`
  },
  {
    id:'repo46', icon:'🔍', title:"搜索自动补全", desc:"输入搜索自动补全", group:'component',
    repo:{ dir:"搜索自动补全/html", file:"自动补全.html", rel:'%E6%90%9C%E7%B4%A2%E8%87%AA%E5%8A%A8%E8%A1%A5%E5%85%A8/html/%E8%87%AA%E5%8A%A8%E8%A1%A5%E5%85%A8.html' },
    code:`﻿<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        .ui-autocomplete{
            width: 200px;
            list-style: none;
            padding: 0;
            border-left: 1px solid #333;
            border-right: 1px solid #333;
            border-bottom: 1px solid #333;
            background: #fff;
        }
        .ui-menu-item{
            color: #333;
            font-size: 15px;
            padding: 5px 4px;
        }
        .ui-menu-item:hover{
            cursor: pointer;
            color: #333;
            background: #ebebeb;
        }
        .ui-helper-hidden-accessible{
            display: none;
        }
    </style>
</head>
<body>
<input id="test" type="text"/>
</body>
<script src="../js/jquery-1.9.1.min.js"><\/script>
<script src="../js/jquery-ui.min.js"><\/script>
<script src="../js/jquery-ui-widget-combobox.js"><\/script>
<script>
    $("#test").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: "/search",
                dataType: "json",
                type:'post',
                data: {
                    keyWord: request.term
                },
                success: function(data) {
                    response($.map(data.data, function(item) {
                        return {
                            label: item.title
                        }
                    }));
                }
            });
        },
        minLength: 2,
        open: function() {  //在下拉框被显示的时候触发
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function() {  //在下拉框被隐藏的时候触发
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });
<\/script>
</html>`
  },
  {
    id:'repo47', icon:'🎰', title:"摇奖机", desc:"摇奖 / 抽奖动画", group:'game',
    repo:{ dir:"摇奖/摇奖自写", file:"摇奖.html", rel:'%E6%91%87%E5%A5%96/%E6%91%87%E5%A5%96%E8%87%AA%E5%86%99/%E6%91%87%E5%A5%96.html' },
    code:`﻿<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .main{
            width: 770px;
            margin: 0 auto;
        }
        .response{
            text-align: center;
            margin-top: 100px;
            margin-bottom: 10px;
            height: 40px;
            line-height: 40px;
        }
        .num_box{
            overflow: hidden;
        }
        .num_box>div{
            float: left;
            width: 180px;
            height: 265px;
            margin-right: 10px;
            background: url("img/num.png") top center repeat-y #ccc;  /*repeat-y来实现轮播*/
        }
        .num_btn{
            width: 200px;
            height: 50px;
            line-height: 50px;
            background: greenyellow;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px auto;
            text-align: center;
            font-size: 22px;
        }
    </style>
</head>
<body>
<div class="main">
    <h1 class="response"></h1>
    <div class="num_box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="num_btn">开始摇奖</div>
</div>
</body>
<script src="js/jquery-1.11.0.js"><\/script>
<script>
    var flag=false;
    $('.num_btn').on('click',function(){
        if(!$('.num_box>div').is(':animated')){
            if(flag==true){
                return false;  //放置多次点击
            }
            flag=true;
            var imgH=265;
            var number=getRandomNumber()+'';
            $('.num_box>div').css('background-position-y',0);  //将所有背景图重置为0
            var numArr=number.split('');
            $('.num_box>div').each(function(index){
                var This=$(this);  //This必须写在外面，不能卸载setTimeout里面
                setTimeout(function(){
                    This.animate({'background-position-y':imgH*50-imgH*numArr[index]},6000,'swing');
                    if(parseInt(index)==3){
                        $('.response').text('摇奖结果:'+number);
                        flag=false;
                    }
                },500*index);
            });
        }
    });
    function getRandomNumber(){
        var max=9999;
        var min=0;
        var numRandom=parseInt(Math.random()*(max-min));
        var str='';
        if(0<=numRandom && numRandom<10){
            str='000'+numRandom;
        }else if(10<=numRandom && numRandom<100){
            str='00'+numRandom;
        }else if(100<=numRandom && numRandom<1000){
            str='0'+''+numRandom;
        }else{
            str=''+numRandom;
        }
        return str;
    }
<\/script>
</html>`
  },
  {
    id:'repo48', icon:'🧽', title:"擦除刮刮乐", desc:"鼠标擦除揭示内容", group:'interact',
    repo:{ dir:"擦除/html", file:"擦除.html", rel:'%E6%93%A6%E9%99%A4/html/%E6%93%A6%E9%99%A4.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        div{
            position: relative;
        }
        #topPic{
            position: absolute;
            z-index: 20;
        }
        #redux{
            position: absolute;
            z-index: 30;
        }
    </style>
</head>
<body>
<div>
    <img id="topPic" src="../img/han2.jpg" alt=""/>
    <img id="redux" src="../img/han1.jpg" alt=""/>
</div>
</body>
<script src="../js/jquery-1.9.1.min.js"><\/script>
<script src="../js/jquery.eraser.js"><\/script>
<script>
//    addEventListener( "load", init, false );

    function init( event ) {
        $("#redux").eraser();
    }

    function remove(event) {
        $("#redux").eraser('clear');
        event.preventDefault();
    }

    function reset(event) {
        $("#redux").eraser('reset');
        event.preventDefault();
    }

    function grow(event) {
        $("#redux").eraser("size",200);
        event.preventDefault();
    }
    init();
<\/script>
</html>`
  },
  {
    id:'repo49', icon:'🔎', title:"放大镜", desc:"图片放大镜效果", group:'interact',
    repo:{ dir:"放大镜", file:"放大镜效果.html", rel:'%E6%94%BE%E5%A4%A7%E9%95%9C/%E6%94%BE%E5%A4%A7%E9%95%9C%E6%95%88%E6%9E%9C.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>放大镜效果</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
        }
        #myDiv{
            position:relative;
            width:200px;
            height:200px;
        }
        #myDiv .smallPic{
            width:200px;
            height:200px;
            position:relative;
        }
        #myDiv .float_lay{
            width:50px;
            height:50px;
            border:1px solid #000;
            position:absolute;
            opacity:0.3;
            background:#fff;
            top:0;
            left:0;
            display:none;
        }
        #myDiv .bigPic{
            position:absolute;
            top:0;
            left:200px;
            overflow:hidden;
            width:250px;
            height:250px;
            border:1px solid #000;
            display:none;
        }
    </style>
</head>
<body>
<div id="myDiv">
    <div class="smallPic">
        <span class="float_lay"></span>
        <img src="small.png" alt=""/>
    </div>
    <div class="bigPic">
        <img src="big.png" alt=""/>
    </div>
</div>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
    $(function(){
        var myDiv=$('#myDiv');
        $('#myDiv .smallPic').hover(function(){
            $('#myDiv .float_lay').css({display:'block'});
            $('#myDiv .bigPic').css({display:'block'});
        },function(){
            $('#myDiv .float_lay').css({display:'none'});
            $('#myDiv .bigPic').css({display:'none'});
        });
        $('#myDiv .smallPic').on('mousemove',function(e){//火狐没有event对象，必须传一个event
            var divPosi=$('#myDiv').offset();//取得图片距离页面的边距
            var xx=e.clientX;
            var yy=e.clientY;
            var picLeft=xx-divPosi.left-25;
            var picTop=yy-divPosi.top-25;
            var seePic=$('#myDiv .bigPic').width();
            var bigPic=$('#myDiv .bigPic img').width();
            var percentL;
            var percentT;
            <!--这样写是最好的，不然会卡顿-->
            if(picLeft<0){
                picLeft=0;
            }else if(picLeft>148){
                picLeft=148;
            }
            if(picTop<0){
                picTop=0;
            }else if(picTop>148){
                picTop=148;
            }
            $('#myDiv .float_lay').css({top:picTop+'px',left:picLeft+'px'});
            percentL=-picLeft/148*(bigPic-seePic);
            percentT=-picTop/148*(bigPic-seePic);
            $('#myDiv .bigPic img').css({marginTop:percentT+'px',marginLeft:percentL+'px'});
        });
    });
<\/script>
</html>`
  },
  {
    id:'repo50', icon:'🔤', title:"文字转移", desc:"文字转移动画", group:'component',
    repo:{ dir:"数组", file:"文字转移.html", rel:'%E6%95%B0%E7%BB%84/%E6%96%87%E5%AD%97%E8%BD%AC%E7%A7%BB.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>文字转移</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
        }
        .content{
            border:2px solid #ccc;
            width:300px;
            height:300px;
            float:left;
        }
        input{
            width:100px;
            height:25px;
            float:left;
        }
    </style>
</head>
<body>
<div style="margin:100px auto;width:800px;">
    <textarea class="content" name="mytext" id="mytext" style="resize:none;" placeholder="请输入你想要输入的文字"></textarea>
    <input type="button" value="转移"/>
    <div class="content"></div>
</div>
</body>
<script type="text/javascript">
    var oBtn=document.getElementsByTagName("input")[0];
    var timer=null;
    oBtn.onclick=function(){
        var str=/^\\S+$/;
        var myContent=document.getElementsByTagName("textarea")[0].value;
        document.getElementsByClassName("content")[1].innerHTML="";
        if(str.test(myContent)){
            var mySplit=myContent.split("");
            var n=0;
            setInterval(function(){
                if(n<mySplit.length){
                    document.getElementsByClassName("content")[1].innerHTML+=mySplit[n];
                    document.getElementsByTagName("textarea")[0].value=myContent.substring(n+1,mySplit.length);
                    n++;
                }else{
                    clearInterval(timer);
                }
            },500);
        }else{
            alert("请输入文字");
        }
    };
<\/script>
</html>`
  },
  {
    id:'repo51', icon:'🔁', title:"无缝切换", desc:"无缝图片切换", group:'visual',
    repo:{ dir:"无缝切换", file:"无缝切换.html", rel:'%E6%97%A0%E7%BC%9D%E5%88%87%E6%8D%A2/%E6%97%A0%E7%BC%9D%E5%88%87%E6%8D%A2.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset=utf-8>
    <title>无缝切换</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
        }
        li{
            list-style:none;
        }
        #myDiv{
            border:1px solid #000;
            position:relative;
            margin:0 auto;
            width:1000px;
            height:200px;
            overflow:hidden;
        }
        #myUl{
            position:absolute;
            left:0;
            top:0;
        }
        #myUl li{
            width:200px;
            height:200px;
            float:left;
        }
    </style>
</head>
<body>
<input type="button" value="向左" id="myLeft"/>
<input type="button" value="向右" id="myRight"/>
<div id="myDiv">
    <ul id="myUl">
        <li>
            <img src="test1.jpg" alt=""/>
        </li>
        <li>
            <img src="test2.jpg" alt=""/>
        </li>
        <li>
            <img src="test3.jpg" alt=""/>
        </li>
        <li>
            <img src="test4.jpg" alt=""/>
        </li>
        <li>
            <img src="test5.jpg" alt=""/>
        </li>
    </ul>
</div>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
    function getWidth(obj){
        var liNum=$(obj).find('li').length;
        $(obj).width(liNum*200);
    }
    $(function(){
        var myUl=$('#myUl');//动态设置ul的宽度
        var myLi=myUl.find('li');
        getWidth(myUl);
    });
    $('#myLeft').on('click',function(){
        var myUl=$('#myUl');
        var myLi=myUl.find('li');
        var picNum=2;//一次想让几张图片移动
        if(!myUl.is(':animated')){
            for(var i=0;i<picNum;i++){
                var newLi=myLi.eq(i).clone(true);
                myUl.append(newLi);
                getWidth(myUl);
            }
            myUl.animate({
                left:'-='+picNum*200+'px'//注意这个写法！锋利的jQuery P139，每次减少picNum*200
            },500,function(){
                for(var i=0;i<picNum;i++){
                    myLi.eq(i).remove();//移动完成后，将移出去的图片节点删除，同时将ul的left设置为0
                    myUl.css({left:'0px'});
                }
            });
        }
    });
    $('#myRight').on('click',function(){
        var myUl=$('#myUl');
        var myLi=myUl.find('li');
        var totalPic=5;
        var picNum=2;//一次想让几张图片移动
        if(!myUl.is(':animated')){
            for(var i=totalPic;i>totalPic-picNum;i--){
                var newLi=myLi.eq(i-1).clone(true);
                myUl.prepend(newLi);
                myUl.css({left:-picNum*200+'px'});
                getWidth(myUl);
            }
            myUl.animate({left:'+='+200*picNum+''},500,function(){
                for(var i=myLi.length;i>myLi.length-picNum;i--){
                    myLi.eq(i-1).remove();
                }
            });
        }
    });
<\/script>
</html>`
  },
  {
    id:'repo52', icon:'📅', title:"日历插件", desc:"jQuery 日历插件", group:'component',
    repo:{ dir:"日历插件/html", file:"日历.html", rel:'%E6%97%A5%E5%8E%86%E6%8F%92%E4%BB%B6/html/%E6%97%A5%E5%8E%86.html' },
    code:`﻿<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>日历</title>
    <link rel="stylesheet" href="../css/jquery.cxcalendar.css"/>
</head>
<body>
<!--注意点:(个人表示该插件比bootstrap的日历插件简单而且好看，这个插件可以自定义input样式)
1.data-start-date表示起始日期，data-end-date表示截止日期;
2.data-type日期显示格式(YYYY-M-D和YYYY/M/D常用);
3.data-language语言(cn和en常用);
4.data-position日历显示的位置(bottom常用);
5.data-wday日历上面的星期从几开始(0-6);
6.readonly一般要加上，不然用户可以自己输入;
7.如果有data-start-date，那么value不要小于data-start-date的值(火狐下貌似有BUG);
8.除周末两天的红色数字外，其他红色节日，移入会显示具体是什么节日(周末和节假日字体颜色可在css改变(比如假日颜色不需要为红色));
9.点击空白日历消失，js会根据整个页面的宽度和高度生成一个点击块，点上面的时候日历消失(未压缩源码348行)。
-->
<!--<input id="myCalender" type="text" value="2015-08-17" data-start-date="2014-1-21" data-end-date="2015-12-31" data-type="YYYY-MM-DD" data-position="bottom" data-wday="0" readonly>-->
<input id="myCalender2" type="text" value="2015-08-17" data-start-date="2014-1-21" data-end-date="2015-12-31" data-type="YYYY-MM-DD" data-position="bottom" data-wday="0" readonly>
<input id="myCalender3" type="text" value="2015-08-17" data-start-date="2014-1-21" data-end-date="2015-12-31" data-type="YYYY-MM-DD" data-position="bottom" data-wday="0" readonly>
</body>
<script src="../js/jquery-1.9.1.min.js"><\/script>
<script src="../js/jquery.cxcalendar.js"><\/script>
<script src="../js/jquery.cxcalendar.languages.js"><\/script>
<script>
//单个日历
//$('#myCalender').cxCalendar();
// 双联动日期示例
(function(){
  var dateFirst = $('#myCalender2');
  var dateLast = $('#myCalender3');
  var dateFirstApi;
  var dateLastApi;

  dateFirst.cxCalendar(function(api){
    dateFirstApi = api;
  });
  
  dateLast.cxCalendar(function(api){
    dateLastApi = api;
  });

  dateFirst.bind('change', function(){
    var firstTime = parseInt(dateFirstApi.getDate('TIME'), 10);
    var lastTime = parseInt(dateLastApi.getDate('TIME'), 10);

    if (lastTime < firstTime) {
      dateLastApi.clearDate();
    };

    dateLastApi.setOptions({
      startDate: firstTime
    });
    dateLastApi.show();
  });
})();
<\/script>
</html>`
  },
  {
    id:'repo53', icon:'📅', title:"日历生成", desc:"JS 生成日历", group:'component',
    repo:{ dir:"日历生成", file:"日历生成.html", rel:'%E6%97%A5%E5%8E%86%E7%94%9F%E6%88%90/%E6%97%A5%E5%8E%86%E7%94%9F%E6%88%90.html' },
    code:`<!DOCTYPE html>
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>日历生成</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
            font-family:"微软雅黑";
            font-size:13px;
        }
        table{
            border:1px solid #ccc;
            border-collapse:collapse;
            margin:0 auto;
        }
        table tr td{
            width:35px;
            height:35px;
            border:1px solid #ccc;
            text-align:center;
            line-height:35px;
        }
        #oMon,#oYea{
            width:90%;
        }
    </style>
</head>
<body>
<table>
    <tr>
        <td colspan="3">
            <select id="oMon">
                <option value="1">一月</option>
                <option value="2">二月</option>
                <option value="3">三月</option>
                <option value="4">四月</option>
                <option value="5">五月</option>
                <option value="6">六月</option>
                <option value="7">七月</option>
                <option value="8">八月</option>
                <option value="9">九月</option>
                <option value="10">十月</option>
                <option value="11">十一月</option>
                <option value="12">十二月</option>
            </select>
        </td>
        <td></td>
        <td colspan="3">
            <select id="oYea">
                <option value="2010">2010年</option>
                <option value="2011">2011年</option>
                <option value="2012">2012年</option>
                <option value="2013">2013年</option>
                <option value="2014">2014年</option>
                <option value="2015">2015年</option>
                <option value="2016">2016年</option>
                <option value="2017">2017年</option>
                <option value="2018">2018年</option>
                <option value="2019">2019年</option>
            </select>
        </td>
    </tr>
    <tr>
        <td>Sun</td>
        <td>Mon</td>
        <td>Tue</td>
        <td>Wed</td>
        <td>Thu</td>
        <td>Fri</td>
        <td>Sat</td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
//    进入页面将日期设置为当前年份和月份,月份从0开始
    $(function(){
        var curDate=new Date();
        $('#oMon').val(curDate.getMonth()+1);
        $('#oYea').val(curDate.getFullYear());
        //    生成当前日历
        drawCallender(curDate.getFullYear(),curDate.getMonth()+1);
    });
//    返回上月最后一天的号数
    function getCurDate(year,month){
        var curDate=new Date(year,month,0);//new Date(年,月,0)会返回当前年当前月的前一月的最后一天
        return curDate.getDate();
    }
//    日历计算函数
    function makeCallender(year,month){
        var aMonth=[];//二维数组用来存放日期
        aMonth[0]=[];//=左边表示行,=右边存放星期集合
        aMonth[1]=[];
        aMonth[2]=[];
        aMonth[3]=[];
        aMonth[4]=[];
        aMonth[5]=[];
        aMonth[6]=[];
        var monFirstDate=new Date(year,month-1,1);//创建当前年当前月的第一天,传入的month实际上等于现实的month+1,比如传入2月,实际上是3月，所以减1才是当前月份
        var monFirstDay=monFirstDate.getDay();//当前年当前月的第一天是星期几
        var curMonDate=getCurDate(year,month);//当前月的最后一天
        var theDate=1;
        var i,c,r;//c对应行号,r对应列号
//        先显示第二行
        for(c=monFirstDay;c<7;c++){
            aMonth[1][c]=theDate;
            theDate++;
        }
//        显示其他行
        for(r=2;r<7;r++){
            for(i=0;i<7;i++){
                if(theDate<=curMonDate){
                    aMonth[r][i]=theDate;
                    theDate++;
                }
            }
        }
        return aMonth;
    }
//    日历生成函数
    function drawCallender(year,month){
        var r,c;//r对应行,c对应列
        var myMonth=makeCallender(year,month);
//        生成日历
        for(r=1;r<7;r++){
            for(c=0;c<7;c++){
                $('table').find('tr').eq(r+1).find('td').eq(c).text('');//先清空
                $('table').find('tr').eq(r+1).find('td').eq(c).text(myMonth[r][c]);
            }
        }
    }
//    select添加事件
    $('#oMon').on('change',function(){
        var myMonth=$(this).val();
        var myYear=$('#oYea').val();
        drawCallender(myYear,myMonth);
    });
    $('#oYea').on('change',function(){
        var myYear=$(this).val();
        var myMonth=$('#oMon').val();
        drawCallender(myYear,myMonth);
    });
<\/script>
</html>`
  },
  {
    id:'repo54', icon:'📅', title:"日历联动", desc:"双日历联动", group:'component',
    repo:{ dir:"日历联动", file:"index.html", rel:'%E6%97%A5%E5%8E%86%E8%81%94%E5%8A%A8/index.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="css/dateRange.css"/>
    <style>
        #datePicker{
            padding: 5px 10px;
            border: 1px solid #d1d1d1;
            text-align: center;
            width: 200px;
            float: right;
            margin-right: 50px;
        }
    </style>
</head>
<body>
<div id="datePicker"></div>
</body>
<script src="js/jquery.min.js"><\/script>
<script src="js/dateRange.js"><\/script>
<script>
    var dateRange = new pickerDateRange('datePicker', {
        startDate : new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDate()-1),
        endDate : new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDate()-1),
        defaultText : ' 至 ',
        minValidDate : (new Date(new Date().getFullYear()+'-'+(new Date().getMonth())+'-'+(new Date().getDate()-1)).getTime())/1000,  //简直日了狗，源码里面把毫秒数乘以了1000，所以这里的毫秒数要先除以1000，我靠，花了大半个下午找原因
        theme : 'ta'
    });
<\/script>
</html>`
  },
  {
    id:'repo55', icon:'🎯', title:"模拟扔物体", desc:"模拟扔小球物理", group:'game',
    repo:{ dir:"模拟扔物体", file:"模拟扔小球.html", rel:'%E6%A8%A1%E6%8B%9F%E6%89%94%E7%89%A9%E4%BD%93/%E6%A8%A1%E6%8B%9F%E6%89%94%E5%B0%8F%E7%90%83.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>模拟扔小球</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
        }

        img{
            width:100%;
            height:100%;
        }
        #test{
            position:absolute;
        }
    </style>
</head>
<body>
<div id="test">
    <img src="han1.jpg" alt=""/>
</div>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
    $(function(){
        var mydiv=document.getElementById('test');
        var prevX=0;
        var prevY=0;
        var iSpeedX=0;
        var iSpeedY=0;
        var timer=null;
        var divtimer=null;
        mydiv.style.width=0;
        mydiv.style.height=0;
        mydiv.style.left=document.documentElement.clientWidth/2+'px';
        mydiv.style.top=document.documentElement.clientHeight/2+'px';
//      “定义式”函数定义
//        function Fn1(){
//            alert("Hello World!");
//        }
//      “赋值式”函数定义
//        var Fn2 = function(){
//            alert("Hello wild!");
//        }
//      “定义式”函数定义
//        Fn1();
//        function Fn1(){
//            alert("Hello World!");
//        }
//        正常执行，弹出“Hello World!”，浏览器对Fn1进行了预处理，再从Fn1();开始执行。
//      “赋值式”函数定义
//        Fn2();
//        var Fn2 = function(){
//            alert("Hello wild!");
//        }
//        Firebug报错：Fn2 is not a function，浏览器未对Fn2进行预处理，依序执行，所以报错Fn2未定义。
//        根据以上，var divtimer=setInterval并未预处理，所以不认识里面的starMove()函数。
        function startMove(){//该函数必须提上来，注意执行顺序的问题！！！具体为什么见上注释
            clearInterval(timer);
            timer=setInterval(function(){
                iSpeedY+=3;
                var newLeft=mydiv.offsetLeft+iSpeedX;
                var newTop=mydiv.offsetTop+iSpeedY;
                if(newLeft<=0){
                    newLeft=0;
                    iSpeedX=-iSpeedX;
                    iSpeedX*=0.5;
                }
                if(newLeft>=(document.documentElement.clientWidth-mydiv.offsetWidth)){
                    newLeft=document.documentElement.clientWidth-mydiv.offsetWidth;
                    iSpeedX=-iSpeedX;
                    iSpeedX*=0.5;
                }
                if(newTop<=0){
                    newTop=0;
                    iSpeedY=-iSpeedY;
                    iSpeedX*=0.5;
                    iSpeedY*=0.5;
                }
                if(newTop>=(document.documentElement.clientHeight-mydiv.offsetHeight)){
                    newTop=document.documentElement.clientHeight-mydiv.offsetHeight;
                    iSpeedY=-iSpeedY;
                    iSpeedX*=0.5;
                    iSpeedY*=0.5;
                }
                mydiv.style.left=newLeft+'px';
                mydiv.style.top=newTop+'px';
            },30);
        }
        toChange(300,200);
        function toChange(w,h){
            var L=mydiv.offsetLeft;
            var T=mydiv.offsetTop;
            var divtimer=setInterval(function(){
                if(mydiv.offsetWidth==w&&mydiv.offsetHeight==h){
                    clearInterval(divtimer);
                    setTimeout(startMove,300);
                }else{
                    mydiv.style.width=mydiv.offsetWidth+30+'px';
                    mydiv.style.height=mydiv.offsetHeight+20+'px';
                    mydiv.style.left=L-mydiv.offsetWidth/2+'px';
                    mydiv.style.top=T-mydiv.offsetHeight/2+'px';
                }
            },30);
        }
        mydiv.onmousedown=function(e){
            clearInterval(timer);
            var ev=e||window.event;
            var disX=ev.clientX-mydiv.offsetLeft;
            var disY=ev.clientY-mydiv.offsetTop;
            prevX=e.clientX;
            prevY=e.clientY;
            document.onmousemove=function(e){
                var ev=e||window.event;
                mydiv.style.left=ev.clientX-disX+'px';
                mydiv.style.top=ev.clientY-disY+'px';
                iSpeedX=ev.clientX-prevX;
                iSpeedY=ev.clientY-prevY;
                prevX=ev.clientX;
                prevY=ev.clientY;
            };
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
                startMove();
            };
            return false;
        }
    });
<\/script>
</html>`
  },
  {
    id:'repo56', icon:'🌊', title:"瀑布流", desc:"瀑布流布局", group:'visual',
    repo:{ dir:"瀑布流", file:"瀑布流.html", rel:'%E7%80%91%E5%B8%83%E6%B5%81/%E7%80%91%E5%B8%83%E6%B5%81.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        *{
            padding: 0;
            margin: 0;
        }
        .wrap{
            width: 100%;
        }
        .wrap .cont{
            width: 1000px;
            margin: 0 auto;
            overflow: hidden;
        }
        .wrap ul{
            float: left;
            margin: 0 25px;
            list-style: none;
        }
        .wrap ul li{
            width: 200px;
            background: #dcdcdc;
            margin: 10px 0;
        }
        h2{
            height: 70px;
            line-height: 70px;
            background: #101010;
            padding-left: 50px;
            color: #fff;
        }
        .wrap ul .h1{
            height: 200px;
        }
        .wrap ul .h2{
            height: 70px;
        }
        .wrap ul .h3{
            height: 300px;
        }
        .wrap ul .h4{
            height: 180px;
        }
    </style>
</head>
<body>
<div class="wrap">
    <h2>瀑布流展示：</h2>
    <div class="cont">
        <ul></ul>
        <ul></ul>
        <ul></ul>
        <ul></ul>
    </div>
</div>
</body>
<script src="js/jquery-1.9.1.min.js"><\/script>
<script>
    function appendLi(){
        var ulList=$('.cont>ul');
        var ul1_h=ulList[0].offsetHeight;
        var ul2_h=ulList[1].offsetHeight;
        var ul3_h=ulList[2].offsetHeight;
        var ul4_h=ulList[3].offsetHeight;
        var minUl=Math.min(ul1_h,ul2_h,ul3_h,ul4_h);
        var min_ul;
        var lis;
        var classH;
        for(var i=0;i<ulList.length;i++){
            if(ulList[i].offsetHeight == minUl){
                min_ul=ulList[i];
            }
            classH=getRandomHeight();
            lis='<li class="h'+classH+'"></li>';
        }
        $(min_ul).append(lis);
    }
    function getRandomHeight(){
        return Math.floor(Math.random()*3+1);
    }
    $(function(){
         for(var i=0;i<20;i++){
             appendLi();
         }
    });
//    window.onscroll=function(){
//        var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
//        var docH=document.documentElement.offsetHeight;  //整个文档高度
//        var winH=document.documentElement.clientHeight;  //窗口高度
//        if(docH-winH == scrollTop){  //滚动条距离底部100px  妈的照理说这里没错，不晓得为毛谷歌里面拉到底的时候非要拉上来再往下拉才可以
//            appendLi();
//        }
//    };
    $(window).on('scroll',function(){
        if($(document).scrollTop() + $(window).height() > $(document).height() - 20){
            $(document).scrollTop($(document).scrollTop()-10);  //拉到底就把滚动条往上少拉10px
            appendLi();
        }
    });
<\/script>
</html>`
  },
  {
    id:'repo57', icon:'👆', title:"点击特效", desc:"点击触发特效", group:'interact',
    repo:{ dir:"点击特效", file:"test.html", rel:'%E7%82%B9%E5%87%BB%E7%89%B9%E6%95%88/test.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        #test{
            width: 150px;
            height: 25px;
            border: 1px solid #d1d1d1;
            overflow: hidden;
        }
        #bar{
            width: 0;
            background: red;
            height: 25px;
        }
    </style>
</head>
<body>
<div id="test">
    <div id="bar"></div>
</div>
<input type="button" value="点击"/>
</body>
<script src="js/jquery-1.9.1.min.js"><\/script>
<script>
    var dec=function(){
        var _this=$('#bar');
        var _len=_this.width();
        _len-=2;
        if(_len<0){
            _len=0;
        }
        _this.width(_len);
    };
    var barDesc=setInterval(dec,200);
    $('input').on('click',function(){
        var _this=$('#bar');
        var _len=_this.width();
        if(_len>150){
            clearInterval(barDesc);
        }else{
            _len+=6;
            _this.width(_len);
        }
    });
<\/script>
</html>`
  },
  {
    id:'repo58', icon:'🧊', title:"3D 立方体", desc:"3D 立方体旋转", group:'visual',
    repo:{ dir:"立方体", file:"3D旋转轮播.html", rel:'%E7%AB%8B%E6%96%B9%E4%BD%93/3D%E6%97%8B%E8%BD%AC%E8%BD%AE%E6%92%AD.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>3D轮播旋转图</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
        }
        .wrap{
            width:200px;
            height:200px;
            padding:200px;
            border:1px solid #000;
            /*井深*/
            -webkit-perspective:800px;
        }
        .wrap:hover .box{
            -webkit-transform:rotateX(180deg);
        }
        .box{
            width:200px;
            height:200px;
            position:relative;
            /*3D显示*/
            -webkit-transform-style:preserve-3d;
            -webkit-transition:2s all linear;
            -webkit-transform:translateZ(-100px);
        }
        .box div{
            width:200px;
            height:200px;
            position:absolute;
            color:#000;
            font-size:100px;
            line-height:200px;
            text-align:center;
        }
        .box div:nth-child(1){
            background:red;
            top:-200px;
            left:0;
            -webkit-transform-origin:bottom;
            -webkit-transform:translateZ(100px) rotateX(90deg);
        }
        .box div:nth-child(2){
            background:blue;
            top:0;
            left:-200px;
            -webkit-transform-origin:right;
            -webkit-transform:translateZ(100px) rotateY(-90deg);
        }
        .box div:nth-child(3){
            background:yellow;
            top:0;
            left:0;
            -webkit-transform:translateZ(100px);
        }
        .box div:nth-child(4){
            background:green;
            top:0;
            left:200px;
            -webkit-transform-origin:left;
            -webkit-transform:translateZ(100px) rotateY(90deg);
        }
        .box div:nth-child(5){
            background:pink;
            top:200px;
            left:0;
            -webkit-transform-origin:top;
            -webkit-transform:translateZ(100px) rotateX(-90deg);
        }
        .box div:nth-child(6){
            background:#f06;
            top:0;
            left:0;
            -webkit-transform:translateZ(-100px) rotateX(180deg);
        }
    </style>
</head>
<body>
<div class="wrap">
    <div class="box">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
    </div>
</div>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">

<\/script>
</html>`
  },
  {
    id:'repo59', icon:'✨', title:"粒子", desc:"Canvas 粒子效果", group:'particle',
    repo:{ dir:"粒子", file:"粒子.html", rel:'%E7%B2%92%E5%AD%90/%E7%B2%92%E5%AD%90.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        body{
            width:100%;
            height:80%;
            background:#000;
        }
    </style>
</head>
<body>
<div id="test"></div>
</body>
<script src="js/jquery-1.9.1.min.js"><\/script>
<script src="js/particles.js"><\/script>
<script>
    /* particlesJS('dom-id', params);
     /* @dom-id : set the html tag id [string, optional, default value : particles-js]
     /* @params: set the params [object, optional, default values : check particles.js] */

    /* config dom id (optional) + config particles params */
    particlesJS('test', {
        particles: {
            color: '#fff',
            shape: 'circle', // "circle", "edge" or "triangle"
            opacity: 1,
            size: 4,
            size_random: true,
            nb: 150,
            line_linked: {
                enable_auto: true,
                distance: 100,
                color: '#fff',
                opacity: 1,
                width: 1,
                condensed_mode: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 600
                }
            },
            anim: {
                enable: true,
                speed: 1
            }
        },
        interactivity: {
            enable: true,
            mouse: {
                distance: 250
            },
            detect_on: 'canvas', // "canvas" or "window"
            mode: 'grab',
            line_linked: {
                opacity: .5
            },
            events: {
                onclick: {
                    enable: true,
                    mode: 'push', // "push" or "remove" (particles)
                    nb: 4
                }
            }
        },
        /* Retina Display Support */
        retina_detect: true
    });
<\/script>
</html>`
  },
  {
    id:'repo60', icon:'📊', title:"网页进度条", desc:"页面加载进度条", group:'visual',
    repo:{ dir:"网页进度条", file:"网页进度条.html", rel:'%E7%BD%91%E9%A1%B5%E8%BF%9B%E5%BA%A6%E6%9D%A1/%E7%BD%91%E9%A1%B5%E8%BF%9B%E5%BA%A6%E6%9D%A1.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>网页进度条</title>
    <style type="text/css">
        #progressBox{
            width:300px;
            height:40px;
            border:1px solid #c8c8c8;
            position:relative;
            background:#fff;
        }
        #progressBar,#progressText{
            position:absolute;
            top:0;
            left:0;
            line-height:40px;
            width:100%;
            text-align:center;
            font-size:18px;
        }
        /*clip属性适用于绝对定位*/
        #progressBar{
            z-index:2;
            background:#00A1F5;
            /*第二个参数表示所切宽度*/
            clip:rect(0px,0px,140px,0px);
            color:white;
        }
        #progressText{
            z-index:1;
            color:black;
        }
    </style>
</head>
<body>
<div id="progressBox">
    <div id="progressBar">0%</div>
    <div id="progressText">0%</div>
</div>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
    $(function(){
        var iNow=0;//写死数据，实际情况应该取得后台返回的ajax数据
        var timer=setInterval(function(){
            iNow+=2;
            if(iNow>100){
                clearInterval(timer);
            }else{
                progressFn(iNow);
            }
        },30);
    });
    function progressFn(cent){
        var progressBox=$('#progressBox');
        var progressBar=$('#progressBar');
        var progressText=$('#progressText');
        var totalWidth=progressBox.width();
        progressBar.text(cent+'%');
        progressText.text(cent+'%');
        progressBar.css({clip:'rect(0px,'+cent/100*totalWidth+'px,140px,0px)'});
    }
<\/script>
</html>`
  },
  {
    id:'repo61', icon:'🍏', title:"弹性商品展示", desc:"苹果式弹性运动展示", group:'visual',
    repo:{ dir:"苹果官网商品展示", file:"弹性运动.html", rel:'%E8%8B%B9%E6%9E%9C%E5%AE%98%E7%BD%91%E5%95%86%E5%93%81%E5%B1%95%E7%A4%BA/%E5%BC%B9%E6%80%A7%E8%BF%90%E5%8A%A8.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>弹性运动</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
        }
        li{
            list-style:none;
        }
        #main{
            width:770px;
            height:190px;
            position:relative;
            margin:0 auto;
            overflow:hidden;
        }
        .pics{
            width:1560px;
            height:160px;
            position:relative;
        }
        .pics ul li{
            float:left;
        }
        .leftSee{
            opacity:1;
        }
        .rightSee{
            opacity:0;
        }
        .btn{
            position:relative;
            text-align:center;
            line-height:30px;
            background: #c7c7c7;
        }
        .btn a{
            display:inline-block;
            font-size:12px;
            cursor:pointer;
            margin-right:50px;
            color: #757575;
            height:30px;
        }
        .btn .active{
            color:black;
        }
        .caret{
            border-right:8px solid transparent;
            border-left:8px solid transparent;
            border-top:8px solid white;
            border-bottom:none;
            position:absolute;
            top:0;
            left:315px;
        }
    </style>
</head>
<body>
<div id="main">
    <div class="pics">
        <ul>
            <li class="leftSee"><a href="#"><img src="apple1.jpg" alt=""></a></li>
            <li class="leftSee"><a href="#"><img src="apple2.jpg" alt=""></a></li>
            <li class="leftSee"><a href="#"><img src="apple3.jpg" alt=""></a></li>
            <li class="leftSee"><a href="#"><img src="apple4.jpg" alt=""></a></li>
            <li class="leftSee"><a href="#"><img src="apple5.jpg" alt=""></a></li>
            <li class="leftSee"><a href="#"><img src="apple6.jpg" alt=""></a></li>
            <li class="rightSee"><a href="#"><img src="apple7.jpg" alt=""></a></li>
            <li class="rightSee"><a href="#"><img src="apple8.jpg" alt=""></a></li>
            <li class="rightSee"><a href="#"><img src="apple9.jpg" alt=""></a></li>
            <li class="rightSee"><a href="#"><img src="apple10.jpg" alt=""></a></li>
            <li class="rightSee"><a href="#"><img src="apple11.jpg" alt=""></a></li>
            <li class="rightSee"><a href="#"><img src="apple12.jpg" alt=""></a></li>
        </ul>
    </div>
    <div class="btn">
        <span class="caret"></span>
        <a class="active">Product</a>
        <a>More</a>
    </div>
</div>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
    $(function(){
        var j=0;
        var liPos=[];//存放li的初始位置
        var myLi=$('.pics').find('li');
        var liWidth=myLi.eq(0).width();
        for(var i=0;i<myLi.length;i++){
            liPos[i]=myLi[i].offsetLeft;//存每一个li的位置
        }
        for(var i=0;i<myLi.length;i++){
            myLi[i].style.position='absolute';
            myLi[i].style.left=liPos[i]+'px';//不要忘记px
        }
        $('.btn').find('a').eq(0).on('click',function(){
            var n=0;
            for(var k=0;k<myLi.length;k++){
                if(myLi.eq(k).is(':animated')){
                    n++;
                }
            }
            if(n==0){
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                $('.caret').animate({left:315+'px'},350);
                j=myLi.length-2;
                myLi.eq(myLi.length-1).animate({left:liWidth*7+'px',opacity:'0'},350);
                var rightGo1=setInterval(function(){
                    myLi.eq(j).animate({left:liWidth*7+'px',opacity:'0'},350);
                    j--;
                    if(j<myLi.length/2){
                        clearInterval(rightGo1);
                        picPrev();
                    }
                },70);
                function picPrev(){
                    var rightGo2=setInterval(function(){
                        myLi.eq(j).animate({left:liPos[j]+'px',opacity:'1'},350);
                        j--;
                        if(j<0){
                            clearInterval(rightGo2);
                        }
                    },70);
                }
            }
        });
        $('.btn').find('a').eq(1).on('click',function(){
            var n=0;
            for(var k=0;k<myLi.length;k++){
                if(myLi.eq(k).is(':animated')){
                    n++;
                }
            }
            if(n==0){
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                $('.caret').animate({left:405+'px'},350);
                j=1;
                myLi.eq(0).animate({left:-liWidth*2+'px',opacity:'0'},350);
                var leftGo1=setInterval(function(){
                    myLi.eq(j).animate({left:-liWidth*2+'px',opacity:'0'},350);
                    j++;
                    if(j>=myLi.length/2){
                        clearInterval(leftGo1);
                        picNext();
                    }
                },70);
                function picNext(){
                    var leftGo2=setInterval(function(){
                        myLi.eq(j).animate({left:liPos[j-myLi.length/2]+'px',opacity:'1'},350);
                        j++;
                        if(j>=myLi.length){
                            clearInterval(leftGo2);
                        }
                    },70);
                }
            }
        });
    });
<\/script>
</html>`
  },
  {
    id:'repo62', icon:'🐍', title:"蛇形文字", desc:"蛇形排列文字动画", group:'text',
    repo:{ dir:"蛇形文字", file:"蛇形文字.html", rel:'%E8%9B%87%E5%BD%A2%E6%96%87%E5%AD%97/%E8%9B%87%E5%BD%A2%E6%96%87%E5%AD%97.html' },
    code:`<!DOCTYPE html>
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>蛇形文字</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
            font-family:"微软雅黑";
            font-size:13px;
        }
        html,body{
            width:100%;
            height:100%;
        }
        .move{
            position:absolute;
            z-index:99;
        }
    </style>
</head>
<body>
<input id="content" type="text" placeholder="请输入文字(多输点好看些)"/>
<input id="btn" type="button" value="确定"/>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
//    基本思想就是用数组中的前一个值替代后一个值,然后再赋给div当做坐标
    $('#btn').on('click',function(){
        var oText=$('#content').val();
        var aText=oText.split('');
        var x=[];//存每个文字的x坐标
        var y=[];//存每个文字的y坐标
        var xSpace=25;//文字x轴偏移量
        var ySpace=45;//文字y轴偏移量
        for(var i=0;i<aText.length;i++){
            x[i]=-50;
            y[i]=-50;
            $('body').append('<div class="move">'+aText[i]+'</div>');
        }
        $('body').on('mousemove',function(e){
            var mouseX=e.pageX || e.clientX+document.documentElement.scrollLeft;//兼容处理
            var mouseY=e.pageY || e.clientY+document.documentElement.scrollTop;
            x[0]=mouseX;
            y[0]=mouseY;
            for(var j=aText.length-1;j>=1;j--){
                x[j]=x[j-1]+xSpace;
                y[j]=y[j-1];
                $('.move').eq(j).css({left:x[j],top:y[j]});
            }
            $('.move').eq(0).css({left:x[0],top:y[0]});
        });
    });
<\/script>
</html>`
  },
  {
    id:'repo63', icon:'🔼', title:"表格行移动", desc:"表格行上下移动", group:'component',
    repo:{ dir:"表格上下移动", file:"表格行上下移动.html", rel:'%E8%A1%A8%E6%A0%BC%E4%B8%8A%E4%B8%8B%E7%A7%BB%E5%8A%A8/%E8%A1%A8%E6%A0%BC%E8%A1%8C%E4%B8%8A%E4%B8%8B%E7%A7%BB%E5%8A%A8.html' },
    code:`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
<table>
    <tr>
        <td>111</td>
        <td>
            <span onclick="up(this);">上移</span>
            <span onclick="down(this);">下移</span>
        </td>
    </tr>
    <tr>
        <td>222</td>
        <td>
            <span onclick="up(this);">上移</span>
            <span onclick="down(this);">下移</span>
        </td>
    </tr>
    <tr>
        <td>333</td>
        <td>
            <span onclick="up(this);">上移</span>
            <span onclick="down(this);">下移</span>
        </td>
    </tr>
    <tr>
        <td>444</td>
        <td>
            <span onclick="up(this);">上移</span>
            <span onclick="down(this);">下移</span>
        </td>
    </tr>
    <tr>
        <td>555</td>
        <td>
            <span onclick="up(this);">上移</span>
            <span onclick="down(this);">下移</span>
        </td>
    </tr>
</table>
</body>
<script src="js/jquery-1.9.1.min.js"><\/script>
<script>
    function up(obj){
        var This=$(obj).parent().parent();
        var prev=This.prev();
        if(prev.length>0){
            This.insertBefore(prev);
        }
    }
    function down(obj){
        var This=$(obj).parent().parent();
        var next=This.next();
        if(next.length>0){
            This.insertAfter(next);
        }
    }
<\/script>
</html>`
  },
  {
    id:'repo64', icon:'🔎', title:"表格查找", desc:"表格内容查找高亮", group:'component',
    repo:{ dir:"表格操作", file:"表格查找.html", rel:'%E8%A1%A8%E6%A0%BC%E6%93%8D%E4%BD%9C/%E8%A1%A8%E6%A0%BC%E6%9F%A5%E6%89%BE.html' },
    code:`<!DOCTYPE html>
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>我的test</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
            font-family:"Microsoft YaHei";
        }
        table{
            margin-top:20px;
            border:1px solid #000;
            border-collapse:collapse;
        }
        table tr td{
            border:1px solid #000;
            padding:5px 10px;
        }
    </style>
</head>
<body>
<input type="text"/>
<input type="button" value="查找" onclick="find();"/>
<table>
    <tr>
        <td>1</td>
        <td>C#</td>
    </tr>
    <tr>
        <td>2</td>
        <td>C++</td>
    </tr>
    <tr>
        <td>3</td>
        <td>js</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Jquery</td>
    </tr>
    <tr>
        <td>5</td>
        <td>html</td>
    </tr>
    <tr>
        <td>6</td>
        <td>PHP</td>
    </tr>
    <tr>
        <td>7</td>
        <td>Perl</td>
    </tr>
    <tr>
        <td>8</td>
        <td>PASCAL</td>
    </tr>
</table>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
    function find(){
        var str=/^\\S+$/;
        var findText=$('input').eq(0).val();
        if(str.test(findText)){
            $('tr').hide().filter(':contains('+findText+')').show();
        }else{
            $('tr').show();
        }
    }
<\/script>
</html>`
  },
  {
    id:'repo65', icon:'🔄', title:"表格行交换", desc:"表格行交换", group:'component',
    repo:{ dir:"表格操作", file:"表格行交换.html", rel:'%E8%A1%A8%E6%A0%BC%E6%93%8D%E4%BD%9C/%E8%A1%A8%E6%A0%BC%E8%A1%8C%E4%BA%A4%E6%8D%A2.html' },
    code:`<!DOCTYPE html>
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>我的test</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
            font-family:"Microsoft YaHei";
        }
        table{
            border:1px solid #000;
            border-collapse:collapse;
        }
        table tr td{
            border:1px solid #000;
            padding:5px 10px;
            cursor:pointer;
        }
        .bgColor{
            background:red;
        }
    </style>
</head>
<body>
<table>
    <tr>
        <td>1</td>
        <td>jQuery</td>
        <td>Javascript</td>
    </tr>
    <tr>
        <td>2</td>
        <td>.Net</td>
        <td>C#</td>
    </tr>
    <tr>
        <td>3</td>
        <td>J2EE</td>
        <td>Java</td>
    </tr>
    <tr>
        <td>4</td>
        <td>PHP</td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Perl</td>
        <td>&nbsp;</td>
    </tr>
</table>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
    $(function(){
        var destRow=undefined;//目标行,即要改变到的行
        var curtRow;//当前点击行
        var chgRow=undefined;//要改变位置的行
        var clickcount=0;//点击次数
        $('table tr td').each(function(){
            var currentTD=$(this);
            currentTD.on('click',function(){
                clickcount+=1;//每次点击,点击次数加1
                var currentRow=currentTD.parent('tr');
                if(clickcount%2==1){//点击次数为奇数次
                    chgRow=currentRow;
                    chgRow.addClass('bgColor');
                }else{
                    destRow=currentRow;
                }
                if(destRow!=undefined && chgRow!=undefined){//只有当被改变行与目标行都存在时,才进行位置交换。该判断条件不能省略,不然单数次的时候会直接把clickcount重置,导致计数出错
                    if(chgRow.position().top>destRow.position().top){//在下面的行的top大于在上面行的top值,所以用insertBefore
                        chgRow.insertBefore(destRow);
                    }else if(chgRow.position().top<destRow.position().top){
                        chgRow.insertAfter(destRow);
                    }
                    clickcount=0;  //全部重置
                    chgRow.removeClass('bgColor');
                    destRow=undefined;
                    chgRow=undefined;
                }
            });
        });
    });
<\/script>
</html>`
  },
  {
    id:'repo66', icon:'⏱️', title:"计时器", desc:"计时器演示", group:'game',
    repo:{ dir:"计时", file:"计时.html", rel:'%E8%AE%A1%E6%97%B6/%E8%AE%A1%E6%97%B6.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>函数传参</title>
    <style type="text/css">
        *{
            margin:0;
            bottom:0;
        }
        h1{
            height:20px;
        }
        #timePic{
            margin-top:50px;
        }
    </style>
</head>
<body>
<h1></h1>
<p id="timePic">
    <img class="timePic" src="img/0.JPG" alt=""/>
    <img class="timePic" src="img/0.JPG" alt=""/>
    <img src="img/colon.JPG" alt=""/>
    <img class="timePic" src="img/0.JPG" alt=""/>
    <img class="timePic" src="img/0.JPG" alt=""/>
    <img src="img/colon.JPG" alt=""/>
    <img class="timePic" src="img/0.JPG" alt=""/>
    <img class="timePic" src="img/0.JPG" alt=""/>
</p>
</body>
<script type="text/javascript">
    setInterval(jishi,1000);
    function jishi(){
        var iTime=new Date();
        var iYear=iTime.getFullYear();
        var iMonth=iTime.getMonth();
        var iDate=iTime.getDate();
        var iDay=iTime.getDay();
        var iHour=iTime.getHours();
        var iMinute=iTime.getMinutes();
        var iSecond=iTime.getSeconds();
        var aPic=document.getElementsByClassName('timePic');
        if(iDay=='0'){
            iDay='星期日';
        }else if(iDay=='1'){
            iDay='星期一';
        }else if(iDay=='2'){
            iDay='星期二';
        }else if(iDay=='3'){
            iDay='星期三';
        }else if(iDay=='4'){
            iDay='星期四';
        }else if(iDay=='5'){
            iDay='星期五';
        }else{
            iDay='星期六';
        }
        var str=iYear+'年'+(iMonth+1)+'月'+iDate+'号'+''+iDay+''+ChangeTime(iHour)+':'+ChangeTime(iMinute)+':'+ChangeTime(iSecond);
        var strNew=ChangeTime(iHour)+''+ChangeTime(iMinute)+''+ChangeTime(iSecond);//转换为字符串
        for(var i=0;i<6;i++){
            aPic[i].src='img/'+strNew.charAt(i)+'.JPG';
        }
        var myTime=document.getElementsByTagName('h1');
        myTime[0].innerHTML=str;
    }
    function ChangeTime(obj){
        return obj<10?('0'+obj):obj;
    }
<\/script>
</html>`
  },
  {
    id:'repo67', icon:'🎞️', title:"手写轮播", desc:"手写图片轮播", group:'visual',
    repo:{ dir:"轮播(自己写出来的,第一次,值得纪念)", file:"1.html", rel:'%E8%BD%AE%E6%92%AD(%E8%87%AA%E5%B7%B1%E5%86%99%E5%87%BA%E6%9D%A5%E7%9A%84%2C%E7%AC%AC%E4%B8%80%E6%AC%A1%2C%E5%80%BC%E5%BE%97%E7%BA%AA%E5%BF%B5)/1.html' },
    code:`<!DOCTYPE html>
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>??</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
            font-family:"????";
            font-size:13px;
        }
        .content_box{
            width:400px;
            height:300px;
            overflow:hidden;
            position:relative;
            margin:0 auto;
        }
        #picBox{
            width:2000px;
        }
        .pics{
            width:400px;
            float:left;
        }
        .btn{
            position:absolute;
            top:120px;
            cursor:pointer;
            display:none;
        }
        .btn img{
            width:40px;
        }
    </style>
</head>
<body>
<div class="content_box">
    <div id="picBox">
        <img class="pics" src="img/han2.jpg" alt=""/>
        <img class="pics" src="img/han3.jpg" alt=""/>
        <img class="pics" src="img/han4.jpg" alt=""/>
        <img class="pics" src="img/han5.jpg" alt=""/>
        <img class="pics" src="img/han7.jpg" alt=""/>
        <div class="btn" style="left:0;">
            <img src="img/prev.png" alt=""/>
        </div>
        <div class="btn" style="right:0;">
            <img src="img/next.png" alt=""/>
        </div>
    </div>
</div>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
    var timer;//???
//    ????
    $('#picBox').hover(function(){
        clearInterval(timer);
        $('.btn').stop(false,true).fadeIn(200);
    },function(){
        $('.btn').stop(false,true).fadeOut(200);
        timer=setInterval(function(){
            $('.pics:first').stop(false,true).animate({marginLeft:'-400px'},500,function(){
                $('.pics:first').appendTo($('#picBox')).css({marginLeft:'0px'});
            });
        },1000);
    }).trigger('mouseleave');
//    ????
    $('.btn').eq(0).on('click',function(){
        if(!$('.pics:first').is(':animated')){
            $('.pics:first').stop(false,true).animate({marginLeft:'-400px'},500,function(){
                $('.pics:first').appendTo($('#picBox')).css({marginLeft:'0px'});//???????????????????
            });
        }
    });
    $('.btn').eq(1).on('click',function(){
        if(!$('.pics:first').is(':animated')){
            $('.pics:last').prependTo($('#picBox')).css({marginLeft:'-400px'});//???????????
            $('.pics:first').animate({marginLeft:'0px'},500);//?????????,???????
        }
    });
<\/script>
</html>`
  },
  {
    id:'repo68', icon:'🎞️', title:"轮播神器", desc:"轮播插件演示", group:'visual',
    repo:{ dir:"轮播神器", file:"index.html", rel:'%E8%BD%AE%E6%92%AD%E7%A5%9E%E5%99%A8/index.html' },
    code:`﻿<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        /*设置图片大小*/
        .pics{
            width: 450px;
            height: 296px;
        }
        ul{
            list-style: none;
        }
    </style>
</head>
<body>
<div id="boxID"><!--焦点图盒子-->
    <div class="pic"><!--内容列表(li数目可随意增减)，class="pic"不要变-->
        <ul>
            <li><a href="#"><img class="pics" src="img/1.jpg" alt="标题1"/></a></li>
            <li><a href="#"><img class="pics" src="img/2.jpg" alt="标题2"/></a></li>
            <li><a href="#"><img class="pics" src="img/3.jpg" alt="标题3"/></a></li>
            <li><a href="#"><img class="pics" src="img/4.jpg" alt="标题4"/></a></li>
            <li><a href="#"><img class="pics" src="img/5.jpg" alt="标题5"/></a></li>
        </ul>
    </div>
</div>
</body>
<!--两种引入方式-->
<!--1.需要jQuery的-->
<!--<script src="js/jquery-1.9.1.min.js"><\/script>-->
<!--<script src="js/myfocus-2.0.4.min.js"><\/script>-->
<!--<script>-->
    <!--$('#boxID').myFocus({-->
        <!--pattern:'mF_fancy',//风格应用的名称-->
        <!--time:3,//切换时间间隔(秒)-->
        <!--trigger:'click',//触发切换模式:'click'(点击)/'mouseover'(悬停)-->
        <!--width:450,//设置图片区域宽度(像素)-->
        <!--height:296,//设置图片区域高度(像素)-->
        <!--txtHeight:'10'//文字层高度设置(像素),'default'为默认高度，0为隐藏-->
    <!--});-->
<!--<\/script>-->
<!--2.不需要jQuery的-->
<script src="js/myfocus-2.0.4.min.js"><\/script>
<script>
    myFocus.set({
        id:'boxID',
//        auto:false,
        pattern:'mF_fancy',//风格应用的名称 mF_fancy
        time:3,//切换时间间隔(秒)
        trigger:'click',//触发切换模式:'click'(点击)/'mouseover'(悬停)
        width:450,//设置图片区域宽度(像素)
        height:296,//设置图片区域高度(像素)
        txtHeight:'35'//文字层高度设置(像素),'default'为默认高度，0为隐藏
    });
<\/script>
</html>`
  },
  {
    id:'repo69', icon:'🎆', title:"输入框烟花", desc:"输入框输入烟花特效", group:'interact',
    repo:{ dir:"输入框烟花", file:"输入框烟花.html", rel:'%E8%BE%93%E5%85%A5%E6%A1%86%E7%83%9F%E8%8A%B1/%E8%BE%93%E5%85%A5%E6%A1%86%E7%83%9F%E8%8A%B1.html' },
    code:`<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body >
<div id="header">
    <form class="form" >
        <input type="text" class="input_key" maxlength="100" autocomplete="on">
    </form>
</div>
<script src="js/jquery-1.11.3.min.js"><\/script>
<script>
    (function() {
        function p() {
            window.requestAnimFrame(p), a = d(0, 360), s.globalCompositeOperation = "destination-out", s.fillStyle = "rgba(0, 0, 0, 0.5)", s.fillRect(0, 0, e, t), s.globalCompositeOperation = "source-over";
            var n = u.length;
            while (n--) u[n].draw(), u[n].update(n)
        }

        function d(e, t) {
            return Math.random() * (t - e) + e
        }

        function v() {
            i = $('<canvas width="' + e + '" height="' + t + '" />').appendTo(n).css({
                position: "absolute",
                left: -20,
                top: -44,
                zIndex: 999,
                pointerEvents: "none"
            }), s = i[0].getContext("2d"), r = $("<div />").appendTo(n).css({
                fontSize: "16px",
                fontFamily: "arial",
                height: 1,
                position: "absolute",
                left: 15,
                top: 50,
                zIndex: 0,
                visibility: "hidden",
                whiteSpace: "nowrap"
            })
        }
        if (/msie/i.test(navigator.userAgent)) return;
        var e = 600,
                t = 100,
                n = $("#header .form"),
                r = null,
                i = null,
                s = null,
                o = !1,
                u = [],
                a = 120,
                f = 8,
                l = 0,
                c = 0,
                h = function(e, t, n) {
                    var r = this;
                    r.x = e, r.y = t, r.dir = n, r.coord = {}, r.angle = d(0, -Math.PI), r.speed = d(2, 8), r.friction = .95, r.gravity = 1, r.hue = d(a - 10, a + 10), r.brightness = d(50, 80), r.alpha = 1, r.decay = d(.03, .05), r.init()
                };
        h.prototype = {
            init: function() {
                var e = this;
                e.coord = {
                    x: e.x,
                    y: e.y
                }
            },
            update: function(e) {
                var t = this;
                t.coord = {
                    x: t.x,
                    y: t.y
                }, t.speed *= t.friction, t.x += Math.cos(t.angle) * t.speed + t.dir, t.y += Math.sin(t.angle) * t.speed + t.gravity, t.alpha -= t.decay, t.alpha <= t.decay && u.splice(e, 1)
            },
            draw: function() {
                var e = this;
                s.fillStyle = "hsla(" + e.hue + ", 100%, " + e.brightness + "%, " + e.alpha + ")", s.beginPath(), s.arc(e.coord.x, e.coord.y, 2, 0, 2 * Math.PI, !0), s.closePath(), s.fill()
            }
        }, window.requestAnimFrame = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function(e) {
                window.setTimeout(e, 1e3 / 60)
            }
        }(), $(".input_key").on("focus", function() {
            o || (v(), o = !0, p());
            var e = $(this.form),
                    t = -20,
                    n = -44;
            i.appendTo(e), e.attr("name") == "f3" && ($("body").hasClass("layout1") ? t = 97 : t = -20), i.css({
                left: t,
                top: n
            })
        }).on("keydown", function(e) {
            var t = $(this.form);
            if (!(this.selectionStart >= 0 && r)) return;
            var n = this.selectionStart,
                    i = this.value.substring(0, n).replace(/ /g, "&nbsp;"),
                    s = r.html(i).width(),
                    o = 0;
            i.length > c ? o = -2 : o = 2, c = i.length, s >= 500 && (s = 500);
            var a = f;
            while (a--) u.push(new h(s + 50, 60, o));
//  这里是控制输入框都抖动的
            t.css({
                "-webkit-transform": "translate(-1px, 1px)",
                "-moz-transform": "translate(-1px, 1px)",
                "-MS-transform": "translate(-1px, 1px)",
                "-o-transform": "translate(-1px, 1px)",
                transform: "translate(-1px, 1px)"
            }),

                    setTimeout(function() {
                t.css({
                    "-webkit-transform": "none",
                    "-moz-transform": "none",
                    "-MS-transform": "none",
                    "-o-transform": "none",
                    transform: "none"
                })
            }, 10)
        })
    })();
<\/script>
</body>
</html>`
  },
  {
    id:'repo70', icon:'🎞️', title:"韩雪冬轮播", desc:"韩雪冬轮播 demo", group:'visual',
    repo:{ dir:"韩雪冬", file:"miaov_demo.html", rel:'%E9%9F%A9%E9%9B%AA%E5%86%AC/miaov_demo.html' },
    code:`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>韩雪冬网站效果 - 特效实验室 - yilana.cn</title>
<!--[if lte IE 6]>
<script src="js/DD_belatedPNG_0.0.8a.js" type="text/javascript"><\/script>
    <script type="text/javascript">
        DD_belatedPNG.fix('span');
    <\/script>
<![endif]-->
<script type="text/javascript" src="miaov.js"><\/script>
<link href="style.css" rel="stylesheet" type="text/css" />
</head>

<body>

<div id="automatic">

	<div class="prev_div"></div>
    <a class="prev" href="###">
        <span class="ico1"></span>
        <span class="ico"></span>
        <span class="txt"></span>
    </a>
	
	<div class="next_div"></div>
    <a class="next" href="###">
        <span class="ico1"></span>
        <span class="ico"></span>
        <span class="txt"></span>
    </a>

	<div class="line"></div>

    <ul>
        <li class="pos_0"><a href="http://yilana.cn"><img src="images/8.jpg" width="100" alt="特效实验室 - yilana.cn" longdesc="http://yilana.cn" /></a></li>
        <li class="pos_1"><a href="http://yilana.cn"><img src="images/1.jpg" width="270" alt="特效实验室 - yilana.cn" longdesc="http://yilana.cn" /></a></li>
        <li class="pos_2"><a href="http://yilana.cn"><img src="images/2.jpg" width="510" alt="特效实验室 - yilana.cn" longdesc="http://yilana.cn" /></a></li>
        <li class="pos_3"><a href="http://yilana.cn"><img src="images/3.jpg" width="680" alt="特效实验室 - yilana.cn" longdesc="http://yilana.cn" /></a></li>
        <li class="pos_4"><a href="http://yilana.cn"><img src="images/4.jpg" width="510" alt="特效实验室 - yilana.cn" longdesc="http://yilana.cn" /></a></li>
        <li class="pos_5"><a href="http://yilana.cn"><img src="images/5.jpg" width="270" alt="特效实验室 - yilana.cn" longdesc="http://yilana.cn" /></a></li>
        <li class="pos_6"><a href="http://yilana.cn"><img src="images/6.jpg" width="270" alt="特效实验室 - yilana.cn" longdesc="http://yilana.cn" /></a></li>
        <li class="pos_6"><a href="http://yilana.cn"><img src="images/7.jpg" width="270" alt="特效实验室 - yilana.cn" longdesc="http://yilana.cn" /></a></li>
    </ul>

</div>
<p id="footer"><a href="http://yilana.cn">特效实验室 - yilana.cn</a></p>
</body>
</html>
`
  },
  {
    id:'repo71', icon:'🎞️', title:"韩雪冬 jQuery 轮播", desc:"韩雪冬 jQuery 轮播", group:'visual',
    repo:{ dir:"韩雪冬jQuery", file:"韩雪冬轮播.html", rel:'%E9%9F%A9%E9%9B%AA%E5%86%ACjQuery/%E9%9F%A9%E9%9B%AA%E5%86%AC%E8%BD%AE%E6%92%AD.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>韩雪冬轮播</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
        }
        #automatic{
            width:1000px;
            height:650px;
            margin:0 auto;
            position:relative;
            overflow:hidden;
        }
        li{
            list-style:none;
        }
        #automatic li{
            position:absolute;
        }
        #btn{
            position:absolute;
            bottom:0;
            left:400px;
        }
        #btn img{
            margin-right:50px;
            cursor:pointer;
        }
        .pos_0{
            top:0px;
            left:0px;
            z-index:1;
            opacity:0;
            width:100px;
        }
        .pos_1{
            top:120px;
            left:0px;
            z-index:2;
            opacity:0.4;
            width:270px;
        }
        .pos_2{
            top:40px;
            left:50px;
            z-index:3;
            opacity:0.8;
            width:480px;
        }
        .pos_3{
            top:0px;
            left:200px;
            z-index:4;
            opacity:1;
            width:600px;
        }
        .pos_4{
            top:40px;
            right:50px;
            z-index:3;
            opacity:0.8;
            width:480px;
        }
        .pos_5{
            top:120px;
            right:0px;
            z-index:2;
            opacity:0.4;
            width:270px;
        }
        .pos_6{
            top:0px;
            right:0px;
            z-index:1;
            opacity:0;
            width:100px;
        }
        li img{
            width:100%;
        }
    </style>
</head>
<body>
<div id="automatic">
    <ul>
        <li class="pos_0">
            <a href="#">
                <img src="han1.jpg" alt="">
            </a>
        </li>
        <li class="pos_1">
            <a href="#">
                <img src="han2.jpg" alt="">
            </a>
        </li>
        <li class="pos_2">
            <a href="#">
                <img src="han3.jpg" alt="">
            </a>
        </li>
        <li class="pos_3">
            <a href="#">
                <img src="han4.jpg" alt="">
            </a>
        </li>
        <li class="pos_4">
            <a href="#">
                <img src="han5.jpg" alt="">
            </a>
        </li>
        <li class="pos_5">
            <a href="#">
                <img src="han6.jpg" alt="">
            </a>
        </li>
        <li class="pos_6">
            <a href="#">
                <img src="han7.jpg" alt="">
            </a>
        </li>
    </ul>
    <div id="btn">
        <img src="prev.png" alt=""/>
        <img src="next.png" alt=""/>
    </div>
</div>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
    $(function(){
        var arr=[];
        var myLi=$('#automatic ul').find('li');
        for(var i=0;i<myLi.length;i++){
            //双重数组,存入每个元素的位置、层数和透明度以及图片的宽度(为毛只设置宽度呢？因为设置宽度就相当于设置了高度，它会自动等比列缩放)
            arr.push([myLi.eq(i).position().top,myLi.eq(i).position().left,myLi.eq(i).css('zIndex'),myLi.eq(i).css('opacity'),myLi.eq(i).width()]);
        }
        $('#btn img').eq(0).on('click',function(){
            var n=0;
            for(var j=0;j<myLi.length;j++){
                if(myLi.eq(j).is(':animated')){
                    n++;
                }
            }
            if(n==0){
                arr.push(arr[0]);
                arr.shift();
                for(var i=0;i<myLi.length;i++){
                    myLi.eq(i).css({zIndex:arr[i][2]});
                    myLi.eq(i).animate({
                        top:arr[i][0]+'px',
                        left:arr[i][1]+'px',
                        opacity:arr[i][3],
                        width:arr[i][4]+'px'
                    },250);
                }
            }
        });
        $('#btn img').eq(1).on('click',function(){
            var n=0;
            for(var j=0;j<myLi.length;j++){
                if(myLi.eq(j).is(':animated')){
                    n++;
                }
            }
            if(n==0){
                arr.unshift(arr[arr.length-1]);
                arr.pop();
                for(var i=0;i<myLi.length;i++){
                    myLi.eq(i).css({zIndex:arr[i][2]});
                    myLi.eq(i).animate({
                        top:arr[i][0]+'px',
                        left:arr[i][1]+'px',
                        opacity:arr[i][3],
                        width:arr[i][4]+'px'
                    },250);
                }
            }
        });
    });
<\/script>
</html>`
  },
  {
    id:'repo72', icon:'🖱️', title:"鼠标滚轮", desc:"滚轮缩放 / 切换", group:'interact',
    repo:{ dir:"鼠标滚轮", file:"鼠标滚轮.html", rel:'%E9%BC%A0%E6%A0%87%E6%BB%9A%E8%BD%AE/%E9%BC%A0%E6%A0%87%E6%BB%9A%E8%BD%AE.html' },
    code:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html" charset="utf-8">
    <title>鼠标滚轮</title>
    <style type="text/css">
        *{
            margin:0;
            padding:0;
        }
        #div1{
            width:200px;
            height:200px;
            background:red;
        }
    </style>
</head>
<body style="height:2000px;">
<div id="div1"></div>
</body>
<script type="text/javascript" src="js/jquery-1.8.3.js"><\/script>
<script type="text/javascript">
    $(function(){
        var myDiv=document.getElementById('div1');
//        ie,chrome:onmousewheel事件
//        ff:DOMMouseScroll 必须用addEventLister来绑定
//        滚轮值:ie,chrome:myev.wheelDelta上120 下-120
//               ff:myev.detail上-3 下3
        myDiv.onmousewheel=fn;
        if( myDiv.addEventListener){
            myDiv.addEventListener('DOMMouseScroll',fn,false);
        }
        function fn(ev){
            var b=true;
            var myev=ev || event;
//            判断鼠标向上还是向下滚动
            if(myev.wheelDelta){
                b=myev.wheelDelta>0?true:false;
            }else{
                b=myev.detail<0?true:false;
            }
            if(b){
                if(!$(this).is(':animated')){
                    $(this).animate({height:'-='+30+'px'},500);
                }
            }else{
                if(!$(this).is(':animated')){
                    $(this).animate({height:'+='+30+'px'},500);
                }
            }
//            阻止默认事件
//            return false阻止的是 obj.on事件名称=fn 所触发的默认行为,不能阻止addEventListener绑定的事件
//            addEventListener绑定的事件需要通过event下面的preventDefault()来阻止
            if(ev.preventDefault()){
                ev.preventDefault();
            }
            return false;
        }
    });
<\/script>
</html>`
  },
  {
    id:'repo73', icon:'🎚️', title:"鼠标滑块", desc:"鼠标移动控制滑块", group:'interact',
    repo:{ dir:"鼠标移动滑块", file:"index.html", rel:'%E9%BC%A0%E6%A0%87%E7%A7%BB%E5%8A%A8%E6%BB%91%E5%9D%97/index.html' },
    code:`<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta name="Generator" content="EditPlus®">
    <meta name="Author" content="">
    <meta name="Keywords" content="">
    <meta name="Description" content="">
    <title>Demo</title>
    <style>
        *{margin:0;padding:0;}
        ul,li{list-style:none;}
        div{font-family:"Microsoft YaHei";}
        body{width: 900px;}
        ul{overflow: hidden;}
        ul li{float:left;}
        ul li .outer{width:300px; height:250px;}
        ul li .outer .inner{width:300px; height:250px; background:rgba(0, 0, 0, .3);}
    </style>
</head>
<body>
<ul>
    <li>
        <div class="outer">
            <img src="http://sandbox.runjs.cn/uploads/rs/253/e6wsbxul/09.jpg" width="300px" height="250px" />
            <div class="inner">
                这是描述。。。
            </div>
        </div>
    </li>
    <li>
        <div class="outer">
            <img src="http://sandbox.runjs.cn/uploads/rs/253/e6wsbxul/010.jpg" width="300px" height="250px" />
            <div class="inner">
                这是描述。。。
            </div>
        </div>
    </li>
    <li>
        <div class="outer">
            <img src="http://sandbox.runjs.cn/uploads/rs/253/e6wsbxul/011.jpg" width="300px" height="250px" />
            <div class="inner">
                这是描述。。。
            </div>
        </div>
    </li>
    <li>
        <div class="outer">
            <img src="http://sandbox.runjs.cn/uploads/rs/253/e6wsbxul/012.jpg" width="300px" height="250px" />
            <div class="inner">
                这是描述。。。
            </div>
        </div>
    </li>
    <li>
        <div class="outer">
            <img src="http://sandbox.runjs.cn/uploads/rs/253/e6wsbxul/013.jpg" width="300px" height="250px" />
            <div class="inner">
                这是描述。。。
            </div>
        </div>
    </li>
    <li>
        <div class="outer">
            <img src="http://sandbox.runjs.cn/uploads/rs/253/e6wsbxul/014.jpg" width="300px" height="250px" />
            <div class="inner">
                这是描述。。。
            </div>
        </div>
    </li>
    <li>
        <div class="outer">
            <img src="http://sandbox.runjs.cn/uploads/rs/253/e6wsbxul/015.jpg" width="300px" height="250px" />
            <div class="inner">
                这是描述。。。
            </div>
        </div>
    </li>
    <li>
        <div class="outer">
            <img src="http://sandbox.runjs.cn/uploads/rs/253/e6wsbxul/016.jpg" width="300px" height="250px" />
            <div class="inner">
                这是描述。。。
            </div>
        </div>
    </li>
</ul>
<script type="text/javascript" src="js/jquery-1.8.3.min.js"><\/script>
<script src="js/mouseslide.js"><\/script>
<script>
    $(".outer").each(function(i){
        $(this).show($(".inner").eq(i));
    });
<\/script>
</body>
</html>`
  }
];
