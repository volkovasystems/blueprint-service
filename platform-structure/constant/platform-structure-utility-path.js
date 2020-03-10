"use strict";

const fs = require( "fs" );
const harden = require( "harden" );
const path = require( "path" );
const util = require( "util" );

require( "./platform-structure-path.js" );

const PLATFORM_STRUCTURE_UTILITY_PATH = (
	path
	.resolve(
		PLATFORM_STRUCTURE_PATH,
		"utility"
	)
);

try{
	if(
		!	fs
			.statSync( PLATFORM_STRUCTURE_UTILITY_PATH )
			.isDirectory( )
	){
		console
		.error(
			"cannot manifest platform structure utility path",
			"invalid platform structure utility path directory",

			"platform structure utility path:",
			PLATFORM_STRUCTURE_UTILITY_PATH
		);

		process
		.exit( 1 );
	}
}
catch( error ){
	console
	.error(
		"cannot manifest platform structure utility path",
		"invalid platform structure utility path directory",

		"platform structure utility path:",
		PLATFORM_STRUCTURE_UTILITY_PATH,

		"error data:",
		(
			util
			.inspect( error )
		)
	);

	process
	.exit( 1 );
}

harden( "PLATFORM_STRUCTURE_UTILITY_PATH", PLATFORM_STRUCTURE_UTILITY_PATH );

module.exports = PLATFORM_STRUCTURE_UTILITY_PATH;
