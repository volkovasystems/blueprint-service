"use strict";

const fs = require( "fs" );
const util = require( "util" );

const fsAsync = fs.promises;

const getPlatformPath = (
	require( `${ PLATFORM_UTILITY_PATH }/get-platform-path.js` )
);

const getPlatformPackage = (
	async	function getPlatformPackage( ){
				const platformDirectoryPath = (
					await	getPlatformPath( )
				);

				const platformPackagePath = (
					`${ platformDirectoryPath }/package.json`
				);

				try{
					const platformPackage = (
						JSON
						.parse(
							(
								await	fsAsync
										.readFile(
											platformPackagePath
										)
							)
						)
					);

					if(
							(
									typeof
									platformPackage
								!= "object"
							)

						||	(
									platformPackage
								===	null
							)
					){
						console
						.error(
							"cannot get platform package",

							"cannot determine platform package"
						);

						throw	(
									new	Error(
											[
												"cannot get platform package",

												"cannot determine platform package"
											]
										)
								);
					}

					return	platformPackage;
				}
				catch( error ){
					console
					.error(
						"cannot get platform package",

						`@platformPackagePath: ${ platformPackagePath }`,

						"error data:",
						(
							util
							.inspect( error )
						)
					)

					throw	(
								new	Error(
										[
											"cannot get platform package",

											`@platformPackagePath: ${ platformPackagePath }`
										]
									)
							);
				}
			}
);

module.exports = getPlatformPackage;
