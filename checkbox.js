(function($){ 
    // Checkbox Plugin
    $.fn.checkbox = function(options){
        var appendString = [];
        var self = this;
        
        appendString.push(' <div class="box">');
        appendString.push(' <div class="icon ion-android-checkmark" aria-hidden="true"></div>');
        appendString.push(' </div>');
        appendString.push(' <input type="checkbox" class="checkbox-element"/>');
        (options.label ? appendString.push('<label for="">' + options.label.text + '</label>') : '')

        // Append the string to the element using a join for the array
        this.append(appendString.join(''));
        
        var input = this.find('input');
        var id = this.attr('id');
        var icon = this.find('.icon');
        var label = this.find('label');
        var wrapper = $('<div />', {
            'class': 'checkbox-wrapper'
        });

        if(options.label){
            if(options.label.modalHelp){
                label.attr('triggerFor', options.modalHelp);
                label.wrap('<button type="button" class="link" id="enrol-text" aria-haspopup="true" triggerFor="' + options.modalHelp + '"></button>')
            }
        }

        // Transfer the ID to the input (and label if it exists)
        if(id == '' || id == null || id == undefined){
            input.attr('id', 'new_checkbox' + ($('[id*="new_checkbox"]').length + 1));
            label.attr('for', 'new_checkbox' + ($('[id*="new_checkbox"]').length + 1));
        } else {
            input.attr('id', id);
            label.attr('for', id);
        }
        this.removeAttr('id');
                        
        var clickFunction = function(e){
            if(input.is(':checked')){
                icon.css('display', 'none');
                input.prop('checked', false);
            } else {
                icon.css('display', 'block');
                input.prop('checked', true);
            }

            if(options){
                if(options.onclick){
                    options.onclick({
                        'checked': input.is(':checked')
                    });
                }
            }
        }
        // Setup event listeners
        this.click(function(e){
            clickFunction(e);
        });

        this.find('[type=checkbox]').click(function(e){
            clickFunction(e);
        })
        
        // Return the parent
        return this;
    }
}(jQuery));
