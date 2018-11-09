// 参数管理
var CodeZ = {
	// 导航栏标签
	NAV_SOFTPARAMETER: {
		CONTROL_CFG: "nav_ctrlCfg",
		DATABASE_CONNECT: "nav_databaseConnect"
	},
	NAV_MACHINEMAN: {
		SENSOR: "nav_ctrlSensor",
		MACHINE: "nav_machine",
		COUNTER: "nav_tag_counter"
	},
	NAV_CONTROLPARAMETER: "nav_control_parameter",
	NAV_AUTO_CONTROL: "nav_auto_control",
	NAV_CONTROL_DATA: "nav_control_data",
	NAV_SECURITY_MAN: {
		USERMAN: "nav_usr_man",
		ROLEMAN: "nav_role_man"
	},

	// 导航栏地址
	URI_SOFTPARAMETER: {
		CONTROL_CFG: "controlCfg.html",
		DATABASE_CONNECT: "#"
	},
	URI_MACHINEMAN: {
		SENSOR: "#",
		MACHINE: "#",
		COUNTER: "#"
	},
	URI_CONTROLPARAMETER: "#",
	URI_AUTO_CONTROL: "#",
	URI_CONTROL_DATA: "#",
	URI_SECURITY_MAN: {
		USERMAN: "tableList.html",
		ROLEMAN: "#"
	},
}

// 导航栏跳转
function navSrc(tag) {
	switch(tag) {
		case CodeZ.NAV_SOFTPARAMETER.CONTROL_CFG:
			directRoutersUri(CodeZ.URI_SOFTPARAMETER.CONTROL_CFG);
			break;
		case CodeZ.NAV_SOFTPARAMETER.DATABASE_CONNECT:
			directRoutersUri(CodeZ.URI_SOFTPARAMETER.DATABASE_CONNECT);
			break;
		case CodeZ.NAV_MACHINEMAN.SENSOR:
			directRoutersUri(CodeZ.URI_MACHINEMAN.SENSOR);
			break;
		case CodeZ.NAV_MACHINEMAN.MACHINE:
			directRoutersUri(CodeZ.URI_MACHINEMAN.MACHINE);
			break;
		case CodeZ.NAV_MACHINEMAN.COUNTER:
			directRoutersUri(CodeZ.URI_MACHINEMAN.COUNTER);
			break;
		case CodeZ.NAV_CONTROLPARAMETER:
			directRoutersUri(CodeZ.URI_CONTROLPARAMETER);
			break;
		case CodeZ.NAV_AUTO_CONTROL:
			directRoutersUri(CodeZ.URI_AUTO_CONTROL);
			break;
		case CodeZ.NAV_CONTROL_DATA:
			directRoutersUri(CodeZ.URI_CONTROL_DATA);
			break;
		case CodeZ.NAV_SECURITY_MAN.USERMAN:
			directRoutersUri(CodeZ.URI_SECURITY_MAN.USERMAN);
			break;
		case CodeZ.NAV_SECURITY_MAN.USERMAN:
			directRoutersUri(CodeZ.URI_SECURITY_MAN.USERMAN);
			break;
		default:
			break;
	}
}

// 跳转到表格列表
function directRoutersUri(uri) {
	var obj = $("#contentFrame");
	obj.attr('src', uri);
}


