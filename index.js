$(function(){
    !function(){
        var box = document.getElementById('box');
        var slider = document.createElement('div');
        slider.setAttribute('class', 'slider');
        slider.setAttribute('id', 'slider');
        box.appendChild(slider);

        var slide1 = document.createElement('div');
        slide1.setAttribute('class', 'slide');
        slider.appendChild(slide1);
        var slide2 = document.createElement('div');
        slide2.setAttribute('class', 'slide');
        slider.appendChild(slide2);
        var slide3 = document.createElement('div');
        slide3.setAttribute('class', 'slide');
        slider.appendChild(slide3);
        var slide4 = document.createElement('div');
        slide4.setAttribute('class', 'slide');
        slider.appendChild(slide4);
        var slide5 = document.createElement('div');
        slide5.setAttribute('class', 'slide');
        slider.appendChild(slide5);
        var slide6 = document.createElement('div');
        slide6.setAttribute('class', 'slide');
        slider.appendChild(slide6);
        var slide7 = document.createElement('div');
        slide7.setAttribute('class', 'slide');
        slider.appendChild(slide7);

        var img1 = document.createElement('img');
        img1.src="img/b5.png"
        slide1.appendChild(img1);
        var img2 = document.createElement('img');
        img2.src="img/b1.png"
        slide2.appendChild(img2);
        var img3 = document.createElement('img');
        img3.src="img/b2.png"
        slide3.appendChild(img3);
        var img4 = document.createElement('img');
        img4.src="img/b3.png"
        slide4.appendChild(img4);
        var img5 = document.createElement('img');
        img5.src="img/b4.png"
        slide5.appendChild(img5);
        var img6 = document.createElement('img');
        img6.src="img/b5.png"
        slide6.appendChild(img6);
        var img7 = document.createElement('img');
        img7.src="img/b1.png"
        slide7.appendChild(img7);

        var span1=document.createElement("span");
        span1.innerHTML="<";
        span1.id="left";
        box.appendChild(span1);
        var span2=document.createElement("span");
        span2.innerHTML=">";
        span2.id="right";
        box.appendChild(span2);

        var nav = document.createElement('ul');
        nav.setAttribute('id','navs');
        nav.setAttribute('class','nav');
        box.appendChild(nav);

        for(var i=1;i<=5;i++){
            var li = document.createElement('li');
            li.innerHTML=i;
            nav.appendChild(li)
        }
        var navlist= nav.children;

    }();
    //轮播实现
    function getStyle(obj, attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, null)[attr];
        }
    }
    function animate(obj,json,callback){
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            var isStop = true;
            for(var attr in json){
                var now = 0;
                if(attr == 'opacity'){
                    now = parseInt(getStyle(obj,attr)*100);
                }else{
                    now = parseInt(getStyle(obj,attr));
                }
                var speed = (json[attr] - now) / 7;
                speed = speed>0?Math.ceil(speed):Math.floor(speed);
                var cur = now + speed;
                if(attr == 'opacity'){
                    obj.style[attr] = cur / 100;
                }else{
                    obj.style[attr] = cur + 'px';
                }
                if(json[attr] !== cur){
                    isStop = false;
                }
            }
            if(isStop){
                clearInterval(obj.timer);
                callback&&callback();
            }
        }, 30)
    }
    var box=document.getElementById('box');
    var navlist = document.getElementById('navs').children;
    var slider = document.getElementById('slider');
    var left = document.getElementById('left');
    var right = document.getElementById('right')
    var index=1;
    var timer;
    var isMoving=false;
    box.onmouseover=function(){
        animate(left,{opacity:50})
        animate(right,{opacity:50})
        clearInterval(timer)
    }
    box.onmouseout = function(){
        animate(left,{opacity:0})
        animate(right,{opacity:0})
        timer = setInterval(next, 2000);
    }
    right.onclick = next;
    left.onclick = prev;
    //点
    for( var i=0; i<navlist.length; i++ ){
        navlist[i].index = i;
        navlist[i].onclick = function(){
            index = this.index+1;
            navmove();
            animate(slider,{left:-1200*index});
        }
    }
    //右
    function next(){
        if(isMoving){
            return;
        }
        isMoving=true;
        index++;
        navmove();
        animate(slider,{left:-1200*index},function(){
            if(index==6){
                slider.style.left='-1200px';
                index=1;
            }
            isMoving=false;
        });
    }
    function prev(){
        if(isMoving){
            return;
        }
        isMoving=true;
        index--;
        navmove();
        animate(slider,{left:-1200*index},function(){
            if(index==0){
                slider.style.left='-6000px';
                index=5;
            }
            isMoving=false;
        });
    }
    function navmove(){
        for(var i=0;i<navlist.length;i++){
            navlist[i].className = "";
        }
        if(index>5){
            navlist[0].className="active";
        }
        else if(index<=0){
            navlist[4].className="active";
        }
        else{
            navlist[index-1].className="active";
        }
    }
    timer=setInterval(next,3000);
})