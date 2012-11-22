Ext.define('Messages.view.CheckAllBox', {
	
	extend: 'Ext.component',
	
	alias: 'widget.CheckAllBox',
	
	tpl: '<tpl if="hasContent"><input id="toggle-all" type="checkbox" <tpl if="allComplete">checked</tpl>> <label for="toggle-all">Mark all as complete</label></tpl>',

	updateCheckedState: function(totalMessages, checkedMessages) {
		this.update({
			hasContent: !!totalMessages,
			allComplete: checkedMessages == totalMessages
		});
	},

	listeners: {
		render: function (component) {
			component.getEl().on('click', function (event, el) {
				var checked = !!Ext.get(el).getAttribute('checked');
				this.fireEvent('click', checked);
			}, this, {
				delegate: 'input'
			});
		}
	}

});