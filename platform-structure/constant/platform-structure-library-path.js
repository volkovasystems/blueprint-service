"use strict";

const fs = require( "fs" );
const harden = require( "harden" );
const path = require( "path" );
const util = require( "util" );

require( "./platform-structure-path.js" );

const PLATFORM_STRUCTURE_LIBRARY_PATH = (
	path
	.resolve(
		PLATFORM_STRUCTURE_PATH,
		"library"
	)
);

try{
	if(
		!	fs
			.statSync( PLATFORM_STRUCTURE_LIBRARY_PATH )
			.isDirectory( )
	){
		console
		.error(
			"cannot manifest platform structure library path",
			"invalid platform structure library path directory",

			"platform structure library path:",
			PLATFORM_STRUCTURE_LIBRARY_PATH
		);

		process
		.exit( 1 );
	}
}
catch( error ){
	console
	.error(
		"cannot manifest platform structure library path",
		"invalid platform structure library path directory",

		"platform structure library path:",
		PLATFORM_STRUCTURE_LIBRARY_PATH,

		"error data:",
		(
			util
			.inspect( error )
		)
	);

	process
	.exit( 1 );
}

harden( "PLATFORM_STRUCTURE_LIBRARY_PATH", PLATFORM_STRUCTURE_LIBRARY_PATH );

module.exports = PLATFORM_STRUCTURE_LIBRARY_PATH;
