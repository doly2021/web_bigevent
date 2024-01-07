//入口函数
$(function() {
    getUserInfo();
})

//获取用户的基本信息
function getUserInfo() {

    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers 就是请求头配置对象（有权限的接口）
        // headers: {
        //     Authorization: localStorage.setItem('token') || ''
        // },
        suceess: function(res) {
            if (res.status != 0) {
                layui.layer.msg('请求失败！')
            }
            renderAvatar(res.data);
        }
    })
}

//渲染用户的头像
function renderAvatar(user) {
    //1.获取用户的名称
    var name = user.nickname || user.username;
    //2.设置用户的名称
    $('.user-info .welcome').html('欢迎&nbsp;&nbsp;' + name);
    //3.渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        var first = name[0].toUpperCase() //转换成大写
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}

//实现退出功能