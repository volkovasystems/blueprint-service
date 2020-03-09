#! /usr/bin/env node

"use strict";

const commander = require( "commander" );
const util = require( "util" );

const hardenProperty = (
	require( `${ __dirname }/utility/harden-property.js` )
);

const load = (
	require( `${ __dirname }/load.js` )
);

const index = (
	require( `${ __dirname }/index.js` )
);

const shellProgram = (
	new	commander
		.Command( )
);

hardenProperty(
	"SHELL_PROGRAM",
	shellProgram
);

(
	(
		async	function( ){
					await	load( );

					shellProgram
					.version(
						PLATFORM_PACKAGE
						.version
					);
				}
	)( )
);

(
	(
		async	function( ){
					await	index(
								{
									"shellProgram": shellProgram
								},
								function( trigger, result, optionData ){

								}
							);
				}
	)( )
);

module.exports = shellProgram;
