define(function(require, exports, module) {

    var UI = require("ui");
    var Alpaca = require("alpaca");

    /**
     * Defines a Content picker field that populates a select field with the results of a query into Cloud CMS
     * for content of a given type.  The type can be provided in the field options using the "contentType"
     * property.
     *
     * To use this field, set your field option "type" to "sample-content-picker".  And then also set the field
     * option "contentType" to the definition QName that you want to query for.
     *
     * The select control will populate with all instances of the specified type.
     */
    return UI.registerField("command", Alpaca.Fields.ObjectField.extend({

        getFieldType: function() {
            return "custom";
        },
        
        postRender: function(callback) {
            var self = this;
            self.on("ready", function() {
                var deviceCommand = self.childrenByPropertyId["deviceCommand"];
                deviceCommand.on("change", function() {
                    var deviceCommandParameterInstances = self.childrenByPropertyId["deviceCommandParameterInstances"];
                    var successCallback = function(obj) {
                        deviceCommandParameterInstances.setValue(obj.deviceCommandParameterInstances);
                    }
                    var nodeId = this.data;
                    if (nodeId != "") {
                        deviceCommandParameterInstances.connector.loadData(nodeId, null, successCallback, null);
                    }
                    else {
                        deviceCommandParameterInstances.setvalue("[]");
                    }
                })
            });
            
            this.base(function() {

                callback();

            });
        },
        
        setup: function () {

            this.base();

        }

    }));

});
