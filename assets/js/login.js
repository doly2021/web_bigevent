// 登录页面专用的JS文件：用于实现登录页面的网页行为实现


// [1] 实现登录/注册表单的切换
// jQuery的入口函数：等待DOM元素加载完成后再执行JS代码
$(function() {

    //登录切换至注册
    $('.login-box a').on('click', function() {
        // alert('login-box a被点击')
        $('.login-box').hide()
        $('.reg-box').show();
    })

    //注册切换到登录
    $('.reg-box a').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show();
    })


    //[2] 自定义验证规则
    // 从 layui 中获取 form 对象
    var form = layui.form;

    var layer = layui.layer;

    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个 pwd 的自定义验证规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        //验证两次密码输入是否一致的自定义的验证规则
        repwd: function(value) {
            // 通过形参拿到的是确定密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则返回一个提示消息
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致！'
            }
        }
    })

    // [3] 监听注册表单的提交事件
    $('#reg-form').on('submit', function(e) {
        //禁止默认的提交事件
        e.preventDefault();
        //发起 ajax 的POST请求
        $.post('/api/reguser', { username: $('#reg-form [name=username]').val(), password: $('#reg-form [name=password]').val() }, function(res) {
            if (res.status != 0) {
                return layer.alert(res.message)
            }
            layer.alert('注册成功！')

            //注册成功会切换到登录页面
            $('#gologin').click();
        })
    })

    // [4] 监听登录表单的提交操作
    $('#login-form').on('submit', function(e) {
        //禁止默认的表单提交行为
        e.preventDefault();
        //发起 ajax 的GET请求
        $.get('/api/login', { username: $('#reg-form [name=username]').val(), password: $('#reg-form [name=password]').val() }, function(res) {
            if (res.status != 0) {
                return layer.alert('登录失败！')
            }
            layer.alert('登录成功！')

            //将登陆成功得到的 token 字符串保存到 localStorage 中
            localStorage.setItem('token', res.token);

            //跳转到后台主页
            location.href = '/index.html'
        })
    })
})