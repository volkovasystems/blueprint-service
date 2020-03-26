"use strict";

const util = require( "util" );

const getPlatformPackage = (
	require( `${ PLATFORM_UTILITY_PATH }/get-platform-package.js` )
);

const getPlatformVersion = (
	async	function getPlatformVersion( ){
				try{
					const platformPackage = (
						await	getPlatformPackage( )
					);

					const platformVersion = (
						platformPackage.version
					);

					if(
							(
									typeof
									platformVersion
								!= "string"
							)

						||	(
									platformVersion
									.length
								<= 0
							)
					){
						console
						.error(
							"cannot get platform version",

							"cannot determine platform version",

							`@platformVersion: ${ platformVersion }`
						);

						throw	(
									new	Error(
											[
												"cannot get platform version",

												"cannot determine platform version",

												`@platformVersion: ${ platformVersion }`
											]
										)
								);
					}

					return	platformVersion;
				}
				catch( error ){
					console
					.error(
						"cannot get platform version",

						"error data:",
						(
							util
							.inspect( error )
						)
					)

					throw	(
								new	Error(
										[
											"cannot get platform version"
										]
									)
							);
				}
			}
);

module.exports = getPlatformVersion;
