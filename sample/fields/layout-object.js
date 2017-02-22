define(function(require, exports, module) {

    var UI = require("ui");
    var Alpaca = require("alpaca");

    return UI.registerField("sample-city-picker", Alpaca.Fields.SelectField.extend({
        
        setup: function()
        {
            var self = this;

            this.base();
            
            this.view.layout = this.options.layout;
            
        },

        prepareContainerModel: function(callback)
        {
            var self = this;

            this.base(function(model) {

                callback(model);
            });
        },
        
        initTemplateDescriptor: function()
        {
            var self = this;

            var viewTemplateDescriptor = this.view.getTemplateDescriptor(this.getTemplateDescriptorId(), this);
            var globalTemplateDescriptor = this.view.getGlobalTemplateDescriptor();
            var layout = this.view.getLayout();

            // we only allow the global or layout template to be applied to the top-most field
            var trip = false;
            
            {
                if (globalTemplateDescriptor)
                {
                    this.setTemplateDescriptor(globalTemplateDescriptor);
                    this.singleLevelRendering = true;
                    trip = true;
                }
                else if (layout && layout.templateDescriptor)
                {
                    this.setTemplateDescriptor(layout.templateDescriptor);
                    trip = true;
                }
            }

            if (!trip && viewTemplateDescriptor)
            {
                this.setTemplateDescriptor(viewTemplateDescriptor);
            }

            // ensure we have a template descriptor
            var t = this.getTemplateDescriptor();
            if (!t)
            {
                return Alpaca.throwErrorWithCallback("Unable to find template descriptor for field: " + self.getFieldType());
            }
        },

        applyCreatedItems: function(model, callback)
        {
            var self = this;

            var layoutBindings = null;
            if (self.view.getLayout())
            {
                layoutBindings = self.view.getLayout().bindings;

                // if layout and bindings not provided, assume a default strategy
                if (!layoutBindings && self.view.getLayout().templateDescriptor && model.items.length > 0)
                {
                    layoutBindings = {};

                    for (var i = 0; i < model.items.length; i++)
                    {
                        var name = model.items[i].name;

                        layoutBindings[name] = "[data-alpaca-layout-binding='" + name + "']";
                    }
                }

            }

            if (model.items.length > 0)
            {
                $(self.container).addClass("alpaca-container-has-items");
                $(self.container).attr("data-alpaca-container-item-count", model.items.length);
            }
            else
            {
                $(self.container).removeClass("alpaca-container-has-items");
                $(self.container).removeAttr("data-alpaca-container-item-count");
            }

            for (var i = 0; i < model.items.length; i++)
            {
                var item = model.items[i];

                // find the insertion point
                var insertionPoint = $(self.container).find("." + Alpaca.MARKER_CLASS_CONTAINER_FIELD_ITEM + "[" + Alpaca.MARKER_DATA_CONTAINER_FIELD_ITEM_KEY + "='" + item.name + "']");
                if (!layoutBindings)
                {
                    var holder = $(insertionPoint).parent();

                    $(insertionPoint).replaceWith(item.containerItemEl);

                    // reset domEl to allow for refresh
                    item.domEl = holder;
                }
                else
                {
                    // use a layout
                    var bindingId = layoutBindings[item.name];
                    if (bindingId)
                    {
                        var holder = $(bindingId, self.field);
                        if (holder.length == 0)
                        {
                            // legacy support, fallback to ID based
                            try {
                                holder = $('#' + bindingId, self.field);
                            } catch (e) { }
                        }
                        if (holder.length > 0)
                        {
                            // create a wrapper (which will serve as the domEl)
                            item.domEl = $("<div></div>");
                            $(item.domEl).addClass("alpaca-layout-binding-holder");
                            $(item.domEl).attr("alpaca-layout-binding-field-name", item.name);
                            holder.append(item.domEl);
                            item.domEl.append(item.containerItemEl);
                        }
                    }

                    // remove insertion point
                    $(insertionPoint).remove();
                }

                $(item.containerItemEl).addClass("alpaca-container-item");

                if (i === 0)
                {
                    $(item.containerItemEl).addClass("alpaca-container-item-first");
                }

                if (i + 1 === model.items.length)
                {
                    $(item.containerItemEl).addClass("alpaca-container-item-last");
                }

                $(item.containerItemEl).attr("data-alpaca-container-item-index", i);
                $(item.containerItemEl).attr("data-alpaca-container-item-name", item.name);
                $(item.containerItemEl).attr("data-alpaca-container-item-parent-field-id", self.getId());

                // register the child
                self.registerChild(item, i);
            }

            if (self.options.collapsible)
            {
                // CALLBACK: "collapsible"
                self.fireCallback("collapsible");
            }

            self.triggerUpdate();

            callback();
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

