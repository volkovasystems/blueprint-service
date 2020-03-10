"use strict";

const fs = require( "fs" );
const harden = require( "harden" );
const path = require( "path" );
const util = require( "util" );

require( "./platform-structure-path.js" );

const PLATFORM_STRUCTURE_SERVICE_PATH = (
	path
	.resolve(
		PLATFORM_STRUCTURE_PATH,
		"service"
	)
);

try{
	if(
		!	fs
			.statSync( PLATFORM_STRUCTURE_SERVICE_PATH )
			.isDirectory( )
	){
		console
		.error(
			"cannot manifest platform structure service path",
			"invalid platform structure service path directory",

			"platform structure service path:",
			PLATFORM_STRUCTURE_SERVICE_PATH
		);

		process
		.exit( 1 );
	}
}
catch( error ){
	console
	.error(
		"cannot manifest platform structure service path",
		"invalid platform structure service path directory",

		"platform structure service path:",
		PLATFORM_STRUCTURE_SERVICE_PATH,

		"error data:",
		(
			util
			.inspect( error )
		)
	);

	process
	.exit( 1 );
}

harden( "PLATFORM_STRUCTURE_SERVICE_PATH", PLATFORM_STRUCTURE_SERVICE_PATH );

module.exports = PLATFORM_STRUCTURE_SERVICE_PATH;
