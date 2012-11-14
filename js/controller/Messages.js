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

	},

	onMessageFieldKeyup: function(field, event) {
		var ENTER_KEY_CODE = 13;
		var value = field.getValue().trim();
		if (event.keyCode === ENTER_KEY_CODE && value !== '') {
			var store = this.getMessagesStore();
			store.add({label: value, checked: false});
			field.reset();
			store.sync();
		}
	}












































});