"use strict";

const fs = require( "fs" );
const harden = require( "harden" );
const path = require( "path" );
const util = require( "util" );

require( "./platform-transaction-path.js" );

const PLATFORM_TRANSACTION_BOOT_PATH = (
	path
	.resolve(
		PLATFORM_TRANSACTION_PATH,
		"boot"
	)
);

try{
	if(
		!	fs
			.statSync( PLATFORM_TRANSACTION_BOOT_PATH )
			.isDirectory( )
	){
		console
		.error(
			"cannot manifest platform transaction boot path",
			"invalid platform transaction boot path directory",

			"platform transaction boot path:",
			PLATFORM_TRANSACTION_BOOT_PATH
		);

		process
		.exit( 1 );
	}
}
catch( error ){
	console
	.error(
		"cannot manifest platform transaction boot path",
		"invalid platform transaction boot path directory",

		"platform transaction boot path:",
		PLATFORM_TRANSACTION_BOOT_PATH,

		"error data:",
		(
			util
			.inspect( error )
		)
	);

	process
	.exit( 1 );
}

harden( "PLATFORM_TRANSACTION_BOOT_PATH", PLATFORM_TRANSACTION_BOOT_PATH );

module.exports = PLATFORM_TRANSACTION_BOOT_PATH;
