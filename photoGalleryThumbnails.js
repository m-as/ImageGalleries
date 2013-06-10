(function ($) {
    $.fn.photoGalleryThumbnails= function (options) {
        var defaults = {
            delay: 5000
        }
        var options = $.extend(defaults, options);
        var interval = 0;
        var o = options;
        var numBanners;
        var obj = $(this);
        var banner = $('ul', obj);
        var nav = $('div', obj);

        return this.each(function () {
            $('img', obj).css('display', 'block');
            AddThumbnails();
            SlidShow();
        });

        function RotateGallery() {
            var first_li = $('li:first', banner).remove();
            banner.append(first_li);
            $('li:last', banner).hide().fadeIn(800);
            $('.thumbnails span.current',obj).first().removeClass('current');
            var active_class = $('li:last',obj).attr('class');
            $('.thumbnails span.' + active_class,obj).addClass('current');
        };

        function AddThumbnails() {
            var Html = '';
            var tmp='';
            var num;

            $('li', obj).each(function (i) { 
                num = parseInt(i+2);
                if ($(this).attr('class') == 'bn1')
                    tmp ='<span class="bn1"><img src="' + $(this).find('img').attr('src') + '" alt=""></span>';
                else
                    Html +='<span class="bn'+ num + '"><img src="' + $(this).find('img').attr('src')  + '" alt=""></span>';
            });
            
            nav.append('<p class="thumbnails">' + tmp + Html + '</p>');
            $('.thumbnails span',obj).first().addClass('current');
            $('.thumbnails span',obj).each(function (i) {
                $(this).css({'top' : '0','opacity' : '0.7'});
                $(this).bind('click',function(){ShowImage('bn' + parseInt(i+1) );});
                $(this).bind('mouseover',function(){$(this).css({'top':'2px','opacity' : '1.0'});});
                $(this).bind('mouseout',function(){$(this).css({'top':'0','opacity' : '0.7'});});
            });
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
        };   

        function SlidShow() {
            if (interval == 0) {
                interval = setInterval(RotateGallery, o.delay);
            }
            else {
                clearInterval(interval);
                interval = 0;
            }
        };
    }
})(jQuery);
	