class Xe_System {
    constructor() {
        setTimeout(() => {
            this.loader_edit("<i>XAEC HTML Loader API v1<i>", 'color:#ffffff');
            if (!this.check_run()) { return 0; };
            this.loader_edit("加载进度：30%", 'color:#00ffee');
            this.xel_account = new xe_account();
            this.xel_gui = new xew_gui();
            this.xel_body = new xew_body();
            this.loader_edit("加载进度：60%", 'color:#00ffee');
            this.loader_LL();
            this.loader_useritem();
            this.loader_edit("加载进度：99%", 'color:#00ffee');
            $("#loader").hide();
        }, 0);
    }
    check_run() {
        let lock = 1;
        let Xe_CheckTime = $.cookie('xe_checktime');
        if (!(Xe_CheckTime > 1)) {
            Xe_CheckTime = 1;
        }
        let timestamp = Date.parse(new Date()) / 1000;
        this.loader_edit("正在检查服务器通信状态", 'color:#00ffff');
        if (timestamp - 300 > Xe_CheckTime) {
            for (let i = 0; i < config.Ping.length; i++) {
                // 初始化当前轮回配置
                let url = config.Ping[i];
                $.ajaxSettings.async = false;
                let back = 0;
                this.loader_edit("正在尝试连接 '" + url + "'", 'color:#00ff80');
                // 尝试进行操作
                for (let count = 0; count < config.System.Retry_Count; count++) {
                    let obj = { "System": {} };
                    $.get(url, function (data) {
                        obj = JSON.parse(data);
                    }).fail(function () {
                        obj.System.Server = "Fail";
                    });
                    switch (obj.System.Server) {
                        case "Success":
                            this.loader_edit("成功!", 'color:#00ffff');
                            back = 2;
                            break;
                        case "Close":
                            this.loader_edit("服务器维护", 'color:#ff0000');
                            back = 1;
                            break;
                        default:
                            let otp = count + 1;
                            this.loader_edit("第" + otp + "次连接失败", 'color:#ff0000');
                            back = 0;
                            if (otp == config.System.Retry_Count) {
                                back = -1;
                            }
                            break;
                    }
                    if (back > 0) {
                        $.cookie('xe_checktime', timestamp, { expires: 356, path: '/' });
                        $.cookie('xe_checktime', timestamp, { expires: 356, path: '/', domain: 'xaecloud.cn' });
                        break;
                    }
                }
                if (back == -1) { this.loader_edit("进程已终止，代码 0", 'color:#ff0000'); return false; }
            }
        }
        return true;
    }
    loader_edit(content, style = null) {
        $("#loader_cmd").append('<div style="' + style + '">' + content + '</div>');
    }
    loader_LL() {
        if (config.loader.LoginLock) {
            if (!this.xel_account.auth_login()) {
                this.xel_gui.load_login();
            }
        }
    }
    loader_useritem() {
        if (config.loader.XeUserItem) {
            if (this.xel_account.auth_login()) {
                this.xel_gui.load_useritem();
            }
        }
    }
}
var sys;
$(document).ready(function () {
    setTimeout(() => {
        sys = new Xe_System();
    }, 0);
});