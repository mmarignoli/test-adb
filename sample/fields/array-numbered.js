define(function(require, exports, module) {

    var UI = require("ui");
    var Alpaca = require("alpaca");

    return UI.registerField("array-numbered", Alpaca.Fields.ArrayField.extend({
       
        createItem: function(index, itemSchema, itemOptions, itemData, postRenderCallback)
        {
            var i = index+1;
            itemOptions.label = itemOptions.label + " " + i + " ";
            this.base(index, itemSchema, itemOptions, itemData, postRenderCallback);
        }

    }));

});
