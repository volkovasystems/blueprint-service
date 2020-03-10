"use strict";

const fs = require( "fs" );
const harden = require( "harden" );
const path = require( "path" );
const util = require( "util" );

require( "./platform-structure-namespace.js" );

const PLATFORM_STRUCTURE_PATH = (
	path
	.resolve(
		PLATFORM_PATH,
		PLATFORM_STRUCTURE_NAMESPACE
	)
);

try{
	if(
		!	fs
			.statSync( PLATFORM_STRUCTURE_PATH )
			.isDirectory( )
	){
		console
		.error(
			"cannot manifest platform structure path",
			"invalid platform structure path directory",

			"platform structure path:",
			PLATFORM_STRUCTURE_PATH
		);

		process
		.exit( 1 );
	}
}
catch( error ){
	console
	.error(
		"cannot manifest platform structure path",
		"invalid platform structure path directory",

		"platform structure path:",
		PLATFORM_STRUCTURE_PATH,

		"error data:",
		(
			util
			.inspect( error )
		)
	);

	process
	.exit( 1 );
}

harden( "PLATFORM_STRUCTURE_PATH", PLATFORM_STRUCTURE_PATH );

module.exports = PLATFORM_STRUCTURE_PATH;
