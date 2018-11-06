$("#userMan").click(function() {
	directRoutersToUserList();
});


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
				"css": "nav nav-default nav-stacked"
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


	table : function(parentDom, data) {
		
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
		var pageObj = this.addUl({
			css : "pager"
		});
		parentDom.append(pageObj);

		var lastPage = this.addLi();

		var hrefDom = this.addHref({
			value : "&laquo;"
		});
		lastPage.append(hrefDom);

		pageObj.append(lastPage);

		var numberPage = data.totalPage;
		var currentIndex = data.currentIndex;
		var perCount = data.perCount;
		var totalCount = data.totalCount;
		for (var i = 0; i < numberPage; i++) {
			var currentCount = (currentIndex + 1) * perCount >= totalCount ? totalCount - (currentIndex + 0) * perCount : perCount;
			var data = {name : domName, value : i + 1, data : {"count" : currentCount}};
			if (currentIndex == i) {
				data["css"] = "active";
			}
			var indexPage = this.addLi();
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
			});
		});
	}
}

