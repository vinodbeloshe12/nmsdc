(function($) {
    "use strict";
    $(document).ready(function() {

        //mouse follow div
        var $box = $('#box');
        function moveBox (e) { 
          TweenMax.to( $box, 1.8, {
            css: { left: e.pageX, top: e.pageY },
            ease: Elastic.easeOut});
        }
        $(window).on('mousemove', moveBox);

        //mousmove image move
       
        var rect = $('#about')[0]?$('#about')[0].getBoundingClientRect():0;
        var mouse = {x: 0, y: 0, moved: false};

        $("#about").mousemove(function(e) {
        mouse.moved = true;
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        });
 
        // Ticker event will be called on every frame
        TweenLite.ticker.addEventListener('tick', function(){
            if (mouse.moved){    
            parallaxIt("#aboutimg", -40);
            }
            mouse.moved = false;
        });

function parallaxIt(target, movement) {
  TweenMax.to(target, 0.3, {
    x: (mouse.x - rect.width / 2) / rect.width * movement,
    y: (mouse.y - rect.height / 2) / rect.height * movement
  });
}
        //end image move

        TweenMax.to($('.preloader'), 1, {
            yPercent: -100,
            onComplete: function() {
                heroSecTl.play();
                $('html').css('overflow-y', 'auto')
            }
        })

        var image = document.getElementsByClassName('parallaximg');
        new simpleParallax(image);

        var vw = $(window).width();
        var owl = $('.contact-reason.owl-carousel');
        owl.owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            mouseDrag: true,
            touchDrag: true,
            items: 1,
            autoWidth: true,
            center: true,
            smartSpeed: 1000,
            responsive: {
                0: {
                    margin: 0,
                    autoWidth: false
                },
                768: {
                    margin: 150,
                }
            }
        });
        $('.custom-owl-prev').on('click', function() {
            owl.trigger('prev.owl.carousel');
        });
        $('.custom-owl-next').on('click', function() {
            owl.trigger('next.owl.carousel');
        });



        /*Form Submit Function*/
        $('#submitbtn').on('click', function() {

            const personName = $('#personName').val();
            const personEmail = $('#personEmail').val();
            const personPhone = $('#personPhone').val();
            const personMessage = $('#personMessage').val();
            const personDet = $('.contact-reason .center li').text();
            const personqueryReason = $('#queryReason').val();

            var valid = true;
            $('#contactForm input,#contactForm textarea,#contactForm select').each(function(index, elem) {
                if ($(elem).val() == '') {
                    valid = false;
                }
            })
            if (!valid) {
                alert('Please fill all fields');
                return;
            }


            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(personEmail)) {
                alert('Email Not Valid');
                return;
            }

            if (valid) {
                $.ajax({
                        type: 'POST',
                        url: 'mailer.php',
                        data: {
                            personName: personName,
                            personEmail: personEmail,
                            personPhone: personPhone,
                            personMessage: personMessage,
                            personDet: personDet,
                            personqueryReason: personqueryReason
                        }
                    }).done(function(response) {

                        alert(response);

                        // Clear the form.
                        //$('#contactForm input,#contactForm textarea,#contactForm select').val('');
                    })
                    .fail(function(data) {
                        if (data.responseText !== '') {
                            alert(data.responseText)
                        } else {
                            alert('Oops! An error occured and your message could not be sent.');
                        }
                    }); //ajax end


            }


        })


        /*Animation Related JS*/


        const heroSecImg = $('#heroimg');
        const heroSecImgAnim = $('section.hero .img-animator');
        const heroheading1 = $('#heroheadings>:nth-child(1)');
        const heroheading2 = $('#heroheadings>:nth-child(2)');
        const heroheading3 = $('#heroheadings>:nth-child(3)');

        const heroSecTl = new TimelineMax();

        heroSecTl
            .add('pageLoad')
            .to(heroSecImgAnim, 1, {
                scaleX: 1,
                transformOrigin: 'left center',
                ease: Power4.easeOut
            })
            .set(heroSecImg, {
                opacity: 1
            })
            .to(heroSecImgAnim, 1, {
                scaleX: 0,
                transformOrigin: 'right center',
                ease: Power2.easeOut,
            })
            .from(heroSecImg, 0.5, {
                scale: 1.1,
                ease: Power4.easeIn
            })
            .from(heroheading1, 1, {
                y: 30,
                opacity: 0
            }, '-=0.5')
            .from(heroheading2, 1, {
                y: 30,
                opacity: 0
            }, '-=0.7')
            .from(heroheading3, 1, {
                y: 30,
                opacity: 0
            }, '-=0.7')
            .reverse();


        const aboutImg = $('#aboutimg');
        const aboutSecp = $('#aboutsecp');
        const aboutHeadAnimator = $('section.about .heading-animator');
        const aboutSecHeading = $('section.about .section-heading');
        const fixedCircle = $('#fixed-circle');


        var tl = new TimelineMax()
            .add([
                TweenMax.from(aboutImg, 1, {
                    y: 150,
                    opacity: 0
                }),
                new TimelineMax().to(aboutHeadAnimator, 0.8, {
                    transformOrigin: 'left center',
                    scaleX: 1,
                    ease: Power4.easeIn
                })
                .to(aboutSecHeading, 0.2, {
                    opacity: 1
                })
                .to(aboutHeadAnimator, 0.5, {
                    transformOrigin: 'right center',
                    scaleX: 0,
                    ease: Power4.easeInOut
                })
                .from(aboutSecp, 0.5, {
                    y: 50,
                    opacity: 0
                })
            ])

        var controller = new ScrollMagic.Controller();

        var scene = new ScrollMagic.Scene({
                triggerElement: 'section.about',
                duration: 0,
                triggerHook: 0.5,
                reverse: false
            })
            .setTween(tl)
            // .addIndicators()
            .addTo(controller);


        tl = new TimelineMax()
            .from(fixedCircle, 0.5, {
                y: 350
            })
        var parallaxScene = new ScrollMagic.Scene({
                triggerElement: 'section.what-i-do',
                duration: 2000,
                triggerHook: 1
            })
            .setTween(tl)
            // .addIndicators()
            .addTo(controller);




        const whatIDoHeadAnimator = $('section.what-i-do .top .heading-animator');
        const whatIDoSecHeading = $('section.what-i-do .top .section-heading');
        const whatIDoSecp = $('section.what-i-do p.top');


        tl = new TimelineMax()
            .add(
                [
                    new TimelineMax()
                    .to(whatIDoHeadAnimator, 0.8, {
                        transformOrigin: 'left center',
                        scaleX: 1,
                        ease: Power4.easeIn
                    })
                    .to(whatIDoSecHeading, 0.2, {
                        opacity: 1
                    })
                    .to(whatIDoHeadAnimator, 0.5, {
                        transformOrigin: 'right center',
                        scaleX: 0,
                        ease: Power4.easeInOut
                    })
                    .from(whatIDoSecp, 0.5, {
                        y: 50,
                        opacity: 0
                    })
                ]
            );

        scene = new ScrollMagic.Scene({
                triggerElement: 'section.what-i-do',
                duration: 0,
                triggerHook: 0.5,
                reverse: false
            })
            .setTween(tl)
            // .addIndicators()
            .addTo(controller);


        $('.skills-sub-section').each(function() {
            tl = new TimelineMax()
                .add([
                    TweenMax.from($(this).find('img'), 1, {
                        y: 150,
                        opacity: 0
                    }),
                    new TimelineMax().to($(this).find('.heading-animator'), 0.8, {
                        transformOrigin: 'left center',
                        scaleX: 1,
                        ease: Power4.easeIn
                    })
                    .to($(this).find('.section-sub-heading'), 0.2, {
                        opacity: 1
                    })
                    .to($(this).find('.heading-animator'), 0.5, {
                        transformOrigin: 'right center',
                        scaleX: 0,
                        ease: Power4.easeInOut
                    })
                    .from($(this).find('p'), 0.5, {
                        y: 50,
                        opacity: 0
                    })
                ]);

            scene = new ScrollMagic.Scene({
                    triggerElement: this,
                    duration: 0,
                    triggerHook: 0.5,
                    reverse: false
                })
                .setTween(tl)
                // .addIndicators()
                .addTo(controller);


            var tween = TweenMax
                .to($(this).find('.fixed-elem'), 1, {
                    y: -250
                })
            parallaxScene = new ScrollMagic.Scene({
                    triggerElement: this,
                    duration: 3000,
                    triggerHook: 0.2
                })
                .setTween(tween)
                // .addIndicators()
                .addTo(controller);


        }) //end foreach




        const fixedCylinder = $('#fixed-cylinder');
        const workHeadAnimator = $('section.myprojects .heading-animator');
        const workSecHeading = $('section.myprojects .section-heading');


        tl = new TimelineMax()
            .to(fixedCylinder, 0.5, {
                y: -350
            })
        parallaxScene = new ScrollMagic.Scene({
                triggerElement: 'section.myprojects',
                duration: 2000,
                triggerHook: 1
            })
            .setTween(tl)
            // .addIndicators()
            .addTo(controller);


        tl = new TimelineMax()
            .add(
                [
                    new TimelineMax()
                    .to(workHeadAnimator, 0.8, {
                        transformOrigin: 'left center',
                        scaleX: 1,
                        ease: Power4.easeIn
                    })
                    .to(workSecHeading, 0.2, {
                        opacity: 1
                    })
                    .to(workHeadAnimator, 0.5, {
                        transformOrigin: 'right center',
                        scaleX: 0,
                        ease: Power4.easeInOut
                    })
                ]
            );

        scene = new ScrollMagic.Scene({
                triggerElement: 'section.myprojects',
                duration: 0,
                triggerHook: 0.5,
                reverse: false
            })
            .setTween(tl)
            // .addIndicators()
            .addTo(controller);


        $('.project-item-single').each(function() {
            var tween = TweenMax
                .from($(this).find('.project-item.p1'), 1, {
                    y: 250
                })

            scene = new ScrollMagic.Scene({
                    triggerElement: this,
                    duration: 0,
                    triggerHook: 0.8,
                    reverse: true
                })
                .setTween(tween)
                // .addIndicators()
                .addTo(controller);


            tween = new TimelineMax()
                .to($(this).find('.img-animator'), 1, {
                    transformOrigin: 'left center',
                    scaleX: 1,
                    ease: Power4.easeIn
                })
                .set($(this).find('.project-item.p2 img'), {
                    opacity: 1
                })

                .to($(this).find('.img-animator'), 0.8, {
                    transformOrigin: 'right center',
                    scaleX: 0,
                    ease: Power4.easeInOut
                });

            scene = new ScrollMagic.Scene({
                    triggerElement: $(this).find('.project-item.p2')[0],
                    duration: 0,
                    triggerHook: 0.8,
                    reverse: false
                })
                .setTween(tween)
                // .addIndicators()
                .addTo(controller);


        }) //end foreach



        const hireHeadAnimator = $('section.hire .heading-animator');
        const hireSecHeading = $('section.hire .section-heading');


        tl = new TimelineMax()
            .add(
                [
                    new TimelineMax()
                    .to(hireHeadAnimator, 0.8, {
                        transformOrigin: 'left center',
                        scaleX: 1,
                        ease: Power4.easeIn
                    })
                    .to(hireSecHeading, 0.2, {
                        opacity: 1
                    })
                    .to(hireHeadAnimator, 0.5, {
                        transformOrigin: 'right center',
                        scaleX: 0,
                        ease: Power4.easeInOut
                    })
                ]
            );

        scene = new ScrollMagic.Scene({
                triggerElement: 'section.hire',
                duration: 0,
                triggerHook: 0.5,
                reverse: false
            })
            .setTween(tl)
            // .addIndicators()
            .addTo(controller);

        const kite = $('#kite');
        const footerbg = $('#footerbg');
        const footerlogo = $('#footerlogo');
        const footertext = $('#footertext');


        tl = new TimelineMax()
            .to(kite, 1, {
                y: -100
            })

        scene = new ScrollMagic.Scene({
                triggerElement: 'footer',
                duration: 1000,
                triggerHook: 0.8,
                reverse: true
            })
            .setTween(tl)
            // .addIndicators()
            .addTo(controller);

        tl = new TimelineMax()
            .from(footerbg, 0.5, {
                transformOrigin: 'right bottom',
                scale: 0
            })
            .from(footerlogo, 0.5, {
                opacity: 0
            })
            .from(footertext, 0.5, {
                y: 20,
                opacity: 0
            })

        scene = new ScrollMagic.Scene({
                triggerElement: footertext[0],
                duration: 0,
                triggerHook: 1,
                reverse: false
            })
            .setTween(tl)
            // .addIndicators()
            .addTo(controller);


        const mainWrapper = $('#main-wrapper');
        const mainNav = $('#main-nav');
        const sidedrawerOpen = $('#sidedrawer-open');
        const sidedrawerClose = $('#sidedrawer-close');
        const navUl = $('#navUl');

        var navTl = new TimelineMax()
            .add('navStart')
            .to(mainWrapper, 0.5, {
                scaleX: 0.9,
                scaleY: 0.9,
                y: '-3%'
            })
            .to(mainNav, 0.8, {
                x: 0,
                ease: Power4.easeIn
            })
            .to(sidedrawerOpen, 0.2, {
                opacity: 0,
                onComplete: function() {
                    sidedrawerOpen.hide();
                },
                onReverseComplete: function() {
                    sidedrawerOpen.show();
                }
            })
            .from(navUl, 0.5, {
                y: 50,
                opacity: 0
            })
            .to(sidedrawerClose, 0.2, {
                visibility: 'visible',
                opacity: 1
            })
            .reverse();

        sidedrawerOpen.on('click', function() {
            navTl.play();
        })
        sidedrawerClose.on('click', function() {
            navTl.reverse();
        })

        navUl.on('click', function() {
            navTl.time(0);
            navTl.reverse();
        })

        navUl.find('a').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top
            }, 500);
        })


    })
})(jQuery);