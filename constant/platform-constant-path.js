"use strict";

const fs = require( "fs" );
const os = require( "os" );
const path = require( "path" );
const util = require( "util" );

const PLATFORM_CONSTANT_PATH = (
	(
		function( ){
			const homeDirectoryPath = (
					(
							(
									(
											"PLATFORM_DIRECTORY"
										in	global
									)
								===	true
							)

						&&	(
									typeof
									PLATFORM_DIRECTORY
								==	"string"
							)

						&&	(
									PLATFORM_DIRECTORY
									.length
								>	0
							)
					)
				?	PLATFORM_DIRECTORY
				:	(
						os
						.homedir( )
					)
			);

			const homeDirectoryPathTokenList = (
				homeDirectoryPath
				.split(
					path
					.sep
				)
			);

			const platformDirectoryPathTokenList = (
				path
				.resolve(
					__dirname,
					"../"
				)
				.split(
					path
					.sep
				)
			);

			const platformDirectoryPath = (
				path
				.resolve(
					homeDirectoryPath,

					(
						homeDirectoryPathTokenList
						.filter(
							pathToken => (
									platformDirectoryPathTokenList
									.includes(
										pathToken
									)
								===	false
							)
						)
						.concat(
							platformDirectoryPathTokenList
							.filter(
								pathToken => (
										homeDirectoryPathTokenList
										.includes(
											pathToken
										)
									===	false
								)
							)
						)
						.pop( )
					)
				)
			);

			const platformConstantPath = (
				`${ platformDirectoryPath }/constant`
			);

			return	platformConstantPath;
		}
	)( )
);

try{
	if(
			fs
			.statSync(
				PLATFORM_CONSTANT_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform constant path",

			"invalid platform constant path directory",

			`@PLATFORM_CONSTANT_PATH: ${ PLATFORM_CONSTANT_PATH }`
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
		"cannot manifest platform constant path",

		"invalid platform constant path directory",

		`@PLATFORM_CONSTANT_PATH: ${ PLATFORM_CONSTANT_PATH }`

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

if(
		(
				(
						"PLATFORM_CONSTANT_PATH"
					in	global
				)
			!==	true
		)

	||	(
				global
				.PLATFORM_CONSTANT_PATH
			!==	PLATFORM_CONSTANT_PATH
		)
){
	try{
		Object
		.defineProperty(
			global,

			"PLATFORM_CONSTANT_PATH",

			{
				"value": PLATFORM_CONSTANT_PATH,

				"configurable": false,
				"enumerable": false,
				"writable": false
			}
		);
	}
	catch( error ){
		console
		.error(
			"cannot manifest platform constant path",

			`@PLATFORM_CONSTANT_PATH: ${ PLATFORM_CONSTANT_PATH };`

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
}

module.exports = PLATFORM_CONSTANT_PATH;
