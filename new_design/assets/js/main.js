$(".nav-burger").click(function () {
    $(this).toggleClass("nav-burger--active");
    $(".sidebar").toggleClass("sidebar--active");
    $(".nav-logo__img").toggleClass("nav-logo__img--white");
    $("body").toggleClass("overflow");
    $(".sidebar-items").toggleClass("opacity");
});