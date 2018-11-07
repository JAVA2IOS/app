$("#userMan").click(function() {
	directRoutersToUserList();
});

// 请求服务
function postRequest(uri, parameters, callback) {
	$.ajax({url : uri, data : parameters, success : function(result){
		if (callback !=undefined) {
			callback(result);
		}
	}});
}


function configureListener(fn) {
	if (fn != undefined) {
		fn();
	}
}

// 跳转到表格列表
function directRoutersToUserList() {
	var obj = $("#contentFrame");
	obj.attr('src', 'tableList.html');
}

var CodeZComponents = {

	// 配置css样式
	configureDecoration : function(domObj, data) {
		if (data == undefined) {
			return;
		}
		if (data.css != undefined) {
			domObj.attr("class", data.css);
		}

		if (data.style != undefined) {
			domObj.attr("style", data.style);
		}

		if (data.name != undefined) {
			domObj.attr("name", data.name);
		}

		if (data.data != undefined) {
			domObj.data("bindData", data.data);
		}

		if (data.collapse != undefined) {
			if (data.collapse) {
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
	addHtmlDom : function(data, fn) {
		if (data != undefined) {
			if (data.html == undefined) {
				return;
			}
			var htmlDomCode = "<" + data.html + "></" + data.html + ">";

			var htmlDomObj = $(htmlDomCode);

			if (data.id != undefined) {
				htmlDomObj.attr("id", data.id);
			}

			if (data.value != undefined) {
				htmlDomObj.prepend(data.value);
			}

			this.configureDecoration(htmlDomObj, data);

			if (fn != undefined) {
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
	addDiv : function (data, fn) {
		var divDom = $("<div></div>");
		if (data == undefined) {
			return divDom;
		}
		if (data.id != undefined) {
			divDom.attr("id", data.id);
		}

		if (data.value != undefined) {
			divDom.prepend(data.value);
		}

		this.configureDecoration(divDom, data);

		if (fn != undefined) {
			divDom.append(fn());
		}

		return divDom;
	},

	// 添加ul
	addUl : function(data, fn) {
		var ulDom = $("<ul></ul>");
		if (data == undefined) {
			return ulDom;
		}
		if (data.id != undefined) {
			ulDom.attr("id", data.id);
		}

		if (data.value != undefined) {
			ulDom.prepend(data.value);
		}

		this.configureDecoration(ulDom, data);

		if (fn != undefined) {
			ulDom.append(fn());
		}

		return ulDom;
	},

	// 添加li
	addLi : function(data, fn) {
		var liDom = $("<li></li>");
		if (data == undefined) {
			return liDom;
		}
		if (data.id != undefined) {
			liDom.attr("id", data.id);
		}

		if (data.value != undefined) {
			liDom.prepend(data.value);
		}

		this.configureDecoration(liDom, data);

		if (fn != undefined) {
			liDom.append(fn());
		}

		return liDom;
	},

	addHref : function(data, fn) {
		var hrefDom = $("<a></a>");
		if (data != undefined) {
			if (data.id != undefined) {
				hrefDom.attr("id", data.id);
			}

			if (data.href != undefined && data.href.length != 0) {
				hrefDom.attr("href", data.href);
			}else {
				hrefDom.attr("href", "#");
			}

			if (data.value != undefined) {
				hrefDom.prepend(data.value);
			}

			this.configureDecoration(hrefDom, data);

			if (fn != undefined) {
				hrefDom.append(fn());
			}
		}

		return hrefDom;
	},

	addSpan : function(data, fn) {
		var spanDom = $("<span></span>");
		if (data == undefined) {
			return spanDom;
		}
		if (data.id != undefined) {
			spanDom.attr("id", data.id);
		}

		if (data.css != undefined) {
			spanDom.attr( "class", data.css);
		}

		this.configureDecoration(spanDom, data);

		if (fn != undefined) {
			spanDom.append(fn());
		}

		return spanDom;
	},


	getChildDom : function(domObj, dataArray) {
		if (dataArray.length != 0) {
			for (var i = 0; i < dataArray.length; i++) {
				var dataObj = dataArray[i];
				var node = dataObj.node;
				var child = dataObj.child;
				var liObj;
				if (node != undefined) {
					if (child != undefined && child.length != 0) {
						liObj = this.addLi({
							style : 'margin-top: 0px; margin-bottom: 0px;'
						});

						var hrefObj = this.addHref({
							href : '#' + node.href,
							css : 'nav-header collapsed',
							collapse : true,
							value : " &nbsp;" + node.text,
							name : "toggled",
						});

						var iconObj = this.addSpan({
							css : node.iconCss
						});

						hrefObj.prepend(iconObj);


						var arrowObj = this.addSpan({
							css : 'pull-right fa fa-chevron-right fa-w'
						});

						hrefObj.append(arrowObj);

						liObj.append(hrefObj);

						var ulObj = this.addUl({
							id : node.href,
							css : 'nav nav-list collapse secondmenu',
							style : 'height: 0px;'
						});

						this.getChildDom(ulObj,child);

						liObj.append(ulObj);

					}else {
						liObj = this.addLi({
							style : 'margin-top: 0px; margin-bottom: 0px;'
						});

						var hrefObj = this.addHref({
							value : " &nbsp;" + node.text,
							name : "navTitle",
							data :  node.target
						});

						var iconObj = this.addSpan({
							css : node.iconCss
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
								"target" : "cfg"
							}
						},
						{
							"node": {
								"text": "数据库连接",
								"iconCss": "fa fa-database fa-fw",
								"target" : "dbConnect"
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
								"target" : "sensor"
							}
						},
						{
							"node": {
								"text": "自动压铸机",
								"iconCss": "fa fa-magnet fa-fw",
								"target" : "autoMan"
							}
						},
						{
							"node": {
								"text": "压铸计数器",
								"iconCss": "fa fa-cubes fa-fw",
								"target" : "counter"
							}
						}
					]
				},
				{
					"node": {
						"text": "控制参数",
						"iconCss": "fa fa-wrench fa-fw",
						"target" : "controlParameters"
					}
				},
				{
					"node": {
						"text": "压铸机智能化控制",
						"iconCss": "fa fa-sitemap fa-fw",
						"target" : "machineMan"
					}
				},
				{
					"node": {
						"text": "控制数据",
						"iconCss": "fa fa-support fa-fw",
						"target" : "dataMan"
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
								"target" : "userMan"
							}
						},
						{
							"node": {
								"text": "权限管理",
								"iconCss": "fa fa-key fa-fw",
								"target" : "roleMan"
							}
						}
					]
				}
			]
		};	


		var domObj = $(divDomId);

		var divObj = this.addDiv({
			css : "col-lg-3 col-md-3"
		});

		var ulObj = this.addUl({
			id : 'main-nav',
			css : navTabs.node.css
		});

		this.getChildDom(ulObj, navTabs.child);
		
		divObj.prepend(ulObj);

		domObj.prepend(divObj);

		// 添加监听事件
		configureListener(function() {
			$("a[name='navTitle']").on("click", function(){
				console.info($(this).data("bindData"));
				$(".active").removeClass("active");
				$(this).parent().attr("class", "active");
			});

			$("a[name='toggled']").on("click", function() {
				var spanDom = $(this).children("span:last-child");

				if (spanDom.attr("class") == "pull-right fa fa-chevron-right fa-w") {
					spanDom.attr("class", "pull-right fa fa-chevron-down fa-w");
				}else {
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
	table : function(parentDom, data) {
		// table
		var tableDom = this.addHtmlDom({
			css : "table table-hover table-striped",
			html : "table",
			data : "dfdf",
			id : "tableOne"
		});

		// header
		var headerDom = this.addHtmlDom({
			html : "thead"
		});
		var headerTrDom = this.addHtmlDom({
			html : "tr"
		});
		headerDom.append(headerTrDom);

		for (var i = 0; i < 4; i++) {
			var thDom = this.addHtmlDom({
				html : "th",
				value : "第" + i + "标题"
			});

			headerTrDom.append(thDom);
		}

		tableDom.append(headerDom);

		// content
		var tbodyDom = this.addHtmlDom({
			html : "tbody"
		});

		// tr
		for (var i = 0; i < 8; i++) {
			var trDom = this.addHtmlDom({
				html : "tr"
			});

			for (var j = 0; j < 4; j++) {
				var tdDom = this.addHtmlDom({
					html : "td",
					value : "第" + j + "个"
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
	footerPager : function(parentDom, data) {
		var domName = "pagerCounter";
		var numberPage = data.totalPage;
		var currentIndex = data.currentIndex;
		var perCount = data.perCount;
		var totalCount = data.totalCount;

		var pageObj = this.addUl({
			css : "pagination pull-right",
			style : "margin-right : 50px;"
		});
		parentDom.append(pageObj);

		var lastPage = this.addLi();

		var hrefDom = this.addHref({
			value : "&laquo;"
		});
		lastPage.append(hrefDom);

		pageObj.append(lastPage);

		for (var i = 0; i < numberPage; i++) {
			var currentCount = (currentIndex + 1) * perCount >= totalCount ? totalCount - (currentIndex + 0) * perCount : perCount;
			var data = {name : domName, value : i + 1, data : {"count" : currentCount}};
			var indexPage;
			if (currentIndex == i) {
				indexPage = this.addLi({
						css : "active"
				});
			}else {
				indexPage = this.addLi();
			}

			var indexHref = this.addHref(data);
			indexPage.append(indexHref);

			pageObj.append(indexPage);
		}	

		var nextPage = this.addLi();

		var hrefDom = this.addHref({
			value : "&raquo;"
		});
		nextPage.append(hrefDom);

		pageObj.append(nextPage);

		parentDom.append(pageObj);

		configureListener(function() {
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
	tableComponents : function(data, callback){
		// 数据源配置
		var DataSource = function() {
		}
		// 数据源获取
		if (data == undefined) { return; }
		if (data.url == undefined) { return; }
		postRequest(data.url, data, function(result) {

			DataSource.data = result;
			if (callback) {callback(result);}
		});

		DataSource.currentPage = 0;
		DataSource.data = [{"data" : "title"}];
		DataSource.perCount = 10;
		DataSource.pages = Math.ceil(DataSource.data.length / DataSource.perCount);
		DataSource.totalCount = DataSource.data.length;
	},

	// 表格插件
	tablePlugins : function(parentDom) {

		/*
		classes: 'table table-hover',
        sortClass: undefined,
        locale: undefined,
        height: undefined,
        undefinedText: '-',
        sortName: undefined,
        sortOrder: 'asc',
        sortStable: false,
        rememberOrder: false,
        striped: false,
        columns: [[]],
        data: [],
        totalField: 'total',
        dataField: 'rows',
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
        },
        pagination: false,
        onlyInfoPagination: false,
        paginationLoop: true,
        sidePagination: 'client', // client or server
        totalRows: 0, // server side need to set
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        paginationHAlign: 'right', //right, left
        paginationVAlign: 'bottom', //bottom, top, both
        paginationDetailHAlign: 'left', //right, left
        paginationPreText: '&lsaquo;',
        paginationNextText: '&rsaquo;',
        search: false,
        searchOnEnterKey: false,
        strictSearch: false,
        searchAlign: 'right',
        selectItemName: 'btSelectItem',
        showHeader: true,
        showFooter: false,
        showColumns: false,
        showPaginationSwitch: false,
        showRefresh: false,
        showToggle: false,
        showFullscreen: false,
        smartDisplay: true,
        escape: false,
        minimumCountColumns: 1,
        idField: undefined,
        uniqueId: undefined,
        cardView: false,
        detailView: false,
		*/
		parentDom.bootstrapTable({
			cache: true,
			classes: 'table table-hover table-striped',
			rowStyle : function(row, index) {
				if (row.status == 1 || row.status == "1") {
					return {classes : "success"};
				}else {
					return {classes : "danger"};
				}
				// return {};
			},
			search: true,
			searchOnEnterKey: true,
			sidePagination : "client",
			striped: true,
			toolbar : "#toolbar",
			pageNumber : 1,
			pageSize : 5,
			pagination: true,
			paginationLoop: false,
			paginationPreText: "<span class=\"glyphicon glyphicon-chevron-left\"></span>",
			paginationNextText: '<span class=\"glyphicon glyphicon-chevron-right\"></span>',
			columns : [{
				field : "id",
				title : "用户ID",
				width : 1000
			},{
				field : "account",
				title : "账号",
				width : 1000
			},{
				field : "userName",
				title : "用户",
				width : 1000
			},{
				field : "status",
				title : "状态",
				align : "center",
				sortable : true,
				formatter : function(value, row, index) {
					if (value == "1" || value == 1) {
						return "<a href=\"#\" class=\"tooltip-show\" data-toggle=\"tooltip\" title=\"已激活\"><span class= \"fa fa-check fa-fw text-success\"></span></a>";
					}else {
						return "<a href=\"#\" class=\"tooltip-show\" data-toggle=\"tooltip\" title=\"未激活\"><span class= \"fa fa-ban fa-fw text-warning\"></span></a>";
					}
				},
				width : 1000
			},{
				field : "action",
				title : "操作",
				width : 500,
				formatter : function(value, row, index) {
					if (row.status == "1" || row.status == 1) {
						return "<div class=\"row\">" +
							"<div class=\"col-md-12\">"+
							"<a href=\"#\" class=\"tooltip-show edit\" data-toggle=\"tooltip\" title=\"修改\"><span class=\"fa fa-pencil fa-fw\"></span></a>"+
							"<a href=\"#\" class=\"tooltip-show cancel\" data-toggle=\"tooltip\" title=\"注销\"><span class=\"fa fa-user-times text-danger fa-fw\"></span></a>"+
							"</div></div>";
					}
					return "<div class=\"row\">" +
						"<div class=\"col-md-12\">"+
						"<a href=\"#\" class=\"tooltip-show edit\" data-toggle=\"tooltip\" title=\"修改\"><span class=\"fa fa-pencil fa-fw\"></span></a>"+
						"<a href=\"#\" class=\"tooltip-show activited\" data-toggle=\"tooltip\" title=\"启用\"><span class=\"fa fa-circle-o-notch fa-fw text-success\"></span></a>"+
						"</div></div>";
				},
				events : {
					"click .edit" : function(e, value, row, index) {
						console.info("编辑");
					},
					"click .cancel" : function(e, value, row, index) {
						console.info("注销");
					},
					"click .activited" : function(e, value, row, index) {
						console.info("启用");
					}
				}
			}],
			data : [{
				id : 1,
				account : "admin01",
				userName : "12",
				status : "1",
				action : ""
			},{
				id : 1,
				account : "admin01",
				userName : "dfw",
				status : "0",
				action : ""
			},{
				id : 1,
				account : "admin01",
				userName : "yahoo",
				status : 0,
				action : ""
			},{
				id : 1,
				account : "admin01",
				userName : "no",
				status : 1,
				action : ""
			},{
				id : 1,
				account : "admin01",
				userName : "khzo",
				status : "0",
				action : ""
			},{
				id : 1,
				account : "admin01",
				userName : "khzo",
				status : "0",
				action : ""
			},{
				id : 1,
				account : "admin01",
				userName : "khzo",
				status : "0",
				action : ""
			},{
				id : 1,
				account : "admin01",
				userName : "khzo",
				status : "0",
				action : ""
			},{
				id : 1,
				account : "admin01",
				userName : "khzo",
				status : "激活",
				action : ""
			},{
				id : 1,
				account : "admin01",
				userName : "khzo",
				status : "激活",
				action : ""
			}]
		});


	}
}

