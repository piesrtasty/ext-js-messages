Ext.define('Messages.controller.Messages', {

	models: ['Message'],

	stores: ['Messages'],

	extend: 'Ext.app.Controller',

	views: ['MessageField', 'MessageList', 'MessageToolbar']


});