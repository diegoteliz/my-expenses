define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone) {
    
    'use strict';
    
    var CategoryView = Backbone.View.extend({

        tagName: 'tr',

        template: _.template($('.category-template').html()),

        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }

    });
    
    return CategoryView;
});