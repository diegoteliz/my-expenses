define([
    'jquery',
    'underscore',
    'backbone',
    'view/categories'
], function($, _, Backbone, CategoriesView) {

    'use strict';

    // TODO: improve this view creating subviews for:
    // - overlay
    // - menu
    // - menuBtn
    // - menuItems
    // - optionsMenu
    // - optionsMenuBtn

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
        
        // TODO move this var below as GLOBAL
        breakpoints         = {
            phoneSmall      : 320,
            phoneMedium     : 480,
            phoneLarge      : 640,
            tablet          : 768,
            desktopSmall    : 1024
        };

    var CoreView = Backbone.View.extend({

        el: 'body',

        events: {
            'click .nav-btn'            : 'toggleMenu',
            'click .nav-link'           : 'navLink',
            'click .options-menu-btn'   : 'toggleOptionsMenu',
            'click .overlay'            : 'overlayHandler',
            'keydown'                   : 'keyDownHandler'
        },

        initialize: function() {

            _.bindAll(this, 'scrollHandler');

            $window.on('scroll', this.scrollHandler);
            $window.on('resize', this.resizeHandler);

            //this.listenTo(this.model, 'change', this.render);
            this.render();
        },

        render: function() {
            // Show List of Categories
            var categoriesView = new CategoriesView();

            console.log('render -> CoreView');
        },

        toggleMenu: function(event) {
            event.preventDefault();

            if($menu.is('.opened')){
                this.closeMenu();
            } else {
                this.openMenu();
            }
        },

        openMenu: function() {

            // Close options menu if opened
            if($optionsMenu.is('.opened')) {
                this.closeOptionsMenu();
            }

            $menu.addClass('opened');
            $menuBtn.addClass('active');
            $overlay.addClass('active');
        },

        closeMenu: function() {
            $menu.removeClass('opened');
            $menuBtn.removeClass('active');
            $overlay.removeClass('active');
        },

        navLink: function(event) {
            var $this = $(event.currentTarget);
            $navLink.removeClass('active');
            $this.addClass('active');
            this.closeMenu();
        },

        overlayHandler: function() {

            // Close main menu if opened
            if($menu.is('.opened')) {
                this.closeMenu();
            }

            // Close options menu if opened
            if($optionsMenu.is('.opened')) {
                this.closeOptionsMenu();
            }
        },

        toggleOptionsMenu: function(event) {
            event.preventDefault();

            if($optionsMenu.is('.opened')){
                this.closeOptionsMenu();
                
            } else {
                this.openOptionsMenu();
            }
        },

        openOptionsMenu: function() {
            
            // Close main menu if opened
            if($menu.is('.opened')) {
                this.closeMenu();
            }

            // Open options menu
            $optionsMenu.addClass('opened');
            $overlay.addClass('invisible');
        },

        closeOptionsMenu: function() {
            $optionsMenu.removeClass('opened');
            $overlay.removeClass('invisible');
        },

        scrollHandler: function() {
            
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
        },

        resizeHandler: function() {
            windowHeight = $window.height();
            windowWidth  = $window.width();
        },

        keyDownHandler: function(event){
            switch (event.which) {
                // Esc key
                case 27:
                    this.$overlay.trigger('click');
                    break;
            }
        }

    });

    return CoreView;
});