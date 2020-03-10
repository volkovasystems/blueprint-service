"use strict";

const called = require( "called" );
const harden = require( "harden" );
const glob = require( "fast-glob" );
const os = require( "os" );
const path = require( "path" );
const util = require( "util" );

const PLATFORM_LOAD_DONE_STATE = (
	Symbol
	.for( "platform-load-done" )
);

const PLATFORM_LOAD_STATE = [ ];

hardenProperty(
	"PLATFORM_LOAD_STATE",
	PLATFORM_LOAD_STATE
);

const load = (
	async	function load( option, callback ){
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
					if(
						typeof callback == "function"
					){
						callback(
							option.trigger,
							option.result,
							option
						);
					}

					return	{
								"trigger": option.trigger,
								"result": option.result,
								"option": option
							};
				}

				if(
						PLATFORM_LOAD_STATE
						.includes( PLATFORM_LOAD_DONE_STATE )
					===	true
				){
					if(
						typeof callback == "function"
					){
						callback(
							option.trigger,
							option.result,
							option
						);
					}

					return	{
								"trigger": option.trigger,
								"result": option.result,
								"option": option
							};
				}
				
				PLATFORM_LOAD_STATE
				.push( PLATFORM_LOAD_DONE_STATE );

				option.result = (
						option.result
					||	true
				);

				if(
					typeof callback == "function"
				){
					callback(
						undefined,
						true,
						option
					);
				}

				return	{
							"trigger": undefined,
							"result": true,
							"option": option
						};
			}
);

module.exports = load;
