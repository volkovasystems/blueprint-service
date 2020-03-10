"use strict";

require( "./platform-structure-path.js" );

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const PLATFORM_STRUCTURE_DATA_PATH = (
	path
	.resolve(
		PLATFORM_STRUCTURE_PATH,
		"data"
	)
);

try{
	if(
			fs
			.statSync(
				PLATFORM_STRUCTURE_DATA_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform structure data path",
			"invalid platform structure data path directory",

			"platform structure data path:",
			PLATFORM_STRUCTURE_DATA_PATH
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
		"cannot manifest platform structure data path",
		"invalid platform structure data path directory",

		"platform structure data path:",
		PLATFORM_STRUCTURE_DATA_PATH,

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
	"PLATFORM_STRUCTURE_DATA_PATH",
	PLATFORM_STRUCTURE_DATA_PATH
);

module.exports = PLATFORM_STRUCTURE_DATA_PATH;
