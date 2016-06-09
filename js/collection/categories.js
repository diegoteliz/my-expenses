define([
    'underscore',
    'backbone',
    'model/category'
], function(_, Backbone, Category) {
    
    'use strict';

    var CategoriesCollection = Backbone.Collection.extend({

        model: Category

    });
    
    return CategoriesCollection;
});