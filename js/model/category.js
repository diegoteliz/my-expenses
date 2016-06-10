define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    
    'use strict';

    // Category model
    var Category = Backbone.Model.extend({
        defaults: {
            id: 0,
            name: '',
            color: '#cccccc'
        }
    });

    return Category;
});