Ext.define('Messages.controller.Messages', {

	models: ['Message'],

	stores: ['Messages'],

	extend: 'Ext.app.Controller',

	views: ['MessageField', 'MessageList', 'MessageToolbar'],

	refs: [
		{ref: 'messageList', selector: 'messageList'},
		{ref: 'messageToolbar', selector: 'messageToolbar'},
		{ref: 'checkAllBox', selector: 'checkAllBox'}
	],

	init: function() {
		this.control({
			'messageField': {
				keyup: this.onMessageFieldKeyup
			},
			'messageList': {
				messageChecked: this.onMessageChecked,
				itemdblclick: this.onMessageDblClicked,
				onMessageEditKeyup: this.onMessageEditKeyup,
				messageRemoveSelected: this.onMessageRemoveSelected
			},
			'completeButton': {
				click: this.onCheckAllClick
			}
		});

		this.getMessagesStore().on({
			scope: this,
			update: this.onStoreDataChanged,
			datachanged: this.onStoreDataChanged
		});

	}


});