$("#userMan").click(function() {
	directRoutersToUserList();
});

// 跳转到表格列表
function directRoutersToUserList() {
	var obj = $("#contentFrame");
	obj.attr('src','tableList.html');
}