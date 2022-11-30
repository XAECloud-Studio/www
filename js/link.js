class xe_link {
    constructor() {
    }
    home_blog() {
        window.open('http://blog.xaecloud.cn/');
    }
    home_user() {
        window.open('http://account.xaecloud.cn/');
    }
    home_main() {
        window.open('http://www.xaecloud.cn/');
    }
}
var link
$(document).ready(function () {
    link = new xe_link();
});