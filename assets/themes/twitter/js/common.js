/**
 * common.js.
 * User: raytin
 * Date: 13-5-30
 */
var _ = {
    domReady: function(start){
        if(document.addEventListener){
            document.addEventListener('DOMContentLoaded', start, false);
        }else{
            window.onload = start;
        }
    },
    $: function(id){
        return document.getElementById(id);
    },
    bind: function(el, type, fun){
        if(document.addEventListener){
            el.addEventListener(type, fun, false);
        }
        else if(document.attachEvent){
            el.attachEvent('on' + type, fun)
        }
        else{
            el['on' + type] = fun;
        }
    }
}

var done = {
    ev: function(){
        var disqus = _.$('disqus_thread'),
            btn_showcom = _.$('J-showComment');

        _.bind(btn_showcom, function(){
            btn_showcom.parentNode.className = 'hide';
            disqus.className = '';
        });
    },
    init: function(){
        _.domReady(function(){
            done.ev();
        });
    }
}
done.init();