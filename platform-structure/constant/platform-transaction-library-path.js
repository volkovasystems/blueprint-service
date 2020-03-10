"use strict";

const fs = require( "fs" );
const harden = require( "harden" );
const path = require( "path" );
const util = require( "util" );

require( "./platform-transaction-path.js" );

const PLATFORM_TRANSACTION_LIBRARY_PATH = (
	path
	.resolve(
		PLATFORM_TRANSACTION_PATH,
		"library"
	)
);

try{
	if(
		!	fs
			.statSync( PLATFORM_TRANSACTION_LIBRARY_PATH )
			.isDirectory( )
	){
		console
		.error(
			"cannot manifest platform transaction library path",
			"invalid platform transaction library path directory",

			"platform transaction library path:",
			PLATFORM_TRANSACTION_LIBRARY_PATH
		);

		process
		.exit( 1 );
	}
}
catch( error ){
	console
	.error(
		"cannot manifest platform transaction library path",
		"invalid platform transaction library path directory",

		"platform transaction library path:",
		PLATFORM_TRANSACTION_LIBRARY_PATH,

		"error data:",
		(
			util
			.inspect( error )
		)
	);

	process
	.exit( 1 );
}

harden( "PLATFORM_TRANSACTION_LIBRARY_PATH", PLATFORM_TRANSACTION_LIBRARY_PATH );

module.exports = PLATFORM_TRANSACTION_LIBRARY_PATH;
