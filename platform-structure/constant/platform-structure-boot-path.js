"use strict";

require( "./platform-structure-path.js" );

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const PLATFORM_STRUCTURE_BOOT_PATH = (
	path
	.resolve(
		PLATFORM_STRUCTURE_PATH,
		"boot"
	)
);

try{
	if(
			fs
			.statSync(
				PLATFORM_STRUCTURE_BOOT_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform structure boot path",
			"invalid platform structure boot path directory",

			"platform structure boot path:",
			PLATFORM_STRUCTURE_BOOT_PATH
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
		"cannot manifest platform structure boot path",
		"invalid platform structure boot path directory",

		"platform structure boot path:",
		PLATFORM_STRUCTURE_BOOT_PATH,

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
	"PLATFORM_STRUCTURE_BOOT_PATH",
	PLATFORM_STRUCTURE_BOOT_PATH
);

module.exports = PLATFORM_STRUCTURE_BOOT_PATH;
