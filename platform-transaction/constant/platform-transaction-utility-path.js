"use strict";

const fs = require( "fs" );
const harden = require( "harden" );
const path = require( "path" );
const util = require( "util" );

require( "./platform-transaction-path.js" );

const PLATFORM_TRANSACTION_UTILITY_PATH = (
	path
	.resolve(
		PLATFORM_TRANSACTION_PATH,
		"utility"
	)
);

try{
	if(
		!	fs
			.statSync( PLATFORM_TRANSACTION_UTILITY_PATH )
			.isDirectory( )
	){
		console
		.error(
			"cannot manifest platform transaction utility path",
			"invalid platform transaction utility path directory",

			"platform transaction utility path:",
			PLATFORM_TRANSACTION_UTILITY_PATH
		);

		process
		.exit( 1 );
	}
}
catch( error ){
	console
	.error(
		"cannot manifest platform transaction utility path",
		"invalid platform transaction utility path directory",

		"platform transaction utility path:",
		PLATFORM_TRANSACTION_UTILITY_PATH,

		"error data:",
		(
			util
			.inspect( error )
		)
	);

	process
	.exit( 1 );
}

harden( "PLATFORM_TRANSACTION_UTILITY_PATH", PLATFORM_TRANSACTION_UTILITY_PATH );

module.exports = PLATFORM_TRANSACTION_UTILITY_PATH;
