"use strict";

const called = require( "called" );
const harden = require( "harden" );
const glob = require( "fast-glob" );
const util = require( "util" );

const bodyParser = require( "body-parser" );
const compression = require( "compression" );
const cookieParser = require( "cookie-parser" );
const express = require( "express" );
const expresSession = require( "express-session" );
const helmet = require( "helmet" );
const methodOverride = require( "method-override" );

const proceedCallback = (
	require( `${ PLATFORM_UTILITY_PATH }/proceed-callback.js` )
);

const PLATFORM_TRANSACTION_SERVICE_SERVER_DONE_STATE = (
	Symbol
	.for( "platform-transaction-service-server-done" )
);

const PLATFORM_TRANSACTION_SERVICE_SERVER_STATE = [ ];

harden(
	"PLATFORM_TRANSACTION_SERVICE_SERVER_STATE",
	PLATFORM_TRANSACTION_SERVICE_SERVER_STATE
);

const server = (
	async	function server( option, callback ){
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
						PLATFORM_TRANSACTION_SERVICE_SERVER_STATE
						.includes( PLATFORM_TRANSACTION_SERVICE_SERVER_DONE_STATE )
					===	true
				){
					return	(
								await	proceedCallback( option, callback )
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

				harden(
					"SERVICE",
					SERVICE
				);

				PLATFORM_TRANSACTION_SERVICE_SERVER_STATE
				.push( PLATFORM_TRANSACTION_SERVICE_SERVER_DONE_STATE );

				return	(
							await	proceedCallback( option, callback )
						);
			}
);

module.exports = server;
