jQuery(document).ready(function($) {

    'use strict';

    // Define global variables
    var $window             = $(window),
        $body               = $('body'),
        $menuBtn            = $('.nav-btn'),
        $optionsBtn         = $('.options-menu-btn'),
        $mainHeader         = $('.main-header'),
        $menu               = $('.main-nav'),
        $optionsMenu        = $('.options-menu'),
        $overlay            = $('.overlay'),
        $navItem            = $('.nav-item'),
        $navLink            = $('.nav-link'),
        windowHeight        = $window.height(),
        windowWidth         = $window.width(),
        currentPosition     = $window.scrollTop(),
        breakpoints         = {
            phoneSmall      : 320,
            phoneMedium     : 480,
            phoneLarge      : 640,
            tablet          : 768,
            desktopSmall    : 1024
        };

    // Main navigation
    $menuBtn.click(function(event) {
        event.preventDefault();

        if(!$menu.is('.opened')){

            // Close options menu if opened
            if($optionsMenu.is('.opened')) {
                $optionsBtn.trigger('click');
            }

            // Open menu
            $menu.addClass('opened');
            $menuBtn.addClass('active');
            $overlay.addClass('active');
        } else {
            
            // Close menu
            $menu.removeClass('opened');
            $menuBtn.removeClass('active');
            $overlay.removeClass('active');
        }
    });

    // Navigations links
    $navLink.click(function(event) {
        event.preventDefault();
        $navLink.removeClass('active');
        $(this).addClass('active');
    });

    // Options menu
    $optionsBtn.click(function(event) {
        event.preventDefault();

        if(!$optionsMenu.is('.opened')){

            // Close main menu if opened
            if($menu.is('.opened')) {
                $menuBtn.trigger('click');
            }

            // Open options menu
            $optionsMenu.addClass('opened');
            $overlay.addClass('invisible');
        } else {
            
            // Close options menu
            $optionsMenu.removeClass('opened');
            $overlay.removeClass('invisible');
        }
    });

    // Overlay
    $overlay.click(function(event) {
        
        // Close main menu if opened
        if($menu.is('.opened')) {
            $menuBtn.trigger('click');
        }

        // Close options menu if opened
        if($optionsMenu.is('.opened')) {
            $optionsBtn.trigger('click');
        }
    });


    // General keydowns
    $window.keydown(function(event) {
        
        switch (event.which) {
            
            // Esc key
            case 27:
                
                // Close main menu if opened
                if($menu.is('.opened')) {
                    $menuBtn.trigger('click');
                }
                
                // Close options menu if opened
                if($optionsMenu.is('.opened')) {
                    $optionsBtn.trigger('click');
                }
                
                break;
        }
    });


    // Events triggered on scroll
    $window.on('scroll', function(event) {

        if (windowWidth <= breakpoints.desktopSmall) {

            // Show / Hide Main header on Mobile
            var scroll = $window.scrollTop();

            if (scroll > currentPosition) {
                if (currentPosition >= 50) {
                    $mainHeader.addClass('collapsed');
                }

            } else {
                if ($mainHeader.is('.collapsed')) {
                    $mainHeader.removeClass('collapsed');
                }
            }

            currentPosition = scroll;
        }

    });


    // Events triggered on Window resize
    $window.on('resize', function(event) {
        windowHeight    = $window.height();
        windowWidth     = $window.width();
    });

});