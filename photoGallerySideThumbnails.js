(function ($) {
    $.fn.photoGallerySideThumbnails = function (options) {
        var defaults = {
            delay: 5000,
            bullet:true
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
            AddControls();
            AddBullet();
            if (!o.bullet) {
                nav.css('display', 'none');
            }
            SlidShow();
            changeThumbImg();
        });

        function RotateGallery() {
            var first_li = $('li:first', banner).remove();
            banner.append(first_li);
            $('li:last', banner).hide().fadeIn(800);
            $('.thumbnails span.current',obj).first().removeClass('current');
            var active_class = $('li:last',obj).attr('class');
            $('.thumbnails span.' + active_class,obj).addClass('current');
            changeThumbImg();
        };

        function RotateGalleryBack() {
            $('li:last', banner).fadeOut(200, function () {
                $(this).remove().show();
                banner.prepend(this);
                var acImg = $('li:last', banner).attr('class');
                $('.thumbnails span.current',obj).removeClass('current');
                $('.thumbnails span.' + acImg,obj).addClass("current");
                changeThumbImg(); 
                $('li', banner).css('display', 'block');
            });
        };

        function AddBullet() {
            var Html = '';
            $('li', obj).each(function (i) { 
                Html += '<span class="bn' + parseInt(i+1) + '"></span>'; 
            });
            nav.append('<p class="thumbnails">' + Html + '</p>');
            $('.thumbnails span',obj).first().addClass('current');
            $('.thumbnails span',obj).each(function (i) {
                $(this).bind('click', function () {
                       ShowImage('bn' + parseInt(i+1) );
                   });
             });
        };

        function AddControls() {
            obj.append('<div class="prevBtn"><span></span><img class="prevImg" scr="images/blank.gif" /></div>');
            obj.append('<div class="playBtn"></div>');
            obj.append('<div class="nextBtn"><span></span><img class="nextImg" scr="images/blank.gif" /></div>');
            
            $('.nextBtn',obj).bind('click', RotateGallery);
            $('.playBtn',obj).bind('click', SlidShow);
            $('.prevBtn',obj).bind('click', RotateGalleryBack);

            $('.nextBtn',obj).bind('mouseout',function(){$(this).removeClass('btnHover');});
            $('.playBtn',obj).bind('mouseout',function(){$(this).removeClass('btnHover');});
            $('.prevBtn',obj).bind('mouseout',function(){$(this).removeClass('btnHover');});
            $('.nextBtn',obj).bind('mouseover',function(){$(this).addClass('btnHover');});
            $('.playBtn',obj).bind('mouseover',function(){$(this).show();$(this).addClass('btnHover');});
            $('.prevBtn',obj).bind('mouseover',function(){$(this).addClass('btnHover');}); 
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
            changeThumbImg();
        };

        function changeThumbImg() {
            var activeElm=$('.thumbnails span.current',obj).first().attr('class');
            activeElm=activeElm.replace('current','').replace('bn',''); 
            var nextNum=Math.abs(activeElm) + 1;
            if (nextNum > numBanners) nextNum=1;
            tmp=$('li.bn' + nextNum,obj).find('img').attr('src');
            $('.nextImg',obj).attr('src',tmp);           
            var preNum=Math.abs(activeElm) - 1;
            if (preNum==0) preNum=numBanners;
            var tmp=$('li.bn' + preNum,obj).find('img').attr('src');
            $('.prevImg',obj).attr('src',tmp);
        }; 

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
	