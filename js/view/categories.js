define([
    'jquery',
    'underscore',
    'backbone',
    'model/category',           // TODO: remove this when data comes from server
    'collection/categories',
    'view/category'
], function($, _, Backbone, Category, CategoriesCollection, CategoryView) {

    'use strict';

    // Create Surfboards View
    var CategoriesView = Backbone.View.extend({

        el: '.table',

        initialize: function() {
            this.render();
        },

        render: function() {
        
            this.$el.html('');

            
            //--- TODO: change this instances below by data from server
            // New instance of Category model - categoryExample3
            var categoryExample1 = new Category({
                id: 1,
                name: 'Category Example 1',
                color: '#ff0000'
            });

            // New instance of Category model - categoryExample2
            var categoryExample2 = new Category({
                id: 2,
                name: 'Category Example 2',
                color: '#ffff00'
            });

            // New instance of Category model - categoryExample3
            var categoryExample3 = new Category({
                id: 3,
                name: 'Category Example 1',
                color: '#0000ff'
            });
            // end TODO ---/


            // Create new instance of CategoriesCollection
            // and add three model instances to it.
            var Categories = new CategoriesCollection();
            Categories.add(categoryExample1);
            Categories.add(categoryExample2);
            Categories.add(categoryExample3);

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