<%@page import="java.util.Enumeration"%>
<%@page import="java.util.HashSet"%>

<%
	jcmsContext.addCSSHeader("plugins/kDebugTools/css/jtDebug.css");
	jcmsContext.addJSHeader("plugins/kDebugTools/js/jquery-1.4.2.min.js");
	jcmsContext.addJSHeader("plugins/kDebugTools/js/jqueryDebug.js");
	
    String portletTitle = null;
    String baseJspFilePath = null;
    String templateJspFilePath = null;
    String portletType = null;
    final String ATTR_DEBUG_ID = "_jDebug_debugIds";
    final String ATTR_DEBUG_COUNT = "_jDebug_debugCount";
    
    boolean isDebugActive = channel.getProperty("kDebugTools.enable").equals("true") ? true : false;
	

    if (isDebugActive)
    {    
        Category currentCategory = (Category)request.getAttribute(PortalManager.PORTAL_CURRENTCATEGORY);
        Category portalCategory = (Category)request.getAttribute(PortalManager.PORTAL_PORTALCATEGORY);
        Category[] ctxCategories = (Category[])request.getAttribute(PortalManager.PORTAL_CTXCATEGORIES);
        HashSet hDebugIds = null;
				if (request.getAttribute(ATTR_DEBUG_ID) == null)
				{
					hDebugIds = new HashSet();
					request.setAttribute(ATTR_DEBUG_ID, hDebugIds);
    			if(ctxCategories.length > 0)
			    {
						for(int i = 0; i < ctxCategories.length; i++)
						{
							System.out.println("ctx id" + ctxCategories[i]+ "<BR/>");
						}
    			}	
		}
		else
		{
			hDebugIds = (HashSet)request.getAttribute(ATTR_DEBUG_ID);
		}
		
		Integer debugCount;
		if (request.getAttribute(ATTR_DEBUG_COUNT) == null)
		{
			request.setAttribute(ATTR_DEBUG_COUNT, new Integer(0));
			debugCount = 0;
		}
		else
		{
			debugCount = ((Integer)request.getAttribute(ATTR_DEBUG_COUNT)) + 1;
			request.setAttribute(ATTR_DEBUG_COUNT, debugCount);
		}
    
    	PortalElement portalElement = ((PortalElement)request.getAttribute(PortalManager.PORTAL_PORTALELEMENT));
		JcmsJspContext jspCtx = (JcmsJspContext)request.getAttribute("jcmsContext");
		boolean display;
		if(portalElement != null)
		{
			String itemClass = "unkClass";
			String itemTypeLabel = "unkTypeLabel";
			String itemId = "unkId";
			String itemTitle = "unkTitle";
			String itemTemplatePath = "unkTemplatePath";
			
			Channel channel = Channel.getChannel();
			//itemPub : l'element actuel est une publication
			Publication itemPub = (Publication)request.getAttribute("publication");
			display = false;
			if (!hDebugIds.contains(portalElement.getId()) && itemPub == null)
			{
				hDebugIds.add(portalElement.getId());
				display = true;
				itemClass = portalElement.getClass().getSimpleName();
				itemTypeLabel = portalElement.getTypeLabel(channel.getCurrentUserLang());
				itemId = portalElement.getId();
				itemTitle = portalElement.getTitle();
				itemTemplatePath = portalElement.getTemplatePath(jspCtx);
			}
			else if (itemPub != null) //query context
			{
				itemClass = itemPub.getClass().getSimpleName();
				itemTypeLabel = itemPub.getTypeLabel(channel.getCurrentUserLang());
				itemId = itemPub.getId();
				itemTitle = itemPub.getTitle();
				itemTemplatePath = itemPub.getTemplatePath(jspCtx);
				display = true;
			}
			if (display)
			{
				String idD = itemId + debugCount;
				String editLink = channel.getCurrentJcmsContext().getBaseUrl() + "types/" + itemClass + "/edit" + itemClass + ".jsp?id=" + itemId;
				String newLink = "";
				if (itemPub != null)
				{
					newLink = channel.getCurrentJcmsContext().getBaseUrl() + "types/" + itemClass + "/edit" + itemClass + ".jsp?cids=" + currentCategory.getId();
				}
				else
				{
					newLink = channel.getCurrentJcmsContext().getBaseUrl() + "types/" + itemClass + "/edit" + itemClass + ".jsp";
				}

 				out.println(
				"<div id=\"_jtD_MainBoxId" + idD + "\" class=\"_jtD_MainBox\">" + 
					"<div id=\"_jtD_TagTitleId" + idD + "\" class=\"_jtD_TagTitle\">" + itemTypeLabel +"</div>" +
		
					"<div id=\"_jtD_TagButtonEditId" + idD + "\" class=\"_jtD_TagButtonEdit _jtD_TagButton _jtD_Button\"><a href=\"" + editLink + "\" ></a>E</div>" +
					"<div id=\"_jtD_TagButtonNewId" + idD + "\" class=\"_jtD_TagButtonNew _jtD_TagButton _jtD_Button\"><a href=\"" + newLink + "\" ></a>N</div>" +
					
					"<div id =\"_jtD_DetailBoxId" + idD + "\" class=\"_jtD_DetailBox\">" +
						"<div class=\"_jtD_DetailBoxHeader\">" +
							"<div class=\"_jtD_DetailBoxCloseButton _jtD_DetailBoxButton _jtD_Button\" id =\"_jtD_DetailBoxCloseButtonId" + idD + "\">X</div>" +
							"<div class=\"_jtD_DetailBoxEditButton _jtD_DetailBoxButton _jtD_Button\" id =\"_jtD_DetailBoxEditButtonId" + idD + "\"><a href=\"" + editLink + "\" ></a>edit</div>" +
							"<div class=\"_jtD_DetailBoxNewButton _jtD_DetailBoxButton _jtD_Button\" id =\"_jtD_DetailBoxNewButtonId" + idD + "\"><a href=\"" + newLink + "\" ></a>new</div>" +
							"<div class=\"_jtD_DetailBoxHeaderLabel\">" + itemTypeLabel + "</div></div>" + 
						
						"<table>" + 
							"<tr><td>class</td><td>: " + itemClass + "</td><td>cat id</td><td>: " + currentCategory.getId() + "</td></tr>" + 
							"<tr><td>id</td><td>: " + itemId + "</td><td>cat name</td><td>: " + currentCategory.getName() + "</td></tr>" + 
							"<tr><td>title</td><td>: " + itemTitle + "</td><td>portal cat id</td><td>: " + portalCategory.getId() + "</td></tr>" + 
							"<tr><td>template</td><td>: " + itemTemplatePath + "</td><td>portal cat name</td><td>: " + portalCategory.getName() + "</td></tr>" + 
						"</table>" + 
						
						"</div></div><div style=\"clear:both;\"></div>");
			}
		}
    }
%>