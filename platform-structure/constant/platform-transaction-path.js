"use strict";

const fs = require( "fs" );
const harden = require( "harden" );
const path = require( "path" );
const util = require( "util" );

require( "./platform-transaction-namespace.js" );

const PLATFORM_TRANSACTION_PATH = (
	path
	.resolve(
		PLATFORM_PATH,
		PLATFORM_TRANSACTION_NAMESPACE
	)
);

try{
	if(
		!	fs
			.statSync( PLATFORM_TRANSACTION_PATH )
			.isDirectory( )
	){
		console
		.error(
			"cannot manifest platform transaction path",
			"invalid platform transaction path directory",

			"platform transaction path:",
			PLATFORM_TRANSACTION_PATH
		);

		process
		.exit( 1 );
	}
}
catch( error ){
	console
	.error(
		"cannot manifest platform transaction path",
		"invalid platform transaction path directory",

		"platform transaction path:",
		PLATFORM_TRANSACTION_PATH,

		"error data:",
		(
			util
			.inspect( error )
		)
	);

	process
	.exit( 1 );
}

harden( "PLATFORM_TRANSACTION_PATH", PLATFORM_TRANSACTION_PATH );

module.exports = PLATFORM_TRANSACTION_PATH;
