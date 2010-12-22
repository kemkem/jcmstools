// ==UserScript==
// @name           JCMS FFox Tools
// @description   A greasemonkey script for Jalios JCMS (www.jalios.fr). Unofficial. Use at your own risk.
// @author        Marc Bourgeois contact_jt(at)kprod.net
// @namespace   kprod jcms_ffox_tools
// @require		  http://mwswh.googlecode.com/files/jquery.js
// @require		  http://cherne.net/brian/resources/jquery.hoverIntent.minified.js
// @require		  http://users.tpg.com.au/j_birch/plugins/superfish/js/superfish.js
// @include        http*://localhost*
// @version       1.2.3
// ==/UserScript==

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Some usefull functions
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
function _jtb_addStyles(css) {
	if (typeof(GM_addStyle) != "undefined") {
		GM_addStyle(css);
	} else if (typeof(addStyle) != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node["type"] = "text/css";
			node.innerHTML = css;
			heads[0].appendChild(node);
		}
	}

	return this;
};

//insert a param into url
function _jtb_insertParam(key, value, url){
	key = escape(key);
	value = escape(value);
	if(url.indexOf("?") == -1)
	{
		url += "?" + key + "=" + value;
	}
	else
	{
		url += "&" + key + "=" + value;
	}
	return url;
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// A fat var containing all css (to be injected using _jtb_addStyles)
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
var _jtb_dynCss = "/*css_start*/" + 

//contains all html, will be injected into dom
"._jtb_container {" +
"	width:100%;" + 
"	position:fixed;" + 
"	top:0px;" + 
"	left:0px;" + 
"	font-family:verdana;" + 
"	font-size:10px;" + 
"	font-weigth:bold;" + 
"	font-style:normal;" +
"	z-index:10000;" +
"}" + 
//hover "button" : show tools when mouse over
"._jtbButton {" +
"	position:fixed;" + 
"	top:0;" + 
"	left:0;" + 
"	border:1px solid #2D2D2D;" + 
"	cursor:pointer;" + 
"	text-align:center;" + 
"	width:15px;" + 
"	height:15px;" + 
"	background-color:#2D2D2D;" + 
"	color:#E1E1E1;" + 
"	font-family:verdana;" + 
"	font-weight:bold;" + 
 "	font-size:12px;" +
 "	z-index:10000;" +
"}" +
//debug bt
"li._jtb_bt_debug_toggle {" +
"	cursor:pointer;" + 
"}" +
//first part of tools : links
"div._jtbBox {" +
"	position:fixed;" + 
"	top:0;" + 
"	left:17px;" + 
"	border-top:2px;" + 
"	background-color:#2D2D2D;" + 
"	color:#E1E1E1;" + 
"	height:17px;" + 
"	font-family:verdana;" + 
"	font-size:10px;" + 
"	font-weigth:bold;" + 
"	display:none;" +
"	z-index:10000;" +
"}" +
//second part of tools : display user and webapp name
"._jtbHostLbl {" +
"	float:right;" + 
"	color:#FF7F00;" + 
"	font-size:12px;" +
"	font-family:verdana;" + 
"	padding:0 0.3em;" + 
"	height:17px;" + 
"	background-color:#2D2D2D;" + 
 "	z-index:10000;" +
"}" + 
//floating login menu
"._jtbFormLogin {" +
"	-moz-border-radius: 10px;" + 
"	border:3px solid #2D2D2D;" + 
"	background-color:#E1E1E1;" + 
"	display:none;" + 
"	position:relative;" + 
"	margin:1em auto 1em;" + 
"	padding:2em;" + 
"	width:20em;" + 
"	font-family:verdana;" + 
"	font-size:12px;" + 
"	font-weigth:bold;" + 
"	z-index:10000;" +
"}" +
//default link style
"._jtbLink {" +
"	color:#E1E1E1;" +
"	font-style:normal;" +
"}" + 
//menu style (superfish menu)
"._jtb_sf-menu, ._jtb_sf-menu * {"+
"	margin:			0;"+
"	padding:		0;"+
"	list-style:		none;"+
"}"+
"._jtb_sf-menu {"+
"	line-height:	1.0;"+
"}"+
"._jtb_sf-menu ul {"+
"	position:		absolute;"+
"	top:			-999em;"+
"	width:			10em; /* left offset of submenus need to match (see below) */"+
"}"+
"._jtb_sf-menu ul li {"+
"	width:			100%;"+
"}"+
"._jtb_sf-menu li:hover {"+
"	visibility:		inherit; /* fixes IE7 'sticky bug' */"+
"}"+
"._jtb_sf-menu li {"+
"	float:			left;"+
"	position:		relative;"+
"}"+
"._jtb_sf-menu a {"+
"	display:		block;"+
"	position:		relative;"+
"}"+
"._jtb_sf-menu li:hover ul,"+
"._jtb_sf-menu li.sfHover ul {"+
"	left:			0;"+
"	top:			17px; /* match top ul list item height */"+
"	z-index:		99;"+
"}"+
"ul._jtb_sf-menu li:hover li ul,"+
"ul._jtb_sf-menu li.sfHover li ul {"+
"	top:			-999em;"+
"}"+
"ul._jtb_sf-menu li li:hover ul,"+
"ul._jtb_sf-menu li li.sfHover ul {"+
"	left:			10em; /* match ul width */"+
"	top:			0;"+
"}"+
"ul._jtb_sf-menu li li:hover li ul,"+
"ul._jtb_sf-menu li li.sfHover li ul {"+
"	top:			-999em;"+
"}"+
"ul._jtb_sf-menu li li li:hover ul,"+
"ul._jtb_sf-menu li li li.sfHover ul {"+
"	left:			10em; /* match ul width */"+
"	top:			0;"+
"}"+
"._jtb_sf-menu {"+
"	float:			left;"+
"	margin-bottom:	1em;"+
"}"+
"._jtb_sf-menu a {"+
"	border-left:	1px solid #E1E1E1;"+ 
"height:13px;"+
"padding:2px 1em;"+
"	text-decoration:none;"+
"}"+
"._jtb_sf-menu a, ._jtb_sf-menu a:visited  { /* visited pseudo selector so IE6 applies text colour*/"+
"	color:			#E1E1E1;"+
"}"+
"._jtb_sf-menu li {"+
"	background:		#2D2D2D;"+
"}"+
"._jtb_sf-menu li li {"+
"	background:		#2D2D2D;"+
"}"+
"._jtb_sf-menu li li li {"+
"	background:		#2D2D2D;"+
"}"+
"._jtb_sf-menu li:hover, ._jtb_sf-menu li.sfHover,"+
"._jtb_sf-menu a:focus, ._jtb_sf-menu a:hover, ._jtb_sf-menu a:active {"+
"	background:		#FF7F00;"+
"	outline:		0;"+
"}";

//css injection
_jtb_addStyles(_jtb_dynCss);

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Process URL
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
var _jtb_regex = new RegExp("[/]+","g");
var _jtb_sUrl = document.location.href;
var _jtb_sTab = _jtb_sUrl.split(_jtb_regex);
var _jtb_bUrl = _jtb_sTab[0] + "//" + _jtb_sTab[1] + "/" + _jtb_sTab[2];
var _jtb_ctxName = _jtb_sTab[2];

//determinate current portal mode (edit mode/normal mode)
var _jtb_html_Links_PortalMode = "	<a id=\"_jcmsToolbar_portal_lnk_on\" href=\"" + document.location + "\">Portal Mode [ON]</a>";
if($(".PortalMode").length != 0)
{
	_jtb_html_Links_PortalMode = "	<a id=\"_jcmsToolbar_portal_lnk_off\" href=\"" + document.location + "\">Portal Mode [OFF]</a>";
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// HTML for superfish menu
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
var _jtbMenu = "<ul class=\"_jtb_sf-menu\">"+
"<li class=\"_jtb_bt_debug_toggle\">"+
"	<a id=\"_jtb_bt_debug_lnk_toggle\">Debug</a>"+
"</li>"+
"<li>"+
"	<a href=\"" + _jtb_bUrl + "\">Home</a>"+
"</li>"+
"<li class=\"_jtbLink _jtbLoggedWorkElement\">"+
"	<a href=\"" + _jtb_bUrl + "/work/\">Work</a>"+
"	<ul>"+
"<li>"+
"	<a href=\"" + _jtb_bUrl + "/work/pubBrowser.jsp\">Contents</a>"+
"	<ul>"+
"		<li><a href=\"" + _jtb_bUrl + "/work/pubBrowser.jsp?mode=all\">All</a></li>"+
"		<li><a href=\"" + _jtb_bUrl + "/work/pubBrowser.jsp?mode=mine\">Owned</a></li>"+
"	</ul>"+
"</li>"+
"<li>"+
"	<a href=\"" + _jtb_bUrl + "/work/pubBrowser.jsp?mode=all&super=com.jalios.jcms.UserContent\">DBContents</a>"+
"	<ul>"+
"		<li><a href=\"" + _jtb_bUrl + "/work/pubBrowser.jsp?super=com.jalios.jcms.UserContent&classname=generated.Review&mode=all&super=com.jalios.jcms.UserContent\">All</a></li>"+
"		<li><a href=\"" + _jtb_bUrl + "/work/pubBrowser.jsp?super=com.jalios.jcms.UserContent&classname=generated.Review&mode=mine&super=com.jalios.jcms.UserContent\">Owned</a></li>"+
"	</ul>"+
"</li>"+
"<li>"+
"	<a href=\"" + _jtb_bUrl + "/work/workReport.jsp\">Workflow</a>"+
"	<ul>"+
"		<li>"+
"			<a href=\"" + _jtb_bUrl + "/work/workList.jsp\">Worklist</a>"+
"		</li>"+
"				<li><a href=\"" + _jtb_bUrl + "/work/pubCalendar.jsp?type=pdate\">Publication</a></li>"+
"				<li><a href=\"" + _jtb_bUrl + "/work/pubCalendar.jsp?type=edate\">Expiry</a></li>"+
"				<li><a href=\"" + _jtb_bUrl + "/work/pubCalendar.jsp?type=adate\">Archiving</a></li>"+
"	</ul>"+
"</li>"+
"<li><a href=\"" + _jtb_bUrl + "/work/editCat.jsp\">Categories</a></li>"+
"<li><a href=\"" + _jtb_bUrl + "/work/pubBrowser.jsp?mode=all&super=com.jalios.jcms.portlet.PortalElement\">Portlets</a></li>"+
"<li>"+
"	<a href=\"" + _jtb_bUrl + "/work/pubBrowser.jsp?mode=all&super=com.jalios.jcms.Form\">Forms</a>"+
"	<ul>"+
"		<li><a href=\"" + _jtb_bUrl + "/work/pubBrowser.jsp?super=com.jalios.jcms.Form&mode=all&super=com.jalios.jcms.Form\">All</a></li>"+
"		<li><a href=\"" + _jtb_bUrl + "/work/pubBrowser.jsp?super=com.jalios.jcms.Form&mode=mine&super=com.jalios.jcms.Form\">Owned</a></li>"+
"	</ul>"+
"</li>"+
"<li><a href=\"" + _jtb_bUrl + "/work/workspace/adminWorkspace.jsp\">Work Admin</a>"+
"	<ul>"+
"		<li><a href=\"" + _jtb_bUrl + "/work/workspace/workspaceMemberList.jsp\">Users</a>"+
"			<ul>"+
"			<li><a href=\"" + _jtb_bUrl + "/work/workspace/workspaceMemberList.jsp\">Members</a></li>"+
"			<li><a href=\"" + _jtb_bUrl + "/work/workspace/workspaceGroupList.jsp\">Groups</a></li>"+
"			<li><a href=\"" + _jtb_bUrl + "/work/workspace/editWorkspaceRole.jsp\">Roles</a></li>"+
"			</ul>"+
"		</li>"+
"		<li><a href=\"" + _jtb_bUrl + "/work/workspace/editWorkspaceType.jsp?rootClass=com.jalios.jcms.Content\">Types</a>"+
"			<ul>"+
"			<li><a href=\"" + _jtb_bUrl + "/work/workspace/editWorkspaceType.jsp?rootClass=com.jalios.jcms.Content\">Contents</a></li>"+
"			<li><a href=\"" + _jtb_bUrl + "/work/workspace/editWorkspaceType.jsp?rootClass=com.jalios.jcms.UserContent\">DBContents</a></li>"+
"			<li><a href=\"" + _jtb_bUrl + "/work/workspace/editWorkspaceType.jsp?rootClass=com.jalios.jcms.portlet.PortalElement\">Portlets</a></li>"+
"			<li><a href=\"" + _jtb_bUrl + "/work/workspace/editWorkspaceType.jsp?rootClass=com.jalios.jcms.Form\">Forms</a></li>"+
"			</ul>"+
"		</li>"+
"		<li><a href=\"" + _jtb_bUrl + "/work/workspace/editWorkspaceCommon.jsp\">Properties</a></li>"+
"	</ul>"+
"</li>"+
"<li><a href=\"" + _jtb_bUrl + "/front/memberProfile.jsp\">Member</a></li>"+
"<li><a href=\"" + _jtb_bUrl + "/work/searchWork.jsp?workspaceFilter=true\">Search</a></li>"+
"	</ul>"+
"</li>"+
"	<li class=\"_jtbLink _jtbLoggedAdminElement\">"+
"		<a href=\"" + _jtb_bUrl + "/admin/\">Admin</a>"+
"		<ul>"+
"			<li>"+
"				<a href=\"" + _jtb_bUrl + "/admin/memberList.jsp\">Users</a>"+
"				<ul>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/memberList.jsp\">Members</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/dbmemberList.jsp\">DBMembers</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/groupList.jsp\">Groups</a></li>"+
"				</ul>"+
"			</li>"+
"			<li>"+
"				<a href=\"" + _jtb_bUrl + "/admin/dataReport.jsp\">Reports</a>"+
"				<ul>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/dataReport.jsp\">Data</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/stat/adminReportList.jsp\">Stats</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/friendlyURLs.jsp\">Friendly Url</a></li>"+
"				</ul>"+
"			</li>"+
"			<li>"+
"				<a href=\"" + _jtb_bUrl + "/admin/siteInfo.jsp\">Status</a>"+
"				<ul>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/siteInfo.jsp\">Status</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/monitoring.jsp\">Monitoring</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/storeInfo.jsp\">Store status</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/dbInfo.jsp\">DB status</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/mailInfo.jsp\">Mail status</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/checkIntegrity.jsp\">Integrity</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/libInfo.jsp\">Libs</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/logs.jsp\">Logs</a></li>				"+
"				</ul>"+
"			</li>"+
"			<li>"+
"				<a href=\"" + _jtb_bUrl + "/admin/adminProperties.jsp\">Manage Site</a>"+
"				<ul>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/adminProperties.jsp\">Properties</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/adminSearchEngines.jsp\">Search</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/cacheManager.jsp\">Cache</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/jsync.jsp\">JSync</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/createAuthKey.jsp\">AuthKeys</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/pluginManager.jsp\">Plugins</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/deploy/upgradeMgr.jsp\">Upgrade</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/storeCleaner.jsp\">StoreCleaner</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/portalProfiler.jsp\">Profiler</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/showTargets.jsp\">Targets</a></li>"+
"				</ul>"+
"			</li>"+
"			<li>"+
"				<a href=\"" + _jtb_bUrl + "/admin/typeListEditor.jsp?rootClass=com.jalios.jcms.Content\">Types</a>"+
"				<ul>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/typeListEditor.jsp?rootClass=com.jalios.jcms.Content\">Contents</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/typeListEditor.jsp?rootClass=com.jalios.jcms.UserContent\">DBContents</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/typeListEditor.jsp?rootClass=com.jalios.jcms.portlet.PortalElement\">Portlets</a></li>"+
"					<li><a href=\"" + _jtb_bUrl + "/admin/typeListEditor.jsp?rootClass=com.jalios.jcms.Form\">Forms</a></li>"+
"				</ul>"+
"			</li>"+
"			<li>"+
"				<a href=\"" + _jtb_bUrl + "/admin/mail/adminMail.jsp\">Send mail</a>"+
"			</li>"+
"			<li>"+
"				<a href=\"" + _jtb_bUrl + "/work/workspace/workspaceList.jsp\">Workspaces</a>"+
"			</li>"+
"			<li>"+
"				<a href=\"" + _jtb_bUrl + "/admin/wfList.jsp\">Workflows</a>"+
"			</li>"+
"			<li>"+
"				<a href=\"" + _jtb_bUrl + "/work/mediaBrowser.jsp\">Media Browser</a>"+
"			</li>"+
"		</ul>"+
"	</li>"+
"<li class=\"_jtbLink _jtbLoginElement\">"+
"	<a href=\"\" id=\"_jtb_bt_login\">Login</a>"+
"</li>"+
"<li class=\"_jtbLink _jtbLogoutElement\">"+
"	<a href=\"" + _jtb_bUrl + "/front/logout.jsp\">Logout</a>"+
"</li>"+
"<li class=\"_jtbLink _jtbLoggedAdminElement\">"+
_jtb_html_Links_PortalMode +
"</li>"+
"<li class=\"_jtbDelegateElement\">"+
"	<a id=\"_jtb_undelagate_lnk\" href=\"\">Undelegate</a>"+
"</li>"+
"		</ul>";

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Floating Login form
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
var _jtb_html_FormLogin = "<div id=\"_jtb_Login\" class=\"_jtbFormLogin\">" +
"<form id=\"formLogin\" name=\"login\" method=\"post\" action=\"" + _jtb_bUrl + "/jcms\">" +
"<table><tr><td> " +
"<label for=\"_jtb_login\">login</label>" +
"</td><td>" +
"<input id=\"_jtb_login\" type=\"text\" name=\"JCMS_login\" style=\"margin-top:0.2em\" />" +
"</td></tr><tr><td>" +
"<label for=\"_jtb_pwd\" style=\"margin-top:1em;\">password</label>"+
"</td><td>" +
"<input id=\"_jtb_pwd\" type=\"password\" name=\"JCMS_password\" style=\"margin-top:0.2em\"  />" +
"</td></tr><tr><td>" +
"<input type=\"button\" id=\"_jtb_form_close\" value=\"Cancel\" />"+
"</td><td>" +
"<input type=\"submit\" id=\"_jtb_form_submit_toclick\" name=\"JCMS_opLogin\" value=\"Ok\" />" +
"</td></tr></table>"+
"</form></div>";

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Output all HTML just after body
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
var _jtb_html_Button = "<div id=\"_jcmsToolbar_button\" class=\"_jtbButton\">jT</div>";
var _jtb_html_Box = "<div id=\"_jcmsToolbar_box\" class=\"_jtbBox\">"+_jtbMenu + "</div>";
var _jtb_html_HostLbl = "<div id=\"_jcmsToolbar_hostLbl\" class=\"_jtbHostLbl\">" + _jtb_ctxName + "</div>";

$("body:not(.mceContentBody)").prepend("<div id=\"_jtb_container\" class=\"_jtb_container\"><div id=\"_jtb_main\">" + _jtb_html_Button +  _jtb_html_Box  + "</div>"+ _jtb_html_HostLbl + _jtb_html_FormLogin+"</div>");
$('ul._jtb_sf-menu').superfish();

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Some Ajax used to get current user, and abilities
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
var _jtb_isAdmin = false;
var _jtb_isDelegate = false;
var _jtb_login = "";

$("#_jcmsToolbar_hostLbl").html("guest@" + _jtb_ctxName);
	
$("._jtbLoggedWorkElement").hide();
$("._jtbLoggedAdminElement").hide();
$("._jtbLogoutElement").hide();
$("._jtbDelegateElement").hide();

//get the main page of JCMS workspace
$.get(_jtb_bUrl + "/work/pubBrowser.jsp", function(data) {
	var _jtb_LoginTab = /alt=\'\' \/> <strong>(.*)<\/strong>/.exec(data);
	if (_jtb_LoginTab != "")
	{
		_jtb_login = _jtb_LoginTab[1];
	}

	$("#_jcmsToolbar_hostLbl").html(_jtb_login + "@" + _jtb_ctxName);
	
	$("._jtbLoggedWorkElement").hide();
	$("._jtbLoggedAdminElement").hide();
	if (_jtb_login != "")
	{
		//$("#_jcmsToolbar_hostLbl").html($("#_jcmsToolbar_hostLbl").html() + " | " + _jtb_login);
		$("._jtbLoginElement").hide();
		$("._jtbLogoutElement").show();
		$("._jtbLoggedWorkElement").show();
		
	}
	else
	{
		//$("#_jcmsToolbar_hostLbl").html($("#_jcmsToolbar_hostLbl").html() + " | guest");
		$("._jtbLogoutElement").hide();
		$("#_jcmsToolbar_hostLbl").html("guest" + "@" + _jtb_ctxName);
		
	}
	
	//is admin ?
	var _jtb_loggedAdmin_regex = new RegExp("icons/memberAdmin.gif");
	if(data.match(_jtb_loggedAdmin_regex))
	{
		_jtb_isAdmin = true;
		$("#_jcmsToolbar_hostLbl").html($("#_jcmsToolbar_hostLbl").html() + "[Admin]");
		$("._jtbLoggedAdminElement").show();
	}
	
	//is delegate ?
	
	var _jtb_delegate_regex = new RegExp("delegateWarning");
	if(data.match(_jtb_delegate_regex))
	{
		_jtb_isDelegate = true;
		$("#_jcmsToolbar_hostLbl").html($("#_jcmsToolbar_hostLbl").html() + "[Delegate]");
		$("._jtbDelegateElement").show();
		$("._jtbLoggedAdminElement").hide();
	}
});


//-------------------------------------------------------------------------------------------------------------------------------------------------
//Events
//-------------------------------------------------------------------------------------------------------------------------------------------------
//show box when mouse hover
$('#_jtb_main').bind('mouseover', function() {
	$('#_jcmsToolbar_box').toggle();
});
//hide box when mouse out
$('#_jtb_main').bind('mouseout', function() {
	$('#_jcmsToolbar_box').toggle();
});
//click on -> portal edit off (reload with new url param)
$('#_jcmsToolbar_portal_lnk_on').bind('click', function() {
	document.location.href = _jtb_insertParam("PortalAction_x_000_Mode", "Enable", document.location.href);
});
//click off -> portal edit off (reload with new url param)
$('#_jcmsToolbar_portal_lnk_off').bind('click', function() {
	document.location.href = _jtb_insertParam("PortalAction_x_000_Mode", "Remove", document.location.href);
});
//click on login link, toggle login form
$('#_jtb_bt_login').bind('click', function(e) {
	$('#_jtb_Login').toggle();
	e.stopPropagation();
	return false;
});
//click on cancel -> close
$('#_jtb_form_close').bind('click', function(e) {
	$('#_jtb_Login').hide();
	return false;
});
//when right clicked, hide and remove elements from dom
$('#_jtb_main').bind("contextmenu", function(e) {
	$('#_jtb_main').toggle(200);
	$('#_jtb_container').remove();
	e.preventDefault();
});
$('#_jtb_undelagate_lnk').bind('click', function(e) {
	document.location.href = _jtb_insertParam("JCMS_sulogin", "admin", document.location.href);
});
$('.folderItem').bind('click', function(e) {
	e.preventDefault();
});
//toggle debug
$("#_jtb_bt_debug_lnk_toggle").bind("click", function(data){
	$("._jtD_MainBox").toggle();
	$("._jtD_HeaderButton").toggleClass("_jtD_HeaderButtonDisabled");
	e.preventDefault();
});
//remove debug button
$("._jtD_HeaderContainer").remove();

