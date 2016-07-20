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
    function openMenu() {

        // Close options menu if opened
        if($optionsMenu.is('.opened')) {
            closeOptionsMenu();
        }

        // Open menu
        $menu.addClass('opened');
        $menuBtn.addClass('active');
        $overlay.addClass('active');
    }

    function closeMenu() {
        $menu.removeClass('opened');
        $menuBtn.removeClass('active');
        $overlay.removeClass('active');
    }

    function toggleMenu() {
        if($menu.is('.opened')){
            closeMenu();
        } else {
            openMenu();
        }
    }

    $menuBtn.click(function(event) {
        event.preventDefault();
        toggleMenu();
    });

    // Navigations links
    $navLink.click(function(event) {
        event.preventDefault();
        $navLink.removeClass('active');
        $(this).addClass('active');
    });

    // Options menu
    function openOptionsMenu() {
        // Close main menu if opened
        if($menu.is('.opened')) {
            closeMenu();
        }

        // Open options menu
        $optionsMenu.addClass('opened');
        $overlay.addClass('invisible');
    }

    function closeOptionsMenu() {
        $optionsMenu.removeClass('opened');
        $overlay.removeClass('invisible');
    }

    function toggleOptionsMenu() {
        if($optionsMenu.is('.opened')){
            closeOptionsMenu();
        } else {
            openOptionsMenu();
        }
    }

    $optionsBtn.click(function(event) {
        event.preventDefault();
        toggleOptionsMenu();
    });

    // Close all opened menus
    function closeAll() {
        // Close main menu if opened
        if($menu.is('.opened')) {
            closeMenu();
        }

        // Close options menu if opened
        if($optionsMenu.is('.opened')) {
            closeOptionsMenu();
        }
    }
    
    // Overlay
    $overlay.click(function(event) {
        closeAll();
    });

    // General keydowns
    $window.keydown(function(event) {
        
        switch (event.which) {
            
            // Esc key
            case 27:
                
                closeAll();
                
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


    // =============== Pages scripts ===================
    
    // Define App variables
    var $userLogoutBtn  = $('.user-logout-btn'),
        $profileImage   = $('.profile-image'),
        $profileName    = $('.profile-name'),
        $profileEmail   = $('.profile-email');

    // Utilities
    function isPage(element) {
        return $(element).length > 0 ? true : false;
    }

    // Google Sing in
    window.renderButton = function() {

        gapi.signin2.render('google-login-btn', {
            'scope': 'https://www.googleapis.com/auth/spreadsheets',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onSignIn,
            'onfailure': onSignInFailure
        });
    };

    window.onSignIn = function(googleUser){

        $body.removeClass('logged-out').addClass('logged-in');
        
        var profile         = googleUser.getBasicProfile(),
            profileId       = profile.getId(),
            profileName     = profile.getName(),
            profileImageURL = profile.getImageUrl(),
            profileEmail    = profile.getEmail();
        
        // The ID token to pass to backend:
        //var id_token = googleUser.getAuthResponse().id_token;
        //console.log('ID Token: ' + id_token);

        console.log('ID: ' + profileId);
        console.log('Full Name: ' + profileName);
        console.log('Image URL: ' + profileImageURL);
        console.log('Email: ' + profileEmail);

        $profileImage.attr('src', profileImageURL);
        $profileName.text(profileName);
        $profileEmail.text(profileEmail);
    };

    window.onSignInFailure = function(error){
        console.log('Login error: ' + error);
    };

    window.signOut = function() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            $body.removeClass('logged-in').addClass('logged-out');
        });
    };

    $userLogoutBtn.click(function(event) {
        event.preventDefault();
        signOut();
        closeMenu();
    });

    // ==== Homepage ==== //
    if (isPage('.dashboard')) {
        console.log('homepage');
    }

});