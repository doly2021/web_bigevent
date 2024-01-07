//获取用户信息的JS文件

$(function() {

    const layer = layui.layer;

    //调用函数  获取用户的基本信息
    getUserInfo();

    //点击退出按钮实现退出功能
    $('#btnLogout').on('click', function(e) {
        layer.confirm('是否退出系统', { icon: 3, title: '提示' }, function(index) {
            //清空本地存储中的token
            localStorage.removeItem('token');
            //重新跳转到登录页面
            location.href = '/login.html';

            //关闭 config 询问框
            layer.close(index);
        });

    })


})

//获取用户的基本信息
function getUserInfo() {

    //发起ajax的GET请求
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:8080/my/userinfo',
        //请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            console.log(res);

            //请求失败的处理逻辑
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //请求成功的处理逻辑
            //渲染用户的头像
            renderAvatar(res.data)
        },
        //无论成功还是失败都会执行complete回调函数
        complete: function(res) {
            console.log('执行了cpmplete回调函数')
            console.log(res);
            console.log(res.responseJSON);
            //在complete回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败...') {
                //强制清空 token
                localStorage.removeItem('token');
                //强制跳转到登录页面
                location.href('/login.html');
            }
        }
    })
}

//渲染用户的头像
function renderAvatar(user) {

    //获取用户的名称
    var name = user.nickname || user.username;
    //设置 欢迎 的文本
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name);
    //按需渲染用户的头像
    if (user.pic !== null) {
        //渲染图片图像
        $('.layui-nav-img').attr('src', user.pic).show();
        $('.text-avatar').hide()
    } else {
        //渲染文本图像
        $('.layui-nav-img').hide();

        //toUpperCase()函数将字母转换成大写
        var first = name[0].toUpperCase();

        $('.text-avatar').html(first).show();
    }
}