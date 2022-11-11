class Xe_Page {
    constructor() {
        this.load_homepage();
    }
    load_homepage() {
        $.ajaxSettings.async = false;
        $.get("./pages/home.html", function (data) {
            $("#html_page").append(data);
        });
    }
}
$(document).ready(function () {
    const xe_page = new Xe_Page();
    $("#html_infocard").hide();
    setTimeout(() => {
        $("#html_loading").hide();
    }, 100);
    $.get("https://ping.xaecloud.cn/auto_test.json", function (data) {
        if (data.API.Main.State == 'online') {
            $("#html_infocard").slideUp();
        } else {
            console.warn('[ERROR] Server OFF');
            $("#html_infocard-text").text("服务器离线");
            $("#html_infocard").slideDown();
        }
    }).fail(function () {
        $("#html_infocard-text").text("网络连接中断");
        $("#html_infocard").slideDown();
        console.warn('[ERROR] Ping_test site not found');
    });

    let color = 0;
    $("#html_color-btn").click(function () {
        if (color == 0) {
            $("#html_color-btn").empty();
            $("#html_color-btn").append('<i class="bi bi-lightbulb-off-fill"></i>');
            $("#html_color").attr("href","./css/color_light.css");
            color = 1;
        }else{
            $("#html_color-btn").empty();
            $("#html_color-btn").append('<i class="bi bi-lightbulb-fill"></i>');
            $("#html_color").attr("href","./css/color_dark.css");
            color = 0;
        }
    });

    $("#html_item-search").focus(function () {
        $("#html_item-search-more").fadeIn(200);
    });
    $("#html_item-search").blur(function () {
        setTimeout(() => {
            $("#html_item-search-more").fadeOut(200);
        }, 100);
    });
});