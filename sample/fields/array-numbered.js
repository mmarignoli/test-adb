define(function(require, exports, module) {

    var UI = require("ui");
    var Alpaca = require("alpaca");

    return UI.registerField("layout-object", Alpaca.Fields.ArrayField.extend({
       
        createItem: function(index, itemSchema, itemOptions, itemData, postRenderCallback)
        {
            itemOptions.label = itemOptions.label + " " + index + " ";
            this.base(index, itemSchema, itemOptions, itemData, postRenderCallback);
        }

    }));

});
