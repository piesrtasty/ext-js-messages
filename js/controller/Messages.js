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

	onMessageFieldKeyup: function (field, event) {
		var ENTER_KEY_CODE = 13;
		var value = field.getValue().trim();
		if (event.keyCode === ENTER_KEY_CODE && value !== '') {
			var store = this.getMessagesStore();
			store.add({label: value, checked: false});
			field.reset();
			store.sync();
		}
	},

	onMessageChecked: function (record) {
		record.set('checked', !record.get('checked'));
		record.store.sync();
		record.commit();
	},

	onMessageDblClicked: function (list, record, el) {
		record.set('editing', true);
		record.store.sync();
		record.commit();
	},

	onMessageRemoveSelected: function (record) {
		var store = this.getMessagesStore();
		store.remove(record);
		store.sync();
	},

	onMessageEditKeyup: function(event, record, extEl) {
		var ENTER_KEY_CODE = 13;
		if (event.keyCode === ENTER_KEY_CODE) {
			this.finalizeMessageEdit(extEl, record);
		}
	},

	finalizeMessageEdit: function (extEl, record) {
		var value = extEl.getValue().trim();

		if (!value) {
			var store = this.getMessagesStore();
			store.sync();
		} else {
			record.set('label', value);
			record.set('editing', false);
			record.store.sync();
			record.commit();
		}
	},

	onClearButtonClick: function() {
		var records = [];
		store = this.getMessagesStore();

		store.each(function(record) {
			if (record.get('checked')) {
				records.push(record);
			}
		});
		store.remove(records);
		store.sync();
	},

	onCheckAllClick: function(checked) {
		var store = this.getMessagesStore();
		store.each(function(record) {
			record.set('checked', checked);
		});
		store.sync();
	},

	onStoreDataChanged: function() {
		var info = '', text = '',
		store = this.getMessagesStore(),
		totalCount = store.getCount(),
		toolbar = this.getMessageToolbar(),
		button = toolbar.items.first(),
		container = store.queryBy(function(record) {
			return !record.get('checked');
		}),
		count = records.getCount();
		checkedCount = totalCount - count;

		if (count) {
			info = '<b>' + count + '</b> message' + (count > 1 ? 's' : '') + ' left.';
		}

		if (checkedCount) {
			text = 'Clear ' + checkedCount + ' read message' + (checkedCount > 1 ? 's' : '');
		}

		this.getCheckAllBox().updateCheckedState(totalCount, checkedCount);
		container.update(info);
		button.setText(text);
		button.setVisible(checkedCount);
		toolbar.setVisible(totalCount);
	}

});





































