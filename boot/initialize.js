"use strict";

const called = require( "called" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const proceedCallback = (
	require( `${ PLATFORM_UTILITY_PATH }/proceed-callback.js` )
);

const PLATFORM_SERVICE_INITIALIZE_DONE_STATE = (
	Symbol
	.for(
		"platform-service-initialize-done"
	)
);

const PLATFORM_SERVICE_INITIALIZE_STATE = [ ];

hardenProperty(
	"PLATFORM_SERVICE_INITIALIZE_STATE",
	PLATFORM_SERVICE_INITIALIZE_STATE
);

const initialize = (
	async	function initialize( option, callback ){
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
						PLATFORM_SERVICE_INITIALIZE_STATE
						.includes(
							PLATFORM_SERVICE_INITIALIZE_DONE_STATE
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

				await	Promise
						.all(
							PLATFORM_SERVICE_LIST
							.map(
								( platformServiceData ) => {
									return	[
												PLATFORM_PATH,
												(
													platformServiceData
													.namespace
												),
												"boot",
												"initialize.js"
											]
											.join(
												"/"
											)
								}
							)
							.map(
								( initializeProcedurePath ) => {
									const initializeProcedure = (
										require( initializeProcedurePath )
									);

									if(
											typeof
											initializeProcedure
										==	"function"
									){
										return	initializeProcedure;
									}
									else{
										return	undefined;
									}
								}
							)
							.filter(
								( initializeProcedure ) => (
										typeof
										initializeProcedure
									==	"function"
								)
							)
							.map(
								( initializeProcedure ) => {
									return	(
												async	function( ){
															return	(
																		await	initializeProcedure( option )
																	);
														}
											)( );
								}
							)
						);

				PLATFORM_SERVICE_INITIALIZE_STATE
				.push(
					PLATFORM_SERVICE_INITIALIZE_DONE_STATE
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

module.exports = initialize;
