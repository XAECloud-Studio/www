class xe_account {
    constructor() {
        this.cookie_read();
        this.auth_uuid();
        this.user_info = {};
    }
    auth_uuid() {
        let uuid = this.account.User_uuid;
        $.ajaxSettings.async = false;
        $.post(config.API.Account, {
            io: "auto_uuid",
            uuid: uuid
        }, function (data) {
            let obj = JSON.parse(data);
            switch(obj.Account.Return){
                case "Build":
                    uuid = obj.Account.uuid;
                    break;
            }
        });
        this.account.User_uuid = uuid;
        this.cookie_save();
    }
    auth_login(){
        let obj;
        $.ajaxSettings.async = false;
        $.post(config.API.Account, {
            io: "auto_uid",
            uuid: this.account.User_uuid
        }, function (data) {
            obj = JSON.parse(data);
        });
        this.user_info = obj;
        switch(obj.Account.Return){
            case "Loged":
                return true;
                break;
            default:
                return false;
                break;
        }
    }
    account_logout(){
        this.account.User_uuid = 'None';
        this.auth_login();
        this.cookie_save();
    }
    cookie_read() {
        let account = $.cookie('xe_account');
        if (xe.is_json(account)) {
            this.account = JSON.parse(account);
        } else {
            this.account = {
                "API_version": "1.000",
                "User_uuid": "None"
            }
        }
        this.cookie_save();
    }
    cookie_save() {
        let account = JSON.stringify(this.account);
        $.cookie('xe_account', account, { expires: 356, path: '/' });
        $.cookie('xe_account', account, { expires: 356, path: '/' ,domain: 'xaecloud.cn'});
    }
}