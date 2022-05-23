var hoverMouse = function ($el) {
    $el.each(function () {
        var $self = $(this);
        var hover = false;
        var offsetHoverMax = $self.attr("offset-hover-max") || 0.7;
        var offsetHoverMin = $self.attr("offset-hover-min") || 0.5;

        var attachEventsListener = function () {
            $(window).on("mousemove", function (e) {
                //
                var hoverArea = hover ? offsetHoverMax : offsetHoverMin;

                // cursor
                var cursor = {
                    x: e.clientX,
                    y: e.clientY + $(window).scrollTop()
                };

                // size
                var width = $self.outerWidth();
                var height = $self.outerHeight();

                // position
                var offset = $self.offset();
                var elPos = {
                    x: offset.left + width / 2,
                    y: offset.top + height / 2
                };

                // comparaison
                var x = cursor.x - elPos.x;
                var y = cursor.y - elPos.y;

                // dist
                var dist = Math.sqrt(x * x + y * y);

                // mutex hover
                var mutHover = false;

                // anim
                if (dist < width * hoverArea) {
                    mutHover = true;
                    if (!hover) {
                        hover = true;
                    }
                    onHover(x, y);
                }

                // reset
                if (!mutHover && hover) {
                    onLeave();
                    hover = false;
                }
            });
        };

        var onHover = function (x, y) {
            TweenMax.to($self, 0.4, {
                x: x * 0.8,
                y: y * 0.8,
                //scale: .9,
                rotation: x * 0.05,
                ease: Power2.easeOut
            });
        };
        var onLeave = function () {
            TweenMax.to($self, 0.7, {
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0,
                ease: Elastic.easeOut.config(1.2, 0.4)
            });
        };

        attachEventsListener();
    });
};

hoverMouse($('.magnatic-hover'));

// video play
let playAfterThisHeight = 1150;
$(document).scroll(function () {
    if ($(document).scrollTop() > playAfterThisHeight) {
        $('.playerembed').trigger('play');

    } else {
        $('.playerembed').trigger('pause');
    }

    // if ($(document).scrollTop() < 1600) {
    //     $('.playerembed').trigger('pause');

    // } else {
    //     $('.playerembed').trigger('play');
    // }
})

$(document).ready(function () {
    $('.video-play-button').on('click', function (e) {
        e.preventDefault();
        var video = $(".playerembed").get(0);
        if (video.paused === false) {
            video.pause();
        } else {
            video.play();
        }

        return false;
        // if ($(this).attr('data-click') == 1) {
        //     $(this).attr('data-click', 0)
        //     $(this).text('Play')
        //     $('.playerembed')[0].pause();
        // } else {
        //     $(this).attr('data-click', 1)
        //     $(this).text('Pause')
        //     $('.playerembed')[0].play();
        // }

    });

});