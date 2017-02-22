define(function(require, exports, module) {

    var UI = require("ui");
    var Alpaca = require("alpaca");

    return UI.registerField("array-numbered", Alpaca.Fields.ArrayField.extend({
       
        createItem: function(index, itemSchema, itemOptions, itemData, postRenderCallback)
        {
            itemOptions.label = itemOptions.label + " " + index+1 + " ";
            this.base(index, itemSchema, itemOptions, itemData, postRenderCallback);
        }

    }));

});
