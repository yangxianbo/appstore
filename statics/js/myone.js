var isIE =function(){return (document.all) ? true : false;}

var oldx=0,oldy=0,oldobj=null
function one(event,obj){//one two end 移动对象不同事件
var event=event||window.event;	
oldobj=obj;
var EX=event.x||event.pageX;
var EY=event.y||event.pageY;
oldx=EX-oldobj.offsetLeft;oldy=EY-oldobj.offsetTop;
new createbg();
addEventHandler(document,"mousemove",two);
addEventHandler(document,"mouseup",end);
}
function two(event,obj){
var event=event||window.event;	
var EX=event.x||event.pageX;
var EY=event.y||event.pageY;

if(oldobj==null){return false}
oldobj.style.left=(EX-oldx)+"px";;
oldobj.style.top=(EY-oldy)+"px";
}
function end(){
if(oldobj!=null){oldobj=null}
closewindow('cover',true);
removeEventHandler(document,"mousemove",two);
removeEventHandler(document,"mouseup",end);
}
function al(){
	alert("此人很神秘\n暂时无法联系");
}
function G(id){
	var str=String(id);
	var res=id.indexOf("#");
	if(res==0){
	  str=str.substr(1,str.length)
	  return document.getElementById(str);
	}
}
function closewindow(id,dbg){
  var body;
  var obj=document.getElementById(id);
  var bg=document.getElementById('div_bg');
  if(!dbg){
    if(bg!=undefined){
      var bd=document.getElementsByTagName("body")[0];
      bd.removeChild(bg);
    }
  }
  if(!obj){
    obj=parent.document.getElementById(id);
	if(!obj){
	
	}else{
	      body=parent.document.getElementsByTagName("body")[0];
	      body.removeChild(obj);
	}
  }else{
    body=document.getElementsByTagName("body")[0];
    body.removeChild(obj);
  }
}
function createbg(id,bg,o,zindex){//创建遮挡背景
       var body=document.getElementsByTagName("body")[0];
	   var id=id==undefined?"cover":id;
	   var bg=bg==undefined?"#FFF":bg;
	   var o=o==undefined?0:o;
	   var zindex=zindex==undefined?getTopZ()+2:zindex;
       this.div=document.createElement("div");
	   this.div.id=id;this.div.style.background=bg;
	   this.div.style.height="100%";
	   this.div.style.width="100%";
	   this.div.style.position="fixed";
	   this.div.style.left="0px";
	   this.div.style.top="0px";
	   if(isIE()){//设置不同浏览器下相应效果
	   this.div.style.filter='alpha(opacity='+o*100+')';
	   this.div.onselectstart=function(){return false;} 
	   }else{
	   this.div.style.MozUserSelect="none";
	   this.div.style.opacity=o;
	   }
	   this.div.style.zIndex=zindex;
	   body.appendChild(this.div);
}
function getTopZ(){//取顶级Zindex
       var divs =document.getElementsByTagName("div");
       for(var i=0,max=0;i<divs.length;i++){
         max =Math.max(max,divs[i].style.zIndex ||0);   
       }
	   return max;
}
function getjsPath(){//取JS文件上一层路径
 var jsPath;
 var js=document.scripts;
  for(var i=js.length;i>0;i--){
    if(js[i-1].src.indexOf("myone.js")>-1){
    jsPath=js[i-1].src.substring(0,js[i-1].src.lastIndexOf("/")-2);
	}
  }
  return jsPath;
}
function opwindow(url,w,h,t,type){//弹出框架窗口
    
    if(!type){type={}}
	//type 对象属性设置弹窗各种属性
	var obj={
	    title:type.title==undefined?true:type.title,//是否显示弹窗标题栏
		id:!type.id?"div_tc":type.id,//给弹窗DIV设置id方便closewindow方法关闭
		style:!type.style?"tc":type.style,//弹窗类型 暂无
		draw:type.draw==undefined?true:type.draw,//是否可拖动,默认可以
		mask:type.mask==undefined?false:type.mask,//是否有遮罩,默认无
		border:type.border==undefined?"10px solid #D7EBF9":type.border,//边框类型
		animation:type.animation==undefined?false:type.animation,//是否动画方式打开窗口，默认无
		repeat:type.repeat==undefined?true:type.repeat,//是否可重复打开.默认可以
		refresh:type.refresh==undefined?false:type.refresh,//不可重复打开时是否刷新窗口默认false，repeat设置为false时生效.
		onclose:type.onclose==undefined?function(){return true}:type.onclose,
		closevalue:type.closevalue==undefined?null:type.closevalue,
		T:type.T==undefined?undefined:type.T,
		L:type.L==undefined?undefined:type.L,
		mask_id:!type.mask_id?undefined:type.mask_id,
	}
	var body=document.getElementsByTagName("body")[0];
	var webW=document.documentElement.clientWidth;
	var webH=document.documentElement.clientHeight;
	var H=25;//div顶部预留高度
	var Z=getTopZ()<9000?9000:getTopZ()+2;//弹窗默认层级
	var divL=obj.L==undefined?Math.ceil((webW-w)/2):obj.L;//弹窗默认左
	var divT=obj.T==undefined?Math.ceil((webH-h)/2):obj.T;//弹窗默认顶
	var iconPath=getjsPath()+"icons/"//图标文件夹路径
	var o=1;//弹窗默认透明度
    var that=this//对象引用传入
	var web="http://"+document.location.host;
	var url=url.search(/^http/)==0?url:web+url;
	if(!t){var t="new window";}
	if(obj.repeat==false){
	   var lastobj=document.getElementById(obj.id);
	   if(lastobj!=undefined){
	      if(obj.refresh){
	         var lastkj=document.getElementById("kj_"+obj.id);
		     var lastnav_title=document.getElementById("nav_title_"+obj.id)
	         lastkj.src=url;
		     lastnav_title.innerHTML=t;
		  }
	    return;
	   }
	}
	
	//创建窗口
    this.div=document.createElement("div");//创建窗口DIV
	this.nav=document.createElement("div");//创建顶部DIV
	this.close=document.createElement("a");//创建关闭按钮img
	this.min=document.createElement("a");//创建最小化按钮img
	this.left=document.createElement("img");//创建最左箭头按钮img
	this.right=document.createElement("img");//创建最右箭头按钮img
    this.kj=document.createElement("iframe");//创建框架if
	this.nav_title=document.createElement("span");//创建框架if
	var div=this.div;//var iframe=this.iframe;
	this.close.onclick=function(){
	    if(obj.onclose()){
	     body.removeChild(div);
		 closewindow(that.mask_id);
		}
		
	}

	if(obj.draw==true){
	    div.onmousedown=function(event){//鼠标单击移动div事件
		
	       var event=event||window.event;
           var src= getEventObj(event);
		   var nav_title=document.getElementById('nav_title');
	       if(src==that.nav){ div.style.zIndex=getTopZ()+2};
	       if(src==this||src==that.nav||src==that.nav_title){one(event,this)}
	    }
	    div.onmousemove=function(event){two(event,this)}//--同上
	    div.onmouseup=function(event){end(event,this)}//--同上	
	    div.onmouseover=function(){this.style.cursor="move"}//DIV鼠标样式
	}
	this.close.onmouseover=function(){this.style.cursor="pointer"}//关闭按钮鼠标样式
	this.min.onmouseover=function(){this.style.cursor="pointer"}//最小化按钮鼠标样式
	this.left.onmouseover=function(){this.style.cursor="pointer"}//最小化按钮鼠标样式
	this.right.onmouseover=function(){this.style.cursor="pointer"}//最小化按钮鼠标样式
	this.right.onclick=function(){if(o<=1){o+=0.1;that.setO(o)}}
	this.left.onclick=function(){if(o>=0){o-=0.1;that.setO(o)}}
	this.min.onclick=function(){//最小化设置
	     
	     if(div.style.height!=H+"px"){
		    that.min();
		 }else{
		    that.max();
		 }
	}
	//设置圆角
	that.nav.className="opwindow_radius";
	that.kj.className="opwindow_radius";
	that.div.className="opwindow_radius";
	this.nav.style.textAlign="right";this.nav.style.height=H+"px";
	//this.nav.style.background='url('+iconPath+'/nav.png)';//顶部图片
	this.nav.style.background='#E4F0F8';
	this.left.src=iconPath+"left.png";//左箭头图标路径
	this.right.src=iconPath+"right.png";//又箭头图标路径
	//this.min.src=iconPath+"edit_remove.png";//最小化图标路径
	that.min.className="opwindow_a";that.min.className=that.min.className+" opwindow_min";
	that.close.className="opwindow_a";that.close.className=that.min.className+" opwindow_close";
	//that.min.innerHTML=" 1";
	//this.close.src=iconPath+"cancel.png";//关闭图标路径
	that.close.style.marginRight="5px";
	this.min.style.marginRight=this.left.style.marginRight=this.right.style.marginRight="2px";//所有图标右边距
	that.min.style.marginTop=this.close.style.marginTop=this.close.style.marginTop=this.left.style.marginTop=this.right.style.marginTop="4px";//所有图标上边距
	
	if(isIE()){this.nav.onselectstart=function(){return false;}}
	else{this.nav.style.MozUserSelect="none";}
	//this.nav.id="div_nav";
	
	if(isIE()){this.nav_title.style.styleFloat="left";}
	else{this.nav_title.style.cssFloat="left";	}
	//标题各种属性
	that.nav_title.id="nav_title_"+obj.id;
	that.nav_title.className="opwindow_title";
	that.nav_title.innerHTML=t;
	this.nav.appendChild(this.nav_title);
	//弹窗各种属性
    
	div.className=div.className+" opwindow_div";
	div.id=obj.id;
	div.style.zIndex=Z;
	div.style.border=obj.border;
	div.style.width=w+"px"; 
	div.style.height=h+H+"px";
	div.style.left=divL+"px";div.style.top=divT+"px";
	//框架各种属性
	that.kj.name=obj.id;
	that.kj.style.border="none";//that.kj.scrolling="auto";
	that.kj.frameborder="no";
	that.kj.setAttribute('frameborder', '0', 0);  
	that.kj.style.width=w+"px"; that.kj.style.height=h+"px";
	that.kj.src=url;that.kj.id='kj_'+obj.id;
	
	if(!isIE()){that.kj.style.backgroundColor="rgba(255,255,255,"+o+")";}
	else{}
	//标题栏子节点加入
	//this.nav.appendChild(this.left);
	//this.nav.appendChild(this.right);
	this.nav.appendChild(this.close);
	this.nav.appendChild(this.min);
	
	if(obj.title==true){
	   div.appendChild(this.nav);
	}else{
	   setclose();
	   div.style.height=h+"px";
	}
	if(obj.mask){
	   this.mask_id="mask_"+obj.id;
	   new createbg(this.mask_id,"#000","0.4",8500);
	}
	if(obj.animation){
	  var H=div.offsetHeight;
	  var iH=that.kj.offsetHeight;
	  that.kj.style.height="0px";
	  div.style.height="0px";
      var a=new transition(div).setH(H,1);
	  var b=new transition(that.kj).setH(iH,1)
	}
	function setclose(){
	   that.close.style.position="absolute";
	   that.close.style.right="-5px";
	   div.appendChild(this.close);
	}
	div.appendChild(that.kj);
	body.appendChild(div);
	this.setO=function(o){
	   that.kj.style.backgroundColor="rgba(255,255,255,"+o+")";
	   that.div.style.backgroundColor="rgba(255,255,255,"+o+")";
	}

	this.min=function(quick){
	  if(quick){
	    that.kj.style.height="0px"; 
        div.style.height=H+"px";		
	  }else{
	    new transition(that.kj).setH(0,5);
	    new transition(div).setH(H,5);
	  }
	}
	this.max=function(quick){
	  if(quick){
	   that.kj.style.height=h+"px"; 
       div.style.height=H+h+"px";
	  }else{
	    new transition(that.kj).setH(h,5);
	    new transition(div).setH(h+H,5);
	  }
	}
}


