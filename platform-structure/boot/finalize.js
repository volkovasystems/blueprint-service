"use strict";

const called = require( "called" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const proceedCallback = (
	require( `${ PLATFORM_UTILITY_PATH }/proceed-callback.js` )
);

const PLATFORM_STRUCTURE_SERVICE_FINALIZE_DONE_STATE = (
	Symbol
	.for(
		"platform-structure-service-finalize-done"
	)
);

const PLATFORM_STRUCTURE_SERVICE_FINALIZE_STATE = [ ];

hardenProperty(
	"PLATFORM_STRUCTURE_SERVICE_FINALIZE_STATE",
	PLATFORM_STRUCTURE_SERVICE_FINALIZE_STATE
);

const finalize = (
	async	function finalize( option, callback ){
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
						PLATFORM_STRUCTURE_SERVICE_FINALIZE_STATE
						.includes(
							PLATFORM_STRUCTURE_SERVICE_FINALIZE_DONE_STATE
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

				/*;
					@note:
						Do all finalization procedure here.
					@end-note
				*/
				try{

				}
				catch( error ){

				}

				PLATFORM_STRUCTURE_SERVICE_FINALIZE_STATE
				.push(
					PLATFORM_STRUCTURE_SERVICE_FINALIZE_STATE
				);

				return	(
							await	proceedCallback(
										option,
										callback
									)
						);
			}
);

module.exports = finalize;
