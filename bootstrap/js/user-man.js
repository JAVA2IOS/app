// 用户安全管理

$("#toolbar").click(function() {
	var ulDom = $(window.parent.document).find('.breadcrumb');
	BreadMenu.updateBread(ulDom, {
		tag: CodeZ.TAG_USER_ADD,
		href: CodeZ.HTML_PAGE_USER_ADD,
		title: '新增用户',
		actived : true,
	});
	directHref(CodeZ.HTML_PAGE_USER_ADD);
});

function check(){
	addIframe($('#userFrame'),$(event.target).constructor.data.href)
	BreadMenu.updateBread($(event.target).parent().parent(), $(event.target).constructor.data);
}

// 面包屑导航栏
var BreadMenu = {
	addItem: function(data) {
		var item = CodeZComponents.addLi({
			css: 'userNav',
			data: data,
		});
		item.constructor.data = data;

		if(data.actived) {
			item.attr('class', 'active');
			item.html(data.title);
		} else {
			var href = CodeZComponents.addHref({
				css: 'breadItem',
				href : 'javascript:;',
				value: data.title,
			});
			href.attr('onClick', 'check()');
			item.append(href);
		}

		return item;
	},
	/*
	 * {
	 *  tag : '',
	 *  href : '',
	 *  title : ''
	 * }
	 */
	init: function(parentDomId, data) {
		var parentDom = $('#' + parentDomId);
		var breadMenu = $('<ul class="breadcrumb" style="background-color: #FFFFFF; padding-left: 0px;"></ul>');
		data.forEach(function(i, index) {
			var actived = false;
			if(index == parseInt(data.length - 1)) {
				actived = true;
			}
			i.actived = actived;
			breadMenu.append(BreadMenu.addItem(i));
		});

		parentDom.append(breadMenu);
	},

	updateBread: function(ulDom, data) {
		var childs = ulDom.children();
		var existed = false;
		if(childs.length > 1) {
			childs.each(function(args){
				var liDom = $(this);
				var bindData = liDom.constructor.data;
				if(bindData.tag == data.tag) {
					liDom.empty();
					liDom.attr('class', 'active');
					liDom.html(bindData.title);
					existed = true;
					liDom.nextAll().remove();
					return false;
				}
			});
		} else {
			if(childs.constructor.data.tag == data.tag) {
				childs.empty();
				childs.attr('class', 'active');
				childs.html(childs.constructor.data.title);
				existed = true;
				childs.nextAll().remove();
			}
		}

		if(!existed) {
			var lastActiveDom = ulDom.find('.active');
			var text = lastActiveDom.html();
			$(lastActiveDom).removeClass('active');
			lastActiveDom.empty();
			var hrefDom = CodeZComponents.addHref({
				css: 'breadItem',
				value: text,
				href : 'javascript:;',
			})
			hrefDom.attr('onClick', 'check()');
			$(lastActiveDom).append(hrefDom);
			
			ulDom.append(this.addItem(data));
			
		}
	},
}

