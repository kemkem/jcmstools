<%@ include file='/jcore/doInitPage.jsp' %>

<%
	String id = channel.getCurrentJcmsContext().getRequest().getParameter("id");
	
	Data data = channel.getData(id);
	String objectTitle = "unknown";
	String objectType = "unknow";
	String objectEditLink = "";
	String iconPath = "images/jalios/icons/information.gif";
	String titleProp = "kDebugTools.object_finder.title.null";
	String nameProp = "kDebugTools.object_finder.label.name";
	boolean valid = true;
	
	if (Util.notEmpty(data))
	{
		if (data instanceof Content)
		{
			Publication pub = (Publication)data;
			objectType = data.getClass().getSimpleName();
			objectTitle = pub.getTitle();
			objectEditLink = "http://localhost:8080/jcms/types/"+objectType+"/edit"+objectType+".jsp?id="+id;
			iconPath = "images/jalios/icons/content.gif";
			titleProp = "kDebugTools.object_finder.title.content";
			nameProp = "kDebugTools.object_finder.label.title";
		}
		else if (data instanceof AbstractPortletSkinable)
		{
			Publication pub = (Publication)data;
			objectType = data.getClass().getSimpleName();
			objectTitle = pub.getTitle();
			objectEditLink = "http://localhost:8080/jcms/types/"+objectType+"/edit"+objectType+".jsp?id="+id;
			iconPath = "images/jalios/icons/portlet_big.gif";
			titleProp = "kDebugTools.object_finder.title.portlet";
			nameProp = "kDebugTools.object_finder.label.title";
		}
		else if (data instanceof Category)
		{
			Category cat = (Category)data;
			objectType = data.getClass().getSimpleName();
			objectTitle = cat.getName();
			objectEditLink = "http://localhost:8080/jcms/edit.jsp?id="+id+"&redirect=http://localhost:8080/jcms/work/editCat.jsp";
			iconPath = "images/jalios/icons/files/folder.gif";
			titleProp = "kDebugTools.object_finder.title.category";
			nameProp = "kDebugTools.object_finder.label.name";
		}
		else if (data instanceof Form)
		{
			Form form = (Form)data;
			objectType = data.getClass().getSimpleName();
			objectTitle = form.getTitle();
			objectEditLink = "http://localhost:8080/jcms/edit.jsp?id="+id;
			iconPath = "images/jalios/icons/form_big.gif";
			titleProp = "kDebugTools.object_finder.title.form";
			nameProp = "kDebugTools.object_finder.label.title";
		}
		else if (data instanceof Member)
		{
			Member member = (Member)data;
			objectType = data.getClass().getSimpleName();
			objectTitle = member.getName();
			objectEditLink = "http://localhost:8080/jcms/edit.jsp?id="+id;
			iconPath = "images/jalios/icons/member_big.gif";
			titleProp = "kDebugTools.object_finder.title.member";
			nameProp = "kDebugTools.object_finder.label.name";
		}
		else if (data instanceof Group)
		{
			Group group = (Group)data;
			objectType = data.getClass().getSimpleName();
			objectTitle = group.getName();
			objectEditLink = "http://localhost:8080/jcms/edit.jsp?id="+id;
			iconPath = "images/jalios/icons/group_big.gif";
			titleProp = "kDebugTools.object_finder.title.group";
			nameProp = "kDebugTools.object_finder.label.name";
		}
		
		
		
		
		else
		{
			titleProp = "kDebugTools.object_finder.title.unknown";
			valid = false;
		}
	}
	else
	{
		valid = false;
	}
	
%>

<form onsubmit="return JCMS.window.Modal.close(true);" <%= untranslatedZoneAttribute %>>

<h1><img src='<%=iconPath %>' class='visual' alt="<%=glp("msg.message-box.info")%>" /><%=glp("kDebugTools.object_finder.title") %> <%=glp(titleProp) %></h1>
<% if(valid){ %>
<div class='msg'>
<table>
<tr>
<td><%=glp("kDebugTools.object_finder.label.type") %> : </td><td><%=objectType%></td>
</tr>
<tr>
<td><%=glp(nameProp) %> :  </td><td><%=objectTitle%></td>
</tr>
<tr>
<td><%=glp("kDebugTools.object_finder.label.id") %> :  </td><td><%=id %></td>
</tr>
</table>
</div>

<div class='btn'>
	<input type="submit" name="opUpdate" onclick="location.href='<%=objectEditLink%>';" class="formButton mainButton" value="<%= glp("kDebugTools.object_finder.link.edit.text") %>"/>
	<input name='close' type='button' class='formButton focus' onclick="return JCMS.window.Modal.close(true);"  value="<%=glp("kDebugTools.object_finder.button.close.text")%>"/>
</div>
<% } else {%>

<div class='msg'>
<table>
<tr>
<td><%=glp("kDebugTools.object_finder.label.id") %> :  </td><td><%=id %></td>
</tr>
</table>
</div>


<div class='btn'>
	<input name='close' type='button' class='formButton focus' onclick="return JCMS.window.Modal.close(true);"  value="<%=glp("kDebugTools.object_finder.button.close.text")%>"/>
</div>
<% } %>
</form>

