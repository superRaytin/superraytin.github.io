// TODO

$(function(){

    var ctrl = {
        scrollHandler: function(){
            var self = this;
            var win = $(window);
            var docs = $('.docs');
            var navContainer = $('#J-nav');
            var navItem = $('.nav-section-item');
            var headerHeight = $('.documentation').outerHeight() + $('.topbar').outerHeight();

            var positions = [];
            $('h3', docs).each(function(){
                var current = $(this);
                var text = current.text();
                var anchor = text.split(' ')[0];

                positions.push(parseInt(current.offset().top));
                navItem.filter('[href="#'+ anchor +'"]').attr('rel', positions.length - 1);

            });

            var positionLength = positions.length;
            var timer;

            win.scroll(function(){
                var scrollTop = win.scrollTop();

                navContainer.css('top', scrollTop >= headerHeight ? 0 : Math.min(headerHeight, headerHeight - scrollTop));

                if(self.noscroll){
                    self.noscroll = false;
                    return;
                }

                if(timer) clearTimeout(timer);
                timer = setTimeout(function(){
                    for(var i = 0; i < positionLength; i++){
                        if(scrollTop < positions[0]){
                            self.backNav();
                            return;
                        }

                        if( (positions[i] <= scrollTop) && (positions[i + 1] > scrollTop) ){
                            self.selectNav(i);
                        }
                    }
                }, 50);
            });

            win.trigger('scroll');
        },

        observer: function(){
            var self = this;

            self.addAnchors();
            self.addNav();

            var navItem = $('.nav-section-item');
            var navTitle = $('.nav-section-title');
            var gotoTop = $('#gototop');

            navItem.on('click', function(){
                var current = $(this);
                var index = current.attr('rel');

                navItem.removeClass('active');
                current.addClass('active');

                self.selectNav(index);
            });

            navTitle.on('click', function(){
                var current = $(this);
                self.selectNav(current.next().attr('rel'));
                self.noscroll = true;
            });

            gotoTop.on('click', function(){
                $('body').get(0).scrollTop = 0;
            });

            self.scrollHandler();

        },

        // add anchors
        addAnchors: function(){
            var docs = $('.docs');

            $('h3', docs).each(function(){
                var current = $(this);
                var anchor = current.text().split(' ')[0];

                current.before('<a name="'+ anchor +'"></a>');
            });
        },

        // add nav
        addNav: function(){
            var docs = $('.docs');
            var navContainer = $('#J-nav');
            var newNav = '';

            var hash = (function(){
                var result = {};
                var currentItem;

                $('h1, h2, h3', docs).each(function(){
                    var current = $(this);
                    var tagName = this.tagName.toLowerCase();
                    var text = current.text();
                    var anchor = text.split(' ')[0];

                    if(tagName === 'h1'){
                        if(text !== 'Constructor' && text !== 'Configuring Defaults'){
                            currentItem = result[text] = result[text] || [];
                            current.before('<a name="'+ text.replace(' ', '') +'"></a>');
                        }
                    }
                    else if(tagName === 'h2'){
                        currentItem = result[text] = result[text] || [];
                        current.before('<a name="'+ text.replace(' ', '') +'"></a>');
                    }
                    else if(tagName === 'h3'){
                        currentItem.push(anchor);
                    }
                });

                return result;
            })();

            for(var cat in hash){
                if(hash.hasOwnProperty(cat)){
                    newNav += '<div class="nav-section">';
                    newNav += '<div class="nav-section-title"><a href="#'+ cat.replace(' ', '') +'">'+ cat +'<\/a><\/div>';

                    $.each(hash[cat], function(index, name){
                        newNav += '<a class="nav-section-item" href="#'+ name +'">'+ name +'<\/a>';
                    });

                    newNav += '<\/div>';
                }
            }

            navContainer.html(newNav);
        },

        // select nav
        selectNav: function(index){
            var navContainer = $('#J-nav');
            var navItem = $('.nav-section-item', navContainer);

            navItem.eq(navContainer.data('menuon')).removeClass('active').parent().removeClass('active');
            navItem.eq(index).addClass('active').parent().addClass('active');
            navContainer.data('menuon', index);
        },

        // nav init
        backNav: function(){
            var navContainer = $('#J-nav');
            var navSection = $('.nav-section', navContainer);
            var navItem = $('.nav-section-item', navContainer);

            navSection.removeClass('active');
            navItem.removeClass('active');

            navSection.eq(0).addClass('active');

            navContainer.data('menuon', 0);
        },

        prettyprint: function(){
            $('pre').addClass('prettyprint linenums');

            window.prettyPrint && prettyPrint();
        },

        init: function(){
            ctrl.observer();
            ctrl.prettyprint();
        }
    };

    ctrl.init();
});