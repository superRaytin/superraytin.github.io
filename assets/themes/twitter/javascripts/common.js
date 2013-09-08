/**
 * common.js.
 * User: raytin
 * Date: 13-5-30
 */
$(function(){
    var boss = {
        observer: function(){
            var disqus = $('#disqus_thread'),
                btn_showcom = $('#J-showComment');

            btn_showcom.on('click', function(){
                btn_showcom.parent().addClass('hide');
                disqus.removeClass('height0').addClass('mt20');
            });

            $('.fancybox').fancybox();
        },
        init: function(){
            boss.observer();
        }
    }
    boss.init();
});