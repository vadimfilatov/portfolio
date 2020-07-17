var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
});
var root = $(window).scrollTop();
console.log("Пока ты смотришь на чужые ошибки - другие занимаются сексом.");
$(document).ready(function () {

    new WOW().init();

    $(".trigger-img").click(function () {
        let id = this.getAttribute("data-trigger");
        $("#"+id).addClass("modal-img__open");
    });

    $(".modal-img__close").click(function () {
        $(".modal-img").removeClass("modal-img__open");
    });

    $('.nav-logo').on('click', function() {
        $('html,body').animate({
            scrollTop: 0
        },1000);
    });

    $('.footer__btn-top').on('click', function () {
        $('html,body').animate({
            scrollTop: 0
        },1000);
    });

    $(".nav-burger").click(function () {
        $(".nav-burger").toggleClass("nav-burger--active");
        if($(".sidebar").hasClass("sidebar--hidden")) {
            // open
            $(".sidebar").addClass("sidebar--open");
            $(".sidebar__item").addClass("sidebar__item-active");
            $(".sidebar").removeClass("sidebar--hidden");
            $("body").css("overflow", "hidden");
        } else if($(".sidebar").hasClass("sidebar--close")) {
            // open
            $(".sidebar").addClass("sidebar--open");
            $(".sidebar__item").addClass("sidebar__item-active");
            $(".sidebar").removeClass("sidebar--close");
            $("body").css("overflow", "hidden");
        } else if($(".sidebar").hasClass("sidebar--open")) {
            // close
            $(".sidebar").addClass("sidebar--close");
            $(".sidebar").removeClass("sidebar--open");
            $(".sidebar__item").removeClass("sidebar__item-active");
            $("body").css("overflow", "auto");
        } else {
            // open
            $(".sidebar").addClass("sidebar--open");
            $(".sidebar__item").addClass("sidebar__item-active");
            $(".sidebar").removeClass("sidebar--hidden");
            $("body").css("overflow", "hidden");
        }
    });

    $(".sidebar__item").click(function (e) {
        e.preventDefault();
        var elementClick = $(this).attr("data-section");
        var destination = $("#"+elementClick).offset().top - 80;
        $(".sidebar").addClass("sidebar--close");
        $(".sidebar").removeClass("sidebar--open");
        $(".nav-burger").removeClass("nav-burger--active");
        $("body").css("overflow", "auto");
        root = destination;
        setTimeout(function () {
            $('html,body').animate({
                scrollTop: destination
            },1500);
        }, 1000)
        return false;
        
    });

    $(window).scroll(function () {
        var windowtop = $(window).scrollTop();
        if(windowtop > 300) { 
            $('.nav').addClass('nav--active');
            $(".nav-burger").addClass("nav-burger__scroll--active");
        } else {
            $('.nav').removeClass('nav--active');
            $(".nav-burger").removeClass("nav-burger__scroll--active");
        }
    });

    function progress(el) {
        $("."+el).addClass(el+"-active");
    }

    $(".trigger-modal").click(function (e) {
        e.preventDefault();
        let id = this.getAttribute("data-trigger");
        $("#"+id).addClass("modal-open");
    });

    $(".modal-content-close").click(function () {
        $(".modal").removeClass("modal-open");
    });

    $(".contact-card-form").submit(function (e) {
        e.preventDefault();
        var name        = $("#contact-name"),
            email       = $("#contact-email"),
            msg         = $("#contact-message"),
            name_error  = $(".contact-card-form-name"),
            email_error = $(".contact-card-form-email"),
            msg_error   = $(".contact-card-form-message"),
            errors      = 0;

        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;    

        if(name.val() == "" || name.val() == " ") {
            name_error.html("Введите своё имя");
            name.addClass("contact-card-form-input-error");
            errors++;
        } else {
            name_error.html("");
            name.removeClass("contact-card-form-input-error");
        }

        if(email.val() == "" || email.val() == " ") {
            email_error.html("Введите свой E-mail");
            email.addClass("contact-card-form-input-error");
            errors++;
        } else if(reg.test(email.val()) == false) { 
            email_error.html("Введите коректный E-mail адрес");
            email.addClass("contact-card-form-input-error");
            errors++;
        } else {
            email_error.html("");
            email.removeClass("contact-card-form-input-error");
        }

        if(msg.val() == "" || msg.val() == " ") {
            msg_error.html("Введите сообщение");
            msg.addClass("contact-card-form-textarea-error");
            errors++;
        } else {
            msg_error.html("");
            msg.removeClass("contact-card-form-textarea-error");
        }

        if(errors == 0) {
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: $(this).serialize(),
                success: function () {
                    $(".contact-modal").addClass("contact-modal-open");
                    $("input, textarea").val("");
                }
            });
        }

    });

    $(".form-resume").submit(function (e) {
        e.preventDefault();
        var name        = $("#resume-name"),
            email       = $("#resume-email"),
            msg         = $("#resume-message"),
            type        = $("#resume-type"), 
            name_error  = $(".resume-name"),
            email_error = $(".resume-email"),
            type_error  = $(".resume-type"),
            msg_error   = $(".resume-message"),
            errors      = 0,
            reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;    

        if(name.val() == "" || name.val() == " ") {
            name_error.html("Введите своё имя");
            name.addClass("modal-content-input-error");
            errors++;
        } else {
            name_error.html("");
            name.removeClass("modal-content-input-error");
        }

        if(email.val() == "" || email.val() == " ") {
            email_error.html("Введите свой E-mail");
            email.addClass("modal-content-input-error");
            errors++;
        } else if(reg.test(email.val()) == false) { 
            email_error.html("Введите коректный E-mail адрес");
            email.addClass("modal-content-input-error");
            errors++;
        } else {
            email_error.html("");
            email.removeClass("modal-content-input-error");
        }

        if(type.val() == 0) {
            type_error.html("Выберите, что вы хотите предложить");
            type.addClass("modal-content-select-error");
            errors++;
        } else {
            type_error.html("");
            type.removeClass("modal-content-select-error");
        }

        if(msg.val() == "" || msg.val() == " ") {
            msg_error.html("Введите сообщение");
            msg.addClass("modal-content-textarea-error");
        } else {
            msg_error.html("");
            msg.removeClass("modal-content-textarea-error");
        }

        if(errors == 0) {
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: $(this).serialize(),
                success: function () {
                    $(".modal").removeClass("modal-open");
                    $("input, textarea").val("");
                    $("select").val("0");
                }
            });
        }    
    });

    $(".contact-modal-content-close").click(function () {
        $(".contact-modal").removeClass("contact-modal-open");
    });

    setTimeout(function () {$(".contact-map").html('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1568.9082404354308!2d23.94216860496253!3d49.821829723832806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDQ5JzE4LjYiTiAyM8KwNTYnMzUuNyJF!5e1!3m2!1sru!2sua!4v1553537865067" allowfullscreen></iframe>');}, 5000)

    $(".profile-card-form").submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize(),
            success: function () {
                $("input").val("");
            }
        });
    });

    $(".footer-paragraph__name").click(function () {
        $(".design").remove();
        $("body").append('<iframe src="assets/audio/audio.mp3" allow="autoplay" id="audio" style="display:none" class="design"></iframe>');
    });

    function scrollSpeed(step, speed, easing) {
        var $document = $(document),
            $window = $(window),
            $body = $('html, body'),
            option = easing || 'default',
            scroll = false,
            scrollY,
            view;
            
        if(window.navigator.msPointerEnabled) return false;
        
        $window.on('mousewheel', function(e) {
            if($('.js-aDialogOpened').length == 0) {
                var deltaY  = e.originalEvent.wheelDeltaY,
                    detail  = e.originalEvent.detail;
                    scrollY = $document.height() > $window.height();
                    scroll  = true;
                
                if(scrollY) {
                    view = $window.height();
                    if (deltaY < 0 || detail > 0)
                        root = (root + view) >= $document.height() ? root : root += step;
                    if (deltaY > 0 || detail < 0)
                        root = root <= 0 ? 0 : root -= step;
                    $body.stop().animate({
                        scrollTop: root
                    }, speed, option, function() {
                        scroll = false;
                    });
                }
                
                return false;
            }
            
        }).on('scroll', function() {
            if (scrollY && !scroll) root = $window.scrollTop();
        }).on('resize', function() {
            if (scrollY && !scroll) view = $window.height();
        });
    };
    
    $.easing.default = function (x, t, b, c, d){
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };
    
    scrollSpeed(100, 1000);

    function svg_walkway(id) {
        return new Walkway({
            selector: id,
            duration: '4000',
            easing: function (t) {
              return t * t;
            }
        });
    }

    function onscreen_svg(selector, svg) {
        $(selector).onScreen({
            container: window,
            direction: 'vertical',
            doIn: function() {
                svg.draw();
            },
            tolerance: 0,
            throttle: 50
        });
    }

    var svg1 = svg_walkway("#programming");
    var svg2 = svg_walkway("#technology");
    var svg3 = svg_walkway("#music");
    var svg4 = svg_walkway("#cycle");

    onscreen_svg('#programming', svg1);
    onscreen_svg('#technology', svg2);
    onscreen_svg('#music', svg3);
    onscreen_svg('#cycle', svg4);

    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            svg1.redraw();
            svg2.redraw();
            svg3.redraw();
            svg4.redraw();
        }
    }, false);

    $('#programming_skills').onScreen({
        container: window,
        direction: 'vertical',
        doIn: function() {
            setTimeout(function () { progress("html")}, 1000);
            setTimeout(function () { progress("css")}, 1100);
            setTimeout(function () { progress("js")}, 1200);
            setTimeout(function () { progress("jquery")}, 1300);
            setTimeout(function () { progress("react")}, 1400);
            setTimeout(function () { progress("ajax")}, 1500);
            setTimeout(function () { progress("php")}, 1600);
            setTimeout(function () { progress("rbp")}, 1700);
            setTimeout(function () { progress("json")}, 1800);
            setTimeout(function () { progress("cpp")}, 1900);
            setTimeout(function () { progress("cs")}, 2000);
            setTimeout(function () { progress("python")}, 2100);
            setTimeout(function () { progress("bash")}, 2200);
        },
        tolerance: 0,
        throttle: 50
    });

    $('#technical_skills').onScreen({
        container: window,
        direction: 'vertical',
        doIn: function() {
            setTimeout(function () { progress("linux")}, 1000);
            setTimeout(function () { progress("lamp")}, 1100);
            setTimeout(function () { progress("git")}, 1200);
            setTimeout(function () { progress("vsc")}, 1300);
            setTimeout(function () { progress("pst")}, 1400);
            setTimeout(function () { progress("sbl")}, 1500);
            setTimeout(function () { progress("fz")}, 1600);
            setTimeout(function () { progress("ps")}, 1700);
            setTimeout(function () { progress("sv")}, 1800);
            setTimeout(function () { progress("mw")}, 1900);
            setTimeout(function () { progress("mp")}, 2000);
            setTimeout(function () { progress("me")}, 2100);
            setTimeout(function () { progress("ma")}, 2200);
        },
        tolerance: 0,
        throttle: 50
    });

    $('#language_skills').onScreen({
        container: window,
        direction: 'vertical',
        doIn: function() {
            setTimeout(function () { progress("ua")}, 1000);
            setTimeout(function () { progress("ru")}, 1100);
            setTimeout(function () { progress("en")}, 1200);
            setTimeout(function () { progress("de")}, 1300);
        },
        tolerance: 0,
        throttle: 50
    });
});