/*
* css配置
*/
var CodeZComponents = {
	// 请求服务
	postRequest : function(uri, parameters, callback) {
		$.ajax({
			url: uri,
			data: parameters,
			success: function(result) {
				if(callback != undefined) {
					callback(result);
				}
			}
		});
	},

	configureListener :function(fn) {
		if(fn != undefined) {
			fn();
		}
	},

	// 配置css样式
	configureDecoration: function(domObj, data) {
		if(data == undefined) {
			return;
		}
		if(data.css != undefined) {
			domObj.attr("class", data.css);
		}

		if(data.style != undefined) {
			domObj.attr("style", data.style);
		}

		if(data.name != undefined) {
			domObj.attr("name", data.name);
		}

		if(data.data != undefined) {
			domObj.data("bindData", data.data);
		}

		if(data.collapse != undefined) {
			if(data.collapse) {
				domObj.attr("data-toggle", "collapse");
			}
		}
	},

	// 配置Html元素
	/*
		id : '',
		value : '',
		css : '',
		style : '',
		data : '绑定数据',
		name : '元素name属性名',
		collapse : true/false,
		html : '' e.g div, ul, li, a
	*/
	addHtmlDom: function(data, fn) {
		if(data != undefined) {
			if(data.html == undefined) {
				return;
			}
			var htmlDomCode = "<" + data.html + "></" + data.html + ">";

			var htmlDomObj = $(htmlDomCode);

			if(data.id != undefined) {
				htmlDomObj.attr("id", data.id);
			}

			if(data.value != undefined) {
				htmlDomObj.prepend(data.value);
			}

			this.configureDecoration(htmlDomObj, data);

			if(fn != undefined) {
				htmlDomObj.append(fn());
			}

			return htmlDomObj;
		}
	},

	// 添加div
	/*
	{
		id : '',
		value : '',
		css : '',
		style : ''
	}
	*/
	addDiv: function(data, fn) {
		var divDom = $("<div></div>");
		if(data == undefined) {
			return divDom;
		}
		if(data.id != undefined) {
			divDom.attr("id", data.id);
		}

		if(data.value != undefined) {
			divDom.prepend(data.value);
		}

		this.configureDecoration(divDom, data);

		if(fn != undefined) {
			divDom.append(fn());
		}

		return divDom;
	},

	// 添加ul
	addUl: function(data, fn) {
		var ulDom = $("<ul></ul>");
		if(data == undefined) {
			return ulDom;
		}
		if(data.id != undefined) {
			ulDom.attr("id", data.id);
		}

		if(data.value != undefined) {
			ulDom.prepend(data.value);
		}

		this.configureDecoration(ulDom, data);

		if(fn != undefined) {
			ulDom.append(fn());
		}

		return ulDom;
	},

	// 添加li
	addLi: function(data, fn) {
		var liDom = $("<li></li>");
		if(data == undefined) {
			return liDom;
		}
		if(data.id != undefined) {
			liDom.attr("id", data.id);
		}

		if(data.value != undefined) {
			liDom.prepend(data.value);
		}

		this.configureDecoration(liDom, data);

		if(fn != undefined) {
			liDom.append(fn());
		}

		return liDom;
	},

	addHref: function(data, fn) {
		var hrefDom = $("<a></a>");
		if(data != undefined) {
			if(data.id != undefined) {
				hrefDom.attr("id", data.id);
			}

			if(data.href != undefined && data.href.length != 0) {
				hrefDom.attr("href", data.href);
			} else {
				hrefDom.attr("href", "#");
			}

			if(data.value != undefined) {
				hrefDom.prepend(data.value);
			}

			this.configureDecoration(hrefDom, data);

			if(fn != undefined) {
				hrefDom.append(fn());
			}
		}

		return hrefDom;
	},

	addSpan: function(data, fn) {
		var spanDom = $("<span></span>");
		if(data == undefined) {
			return spanDom;
		}
		if(data.id != undefined) {
			spanDom.attr("id", data.id);
		}

		if(data.css != undefined) {
			spanDom.attr("class", data.css);
		}

		this.configureDecoration(spanDom, data);

		if(fn != undefined) {
			spanDom.append(fn());
		}

		return spanDom;
	},

	getChildDom: function(domObj, dataArray) {
		if(dataArray.length != 0) {
			for(var i = 0; i < dataArray.length; i++) {
				var dataObj = dataArray[i];
				var node = dataObj.node;
				var child = dataObj.child;
				var liObj;
				if(node != undefined) {
					if(child != undefined && child.length != 0) {
						liObj = this.addLi({
							style: 'margin-top: 0px; margin-bottom: 0px;'
						});

						var hrefObj = this.addHref({
							href: '#' + node.href,
							css: 'nav-header collapsed',
							style : 'padding-right:0px;',
							collapse: true,
							value: " &nbsp;" + node.text,
							name: "toggled",
						});

						var iconObj = this.addSpan({
							css: node.iconCss
						});

						hrefObj.prepend(iconObj);

						var arrowObj = this.addSpan({
							css: 'pull-right fa fa-chevron-right fa-w'
						});

						hrefObj.append(arrowObj);

						liObj.append(hrefObj);

						var ulObj = this.addUl({
							id: node.href,
							css: 'nav nav-list collapse secondmenu',
							style: 'height: 0px;'
						});

						this.getChildDom(ulObj, child);

						liObj.append(ulObj);

					} else {
						liObj = this.addLi({
							style: 'margin-top: 0px; margin-bottom: 0px;'
						});

						var hrefObj = this.addHref({
							value: " &nbsp;" + node.text,
							name: "navTitle",
							data: node.target
						});

						var iconObj = this.addSpan({
							css: node.iconCss
						});

						hrefObj.prepend(iconObj);

						liObj.append(hrefObj);
					}
				}
				domObj.append(liObj);
			}
		}

		return domObj;
	},

	// 导航列表
	/*
	data
	 [
	 	{
			'node' : {
				text : '',
				collapse : true/false,

			},
			'child' : [
				{
					'title' : '',
					'child' : []
				}
			]
	 	},
	 	...
	 ]
	*/
	sideBar: function(divDomId, data) {
		var navTabs = {
			"node": {
				"css": "nav navbar-pills nav-stacked"
			},
			"child": [{
					"node": {
						"id": "",
						"href": "softparameters",
						"text": "软件参数",
						"iconCss": "fa fa-dashboard fa-fw"
					},
					"child": [{
							"node": {
								"text": "控制配置",
								"iconCss": "fa fa-cogs fa-fw",
								"target": CodeZ.NAV_SOFTPARAMETER.CONTROL_CFG
							}
						},
						{
							"node": {
								"text": "数据库连接",
								"iconCss": "fa fa-database fa-fw",
								"target": CodeZ.NAV_SOFTPARAMETER.DATABASE_CONNECT
							}
						}
					]
				},
				{
					"node": {
						"id": "",
						"href": "machineMan",
						"text": "压铸机管理",
						"iconCss": "fa fa-asterisk fa-fw"
					},
					"child": [{
							"node": {
								"text": "控制传感器",
								"iconCss": "fa fa-microchip fa-fw",
								"target": CodeZ.NAV_MACHINEMAN.SENSOR
							}
						},
						{
							"node": {
								"text": "自动压铸机",
								"iconCss": "fa fa-magnet fa-fw",
								"target": CodeZ.NAV_MACHINEMAN.MACHINE
							}
						},
						{
							"node": {
								"text": "压铸计数器",
								"iconCss": "fa fa-cubes fa-fw",
								"target": CodeZ.NAV_MACHINEMAN.COUNTER
							}
						}
					]
				},
				{
					"node": {
						"text": "控制参数",
						"iconCss": "fa fa-wrench fa-fw",
						"target": CodeZ.NAV_CONTROLPARAMETER
					}
				},
				{
					"node": {
						"text": "压铸机智能化控制",
						"iconCss": "fa fa-sitemap fa-fw",
						"target": CodeZ.NAV_AUTO_CONTROL
					}
				},
				{
					"node": {
						"text": "控制数据",
						"iconCss": "fa fa-support fa-fw",
						"target": CodeZ.NAV_CONTROL_DATA
					}
				},
				{
					"node": {
						"id": "",
						"href": "securityMan",
						"text": "安全管理",
						"iconCss": "fa fa-address-book-o fa-fw"
					},
					"child": [{
							"node": {
								"text": "用户管理",
								"iconCss": "fa fa-users fa-fw",
								"target": CodeZ.NAV_SECURITY_MAN.USERMAN
							}
						},
						{
							"node": {
								"text": "权限管理",
								"iconCss": "fa fa-key fa-fw",
								"target": CodeZ.NAV_SECURITY_MAN.ROLEMAN
							}
						}
					]
				}
			]
		};

		var domObj = $(divDomId);

		var divObj = this.addDiv();

		var ulObj = this.addUl({
			id: 'main-nav',
			css: navTabs.node.css
		});

		this.getChildDom(ulObj, navTabs.child);

		divObj.prepend(ulObj);

		domObj.prepend(divObj);

		// 添加监听事件
		this.configureListener(function() {
			$("a[name='navTitle']").on("click", function() {
				navSrc($(this).data("bindData"));
				$(".active").removeClass("active");
				$(this).parent().attr("class", "active");
			});

			$("a[name='toggled']").on("click", function() {
				var spanDom = $(this).children("span:last-child");

				if(spanDom.attr("class") == "pull-right fa fa-chevron-right fa-w") {
					spanDom.attr("class", "pull-right fa fa-chevron-down fa-w");
				} else {
					spanDom.attr("class", "pull-right fa fa-chevron-right fa-w");
				}
			});
		});
	},

	// 表格数据
	/*
		{
			header : ["titleOne", "titleTwo"],
			tbody : [{}],
			action : ["edit", "add", "delete"]
		}
	*/
	table: function(parentDom, data) {
		// table
		var tableDom = this.addHtmlDom({
			css: "table table-hover table-striped",
			html: "table",
			data: "dfdf",
			id: "tableOne"
		});

		// header
		var headerDom = this.addHtmlDom({
			html: "thead"
		});
		var headerTrDom = this.addHtmlDom({
			html: "tr"
		});
		headerDom.append(headerTrDom);

		for(var i = 0; i < 4; i++) {
			var thDom = this.addHtmlDom({
				html: "th",
				value: "第" + i + "标题"
			});

			headerTrDom.append(thDom);
		}

		tableDom.append(headerDom);

		// content
		var tbodyDom = this.addHtmlDom({
			html: "tbody"
		});

		// tr
		for(var i = 0; i < 8; i++) {
			var trDom = this.addHtmlDom({
				html: "tr"
			});

			for(var j = 0; j < 4; j++) {
				var tdDom = this.addHtmlDom({
					html: "td",
					value: "第" + j + "个"
				});

				trDom.append(tdDom);
			}
			tbodyDom.append(trDom);
		}

		tableDom.append(tbodyDom);

		parentDom.append(tableDom);
	},

	/*
		[{
			totalPage : 8
			totalCount : 8,
			currentIndex : 0,
			perCount : 10
		}
		]
	*/
	footerPager: function(parentDom, data) {
		var domName = "pagerCounter";
		var numberPage = data.totalPage;
		var currentIndex = data.currentIndex;
		var perCount = data.perCount;
		var totalCount = data.totalCount;

		var pageObj = this.addUl({
			css: "pagination pull-right",
			style: "margin-right : 50px;"
		});
		parentDom.append(pageObj);

		var lastPage = this.addLi();

		var hrefDom = this.addHref({
			value: "&laquo;"
		});
		lastPage.append(hrefDom);

		pageObj.append(lastPage);

		for(var i = 0; i < numberPage; i++) {
			var currentCount = (currentIndex + 1) * perCount >= totalCount ? totalCount - (currentIndex + 0) * perCount : perCount;
			var data = {
				name: domName,
				value: i + 1,
				data: {
					"count": currentCount
				}
			};
			var indexPage;
			if(currentIndex == i) {
				indexPage = this.addLi({
					css: "active"
				});
			} else {
				indexPage = this.addLi();
			}

			var indexHref = this.addHref(data);
			indexPage.append(indexHref);

			pageObj.append(indexPage);
		}

		var nextPage = this.addLi();

		var hrefDom = this.addHref({
			value: "&raquo;"
		});
		nextPage.append(hrefDom);

		pageObj.append(nextPage);

		parentDom.append(pageObj);

		this.configureListener(function() {
			var domHtm = "a[name='" + domName + "']";
			$(domHtm).on("click", function() {
				console.info($(this).data("bindData"));
				$(".active").removeClass("active");
				$(this).parent().attr("class", "active");
			});
		});
	},

	// 表格 + 分页
	/*
		{
			url : "request url",
			parameters : {}, 请求参数
			totalCount : 总条数,
			perCount : 每页的个数,
			data : 所有数据,
			pages : 总共几页,
			currentPage : 当前页数
		}
	*/
	tableComponents: function(data, callback) {
		// 数据源配置
		var DataSource = function() {}
		// 数据源获取
		if(data == undefined) {
			return;
		}
		if(data.url == undefined) {
			return;
		}
		postRequest(data.url, data, function(result) {

			DataSource.data = result;
			if(callback) {
				callback(result);
			}
		});

		DataSource.currentPage = 0;
		DataSource.data = [{
			"data": "title"
		}];
		DataSource.perCount = 10;
		DataSource.pages = Math.ceil(DataSource.data.length / DataSource.perCount);
		DataSource.totalCount = DataSource.data.length;
	},

	// 表格插件
	tablePlugins: function(parentDom, uri = undefined, queryParams = undefined, rowStyle = undefined, showSearch = true, refresh = undefined, currentPage = 1, pageSize = 10, showPager = true, column = [], datas = []) {

		/*
        method: 'get',
        url: undefined,
        ajax: undefined,
        cache: true,
        contentType: 'application/json',
        dataType: 'json',
        ajaxOptions: {},
        queryParams: function (params) {
            return params;
        },
        queryParamsType: 'limit', // undefined
        responseHandler: function (res) {
            return res;
        }
		*/
	  	if (parentDom == undefined) {
		    return;
	  	}
		parentDom.bootstrapTable({
			cache: true,
			classes: 'table table-hover table-striped',
			columns : column,
			data : datas,
			iconsPrefix: "fa",
			icons : {
				refresh : "fa-refresh fa-fw",
				paginationSwitchDown : "fa-caret-down fa-fw",
				paginationSwitchUp : "fa-caret-up fa-fw"
			},
			method: 'post',
			url: uri,
			rowStyle : function(row, index) {
				return rowStyle(row, index);
			},
			search: showSearch,
			showRefresh: true,
			sidePagination: "client",
			striped: true,
			toolbar: "#toolbar",
			onRefresh: function (params) {
				parentDom.bootstrapTable("destroy");
				refresh(params);
				return true;
			},
			pageNumber: currentPage,
			pageSize: pageSize,
			pagination: showPager,
			paginationLoop: false,
			paginationPreText: "<span class=\"glyphicon glyphicon-chevron-left\"></span>",
			paginationNextText: '<span class=\"glyphicon glyphicon-chevron-right\"></span>',
			queryParams : queryParams,
		});
	},

	/* ========================================================================
	 * 通知插件封装, notifications
	 * ======================================================================== */

	notifications: function(title, text, icon, type = 'info', delay = 1000 * 2) {
		PNotify.alert({
			type: type,
			title: title,
			styling: "bootstrap4",
			icons: "fontawesome4",
			icon: icon,
			text: text,
			delay: delay,
		});
	},

	showSuccessTip: function(
		data
	) {
		this.notifications(data.title, data.text, "fa fa-check-circle fa-fw", "success", data.delay);
	},

	showNoticeTip: function(data) {
		this.notifications(data.title, data.text, "fa fa-exclamation-circle fa-fw", "notice", data.delay);
	},

	showInfoTip: function(data) {
		this.notifications(data.title, data.text, "fa fa-info-circle fa-fw", "info", data.delay);
	},

	showErrorTip: function(data) {
		this.notifications(data.title, data.text, "fa fa-frown-o fa-fw ", "error", data.delay);
	},

	showConfirmTip: function(data) {
		this.notifications(data.title, data.text, data.icon, data.type, data.delay);
	}
}