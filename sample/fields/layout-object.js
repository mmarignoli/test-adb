define(function(require, exports, module) {

    var UI = require("ui");
    var Alpaca = require("alpaca");

    return UI.registerField("layout-object", Alpaca.Fields.ObjectField.extend({
       
        /**
         * @see Alpaca.ControlField#getFieldType
         */
        getFieldType: function() {
            return "layout-object";
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

