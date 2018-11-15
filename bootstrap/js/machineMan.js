// 软件参数管理
var sessionCacheKeyTag = $.session.get('cacheKey');
var categoryTag = $.session.get('tag');
var actions = $.session.get('action');
var urls = $.session.get('page');

var breadMenuTag = {

	indexBread : {
		tag : categoryTag.INDEX,
		href : urls.INDEX,
		title : categoryTag.INDEXTITLE,
		actived : true,
	},

	tableBread : {
		tag : categoryTag.LIST,
		href : urls.LIST,
		title : categoryTag.LISTTITLE,
		actived : true,
	},

	newBread : {
		tag : categoryTag.ADD,
		href : urls.ADD,
		title : categoryTag.ADDTITLE,
		actived : true,
	},

	editBread : {
		tag : categoryTag.EDIT,
		href : urls.EDIT,
		title : categoryTag.EDITTITLE,
		actived : true,
	},

	infoBread : {
		tag : categoryTag.INFO,
		href : urls.INFO,
		title : categoryTag.INFOTITLE,
		actived : true,
	}

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
	updateSensor : {
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

	machineIndex : {
		tag : CodeZ.TAG_MACHINE.INDEX,
		href : CodeZ.HTML_PAGE_MACHINE.INDEX,
		title : '传感器管理',
		actived : true,
	},
	machineList : {
		tag : CodeZ.TAG_MACHINE.LIST,
		href : CodeZ.HTML_PAGE_MACHINE.LIST,
		title : '添加配置',
		actived : true,
	},
	machineAdd : {
		tag : CodeZ.TAG_MACHINE.ADD,
		href : CodeZ.HTML_PAGE_MACHINE.ADD,
		title : '传感器注册',
		actived : true,
	},
	updateMachine : {
		tag : CodeZ.TAG_MACHINE.EDIT,
		href : CodeZ.HTML_PAGE_MACHINE.INFO,
		title : '传感器配置',
		actived : true,
	},
	infoMachine : {
		tag : CodeZ.TAG_MACHINE.INFO,
		href : CodeZ.HTML_PAGE_MACHINE.INFO,
		title : '传感器信息',
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
	updateSingleData(CodeZ.ACTION_SENSOR.ADD, newSensorData, '新增成功', fn);
}

// 断开或者启用传感器
function connectedSensor(connectedData, connect = false, fn) {
	updateSingleData(CodeZ.ACTION_SENSOR.EDIT, connectedData, '启用成功', fn);
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
* 压铸机管理
* ================
*/
// 压铸机首页跳转
function machineIndexPage() {
	$.session.remove('machineData');
	var frameDom = $(window.top.document).find('#contentFrame');
	frameDom.attr('src', CodeZ.HTML_PAGE_MACHINE.INDEX);
}

// 压铸机列表
function machineList() {
	BreadMenu.init('breadNav', [breadMenuTag.machineList]);
	addIframe('#contentFrame', CodeZ.HTML_PAGE_MACHINE.LIST);
}

// 新增压铸机
function addMachine(newSensorData, callback) {
	updateSingleData(CodeZ.ACTION_MACHINE.ADD, newSensorData, '新增成功', fn);
}

// 断开或者启用压铸机
function connectedMachine(connectedData, connect = false, fn) {
	updateSingleData(CodeZ.ACTION_MACHINE.EDIT, connectedData, '启用成功', fn);
}

// 新增压铸机按钮响应
$("#addMachine").click(function() {
	$.session.remove('machineData');
	transferToNextPage(breadMenuTag.machineAdd);
});

// 进入到详细页面响应方法
function getDetailMachineInfo(data) {
	var bindData = breadMenuTag.updateMachine;
	bindData.bindData = data;
	$.session.set('machineData', JSON.stringify(bindData));
	transferToNextPage(bindData);
}

// 添加压铸机参数显示
function configureMachineInfoData() {
	var dataObj;
	var cacheData = $.session.get('machineData');
	if(cacheData != undefined || cacheData != null) {
		dataObj = JSON.parse(cacheData);
	}
	if(dataObj != undefined) {
		if(dataObj.tag != CodeZ.ACTION_MACHINE.ADD) {
			// 显示数据
		}
		return;
	}
}


/*
* ================
* 通用
* ================
*/
/* 跳转首页
* {
*	sessionKey : 需要移除的session数据的键值,
*	uri : 跳转的地址
* }
*/
function goIndexPage() {
	$.session.remove(sessionCacheKeyTag);
	var frameDom = $(window.top.document).find('#contentFrame');
	frameDom.attr('src', urls.INDEX);
}

/* 表格页面跳转
* {
*	breadItem : 面包屑数据,
*	uri : 跳转的地址
* }
*/
function goTablePage() {
	BreadMenu.init('breadNav', [breadMenuTag.tableBread]);
	addIframe('#contentFrame', urls.LIST);
}

/* 数据新增请求
* {
	action : 请求参数
*	newSensorData : 需要提交的数据,
*	callback : 回调方法
* }
*/
function addNewData(action, newSensorData, callback) {
	updateSingleData(action.ADD, newSensorData, '新增成功', callback);
}

/* 监听方法
* {
	action : 请求参数
*	newSensorData : 需要提交的数据,
*	callback : 回调方法
* }
*/
function connectedMachine(connectedData, connect = false, fn) {
	updateSingleData(action.EDIT, connectedData, '启用成功', fn);
}

// 新增项按钮响应
$("#addNewItem").click(function() {
	$.session.remove(sessionCacheKeyTag);
	transferToNextPage(breadMenuTag.newBread);
});

// 进入到详细页面响应方法
function getDetailMachineInfo(data) {
	var bindData = breadMenuTag.updateBread;
	bindData.bindData = data;
	$.session.set(sessionCacheKeyTag, JSON.stringify(bindData));
	transferToNextPage(bindData);
}

// 添加压铸机参数显示
function configureItemInfoData(fn) {
	var dataObj;
	var cacheData = $.session.get(sessionCacheKeyTag);
	if(cacheData != undefined || cacheData != null) {
		dataObj = JSON.parse(cacheData);
	}
	if(dataObj != undefined) {
		if (fn) {
			fn(dataObj);
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

// 更新数据
function updateSingleData(tag, updatedData, successTip = '更新成功', callback) {
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
	* 压铸机列表
	* ==========
	*/

	configureMachineList : function() {
		/*
		var ulDom = $(window.parent.document).find('.breadcrumb');
		ulDom.hide();
		CodeZComponents.postRequest({
			action: '',
		}, function(data) {
			if(data.success) {
				var dataRow = data.data;
				SoftMan.showMachineList(dataRow);
			}
		});
		*/

		//e .g
		this.showMachineList({});
	},

	showMachineList : function(dataList) {
		var parameters = {
			pageSize : 10,
			uri : undefined,
			loadSuccessFn : undefined,
			loadFailedFn : undefined,
			refreshFn : function() {
				MachineMan.configureMachineList();
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
						$("#table-container").bootstrapTable('updateRow', {
								index: index,
								row: data
							})
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
	* 计数器列表
	* ==========
	*/

	configureCounterList : function() {
		/*
		var ulDom = $(window.parent.document).find('.breadcrumb');
		ulDom.hide();
		CodeZComponents.postRequest({
			action: '',
		}, function(data) {
			if(data.success) {
				var dataRow = data.data;
				SoftMan.showCounterList(dataRow);
			}
		});
		*/

		//e .g
		this.showCounterList({});
	},

	showCounterList : function(dataList) {
		var parameters = {
			pageSize : 10,
			uri : undefined,
			loadSuccessFn : undefined,
			loadFailedFn : undefined,
			refreshFn : function() {
				MachineMan.configureCounterList();
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
						$("#table-container").bootstrapTable('updateRow', {
								index: index,
								row: data
							})
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
	// 表格数据展示
	configureTableListData : function(fn) {
		var ulDom = $(window.parent.document).find('.breadcrumb');
		ulDom.hide();
		if (fn) {
			var tableConfigureData = fn();
			MachineMan.showTableList(tableConfigureData);
		}
	},
	/*
	* {
	*	data : [],表格数据
	*	column : [], 列的格式,
	*	rowStyle : fn, 行的格式
	* }
	*/
	showTableList: function(dataSource) {
		var parameters = {
			pageSize : 10,
			refreshFn : function() {
				MachineMan.configureTableListData();
			},
			column : dataSource.column,
			dataRows : dataSource.data,
			rowStyleFn : dataSource.rowStyle(row, index),
		};
		this.tablePluginsConfigure(parameters);
	},

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

