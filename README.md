## Url-Shortener

Aim is to develop a url shortener that every developer can use. It uses NodeJS as API, Redis as session storage, Mongo as database and Jade as templating engine.

### Rediraction mechanism
There are two different methods where you can redirect users to specific urls.

	view.save(function(err) {
    	if (err) res.render('500');

    	res.render('view', { 'url': view.url });
    	/**
    	* Alternative solution to HTML5 Refresh.
    	*/
    	// res.redirect(view.url);
	});


### Documentation
As part of Javascript, [jsdoc](http://usejsdoc.org/ "JS DOC") is used. 

### TODO
- Admin panel
- Better UI for both index and error pages.
- Switch to token authentication instead of cookie based one.
