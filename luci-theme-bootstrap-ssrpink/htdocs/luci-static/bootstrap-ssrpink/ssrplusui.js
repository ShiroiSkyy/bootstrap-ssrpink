var Version=1.2;

/* Cookie函数 */
function setCookie(name,value){
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
	}else{
        return null;
	}
}
/* 载入主题 */
function loadStyle(url){
	var StyleSsr=document.querySelector("#ssrpinkcss");
	if(StyleSsr!=null||""){
		StyleSsr.href = url;
	}else{
		var ssrplusui = document.createElement('link');
		ssrplusui.rel = 'stylesheet';
		ssrplusui.type = 'text/css';
		ssrplusui.id = 'ssrpinkcss';
		ssrplusui.href = url;
		document.getElementsByTagName('head')[0].appendChild(ssrplusui);
	}
}
/* 切换主题函数 */
function loadTheme(themeload){
	loadStyle("/luci-static/bootstrap-ssrpink/ssrplusui-"+themeload+".css?v=shiroisky-v"+Version);
	setCookie("theme",themeload);
}

var str=window.location.href;
var verification=new RegExp("/services/shadowsocksr");
var verification_result=verification.test(str);
var oldtheme=getCookie("theme");
if(verification_result==true){
	//默认载入上次主题
	loadTheme(oldtheme==null?"light":oldtheme=="light"?"light":"dark")
	/* 切换主题 */
	window.onload=function(){
		var switch_theme=document.createElement('div');
		switch_theme.classList.add('switch_theme');
		var theme_text=document.createTextNode('切换');
		switch_theme.appendChild(theme_text);
		switch_theme.title="如果切换异常，请尝试清除浏览器Cookie！";
		document.querySelector('.tabs').appendChild(switch_theme);
		document.querySelector('.switch_theme').onclick=function(){
			loadTheme(getCookie("theme")=="dark"?"light":"dark");
		}
	}
}