var UserMan = {
	banObject: function(data) {
		BootstrapDialog.show({
			title: BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_WARNING],
			message: '是否确认注销该用户',
			type: BootstrapDialog.TYPE_PRIMARY,
			cssClass: "login-dialog",
			data: data,
			buttons: [{
				label: '确定',
				action: function(dialog) {
					dialog.close();
					// dialog.getData("df");
				}
			}, {
				label: '取消',
				action: function(dialog) {
					dialog.close();
				}
			}]
		});
		// BootstrapDialog.confirm("确认提示框");
		// BootstrapDialog.warning("警告框");
		// BootstrapDialog.danger("危险框");
		// BootstrapDialog.success("成功框");
	},

	configureUserList: function() {
		var datas = {
			onLoadError : function(data) {
				console.info(data);
			},
			onLoadSuccess : function(data) {
				console.info(data);
			},
			queryParams: function() {
				return {action : 'usrList'};
			},
			uri: '/machineControlSys/service/Routers.php',
			parentDom: $("#table-container"),
			pageSize: 8,
			refresh: function(params) {
				UserMan.configureUserList();
			},
			rowStyle: function(row, index) {
				if(row == undefined){
					return {};
				}
				if(row.status == 1 || row.status == "1") {
					return {
						classes: "success"
					};
				} else {
					return {
						classes: "danger"
					};
				}
				return {};
			},
			column: [{
				field: "id",
				title: "用户ID",
				width: 1000,
			}, {
				field: "account",
				title: "账号",
				width: 1000
			}, {
				field: "userName",
				title: "用户",
				width: 1000
			}, {
				field: "status",
				title: "状态",
				align: "center",
				sortable: true,
				formatter: function(value, row, index) {
					if(value == "1" || value == 1) {
						return "<a href=\"#\" class=\"tooltip-show\" data-toggle=\"tooltip\" title=\"已激活\"><span class= \"fa fa-check fa-fw text-success\"></span></a>";
					} else {
						return "<a href=\"#\" class=\"tooltip-show\" data-toggle=\"tooltip\" title=\"未激活\"><span class= \"fa fa-ban fa-fw text-warning\"></span></a>";
					}
				},
				width: 1000
			}, {
				field: "action",
				title: "操作",
				width: 500,
				formatter: function(value, row, index) {
					if(row.status == "1" || row.status == 1) {
						return "<div class=\"row\">" +
							"<div class=\"col-md-12\">" +
							"<a href=\"#\" class=\"tooltip-show edit\" data-toggle=\"tooltip\" title=\"修改\"><span class=\"fa fa-pencil fa-fw\"></span></a>" +
							"<a href=\"#\" class=\"tooltip-show cancel\" data-toggle=\"tooltip\" title=\"注销\"><span class=\"fa fa-user-times text-danger fa-fw\"></span></a>" +
							"</div></div>";
					}
					return "<div class=\"row\">" +
						"<div class=\"col-md-12\">" +
						"<a href=\"#\" class=\"tooltip-show edit\" data-toggle=\"tooltip\" title=\"修改\"><span class=\"fa fa-pencil fa-fw\"></span></a>" +
						"<a href=\"#\" class=\"tooltip-show activited\" data-toggle=\"tooltip\" title=\"启用\"><span class=\"fa fa-circle-o-notch fa-fw text-success\"></span></a>" +
						"</div></div>";
				},
				events: {
					"click .edit": function(e, value, row, index) {
						console.info("编辑");
					},
					"click .cancel": function(e, value, row, index) {
						UserMan.banObject(row);
					},
					"click .activited": function(e, value, row, index) {
						console.info("启用");
					}
				}
			}],
			datas: [{
				id: 1,
				account: "admin01",
				userName: "12",
				status: "1",
				action: "",
				dep: "部门",
			}, {
				id: 1,
				account: "admin01",
				userName: "dfw",
				status: "0",
				action: "",
				dep: "部门",
			}, {
				id: 1,
				account: "admin01",
				userName: "yahoo",
				status: 0,
				action: "",
				dep: "部门",
			}, {
				id: 1,
				account: "admin01",
				userName: "no",
				status: 1,
				action: ""
			}, {
				id: 1,
				account: "admin01",
				userName: "khzo",
				status: "0",
				action: ""
			}, {
				id: 1,
				account: "admin01",
				userName: "khzo",
				status: "0",
				action: ""
			}, {
				id: 1,
				account: "admin01",
				userName: "khzo",
				status: "0",
				action: ""
			}, {
				id: 1,
				account: "admin01",
				userName: "khzo",
				status: "0",
				action: ""
			}, {
				id: 1,
				account: "admin01",
				userName: "khzo",
				status: "激活",
				action: ""
			}, {
				id: 1,
				account: "admin01",
				userName: "khzo",
				status: "激活",
				action: ""
			}]
		};
		CodeZComponents.tablePlugins(datas.parentDom, datas.uri, datas.queryParams, datas.rowStyle, datas.showSearch, datas.refresh, datas.currentPage, datas.pageSize, datas.showPager, datas.column, datas.datas);
	},
}