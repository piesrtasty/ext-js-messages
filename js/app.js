Ext.Loader.setConfig({ enabled: true });

Ext.application{(
	
	name: 'Messages',
	
	appFolder: 'js',
	
	controllers: ['Messages'],
	
	launch: function() {

		Ext.create('Messages.view.MessageField', {
			renderTo: Ext.select('header').first(),
			contentEl: 'new-message'
		});

		Ext.create('Messages.view.CheckAllBox', {
			renderTo: 'main'
		});

		Ext.create('Messages.view.MessageList', {
			renderTo: 'main'
		});

		Ext.create('Messages.view.MessageToolbar', {
			renderTo: 'messageapp'
		});

	}

)};