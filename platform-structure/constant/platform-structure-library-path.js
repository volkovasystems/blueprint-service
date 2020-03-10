"use strict";

require( "./platform-structure-path.js" );

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const PLATFORM_STRUCTURE_LIBRARY_PATH = (
	path
	.resolve(
		PLATFORM_STRUCTURE_PATH,
		"library"
	)
);

try{
	if(
			fs
			.statSync(
				PLATFORM_STRUCTURE_LIBRARY_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform structure library path",
			"invalid platform structure library path directory",

			"platform structure library path:",
			PLATFORM_STRUCTURE_LIBRARY_PATH
		);

		process
		.exit(
			1
		);
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
			.inspect(
				error
			)
		)
	);

	process
	.exit(
		1
	);
}

hardenProperty(
	"PLATFORM_STRUCTURE_LIBRARY_PATH",
	PLATFORM_STRUCTURE_LIBRARY_PATH
);

module.exports = PLATFORM_STRUCTURE_LIBRARY_PATH;
