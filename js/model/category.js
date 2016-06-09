define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    
    'use strict';

    var Category = Backbone.Model.extend({

        defaults: {
            id: 0,
            name: '',
            color: '#cccccc'
        }

    });
    
    return Category;
});