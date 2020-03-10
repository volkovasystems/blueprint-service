"use strict";

require( "./platform-structure-path.js" );

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const PLATFORM_STRUCTURE_SCHEMA_PATH = (
	path
	.resolve(
		PLATFORM_STRUCTURE_PATH,
		"schema"
	)
);

try{
	if(
			fs
			.statSync(
				PLATFORM_STRUCTURE_SCHEMA_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform structure schema path",
			"invalid platform structure schema path directory",

			"platform structure schema path:",
			PLATFORM_STRUCTURE_SCHEMA_PATH
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
		"cannot manifest platform structure schema path",
		"invalid platform structure schema path directory",

		"platform structure schema path:",
		PLATFORM_STRUCTURE_SCHEMA_PATH,

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
	"PLATFORM_STRUCTURE_SCHEMA_PATH",
	PLATFORM_STRUCTURE_SCHEMA_PATH
);

module.exports = PLATFORM_STRUCTURE_SCHEMA_PATH;
