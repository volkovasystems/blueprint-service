"use strict";

const called = require( "called" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const proceedCallback = (
	require( `${ PLATFORM_UTILITY_PATH }/proceed-callback.js` )
);

const resolveGlobalModuleList = (
	require( `${ PLATFORM_UTILITY_PATH }/resolve-global-module-list.js` )
);

const resolveShellParameterSchemaList = (
	require( `${ PLATFORM_UTILITY_PATH }/resolve-shell-parameter-schema-list.js` )
);

const resolvePlatformServiceList = (
	require( `${ PLATFORM_UTILITY_PATH }/resolve-platform-service-list.js` )
);

const resolvePlatformEnvironmentList = (
	require( `${ PLATFORM_UTILITY_PATH }/resolve-platform-environment-list.js` )
);

const resolveShellParameter = (
	require( `${ PLATFORM_UTILITY_PATH }/resolve-shell-parameter.js` )
);

const restrictPlatformServiceList = (
	require( `${ PLATFORM_UTILITY_PATH }/restrict-platform-service-list.js` )
);

const restrictShellParameterSchemaList = (
	require( `${ PLATFORM_UTILITY_PATH }/restrict-shell-parameter-schema-list.js` )
);

const restrictShellParameter = (
	require( `${ PLATFORM_UTILITY_PATH }/restrict-shell-parameter.js` )
);

const initialize = (
	require( "./initialize.js" )
);

const server = (
	require( "./server.js" )
);

const finalize = (
	require( "./finalize.js" )
);

const PLATFORM_SERVICE_BOOT_DONE_STATE = (
	Symbol
	.for(
		"platform-service-boot-done"
	)
);

const PLATFORM_SERVICE_BOOT_STATE = [ ];

hardenProperty(
	"PLATFORM_SERVICE_BOOT_STATE",
	PLATFORM_SERVICE_BOOT_STATE
);

const boot = (
	async	function boot( option, callback ){
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

				if(
						PLATFORM_SERVICE_BOOT_STATE
						.includes(
							PLATFORM_SERVICE_BOOT_DONE_STATE
						)
					===	true
				){
					return	(
								await	proceedCallback(
											option,
											callback
										)
							);
				}

				await	resolveGlobalModuleList( option );
				await	resolveShellParameterSchemaList( option );
				await	resolvePlatformServiceList( option );
				await	resolvePlatformEnvironmentList( option );
				await	resolveShellParameter( option );

				await	restrictPlatformServiceList( option );
				await	restrictShellParameterSchemaList( option );
				await	restrictShellParameter( option );

				await	initialize( option );
				await	server( option );
				await	finalize( option );

				PLATFORM_SERVICE_BOOT_STATE
				.push(
					PLATFORM_SERVICE_BOOT_DONE_STATE
				);

					option
					.result
				=	(
							option
							.result
						||	true
					);

				return	(
							await	proceedCallback(
										option,
										callback
									)
						);
			}
);

module.exports = boot;
