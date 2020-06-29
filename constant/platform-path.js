"use strict";

const fs = require( "fs" );
const os = require( "os" );
const path = require( "path" );
const util = require( "util" );

const PLATFORM_PATH = (
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

			return	platformDirectoryPath;
		}
	)( )
);

try{
	if(
			fs
			.statSync(
				PLATFORM_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform path",
			
			"invalid platform path directory",

			`@PLATFORM_PATH: ${ PLATFORM_PATH };`
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
		"cannot manifest platform path",

		"invalid platform path directory",

		`@PLATFORM_PATH: ${ PLATFORM_PATH };`

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
						"PLATFORM_PATH"
					in	global
				)
			!==	true
		)

	||	(
				global
				.PLATFORM_PATH
			!==	PLATFORM_PATH
		)
){
	try{
		Object
		.defineProperty(
			global,

			"PLATFORM_PATH",

			{
				"value": PLATFORM_PATH,

				"configurable": false,
				"enumerable": false,
				"writable": false
			}
		);
	}
	catch( error ){
		console
		.error(
			"cannot manifest platform path",

			`@PLATFORM_PATH: ${ PLATFORM_PATH };`

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

module.exports = PLATFORM_PATH;
