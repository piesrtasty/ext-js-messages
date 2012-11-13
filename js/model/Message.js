Ext.define('Messages.model.Message', {
	extend: 'Ext.data.Model',
	fields: ['id', 'label', {name: 'checked', type: 'boolean'}],
	proxy: {
		type: 'localstorage',
		id: 'messages-extjs'
	}
});