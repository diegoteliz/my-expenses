define([
    'jquery',
    'underscore',
    'backbone',
    'model/category',
    'view/category'
], function($, _, Backbone, Category, CategoryView) {
    
    'use strict';
    
    var CategoriesView = Backbone.View.extend({

        el: '.table',

        initialize: function() {
            this.render();
        },

        render: function() {

            this.$el.html('');

            Categories.each(function(model) {
                
                var category = new CategoryView({
                    model: model
                });

                this.$el.append(category.render().el);

            }.bind(this));

            return this;

        }

    });
    
    return CategoriesView;
});