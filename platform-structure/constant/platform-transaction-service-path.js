"use strict";

const fs = require( "fs" );
const harden = require( "harden" );
const path = require( "path" );
const util = require( "util" );

require( "./platform-transaction-path.js" );

const PLATFORM_TRANSACTION_SERVICE_PATH = (
	path
	.resolve(
		PLATFORM_TRANSACTION_PATH,
		"service"
	)
);

try{
	if(
		!	fs
			.statSync( PLATFORM_TRANSACTION_SERVICE_PATH )
			.isDirectory( )
	){
		console
		.error(
			"cannot manifest platform transaction service path",
			"invalid platform transaction service path directory",

			"platform transaction service path:",
			PLATFORM_TRANSACTION_SERVICE_PATH
		);

		process
		.exit( 1 );
	}
}
catch( error ){
	console
	.error(
		"cannot manifest platform transaction service path",
		"invalid platform transaction service path directory",

		"platform transaction service path:",
		PLATFORM_TRANSACTION_SERVICE_PATH,

		"error data:",
		(
			util
			.inspect( error )
		)
	);

	process
	.exit( 1 );
}

harden( "PLATFORM_TRANSACTION_SERVICE_PATH", PLATFORM_TRANSACTION_SERVICE_PATH );

module.exports = PLATFORM_TRANSACTION_SERVICE_PATH;
