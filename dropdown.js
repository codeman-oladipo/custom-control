// ADD no-theme TO ELEMENT TO KEEP DEFAULT STYLING

(function(){
    
    $('#body[theme=ssep]').find('select:not([no-theme])').each(function(){
        var defaultElement = $(this);
        var id = defaultElement.attr('id');
        var firstItem = defaultElement.find('option:eq(0)');
        var itemCount = defaultElement.find('option').length;
        var context = $('body').attr('contextPath');

        // Set new ID for default dropdown and hide the element
        defaultElement.attr('id', id + '_default');
        defaultElement.hide();

        // Build custom dropdown
        var htmlString = [];

        htmlString.push('<div style="width: ' + (defaultElement.width() + 100) + 'px;" control="forms:dropdown" id="' + id + '">');
        htmlString.push('    <img src="' + context + '/static1/images/uti-dropdown-triangle-forms-down.png" />');
        htmlString.push('    <div select value="' + firstItem.val() + '">' + firstItem.text() + '</div>');
        htmlString.push('    <div selections class="no-show">');
        defaultElement.find('option').each(function(index){
            htmlString.push('       <div ' + (index == 0 ? 'class="checked" ' : '') + '' + (itemCount == (index + 1) ? 'last ' : '') + 'item optionId="' + index + '" value="' + $(this).val() + '">' + $(this).text() + '</div>');
        });
        htmlString.push('    </div>');
        htmlString.push('</div>');

        defaultElement.before($().add(htmlString.join('\n')));

        var newDropdown = $('[id=' + id + ']');

        newDropdown.data({
            items:  newDropdown.find('[item]')
        });

        newDropdown.on('click', function(){
            var self = $(this);

            if(self.find('.no-show').length == 0){
                self.find('[selections]').addClass('no-show');
            } else {
                self.find('[selections]').removeClass('no-show');
            }
        });

        newDropdown.find('[item]').on('click', function(){
            var self = $(this);

            newDropdown.find('[item]').removeClass('checked');
            newDropdown.find('[select]').attr('value', self.attr('value'));
            newDropdown.find('[select]').text(self.text());

            self.addClass('checked');
            defaultElement.find('option').prop('selected', false);
            defaultElement.find('option:eq(' + self.attr('optionId') + ')').prop('selected', true);
        })
    })
})()