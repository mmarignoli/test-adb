define(function(require, exports, module) {

    var UI = require("ui");
    var Alpaca = require("alpaca");

    return UI.registerField("layout-object", Alpaca.Fields.ArrayField.extend({
       
        createItem: function(index, itemSchema, itemOptions, itemData, postRenderCallback)
        {
            itemOptions.label = itemOptions.label + " " + index + " ";
            this.base(index, itemSchema, itemOptions, itemData, postRenderCallback);
        }
        
        /**
         * @see Alpaca.ControlField#getFieldType
         */
        getFieldType: function() {
            return "array";
        },

        /**
         * @see Alpaca.ControlField#getType
         */
        getType: function() {
            return "array";
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
