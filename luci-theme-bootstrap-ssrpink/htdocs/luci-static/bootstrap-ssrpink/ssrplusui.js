var Version=1.11;

/* Cookie函数 */
function setCookie(name,value){
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
/* removeClass函数 */
function removeClass(href) {
    var links = document.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
        var _href = links[i].href;
        if (links[i] && links[i].href && links[i].href.indexOf(href) != -1) {
            links[i].parentNode.removeChild(links[i]);
        }
    }
}
/* 初始载入主题 */
function loadStyle(url){
	var ssrplusui = document.createElement('link');
	ssrplusui.rel = 'stylesheet';
	ssrplusui.type = 'text/css';
	ssrplusui.href = url;
	document.getElementsByTagName('head')[0].appendChild(ssrplusui);
}
/* 切换主题函数 */
function loadtheme(themeload){
	switch(themeload){
		case "dark":
		case null:
			themeload="light";
			break;
		case "light":
			themeload="dark";
			break;
	}
	removeClass(getCookie("themeurl"))
	loadStyle("/luci-static/bootstrap-ssrpink/ssrplusui-"+themeload+".css?v=shiroisky-v"+Version);
	setCookie("themeurl","/luci-static/bootstrap-ssrpink/ssrplusui-"+themeload+".css?v=shiroisky-v"+Version);
	setCookie("theme",themeload);
}

var str=window.location.href;
var verification=new RegExp("/services/shadowsocksr");
var verification_result=verification.test(str);
var nowtheme=getCookie("theme");
if(verification_result==true){
	if(nowtheme==null||nowtheme=="light"){
		loadtheme("dark");
	}else{
		loadtheme("light");
	}
	/* 切换主题 */
	window.onload=function(){
		var tabs=document.querySelector('.tabs');
		var switch_theme=document.createElement('div');
		switch_theme.classList.add('switch_theme');
		var theme_text=document.createTextNode('切换');
		switch_theme.appendChild(theme_text);
		switch_theme.title="如果切换异常，请尝试清除浏览器Cookie！";
		tabs.appendChild(switch_theme);
		switch_theme=document.querySelector('.switch_theme');
		switch_theme.onclick=function(){
			loadtheme(getCookie("theme"));
		}
	}
}else{
	console.log("ShadowsocksR Plus+ UI is not loaded!");
}
