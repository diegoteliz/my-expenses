define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'view/core'
], function($, _, Backbone, Router, CoreView) {

    'use strict';

    var initialize = function() {
        Router.initialize();
        var appView = new CoreView();
    };

    return {
        initialize: initialize
    };

});