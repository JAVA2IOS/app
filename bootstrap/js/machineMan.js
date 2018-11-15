// 软件参数管理

var breadMenuTag = {
	sensorIndex : {
		tag : CodeZ.TAG_SENSOR.INDEX,
		href : CodeZ.HTML_PAGE_SENSOR.INDEX,
		title : '传感器管理',
		actived : true,
	},
	sensorList : {
		tag : CodeZ.TAG_SENSOR.LIST,
		href : CodeZ.HTML_PAGE_SENSOR.LIST,
		title : '添加配置',
		actived : true,
	},
	sensorAdd : {
		tag : CodeZ.TAG_SENSOR.ADD,
		href : CodeZ.HTML_PAGE_SENSOR.ADD,
		title : '传感器注册',
		actived : true,
	},
	upateSensor : {
		tag : CodeZ.TAG_SENSOR.EDIT,
		href : CodeZ.HTML_PAGE_SENSOR.INFO,
		title : '传感器配置',
		actived : true,
	},
	infoSensor : {
		tag : CodeZ.TAG_SENSOR.INFO,
		href : CodeZ.HTML_PAGE_SENSOR.INFO,
		title : '传感器信息',
		actived : true,
	},

	dataBaseList : {
		tag : CodeZ.TAG_DATABASE_LIST,
		href : CodeZ.HTML_PAGE_DATABASE_CONNECT,
		title : '数据库列表',
		actived : true,
	},

	addDataBase : {
		tag : CodeZ.TAG_DATABASE_ADD,
		href : CodeZ.HTML_PAGE_DATABASE_CONNECT,
		title : '新增数据库',
		actived : true,
	},

	updateDataBase : {
		tag : CodeZ.TAG_DATABASE_EDIT,
		href : CodeZ.HTML_PAGE_CTRL_CFG_INFO,
		title : '更改数据库',
		actived : true,
	},

	infoDataBase : {
		tag : CodeZ.TAG_DATABASE_INFO,
		href : CodeZ.HTML_PAGE_CTRL_CFG_INFO,
		title : '数据库详情',
		actived : true,
	},
}

/*
* ================
* 传感器管理
* ================
*/
// 传感器首页跳转
function sensorIndexPage() {
	$.session.remove('sensorData');
	var frameDom = $(window.top.document).find('#contentFrame');
	frameDom.attr('src', CodeZ.HTML_PAGE_SENSOR.INDEX);
}

// 传感器列表
function sensorList() {
	BreadMenu.init('breadNav', [breadMenuTag.sensorList]);
	addIframe('#contentFrame', CodeZ.HTML_PAGE_SENSOR.LIST);
}

// 新增传感器
function addSensor(newSensorData, callback) {
	updateSensor(CodeZ.ACTION_SENSOR.ADD, newSensorData, '新增成功', fn);
}

// 更新传感器信息
function updateSensor(tag, updatedData, successTip = '更新成功', callback) {
	CodeZComponents.postRequest({
		action : tag,
		sensor : JSON.stringify(updatedData)
	},function(data){
		if(data.success) {
			CodeZComponents.showSuccessTip({
				title: '提示',
				text: successTip,
			});
			if(callback) {
				callback(data);
			}
		} else {
			CodeZComponents.showErrorTip({
				title: '提示',
				text: data.error,
			});
		}
	});
}

// 断开或者启用传感器
function connectedSensor(connectedData, connect = false, fn) {
	updateSensor(CodeZ.ACTION_SENSOR.EDIT, connectedData, '启用成功', fn);
}

// 新增传感器按钮响应
$("#addSensor").click(function() {
	$.session.remove('sensorData');
	transferToNextPage(breadMenuTag.sensorAdd);
});

// 进入到详细页面响应方法
function getDetailSensorInfo(data) {
	var bindData = breadMenuTag.updateSensor;
	bindData.bindData = data;
	$.session.set('sensorData', JSON.stringify(bindData));
	transferToNextPage(bindData);
}

// 添加传感器参数显示
function configureSensorInfoData() {
	var dataObj;
	var cacheData = $.session.get('sensorData');
	if(cacheData != undefined || cacheData != null) {
		dataObj = JSON.parse(cacheData);
	}
	if(dataObj != undefined) {
		if(dataObj.tag != CodeZ.TAG_SENSOR.ADD) {
			// 显示数据
		}
		return;
	}
}


