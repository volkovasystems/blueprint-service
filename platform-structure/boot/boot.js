"use strict";

const called = require( "called" );
const harden = require( "harden" );
const util = require( "util" );

const proceedCallback = (
	require( `${ PLATFORM_UTILITY_PATH }/proceed-callback.js` )
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

const PLATFORM_TRANSACTION_SERVICE_BOOT_DONE_STATE = (
	Symbol
	.for( "platform-transaction-service-boot-done" )
);

const PLATFORM_TRANSACTION_SERVICE_BOOT_STATE = [ ];

harden(
	"PLATFORM_TRANSACTION_SERVICE_BOOT_STATE",
	PLATFORM_TRANSACTION_SERVICE_BOOT_STATE
);

const boot = (
	async	function boot( option, callback ){
				option = (
						option
					||	{ }
				);

				if(
					typeof callback == "function"
				){
					callback = called( callback );
				}

				if(
					typeof	option.trigger != "undefined"
				){
					return	(
								await	proceedCallback( option, callback )
							);
				}

				if(
						PLATFORM_TRANSACTION_SERVICE_BOOT_STATE
						.includes( PLATFORM_TRANSACTION_SERVICE_BOOT_DONE_STATE )
					===	true
				){
					return	(
								await	proceedCallback( option, callback )
							);
				}

				await	initialize( option );
				await	server( option );
				await	finalize( option );

				PLATFORM_TRANSACTION_SERVICE_BOOT_STATE
				.push( PLATFORM_TRANSACTION_SERVICE_BOOT_DONE_STATE );

				return	(
							await	proceedCallback( option, callback )
						);
			}
);

module.exports = boot;
