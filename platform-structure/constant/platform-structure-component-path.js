"use strict";

require( "./platform-structure-path.js" );

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const PLATFORM_STRUCTURE_COMPONENT_PATH = (
	path
	.resolve(
		PLATFORM_STRUCTURE_PATH,
		"component"
	)
);

try{
	if(
			fs
			.statSync(
				PLATFORM_STRUCTURE_COMPONENT_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform structure component path",
			"invalid platform structure component path directory",

			"platform structure component path:",
			PLATFORM_STRUCTURE_COMPONENT_PATH
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
		"cannot manifest platform structure component path",
		"invalid platform structure component path directory",

		"platform structure component path:",
		PLATFORM_STRUCTURE_COMPONENT_PATH,

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
	"PLATFORM_STRUCTURE_COMPONENT_PATH",
	PLATFORM_STRUCTURE_COMPONENT_PATH
);

module.exports = PLATFORM_STRUCTURE_COMPONENT_PATH;
