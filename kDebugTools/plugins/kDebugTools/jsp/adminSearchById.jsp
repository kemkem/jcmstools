<%@ include file='/jcore/doInitPage.jsp' %>

<% 

jcmsContext.addJavaScript("plugins/kDebugTools/js/kDebug.js");

%>

<td class="menuIcon"> 
	<form>
		Data Id
		<input type="text" id="idSearchDataById" style="font-size: x-small;height: 1.1em;line-height: 1em;" size="15"/>
		<button id="idSearchDataByIdSubmit" type="submit" style="background-color: transparent;border: 0 none;font-size: x-small;margin: 0;padding: 0;">
			<img class="icon" alt="" src="images/jalios/icons/ok.gif">
		</button>
	</form>
</td>
