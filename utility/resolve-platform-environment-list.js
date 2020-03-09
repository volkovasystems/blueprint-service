"use strict";

const called = require( "called" );
const fs = require( "fs" ).promises;
const harden = require( "harden" );
const util = require( "util" );

const proceedCallback = (
	require( "./proceed-callback.js" )
);

const PLATFORM_ENVIRONMENT_CONFIGURE_PATH = (
	`${ PLATFORM_CONFIGURE_PATH }/platform-environment-list.json`
);

const resolvePlatformEnvironmentList = (
	async	function resolvePlatformEnvironmentList( option, callback ){
				option = (
						option
					||	{ }
				);

				if(
						typeof
						callback
					==	"function"
				){
					callback = called( callback );
				}

				if(
						typeof
						option
						.trigger
					!=	"undefined"
				){
					return	(
								await	proceedCallback(
											option,
											callback
										)
							);
				}

				const platformEnvironmentList = [ ];

				try{
					JSON
					.parse(
						await	fs
								.readFile(
									PLATFORM_ENVIRONMENT_CONFIGURE_PATH
								)
					)
					.forEach(
						( platformEnvironmentData ) => {
							platformEnvironmentList
							.push(
								platformEnvironmentData
							)
						}
					);
				}
				catch( error ){
					console
					.error(
						"cannot resolve platform environment",

						"error data:",
						(
							util
							.inspect(
								error
							)
						)
					);

						option
						.trigger
					=	error;

						option
						.result
					=	false;

					return	(
								await	proceedCallback(
											option,
											callback
										)
							);
				}

				const PLATFORM_ENVIRONMENT_LIST = platformEnvironmentList;

				harden(
					"PLATFORM_ENVIRONMENT_LIST",
					PLATFORM_ENVIRONMENT_LIST
				);

					option
					.platformEnvironmentList
				=	platformEnvironmentList;

				return	(
							await	proceedCallback(
										option,
										callback
									)
						);
			}
);

module.exports = resolvePlatformEnvironmentList;
