"use strict";

const called = require( "called" );
const glob = require( "fast-glob" );
const util = require( "util" );

const bodyParser = require( "body-parser" );
const compression = require( "compression" );
const cookieParser = require( "cookie-parser" );
const express = require( "express" );
const expresSession = require( "express-session" );
const helmet = require( "helmet" );
const methodOverride = require( "method-override" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/utility/harden-property.js` )
);

const proceedCallback = (
	require( `${ PLATFORM_UTILITY_PATH }/proceed-callback.js` )
);

const PLATFORM_STRUCTURE_SERVICE_SERVER_DONE_STATE = (
	Symbol
	.for(
		"platform-structure-service-server-done"
	)
);

const PLATFORM_STRUCTURE_SERVICE_SERVER_STATE = [ ];

hardenProperty(
	"PLATFORM_STRUCTURE_SERVICE_SERVER_STATE",
	PLATFORM_STRUCTURE_SERVICE_SERVER_STATE
);

const server = (
	async	function server( option, callback ){
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
						PLATFORM_STRUCTURE_SERVICE_SERVER_STATE
						.includes(
							PLATFORM_STRUCTURE_SERVICE_SERVER_DONE_STATE
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

				const SERVICE = express( );

				SERVICE
				.use(
					methodOverride( )
				);

				SERVICE
				.use(
					bodyParser
					.urlencoded(
						{
							"extended": true,
							"limit": "16mb"
						}
					)
				);

				SERVICE
				.use(
					bodyParser
					.json(
						{
							"limit": "16mb"
						}
					)
				);

				SERVICE
				.use(
					cookieParser( )
				);

				SERVICE
				.use(
					helmet( )
				);

					option
					.service
				=	SERVICE;

				hardenProperty(
					"SERVICE",
					SERVICE
				);

				PLATFORM_STRUCTURE_SERVICE_SERVER_STATE
				.push(
					PLATFORM_STRUCTURE_SERVICE_SERVER_DONE_STATE
				);

				return	(
							await	proceedCallback(
										option,
										callback
									)
						);
			}
);

module.exports = server;
