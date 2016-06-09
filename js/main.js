require.config({
    paths: {
        jquery: [
            '//code.jquery.com/jquery-1.11.3.min',
            'lib/jquery',
        ],
        underscore: [
            '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
            'lib/underscore'
        ],
        backbone: [
            '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min',
            'lib/backbone'
        ],
        text: [
            '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
            'lib/text'
        ]
    },

    shim: {
        Backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

require(['app'], function(App) {

    'use strict';

    App.initialize();
});