//取滚动条当前X位置
function GetscrollTop(){return document.documentElement.scrollTop || document.body.scrollTop;}
//取滚动条当前Y位置
function GetscrollLeft(){return document.documentElement.scrollLeft || document.body.scrollLeft;}
function GotoPosition(obj){
  var X=50;//频率内位移像素
  var speed=10//定时器频率
  var scrT=GetscrollTop();//滚动之前滚动条X位置
  var Tox=obj.offsetTop;//要滚动到的X位置
  var Tway=scrT-Tox<0?true:false;//ture表示向下滑动,false表示向上滑动.
  //alert (Tway);
  var Toy=obj.offsetLeft;
  
  var timeid= window.setInterval(function(){
     if(Tway){
	    if(GetscrollTop()>=Tox){window.scrollTo(0,Tox);window.clearInterval(timeid)}
		else{window.scrollTo(0,GetscrollTop()+X);}
	 }else{
	    if(GetscrollTop()<=Tox){window.scrollTo(0,Tox);window.clearInterval(timeid)}
		else{window.scrollTo(0,GetscrollTop()-X);}
	 }
	 
     
	 document.title=+Tox+"--"+GetscrollTop()+"--"+document.documentElement.scrollHeight;
  },speed);
 
  
}
function getEventObj(event){//取触发事件的对象节点,通过传递的事件对象;
	var res=event.srcElement||event.target;
	return res;
}
function _getDate(){//获取系统年月日
   var d, s ;           // 声明变量。
   d = new Date();                           // 创建 Date 对象。
   s = d.getFullYear() + "/";                         // 获取年份。
   s += (d.getMonth() + 1) + "/";            // 获取月份。
   s += d.getDate();                   // 获取日。
   return(s);                                // 返回日期。
}
function _gettime(){//取系统时+分
   var d, h,m,t ;           // 声明变量。
   d = new Date();                           // 创建 Date 对象。
   h = d.getHours();   //取小时
   m = d.getMinutes();  //取分钟
   //h = (h>12)?h-12:h;
   h = (h<10)?"0"+h:h;
   m = (m<10)?"0"+m:m;
   t=h+":"+m;
   return t;
}
function ajax(){
	this.xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    this.xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
    this.xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    return this.xmlhttp;
}
function impact(obj, dobj) {  //判断两元素是否碰撞 碰撞返回true否则false
  if(obj!=null&&dobj!=null){
   var o = {  
        x: obj.offsetLeft, 
        y: obj.offsetTop,  
        w: obj.offsetWidth,  
        h: obj.offsetHeight 
    }  

    var d = {  
        x: dobj.offsetLeft, 
        y: dobj.offsetTop,  
        w: dobj.offsetWidth,  
        h: dobj.offsetHeight 
    }  
    var px, py;  
    px = o.x <= d.x ? d.x : o.x;  
    py = o.y <= d.y ? d.y : o.y;  
    // 判断点是否都在两个对象中   
    if (px >= o.x && px <= o.x + o.w && py >= o.y && py <= o.y + o.h && px >= d.x && px <= d.x + d.w && py >= d.y && py <= d.y + d.h) {  
        return true;  
    } else {  
        return false;  
    }  
  }
}
function child(farobj,chobj){//判断chobj,是否在farobj内.
	var FL=farobj.offsetLeft;
	var FR=FL+farobj.offsetWidth;
	var FT=farobj.offsetTop;
	var FB=FT+farobj.offsetHeight;
	
	var CL=chobj.offsetLeft;
	var CR=CL+chobj.offsetWidth;
	var CT=chobj.offsetTop;
	var CB=CT+chobj.offsetHeight;
	if(CL<=FL && CT<=FT)return 5;//左上角碰撞
	if(CR>=FR && CT<=FT)return 6;//右上角碰撞
	if(CL<=FL && CB>=FB)return 7;//左下角碰撞
	if(CR>=FR && CB>=FB)return 8;//右下角碰撞
	if(CL<=FL)return 1;//左边碰撞
	if(CR>=FR)return 2;//右边碰撞
	if(CT<=FT)return 3;//顶部碰撞
	if(CB>=FB)return 4;//底部碰撞

	return 0;//无碰撞
}
function addEventHandler(oTarget, sEventType, fnHandler) {//根据浏览器不同增加事件监听器
            if (oTarget.addEventListener) {
                oTarget.addEventListener(sEventType, fnHandler, false);
            } else if (oTarget.attachEvent) {
                oTarget.attachEvent("on" + sEventType, fnHandler);
            } else {
                oTarget["on" + sEventType] = fnHandler;
            }
};

