define(function(require, exports, module) {

    var UI = require("ui");
    var Alpaca = require("alpaca");

    return UI.registerField("sample-city-picker", Alpaca.Fields.SelectField.extend({

        prepareContainerModel: function(callback)
        {
            var self = this;

            this.base(function(model) {

                callback(model);
            });
        },

        /**
         * @see Alpaca.ControlField#getFieldType
         */
        getFieldType: function() {
            return "object";
        },

        /**
         * @see Alpaca.ControlField#getType
         */
        getType: function() {
            return "object";
        }

        /* builder_helpers */
        ,

        /**
         * @see Alpaca.ControlField#getTitle
         */
        getTitle: function() {
            return "Layout object Field";
        },

        /**
         * @see Alpaca.ControlField#getDescription
         */
        getDescription: function() {
            return "Renders object items into a layout";
        }

        /* end_builder_helpers */
    }));

});

