/** @format */

/*

    This is just a simple server to serve the documentation & testing page. This is not essential to the library and is only included to make working and testing easier if so desired. 

*/

import Express from 'express';

// create the Express instance

const App = Express();

// set up the static resources the App instance should use

App.use(Express.static('./public'));
App.use(Express.static('./dist'));

// define a Port for the App to use

const Port = process.env.PORT || 5000;

// create the server

App.listen(Port, () =>
	console.log(`Development enviroment served to Port ${Port}`)
);
