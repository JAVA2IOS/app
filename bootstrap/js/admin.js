$("#userMan").click(function() {
	directRoutersToUserList();
});

// 跳转到表格列表
function directRoutersToUserList() {
	var obj = $("#contentFrame");
	obj.attr('src', 'tableList.html');
}

var CodeZComponents = {

	addUl : function() {
		return "fdf";
	},
	// 导航列表
	sideBar: function(divDomId) {
		var domObj = $(divDomId);
		domObj.prepend("<div class=\"col-lg-3 col-md-3\"><ul id=\"main-nav\" class=\"nav nav-default nav-stacked\"><li><a href=\"#softparameters\" class=\"nav-header collapsed\" data-toggle=\"collapse\"><span class=\"fa fa-dashboard fa-w\"></span>&nbsp;软件参数<span class=\"pull-right fa fa-chevron-right fa-w\"></span></a><ul id=\"softparameters\" class=\"nav nav-list collapse secondmenu\" style=\"height: 0px;\"><li><a href=\"#\"><i class=\"fa fa-cogs fa-w\"></i>&nbsp;控制配置</a></li><li><a href=\"#\"><i class=\"fa fa-database fa-w\"></i>&nbsp;数据库连接</a></li></ul></li><li class=\"nav-divider\" style=\"margin-top: 0px; margin-bottom: 0px;\"></li><li style=\"margin-top: 0px; margin-bottom: 0px;\"><a href=\"#machineMan\" class=\"nav-header collapsed\" data-toggle=\"collapse\"><i class=\"fa fa-asterisk fa-w\"></i>&nbsp;压铸机管理<span class=\"pull-right fa fa-chevron-right fa-w\"></span></a><ul id=\"machineMan\" class=\"nav nav-list collapse secondmenu\" style=\"height: 0px;\"><li><a href=\"#\"><i class=\"fa fa-microchip fa-w\"></i>&nbsp;控制传感器</a></li><li><a href=\"#\"><i class=\"fa fa-magnet fa-w\"></i>&nbsp;自动压铸机</a></li><li><a href=\"#\"><i class=\"fa fa-cubes fa-w\"></i>&nbsp;压铸计数器</a></li></ul></li><li class=\"nav-divider\"style=\"margin-top: 0px; margin-bottom: 0px;\"></li><li style=\"margin-top: 0px; margin-bottom: 0px;\"><a href=\"#\"><i class=\"fa fa-wrench fa-w\"></i>&nbsp;控制参数</a></li><li class=\"nav-divider\"style=\"margin-top: 0px; margin-bottom: 0px;\"></li><li style=\"margin-top: 0px; margin-bottom: 0px;\"><a href=\"#\"><i class=\"glyphicon glyphicon-globe\"></i>&nbsp;压铸机智能化控制</a></li><li class=\"nav-divider\"style=\"margin-top: 0px; margin-bottom: 0px;\"></li><li style=\"margin-top: 0px; margin-bottom: 0px;\"><a href=\"#\"><i class=\"fa fa-support fa-w\"></i>&nbsp;控制数据</a></li><li class=\"nav-divider\"style=\"margin-top: 0px; margin-bottom: 0px;\"></li><li style=\"margin-top: 0px; margin-bottom: 0px;\"><a href=\"#userMan\" class=\"nav-header collapsed\"data-toggle=\"collapse\"><i class=\"fa fa-address-book-o fa-w\"></i>&nbsp;安全管理<spanclass=\"pull-right fa fa-chevron-right fa-w\"></span></a><ul id=\"userMan\"class=\"nav nav-list collapse secondmenu\"style=\"height: 0px;\"><li><a href=\"#\"><i class=\"fa fa-users fa-w\"></i>&nbsp;用户管理</a></li><li><a href=\"#\"><i class=\"fa fa-key fa-w\"></i>&nbsp;权限管理</a></li></ul></li></ul></div>");
	}
}