(function ($) {
    $.fn.photoGallery = function (options) {
        var defaults = {
            delay: 5000,
            bullet: false,
            num: false,
            controls: false
        }
        var options = $.extend(defaults, options);
        var interval = 0;
        var o = options;
        var obj = $(this);
        var banner = $('ul', obj);
        var nav = $('div', obj);

        return this.each(function () {
            $('img', obj).css('display', 'block');
            if (o.controls) {
                AddControls();
            }
            if (o.bullet) {
                AddBullet();
            }
            if (o.num) {
                AddNumber();
            }
            SlidShow();
        });

        function RotateGallery() {
            var first_li = $('li:first', banner).remove();
            banner.append(first_li);
            $('li:last', banner).hide().fadeIn(800);
            if (nav && o.bullet) {
                var lastChild = $('span', nav).last().remove();
                $('.thumbnails',obj).prepend(lastChild);
            }
            if (nav && o.num) {
                $('.thumbnails span.current',obj).first().removeClass('current');
                var active_class = $('li:last',obj).attr('class');
                $('.thumbnails span.' + active_class,obj).addClass('current');
            }
        };

        function RotateGalleryBack() {
            $('li:last', banner).fadeOut(200, function () {
                $(this).remove().show();
                banner.prepend(this);
                var acImg = $('li:last', banner).attr('class');
                $('.thumbnails span.current',obj).removeClass('current');
                $('.thumbnails span.' + acImg,obj).addClass("current");
                $('li', banner).css('display', 'block');
            });
        };

        function AddNumber() {
            var Html = '';
            $('li', obj).each(function (i) { Html += '<span class="bn' + parseInt(i + 1) + '">' + parseInt(i + 1) + '</span>'; });
            nav.append('<p class="thumbnails">' + Html + '</p>');
            $('.thumbnails span',obj).first().addClass('current');
            $('.thumbnails span',obj).each(function (i) {
                $(this).bind('click', function () {
                    ShowImage('bn' + parseInt(i + 1));
                });
            });
        };

        function AddBullet() {
            var Html = '';
            $('li', obj).each(function () { Html += '<span>&bull; </span>'; });
            nav.append('<p class="thumbnails">' + Html + '</p>');
            $('.thumbnails span',obj).first().addClass('current');
        };

        function AddControls() {
            nav.append('<div class="cButtons"><div class="prevBtn"></div><div class="playBtn"></div><div class="nextBtn"></div></div>');
            $('.nextBtn',obj).bind('click', RotateGallery);
            $('.playBtn',obj).bind('click', SlidShow);
            $('.prevBtn',obj).bind('click', RotateGalleryBack);
        };

        function ShowImage(acImg) {
            clearInterval(interval);
            var activNum;
            var gallery_li = $('li', obj);
            for (var i = 0; i < gallery_li.length; i++) {
                if ($(gallery_li[i]).attr('class') == acImg) {
                    activNum = i;
                    for (var i = 0; i <= activNum; i++) {
                        var gal_elm = $(gallery_li[i]).remove();
                        banner.append(gal_elm);
                    }
                }
            }
            $('.thumbnails span.current',obj).first().removeClass('current');
            $('.thumbnails span.' + acImg,obj).addClass("current");
        }

        function SlidShow() {
            if (interval == 0) {
                interval = setInterval(RotateGallery, o.delay);
                if ($('.playBtn',obj))
                    $('.playBtn',obj).addClass("pause");
            }
            else {
                clearInterval(interval);
                interval = 0;
                if ($('.playBtn',obj))
                    $('.playBtn',obj).removeClass("pause");
            }
        };

    }
})(jQuery);
	