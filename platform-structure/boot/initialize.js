"use strict";

const called = require( "called" );
const harden = require( "harden" );
const util = require( "util" );

const proceedCallback = (
	require( `${ PLATFORM_UTILITY_PATH }/proceed-callback.js` )
);

const PLATFORM_STRUCTURE_SERVICE_INITIALIZE_DONE_STATE = (
	Symbol
	.for( "platform-structure-service-initialize-done" )
);

const PLATFORM_STRUCTURE_SERVICE_INITIALIZE_STATE = [ ];

harden(
	"PLATFORM_STRUCTURE_SERVICE_INITIALIZE_STATE",
	PLATFORM_STRUCTURE_SERVICE_INITIALIZE_STATE
);

const initialize = (
	async	function initialize( option, callback ){
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
						PLATFORM_STRUCTURE_SERVICE_INITIALIZE_STATE
						.includes( PLATFORM_STRUCTURE_SERVICE_INITIALIZE_DONE_STATE )
					===	true
				){
					return	(
								await	proceedCallback( option, callback )
							);
				}

				PLATFORM_STRUCTURE_SERVICE_INITIALIZE_STATE
				.push( PLATFORM_STRUCTURE_SERVICE_INITIALIZE_DONE_STATE );

				return	(
							await	proceedCallback( option, callback )
						);
			}
);

module.exports = initialize;
