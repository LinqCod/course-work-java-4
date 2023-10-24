$( () => {

    //On Scroll Functionality
    /*$(window).scroll( () => {
        var windowTop = $(window).scrollTop();
        windowTop > 100 ? $('nav').addClass('navShadow') : $('nav').removeClass('navShadow');
        windowTop > 100 ? $('ul').css('top','100px') : $('ul').css('top','160px');
    });*/

    //Click Logo To Scroll To Top
    $('#logo').on('click', () => {
        $('html,body').animate({
            scrollTop: 0
        },500);
    });

    //Smooth Scrolling Using Navigation Menu
    $('a[href*="#"]').on('click', function(e){
        $('html,body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        },500);
        e.preventDefault();
    });

    //Toggle Menu
    /*$('#menu-toggle').on('click', () => {
        $('#menu-toggle').toggleClass('closeMenu');
        $('ul').toggleClass('showMenu');

        $('li').on('click', () => {
            $('ul').removeClass('showMenu');
            $('#menu-toggle').removeClass('closeMenu');
        });
    });*/

});


var scrolltotop={
    setting:{
        startline:500,
        scrollto:0,
        scrollduration:1e3,
        fadeduration:[500,100]
    },
    controlattrs:{
        offsetx:5,
        offsety:5
    },
    anchorkeyword:"#top",
    state:{
        isvisible:!1,
        shouldvisible:!1
    },
    scrollup:function() {
        this.cssfixedsupport || this.$control.css({opacity:0});
        var t = isNaN(this.setting.scrollto) ? this.setting.scrollto:parseInt(this.setting.scrollto);
        t = "string" == typeof t && 1 == jQuery("#"+t).length ? jQuery("#" + t).offset().top:0,this.$body.animate({scrollTop:t},this.setting.scrollduration)
    },
    togglecontrol:function() {
        var t = jQuery(window).scrollTop();
        this.cssfixedsupport,
            this.state.shouldvisible = t >= this.setting.startline ? !0:!1,
            this.state.shouldvisible && !this.state.isvisible ? (this.$control.stop().animate({opacity:1},this.setting.fadeduration[0]), this.state.isvisible =! 0) : 0 == this.state.shouldvisible && this.state.isvisible && (this.$control.stop().animate({opacity:0},this.setting.fadeduration[1]),this.state.isvisible=!1)
    },
    init:function() {
        jQuery(document).ready(function(t) {
            var o=scrolltotop,s=document.all;
            o.cssfixedsupport =! s || s && "CSS1Compat" == document.compatMode && window.XMLHttpRequest,
                o.$body = t(window.opera ? "CSS1Compat" == document.compatMode ? "html":"body":"html,body"),
                o.$control = t('<div id="go-top" class="go-top" style="opacity: 0"></div>').attr({title:"Прокрутить вверх"}).click(function()
                {
                    return o.scrollup(), !1
                }).appendTo("body"),
            document.all && !window.XMLHttpRequest && "" != o.$control.text() && o.$control.css({width:o.$control.width()}),
                o.togglecontrol(),
                t('a[href="'+o.anchorkeyword+'"]').click(function()
                {
                    return o.scrollup(),!1
                }),
                t(window).bind("scroll resize", function(t)
                {
                    o.togglecontrol()
                })
        })
    }
};
scrolltotop.init();

//*********** Работа с изображениями
//*********** Запись файла в глобальную переменную globalArticleMainImageFileNameToUpload
//*********** Предпросмотр изображения
//*********** Удаление изображения
//================================================================//

//====================== Переменные ===========================//

var globalArticleMainImageFileNameToUpload = null;


//====================== Предпросмотр изображения ===========================//

function uploadMainArticleImg(file){

    //------- передаем файл в глобальную переменную
    globalArticleMainImageFileNameToUpload = file;

    //------- если файл есть, передаем его в FileReader
    if (file != undefined){
        if (!file.type.match('image.*')) {
            showError('File type should be an image', 'popup');
            return;
        }

        var reader = new FileReader();
        reader.onload = (function(file){

            return function(e){

                //------- после того, как FileReader распознал файл отображаем его в элементе .imgarticle
                if ($('.logo-holder.imgarticle img').length){

                    $('.logo-holder.imgarticle img').fadeOut('fast', function(){
                        $('.logo-holder.imgarticle').append('<img src="' + e.target.result + '">');
                        $(this).remove();
                    });
                } else {
                    $('.logo-holder.imgarticle').append('<img src="' + e.target.result + '">');
                }
            };
        })(file);
        reader.readAsDataURL(file);
    }
}


$(document).ready(function(){

    //------- клик по кнопке выбора изображения (инициируем клик по скрытому инпуту)
    $('body').on('click', '#main-article-img', function(){
        $('#imgarticle').click();
    });

    //------- выбор изображение при помощи инпута с типом "файл"
    $('body').on('change', '#imgarticle', function(f){

        var files = f.target.files;
        var file = files[0];

        uploadMainArticleImg(file);

    });

    //====================== Удаление изображения ===========================//

    $('#del-main-img').on('click', function(){

        //------- проверяем, есть ли что удалять (изображение в виджете и это не noimage)
        if ($('.logo-holder img').length && ($('.logo-holder img').attr('src').indexOf('https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg') == -1)){

            $('.logo-holder img').fadeOut('fast', function(){

                globalArticleMainImageFileNameToUpload = null;
                //------- добавляем класс на кнопку edit-article, отмечаем, что старое изображение нужно удалить
                $('#edit-article').addClass('todelete');
                $(this).remove();
            });

            $('.logo-holder').append('<img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="noimage" />');
        }
    });
});