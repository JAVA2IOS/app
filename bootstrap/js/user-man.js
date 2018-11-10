// 用户安全管理

$("#toolbar").click(function() {
	directHref(CodeZ.HTML_PAGE_USER_ADD);
});

var UserMan = {

	// 面包屑导航栏
	var BreadMenu = {

			addItem: funciton(data, actived = false) {
				var item = $('<li id="userNav"></li>');

				var href = CodeZComponents.addHref({
					css: 'breadItem',
					value: data.title,
					data: data,
				});
				
				if(actived) {
					href.addClass('active');
				}

				item.append(href);

				return item;
			},
			/*
			 * {
			 * 	tag : '',
			 *  href : '',
			 * 	title : ''
			 * }
			 */
			init: function(parentDomId, data) {
				var parentDom = $('#' + parentDomId);
				var breadMenu = $('<ul class="breadcrumb" style="background-color: #FFFFFF; padding-left: 0px;"></ul>');
				for(int i = 0; i < data.length; i++) {
					parentDom.append(this.addItem(data[i]), i == data.length - 1 ? true : false);
				}
				return parentDom;
			},
			
			updateBread : function(parentDomId, data) {
				
			},
		},

		banObject: function(data) {
			console.info(data);
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
				queryParams: function() {
					return undefined;
				},
				queryParams: undefined,
				uri: undefined,
				parentDom: $("#table-container"),
				pageSize: 8,
				refresh: function(params) {
					UserMan.configureUserList();
				},
				rowStyle: function(row, index) {
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
					width: 1000
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