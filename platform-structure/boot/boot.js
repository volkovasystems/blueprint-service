"use strict";

const called = require( "called" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const proceedCallback = (
	require( `${ PLATFORM_UTILITY_PATH }/proceed-callback.js` )
);

const initialize = (
	require( `${ PLATFORM_STRUCTURE_BOOT_PATH }/initialize.js` )
);

const server = (
	require( `${ PLATFORM_STRUCTURE_BOOT_PATH }/server.js` )
);

const finalize = (
	require( `${ PLATFORM_STRUCTURE_BOOT_PATH }/finalize.js` )
);

const PLATFORM_STRUCTURE_SERVICE_BOOT_DONE_STATE = (
	Symbol
	.for(
		"platform-structure-service-boot-done"
	)
);

const PLATFORM_STRUCTURE_SERVICE_BOOT_STATE = [ ];

hardenProperty(
	"PLATFORM_STRUCTURE_SERVICE_BOOT_STATE",
	PLATFORM_STRUCTURE_SERVICE_BOOT_STATE
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
						PLATFORM_STRUCTURE_SERVICE_BOOT_STATE
						.includes(
							PLATFORM_STRUCTURE_SERVICE_BOOT_DONE_STATE
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

				try{
					await	initialize( option );
					await	server( option );
					await	finalize( option );
				}
				catch( error ){

				}
				
				PLATFORM_STRUCTURE_SERVICE_BOOT_STATE
				.push(
					PLATFORM_STRUCTURE_SERVICE_BOOT_DONE_STATE
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