function removeEventHandler(oTarget, sEventType, fnHandler) {//根据浏览器不同删除事件监听器
            if (oTarget.removeEventListener) {
                oTarget.removeEventListener(sEventType, fnHandler, false);
            } else if (oTarget.detachEvent) {
                oTarget.detachEvent("on" + sEventType, fnHandler);
            } else {
                oTarget["on" + sEventType] = null;
            }
};
function transition(elemet){//动画效果对象
    var obj=document.getElementById(elemet);
	if (!obj){obj=elemet}
	this.obj=obj;
	this.timeid=0;
	this.left=obj.offsetLeft;
	this.top=obj.offsetTop;
	this.width=obj.offsetWidth;
	this.height=obj.offsetHeight;
	
	//isIE()?20:10
	//this.opacity=isIE()?0:aa.style.opacity;
}
transition.prototype={//同类属性的auto与set不能混用
	X:isIE()?20:10,//L,T,W,H递增递减值
	isrun:true,
	setX:function(speed){if(speed!=undefined)this.X=speed},
	setO:function(ovalue,nvalue,speed,fn){//设置透明度，用0到1表示; ovalue,nvalue表示设置对象透明度从一个值到另外一个值过度
		
		
		if(!fn){
		  var fn=function(){};
		}
		var that = this;
        var obj= this.obj;
		var oo=isIE()?ovalue*100:ovalue;
		var no=isIE()?nvalue*100:nvalue;	
		var add=isIE()?10:0.05;
		if(isIE()){obj.style.filter = "Alpha(Opacity="+oo+")"}else{obj.style.opacity=oo}
		var isadd=oo<no?true:false;//判断对象需要变大还是变小
		var chang=no-oo;//改变数值的差值
		var x=0;
		var timeid=window.setInterval(function(){
			if(isadd){x+=add}else{x-=add};
			if(Math.abs(x)>=Math.abs(chang)){
				if(isIE()){obj.style.filter = "Alpha(Opacity="+no+")"}
				else{obj.style.opacity=no};
				that.clear(timeid);
				fn()
				
			}else{
				var lx=oo+x
				if(isIE()){obj.style.filter = "Alpha(Opacity="+lx+")"}
				else{obj.style.opacity=lx;};
			}
		},speed)
		
	},
	autoO:function(speed,fn){
	 
		var that = this;
        var obj= this.obj;
		//obj.style.filter="Alpha(Opacity="+20+")";
		//alert(obj.style.filter);
		
		if(!fn){
		 var fn=function(){}
		}
		if(isIE()){
		  if(obj.style.filter=="Alpha(Opacity=100)")that.setO(1,0,speed,fn);
		  if(obj.style.filter=="Alpha(Opacity=0)")that.setO(0,1,speed);
		}
		if(obj.style.opacity==1)that.setO(1,0,speed,fn);
		if(obj.style.opacity==0)that.setO(0,1,speed);
		
	},
	autoH:function(nheight,speed){
		var that = this;
        var obj= this.obj;
		if(obj.offsetHeight==this.height)that.setH(nheight,speed);
		if(obj.offsetHeight==nheight)that.recH(speed);
	},
	recH:function(speed){
		var that = this;var obj= this.obj;var oh=obj.offsetHeight;var nh=this.height;var x=0;
		var isadd=oh<nh?true:false;//判断对象需要变大还是变小
		var chang=nh-oh;//改变数值的差值
		var timeid=window.setInterval(function(){
			if(isadd){x+=that.X}else{x-=that.X;}
			if(Math.abs(x)>=Math.abs(chang)){that.obj.style.height=nh+"px";that.clear(timeid);return ture;}else{that.obj.style.height=oh+x+"px"}},speed)
	},
	setH:function(nheight,speed,hd){
		var hd=hd||function(){return true};
		var that = this;var obj= this.obj;var nh=nheight;var oh=obj.offsetHeight;var x=0;
		var isadd=oh<nh?true:false;//判断对象需要变大还是变小
		var chang=nh-oh;//改变数值的差值
		var timeid=window.setInterval(function(){
			if(isadd){x+=that.X}else{x-=that.X;}
			if(Math.abs(x)>=Math.abs(chang)){that.obj.style.height=nh+"px";that.clear(timeid);hd();}else{that.obj.style.height=oh+x+"px"}},speed)
	},
	autoW:function(width,speed){
		var that = this;
        var obj= this.obj;
		if(obj.offsetWidth==this.width)that.setW(width,speed)
		if(obj.offsetWidth==width)that.recW(speed)
	},
    setW:function(nwidth,speed,hd){
		var hd=hd||function(){return true};
		var that = this;var obj= this.obj;var ow=obj.offsetWidth;var nw=nwidth;var x=0;
		var isadd=ow<nw?true:false;//判断对象需要变大还是变小
		var chang=nw-ow;//改变数值的差值
		var timeid=window.setInterval(function(){
			if(isadd){x+=that.X}else{x-=that.X;}
			if(Math.abs(x)>=Math.abs(chang)){that.obj.style.width=nw+"px";that.clear(timeid);hd();}else{that.obj.style.width=ow+x+"px"}},speed)
	},
	recW:function(speed){
		var that = this;var obj= this.obj;var ow=obj.offsetWidth;var nw=this.width;var x=0;
		var isadd=ow<nw?true:false;//判断对象需要变大还是变小
		var chang=nw-ow;//改变数值的差值
		var timeid=window.setInterval(function(){
			if(isadd){x+=that.X}else{x-=that.X;}
			if(Math.abs(x)>=Math.abs(chang)){that.obj.style.width=nw+"px";that.clear(timeid);}else{that.obj.style.width=ow+x+"px"}},speed)
	},
	autoL:function(nleft,speed){
		var that = this;var obj= this.obj;
		if(obj.offsetLeft==this.left)that.setL(nleft,speed);
		if(obj.offsetLeft==nleft)that.recL(speed);
	},
	setL:function(nleft,speed){
		var that = this;var obj= this.obj;var ol=obj.offsetLeft;var nl=nleft;var x=0;
		var isadd=ol<nl?true:false;//判断对象需要变大还是变小
		var chang=nl-ol;//改变数值的差值
		var timeid=window.setInterval(function(){
			if(isadd){x+=that.X}else{x-=that.X;}
			if(Math.abs(x)>=Math.abs(chang)){that.obj.style.left=nl+"px";that.clear(timeid);}else{that.obj.style.left=ol+x+"px"}},speed)
	},
	recL:function(speed){
		var that = this;var obj= this.obj;var ol=obj.offsetLeft;var nl=this.left;var x=0;
		var isadd=ol<nl?true:false;//判断对象需要变大还是变小
		var chang=nl-ol;//改变数值的差值
		var timeid=window.setInterval(function(){//过度效果处理
			if(isadd){x+=that.X}else{x-=that.X;}
			if(Math.abs(x)>=Math.abs(chang)){that.obj.style.left=nl+"px";that.clear(timeid);}else{that.obj.style.left=ol+x+"px"}},speed)
	},
	autoT:function(ntop,speed){
		var that = this;var obj= this.obj;
		if(obj.offsetTop==this.top)that.setT(ntop,speed);
		if(obj.offsetTop==ntop)that.recT(speed);
	},
	setT:function(ntop,speed){
		var that = this;var obj= this.obj;var ot=obj.offsetTop;var nt=ntop;var x=0;
		var isadd=ot<nt?true:false;//判断对象需要变大还是变小
		var chang=nt-ot;//改变数值的差值
		var timeid=window.setInterval(function(){
			if(isadd){x+=that.X}else{x-=that.X;}
			if(Math.abs(x)>=Math.abs(chang)){that.obj.style.top=nt+"px";that.clear(timeid);}else{that.obj.style.top=ot+x+"px"}},speed)
	},
	recT:function(speed){
		var that = this; var obj= this.obj;var ot=obj.offsetTop;var nt=this.top;var x=0;
		var isadd=ot<nt?true:false;//判断对象需要变大还是变小
		var chang=nt-ot;//改变数值的差值
		var timeid=window.setInterval(function(){
			if(isadd){x+=that.X}else{x-=that.X;}
			if(Math.abs(x)>=Math.abs(chang)){that.obj.style.top=nt+"px";that.clear(timeid);}else{that.obj.style.top=ot+x+"px"}},speed)
	},
	clear:function(id){/*alert("事件结束")*/window.clearInterval(id)}
}
//grb颜色转换为十六进制颜色;
String.prototype.colorHex = function(){
	var that = this;
	if(/^(rgb|RGB)/.test(that)){
		var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
		var strHex = "#";
		for(var i=0; i<aColor.length; i++){
			var hex = Number(aColor[i]).toString(16);
			if(hex === "0"){
				hex += hex;	
			}
			strHex += hex;
		}
		if(strHex.length !== 7){
			strHex = that;	
		}
		return strHex;
	}else if(reg.test(that)){
		var aNum = that.replace(/#/,"").split("");
		if(aNum.length === 6){
			return that;	
		}else if(aNum.length === 3){
			var numHex = "#";
			for(var i=0; i<aNum.length; i+=1){
				numHex += (aNum[i]+aNum[i]);
			}
			return numHex;
		}
	}else{
		return that;	
	}
};
String.prototype.colorRgb = function(){
	var sColor = this.toLowerCase();
	if(sColor && reg.test(sColor)){
		if(sColor.length === 4){
			var sColorNew = "#";
			for(var i=1; i<4; i+=1){
				sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));	
			}
			sColor = sColorNew;
		}
	
		var sColorChange = [];
		for(var i=1; i<7; i+=2){
			sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));	
		}
		return "RGB(" + sColorChange.join(",") + ")";
	}else{
		return sColor;	
	}
};