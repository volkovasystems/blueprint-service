"use strict";

const called = require( "called" );
const harden = require( "harden" );
const util = require( "util" );

const proceedCallback = (
	require( `${ PLATFORM_UTILITY_PATH }/proceed-callback.js` )
);

const load = (
	require( "./load.js" )
);

const boot = (
	require( "./boot.js" )
);

const PLATFORM_STRUCTURE_INDEX_DONE_STATE = (
	Symbol
	.for(
		"platform-structure-index-done"
	)
);

const PLATFORM_STRUCTURE_INDEX_STATE = [ ];

hardenProperty(
	"PLATFORM_STRUCTURE_INDEX_STATE",
	PLATFORM_STRUCTURE_INDEX_STATE
);

const index = (
	async	function index( option, callback ){
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
						PLATFORM_STRUCTURE_INDEX_STATE
						.includes(
							PLATFORM_STRUCTURE_INDEX_DONE_STATE
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
					await	load( option );
				}
				catch( error ){
					console
					.error(
						"cannot load platform structure",

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

				try{
					await	boot( option );
				}
				catch( error ){
					console
					.error(
						"cannot boot platform structure",

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

				PLATFORM_STRUCTURE_INDEX_STATE
				.push(
					PLATFORM_STRUCTURE_INDEX_DONE_STATE
				);

					option
					.result
				=	(
							option.result
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

module.exports = index;
