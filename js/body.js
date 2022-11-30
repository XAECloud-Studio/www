class xew_body {
    constructor() {
        xe.loader_creat('window_body');
        this.load_main();
    }
    loader(url){
        $.get(url, function (data) {
            $("#window_body").prepend(data);
        });
    }
    load_main() {
        this.loader("./module/pages/"+config.page.Default);
    }
}