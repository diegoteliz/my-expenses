define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone) {

    'use strict';

    var AppRouter = Backbone.Router.extend({

        routes: {
            ''              : 'homepage',
            'operations'    : 'operations',
            'categories'    : 'categories',
            'summary'       : 'summary',
            'settings'      : 'settings'
        },

        homepage: function() {
            // TODO: change this to a unique 'homepage' view
            /*var search = new SearchBar({
                el: '#dinamic-content'
            }),
            books = new BooksList({
                el: '#dinamic-content'
            });

            // TODO: create a generic transition
            $('#dinamic-content').show();
            $('#preloader').fadeOut(100);*/
            console.log('homepage');
        },

        operations: function() {
            console.log('operations');
            // TODO: build this section
        },

        categories: function() {
            console.log('categories');
            // TODO: build this section
        },

        summary: function() {
            console.log('summary');
            // TODO: build this section
        },

        settings: function() {
            console.log('settings');
            // TODO: build this section
        }

    });

    //Initialize the Router
    var Router = new AppRouter();

    // Navigation
    $('a').not('.static').click(function(event) {
        event.preventDefault();
        Router.navigate($(this).attr('href'), {
            trigger: true
        });
    });

    // Activate Backbone history
    Backbone.history.start({
        pushState: true
    });

    return Router;

});