/*
* ================
* 面包屑导航跳转方法
* ================
*/
// 跳转到下一级
function transferToNextPage(data) {
	var ulDom = $(window.parent.document).find('.breadcrumb');
	ulDom.show();
	BreadMenu.updateBread(ulDom, data);
	directHref(data.href);
}

// 面包屑导航选择跳转
function breadItemTransfer() {
	addIframe($('#contentFrame'), $(event.target).constructor.data.href)
	BreadMenu.updateBread($(event.target).parent().parent(), $(event.target).constructor.data);
}



/*
* ================
* 压铸机管理
* ================
*/
var MachineMan = {
	/* 
	* ========
	* 传感器配置
	* ========
	*/
	showModelSensorInfo : function() {
		configureSensorInfoData();
	},

	// 传感器表格展示
	configureSensorListData : function() {
		/*
		var ulDom = $(window.parent.document).find('.breadcrumb');
		ulDom.hide();
		CodeZComponents.postRequest({
			action: CodeZ.ACTION_SENSOR.LIST,
		}, function(data) {
			if(data.success) {
				var dataRow = data.data;
				MachineMan.showControlSensorList(dataRow);
			}
		});
		*/
		

		MachineMan.showControlSensorList({});
	},
	
	showControlSensorList: function(dataList) {
		var parameters = {
			pageSize : 10,
			uri : undefined,
			loadSuccessFn : undefined,
			loadFailedFn : undefined,
			refreshFn : function() {
				MachineMan.configureSensorListData();
			},
			column : [{
				field : 'sensorName',
				title: "名称",
				width: '25%',
				valign : 'middle',
			},{
				field : 'sensorType',
				title: "型号",
				width: '10%',
				valign : 'middle',
			},{
				field : 'sensorNO1',
				title: "类型",
				width: '10%',
				valign : 'middle',
			},{
				field : 'sensorPort',
				title: "端口号",
				valign : 'middle',
				width: '10%',
			},{
				field : 'address',
				title: "安装位置",
				valign : 'middle',
				width: '20%',
			},{
				field : 'sensorNO',
				title: "地址编号",
				width: '10%',
				valign : 'middle',
			},{
				field : 'updateTime',
				title: "更新时间",
				width: '15%',
				valign : 'middle',
			},{
				field : 'deleted',
				title: "状态",
				valign : 'middle',
				width : '10%',
				formatter: function(value, row, index) {
					if(value == 1 || value == '1') {

						return '未注册';
					}

					return '注册';
				},
			},{
				field : 'action',
				title: "操作",
				valign : 'middle',
				align : 'center',
				width : '20%',
				formatter: function(value, row, index) {
					if(row.deleted == 1 || row.deleted == '1') {
							return "<div class=\"row\">" +
								"<div class=\"col-sm-8 col-sm-offset-2\">" +
								"<a href=\"javascript:;\" class=\"tooltip-show edit\" data-toggle=\"tooltip\" title=\"修改\"><span class=\"fa fa-edit fa-fw\"></span></a>" +
								"<a href=\"javascript:;\" class=\"tooltip-show connect\" style = \"margin-left:10px;\" data-toggle=\"tooltip\" title=\"注册\"><span class=\"fa fa-plug fa-fw text-primary\"></span></a>" +
								"</div></div>";
					}
					return "<div class=\"row\">" +
						"<div class=\"col-sm-8 col-sm-offset-2\">" +
						"<a href=\"javascript:;\" class=\"tooltip-show edit\" data-toggle=\"tooltip\" title=\"修改\"><span class=\"fa fa-edit fa-fw\"></span></a>" +
						"<a href=\"javascript:;\" class=\"tooltip-show disconnect\" style = \"margin-left:10px;\" data-toggle=\"tooltip\" title=\"注销\"><span class=\"fa fa-unlink text-danger fa-fw\"></span></a>" +
						"</div></div>";
				},
				events: {
					'click .edit': function(e, value, row, index) {
						updateData(row);
					},
					"click .disconnect": function(e, value, row, index) {
						connectedSensor(row, true, function(data){
							$("#table-container").bootstrapTable('updateRow', {
								index: index,
								row: data
							});
						});
					},
					"click .connect": function(e, value, row, index) {
						connectedSensor(row, false, function(data){
							$("#table-container").bootstrapTable('updateRow', {
								index: index,
								row: data
							});
						});
					}
				},
			}],
			dataRows : dataList,
			rowStyleFn : function(row, index) {
				if (row.deleted == 1 || row.deleted == '1') {
					return {css :{'font-size' : '10px', 'height' : '40px'}, classes : 'warning'};
				}
				return {css :{'font-size' : '10px', 'height' : '40px'}};
			},
		};
		this.tablePluginsConfigure(parameters);
	},

	/* 
	* ==========
	* 数据库连接
	* ==========
	*/

	configureDataBaseList : function() {
		/*
		var ulDom = $(window.parent.document).find('.breadcrumb');
		ulDom.hide();
		CodeZComponents.postRequest({
			action: CodeZ.ACTION_DATA_BASE_LIST,
		}, function(data) {
			if(data.success) {
				var dataRow = data.data;
				SoftMan.showDataBaseList(dataRow);
			}
		});
		*/

		//e .g
		this.showDataBaseList({});
	},

	showDataBaseList : function(dataList) {
		var parameters = {
			pageSize : 10,
			uri : undefined,
			loadSuccessFn : undefined,
			loadFailedFn : undefined,
			refreshFn : function() {
				SoftMan.configureDataBaseList();
			},
			column : [{
				field : 'dataBaseName',
				title: "数据库名称",
				width: 1000,
				valign : 'middle',
			},{
				field : 'connectable',
				title: "状态",
				valign : 'middle',
				align : 'center',
				width: 1000,
				formatter: function(value, row, index) {
					if(value == 1 || value == '1') {

						return '已打开';
					}

					return '已关闭';
				},
			},{
				field : 'deleted',
				title: "注销",
				valign : 'middle',
				align : 'center',
				width : 1000,
				formatter: function(value, row, index) {
					if(value == 1 || value == '1') {

						return '已注销';
					}

					return '正常';
				},
			},{
				field : 'action',
				title: "操作",
				valign : 'middle',
				align : 'center',
				width : 1000,
				formatter: function(value, row, index) {
					if(row.deleted == 1 || row.deleted == '1') {
							return "<div class=\"row\">" +
								"<div class=\"col-sm-8 col-sm-offset-2\">" +
								"<a href=\"javascript:;\" class=\"tooltip-show open\" style = \"margin-left:10px;\" data-toggle=\"tooltip\" title=\"打开\"><span class=\"fa fa-plug fa-fw text-primary\"></span></a>" +
								"</div></div>";
					}
					return "<div class=\"row\">" +
						"<div class=\"col-sm-8 col-sm-offset-2\">" +
						"<a href=\"javascript:;\" class=\"tooltip-show close\" style = \"margin-left:10px;\" data-toggle=\"tooltip\" title=\"断开\"><span class=\"fa fa-unlink text-danger fa-fw\"></span></a>" +
						"</div></div>";
				},
				events: {
					"click .close": function(e, value, row, index) {
						$("#table-container").bootstrapTable('updateRow', {
								index: index,
								row: data
							});
					},
					"click .open": function(e, value, row, index) {
						driveConnected(row, true, function(data){
						$("#table-container").bootstrapTable('updateRow', {
								index: index,
								row: data
							})
						});
					}
				},
			}],
			dataRows : dataList,
			rowStyleFn : function(row, index) {
				if (row.deleted == 1 || row.deleted == '1') {
					return {css :{'font-size' : '10px', 'height' : '40px'}, classes : 'warning'};
				}
				return {css :{'font-size' : '10px', 'height' : '40px'}};
			},
		};
		this.tablePluginsConfigure(parameters);
	},

	/*
	* ================================
	* baseComponents
	* ================================
	*/
	tablePluginsConfigure : function(parameters) {
		var datas = {
			queryParams: parameters.queryFn,
			uri : parameters.uri,
			parentDom: $("#table-container"),
			pageSize: parameters.pageSize,
			refresh: parameters.refreshFn,
			rowStyle: parameters.rowStyleFn,
			column: parameters.column,
      		datas : parameters.dataRows,
		};

		CodeZComponents.tablePlugins(datas.parentDom, datas.uri, datas.queryParams, datas.rowStyle, datas.showSearch, datas.refresh, datas.currentPage, datas.pageSize, datas.showPager, datas.column, datas.datas, datas.loadSuccessFn, datas.loadFailedFn, parameters.onClick, parameters.onCheck, parameters.onUncheck, null, parameters.showDetail, parameters.detailFormatter);
	}
}

