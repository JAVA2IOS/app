// 用户安全管理

$("#toolbar").click(function() {
  var htmlCode = '<form class="form-horizontal">'
        +'<!--用户名--><div class="form-group">'+
        '<label for="userAccount" class="col-sm-2 control-label text-center">用户名</label>'+
        '<div class="col-sm-9">'+
        '<input type="text" class="form-control dialog-form" id="userName" placeholder="请输入用户名">'+
        '</div>'+
        '</div>'+
        '<!--账号-->'+'<div class="form-group">'+
        '<label for="userAccount" class="col-sm-2 control-label">账号</label>'+
        '<div class="col-sm-9">'+
        '<input type="text" class="form-control dialog-form" id="userAccount" placeholder="请输入账号"></div></div><!--密码-->'+
        '<div class="form-group">'+
        '<label for="userpassword" class="col-sm-2 control-label">密码</label>'+
        '<div class="col-sm-9">'+
        '<input type="password" class="form-control dialog-form" id="userpassword" placeholder="请输入密码">'+
        '</div></div><!--部门--><div class="form-group">'+
        '<label for="dep" class="col-sm-2 control-label">部门</label>'+
        '<div class="col-sm-9"><input type="text" class="form-control dialog-form" id="dep" placeholder="请输入部门">'+
        '</div></div><!--角色--><div class="form-group"><label for="userRole" class="col-sm-2 control-label">权限</label>'+
        '<div class="col-sm-9"><select class="form-control dialog-form" id="userRole">'+
        '<option>普通用户</option>'+
        '<option>系统管理员</option></select></div></div>'+
        '</form>';

   var userInfoDialog = new BootstrapDialog({
      type: BootstrapDialog.TYPE_DEFAULT,
      message : $(htmlCode),
  });

  var buttons = [{
        label: "确认",
        cssClass: "",
        action: function (dialog) {
            if (typeof userInfoDialog.getData('callback') === 'function' && userInfoDialog.getData('callback').call(this, false) === false) {
                return false;
            }

            console.info(dialog.getMessage());

            return userInfoDialog.close();
        }
    }, {
        label: "取消",
        cssClass: "",
        action: function (dialog) {
            if (typeof userInfoDialog.getData('callback') === 'function' && userInfoDialog.getData('callback').call(this, true) === false) {
                return false;
            }

            return userInfoDialog.close();
        }
    }];
  userInfoDialog.addButtons(buttons);
  // 添加监听事件
  userInfoDialog.onShown(function(data) {
    $(".dialog-form").bind('input propertychange',function(args){
      console.info($(this).val());
    });
  });

  userInfoDialog.open();
});

var UserMan = {

  banObject : function (data) {
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

  configureUserList : function () {
    var datas = {
      queryParams : function () {
       return undefined;
      },
      queryParams : undefined,
      uri : undefined,
      parentDom : $("#table-container"),
      pageSize : 8,
      refresh : function(params) {
        UserMan.configureUserList();
      },
      rowStyle : function(row, index) {
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
      column : [{
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
        sortable : true,
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
      datas : [{
        id: 1,
        account: "admin01",
        userName: "12",
        status: "1",
        action: "",
        dep : "部门",
      }, {
        id: 1,
        account: "admin01",
        userName: "dfw",
        status: "0",
        action: "",
        dep : "部门",
      }, {
        id: 1,
        account: "admin01",
        userName: "yahoo",
        status: 0,
        action: "",
        dep : "部门",
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