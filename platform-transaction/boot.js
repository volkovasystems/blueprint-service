"use strict";

const called = require( "called" );
const harden = require( "harden" );
const util = require( "util" );

const PLATFORM_TRANSACTION_BOOT_DONE_STATE = (
	Symbol
	.for( "platform-transaction-boot-done" )
);

const PLATFORM_TRANSACTION_BOOT_STATE = [ ];

harden(
	"PLATFORM_TRANSACTION_BOOT_STATE",
	PLATFORM_TRANSACTION_BOOT_STATE
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
						PLATFORM_TRANSACTION_BOOT_STATE
						.includes( PLATFORM_TRANSACTION_BOOT_DONE_STATE )
					===	true
				){
					return	(
								await	proceedCallback( option, callback )
							);
				}

				const platformTransactionBoot = (
					require( `${ PLATFORM_TRANSACTION_BOOT_PATH }/boot.js` )
				);

				try{
					await	platformTransactionBoot( option );
				}
				catch( error ){
					console
					.error(
						"cannot execute platform transaction boot procedure",

						"error data:",
						(
							util
							.inspect( error )
						)
					);

					option.trigger = error;
					option.result = false;

					return	(
								await	proceedCallback( option, callback )
							);
				}

				PLATFORM_TRANSACTION_BOOT_STATE
				.push( PLATFORM_TRANSACTION_BOOT_DONE_STATE );

				option.result = (
						option.result
					||	true
				);

				return	(
							await	proceedCallback( option, callback )
						);
			}
);

module.exports = boot;