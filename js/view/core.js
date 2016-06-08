define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    'use strict';

    var CoreView = Backbone.View.extend({

        el              : 'body',
        $overlay        : $('.overlay'),
        $window         : $(window),
        $menuBtn        : $('.nav-btn'),
        $optionsBtn     : $('.options-menu-btn'),
        $mainHeader     : $('.main-header'),
        $menu           : $('.main-nav'),
        $optionsMenu    : $('.options-menu'),
        $navItem        : $('.nav-item'),
        $navLink        : $('.nav-link'),

        events: {
            // TODO: add events here
            //'submit .search-form': 'search',
            'click .nav-btn'            : 'toggleMenu',
            'click .nav-link'           : 'navLink',
            'click .options-menu-btn'   : 'toggleOptionsMenu',
            'click .overlay'            : 'overlayHandler',
            'keydown'                   : 'keyDownHandler'
        },

        initialize: function() {
            //this.listenTo(this.model, 'change', this.render);
            //this.render();

            var $window         = $(window),
                $mainHeader     = this.$mainHeader,
                windowHeight    = $window.height(),
                windowWidth     = $window.width(),
                currentPosition = $window.scrollTop(),
                breakpoints     = {
                    phoneSmall      : 320,
                    phoneMedium     : 480,
                    phoneLarge      : 640,
                    tablet          : 768,
                    desktopSmall    : 1024
                };

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
        },

        render: function() {
            //console.log('render -> CoreView');
        },

        toggleMenu: function(event) {
            event.preventDefault();
            var $menu = this.$menu;

            if($menu.is('.opened')){
                this.closeMenu();
            } else {
                this.openMenu();
            }
        },

        openMenu: function() {

            var $menu           = this.$menu,
                $menuBtn        = this.$menuBtn,
                $overlay        = this.$overlay,
                $optionsMenu    = this.$optionsMenu;

            // Close options menu if opened
            if($optionsMenu.is('.opened')) {
                this.closeOptionsMenu();
            }

            $menu.addClass('opened');
            $menuBtn.addClass('active');
            $overlay.addClass('active');
        },

        closeMenu: function() {

            var $menu       = this.$menu,
                $menuBtn    = this.$menuBtn,
                $overlay    = this.$overlay;
            
            $menu.removeClass('opened');
            $menuBtn.removeClass('active');
            $overlay.removeClass('active');
        },

        navLink: function(event) {
            var $navLink    = this.$navLink,
                $this       = $(event.currentTarget);
            
            $navLink.removeClass('active');
            $this.addClass('active');
            
            this.closeMenu();
        },

        overlayHandler: function() {

            var $menu           = this.$menu,
                $optionsMenu    = this.$optionsMenu;
            
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

            var $optionsMenu    = this.$optionsMenu,
                $menu           = this.$menu;
                
            if($optionsMenu.is('.opened')){
                this.closeOptionsMenu();
                
            } else {
                this.openOptionsMenu();
            }
        },

        openOptionsMenu: function() {
            var $optionsMenu    = this.$optionsMenu,
                $menu           = this.$menu,
                $overlay        = this.$overlay;
            
            // Close main menu if opened
            if($menu.is('.opened')) {
                this.closeMenu();
            }

            // Open options menu
            $optionsMenu.addClass('opened');
            $overlay.addClass('invisible');
        },

        closeOptionsMenu: function() {
            var $optionsMenu    = this.$optionsMenu,
                $overlay        = this.$overlay;
            
            // Close options menu
            $optionsMenu.removeClass('opened');
            $overlay.removeClass('invisible');
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