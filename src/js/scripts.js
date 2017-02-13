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


    // TODO: delete this line =============== Pages scripts ===================
    
    // Define App variables
    /*var $userLogoutBtn  = $('.user-logout-btn'),
        $profileImage   = $('.profile-image'),
        $profileName    = $('.profile-name'),
        $profileEmail   = $('.profile-email');

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

        // console.log('ID: ' + profileId);
        // console.log('Full Name: ' + profileName);
        // console.log('Image URL: ' + profileImageURL);
        // console.log('Email: ' + profileEmail);

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
    });*/





    // =============== Google sheets ===================
    
    // Variables for Google Sheets
    var apiBase         = 'https://sheets.googleapis.com',
        apiVersion      = 'v4',
        apiURL          = apiBase + '/' + apiVersion + '/',
        discoveryUrl    = apiBase + '/$discovery/rest?version=' + apiVersion,
        spreadsheetId   = '15WHNmAqj7GIpFTocH2rMMY2bfqd18En6Lnee-AhGHkg',
        gid             = '1891753743',
        clientId        = '504102905851-nuidhoa6s03n8rs822sbgci4q4b72s7r.apps.googleusercontent.com',
        scopes          = ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        ranges          = {
            dashboard   : 'Current!G4:J4',
            sample      : 'Sheet1!A1:A5',
            available   : apiURL + 'spreadsheets/' + spreadsheetId + '/values/B1',
            savings     : apiURL + 'spreadsheets/' + spreadsheetId + '/values/B2',
            reward      : apiURL + 'spreadsheets/' + spreadsheetId + '/values/B3',
            current     : apiURL + 'spreadsheets/' + spreadsheetId + '/values/B4'
        },
        $googleLoginBtnNew = $('.google-login-btn-new');

    
    // Initiate auth flow in response to user clicking authorize button.
    $googleLoginBtnNew.click(function(event) {
        console.log('# - handleAuthClick');
        event.preventDefault();
        gapi.auth.authorize({
            'client_id': clientId,
            'scope': scopes,
            'immediate': false
        }, handleAuthResult);
    });

    // Check if current user has authorized this application.
    window.checkAuth = function() {
        console.log('1 - checkAuth');
        gapi.auth.authorize({
            'client_id': clientId,
            'scope': scopes.join(' '),
            'immediate': true
        }, handleAuthResult);
    };

    // Handle response from authorization server.
    // @param {Object} authResult Authorization result.
    function handleAuthResult(authResult) {
        console.log('2 - handleAuthResult');
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
            // Hide auth UI, then load client library.
            authorizeDiv.style.opacity = '0.1';
            //loadSheetsApi();
            startApp();
        } else {
            // Show auth UI, allowing the user to initiate authorization by clicking authorize button.
            authorizeDiv.style.opacity = '1';
        }
    }

    // Load Sheets API client library.
    function loadSheetsApi() {
        console.log('3 - loadSheetsApi');
        var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
        gapi.client.load(discoveryUrl).then(listMajors);
    }

    // Print the names and majors of students in a sample spreadsheet:
    function listMajors() {
        console.log('4 - listMajors');
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '15WHNmAqj7GIpFTocH2rMMY2bfqd18En6Lnee-AhGHkg',
            range: 'Sheet1!A2',
        }).then(function(response) {
            var value = response.result.values[0];
            console.log('5 - range:');
            if (value.length > 0) {
                $('.output').html(value);
            } else {
                console.log('No data found');
            }
        }, function(response) {
            console.log('Error: ' + response.result.error.message);
        });
    }

    

    function getRange(range) {
        gapi.client.sheets.spreadsheets.values.get({
            'spreadsheetId': spreadsheetId,
            'range': range,
        }).then(function(response) {
            var results = response.result.values;
            console.log(results);
            return results;
        }, function(response) {
            console.log('Error: ' + response.result.error.message);
        });
    }


    // =============== Pages scripts ===================

    // Define App variables

    // App Utilities
    function isPage(element) {
        return $(element).length > 0 ? true : false;
    }

    function startApp() {
        console.log('3 - startApp');

        if (isPage('.dashboard')) {
            console.log('homepage-route');
            gapi.client.load(discoveryUrl).then(loadDashboard);
        } else if (isPage('.envelopes')) {
            console.log('homepage');
            loadEnvelopes();
        }
        
    }

    // ==== Homepage ==== //
    function loadDashboard() {
        console.log('homepage-data');
        gapi.client.sheets.spreadsheets.values.get({
            'spreadsheetId': spreadsheetId,
            'range': ranges.dashboard,
        }).then(function(response) {
            var results = response.result.values;
            console.log(results);
            renderDashboard(results);
        }, function(response) {
            console.log('Error: ' + response.result.error.message);
        });
    }
    
    function renderDashboard(data) {
        if (data) {
            var $availableVal = $('#available-value'),
                $savingsVal = $('#savings-value'),
                $rewardVal = $('#reward-value'),
                $currentVal = $('#current-value');

            // TODO: improve this below
            $availableVal.html(data[0][0]);
            $savingsVal.html(data[0][1]);
            $rewardVal.html(data[0][2]);
            $currentVal.html(data[0][3]);

        } else {
            console.log('Error loading data');
        }
    }

    // ==== Envelopes ==== //
    function loadEnvelopes() {
        gapi.client.load(discoveryUrl).then(listMajors);
    }

});