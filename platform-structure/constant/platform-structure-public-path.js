"use strict";

require( "./platform-structure-path.js" );

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const PLATFORM_STRUCTURE_PUBLIC_PATH = (
	path
	.resolve(
		PLATFORM_STRUCTURE_PATH,
		"public"
	)
);

try{
	if(
			fs
			.statSync(
				PLATFORM_STRUCTURE_PUBLIC_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform structure public path",
			"invalid platform structure public path directory",

			"platform structure public path:",
			PLATFORM_STRUCTURE_PUBLIC_PATH
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
		"cannot manifest platform structure public path",
		"invalid platform structure public path directory",

		"platform structure public path:",
		PLATFORM_STRUCTURE_PUBLIC_PATH,

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
	"PLATFORM_STRUCTURE_PUBLIC_PATH",
	PLATFORM_STRUCTURE_PUBLIC_PATH
);

module.exports = PLATFORM_STRUCTURE_PUBLIC_PATH;
