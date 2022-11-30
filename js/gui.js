class xew_gui {
    constructor() {
        xe.loader_creat('window_gui');
        this.load_nav();
    }
    loader(url){
        $.get(url, function (data) {
            $("#window_gui").prepend(data);
        });
    }
    load_nav() {
        this.loader("./module/gui/navbar.html");
    }
    load_useritem() {
        this.loader("./module/gui/user_item.html");
    }
    load_login() {
        this.loader("./module/card/login.html");
    }
}