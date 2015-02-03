define(function(require, exports, module) {
    var $ = require('./fx');

    module.exports ={
        time: 0,
        init: function (num,maxNum) {
            
           
            var i = 0;
            var deg = Math.ceil(num/maxNum*360);
            var time =  1000*num/maxNum;
            this.time = time;
            var lTime = 500;
            var speed = time/(num*10);
            //计算运动时间
            if(deg<180){
                lTime = time;
            }
            var that =this;
            $('.circle-s .circle-out.done').addClass('unrotated');
            $('#total-circle .circle-range-right .dot').hide();
            setTimeout(function(){
                that.circle(deg,lTime);
                $('#total-circle  .circle-out-dot').show();
                var count = setInterval(function() {
                    $('#integer-num').text((i/10).toFixed(1).split('.')[0]);
                    $('#decimal-num').text((i/10).toFixed(1).split('.')[1]);
                    if(i>=num*10){
                        clearInterval(count);
                    }
                    i++;
                }, speed);
            },500);
            this.bind();
        },

        circle: function (d,lt){
            var l = $('#total-circle .circle-range-left'),
            r = $('#total-circle .circle-range-right');
            
            d = d > 360 ? 360 : d;
            d = d < 0   ? 0   : d;
            lt = lt ? lt  :500;
            var that = this;
            
            l.css('opacity','1');
            if(d < 180){
                l.animate({
                        rotate: d+'deg'
                    },this.time,'linear',function(){
                    $('#total-circle .circle-range-left .dot').show();
                    that.circle2($('.circle-s .circle-out.done.unrotated'));
                });   
            }else{
               
                l.animate({
                        rotate: '180deg'
                    },500,'linear',function(){
                        r.css('opacity','1');
                        r.animate({
                            rotate: (d-180) +'deg'  
                        }, that.time - 500, 'linear',function(){
                            $('#total-circle .circle-range-right .dot').show();
                            that.circle2($('.circle-s .circle-out.done.unrotated'));
                        });
                });
            }
            
        },
        //页面滑到当前位置才做动画
        circle2: function(item){
            $(item).each(function(){
                if($(this).offset().top > $(window).height() + $(window).scrollTop() - 60) {
                    return;
                }else{
                    var l = $(this).find('.circle-range-left'),
                    r = $(this).find('.circle-range-right');
                    var that = this;
                    l.css('opacity', '1');
                    l.animate({
                            rotate: '180deg'
                        },500,'linear',function(){
                            r.css('opacity','1');
                            r.animate({
                                rotate: '180deg'  
                            }, 500, 'linear',function(){
                                $(that).find('.icon-ok').addClass('animated bounceInUp').show();
                            });
                    });
                    $(that).removeClass('unrotated');
                }
            });
            
        },
        bind: function(){
            var that = this;
            $(window).scroll(function(){
                if($('.circle-s .circle-out.done.unrotated').length){
                    that.circle2($('.circle-s .circle-out.done.unrotated'));
                }
            });
        }

    }
});
