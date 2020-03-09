"use strict";

const called = require( "called" );
const fs = require( "fs" ).promises;
const glob = require( "fast-glob" );
const harden = require( "harden" );
const nanoid = require( "nanoid" );
const path = require( "path" );
const util = require( "util" );

const proceedCallback = (
	require( "./proceed-callback.js" )
);

const resolveGlobPathQueryFormat = (
	require( "./resolve-glob-path-query-format.js" )
);

const SHELL_PARAMETER_SCHEMA_LIST_PATH_QUERY = (
	"./**/shell-parameter-schema-list.json"
);

const resolveShellParameterSchemaList = (
	async	function resolveShellParameterSchemaList( option, callback ){
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

				const shellParameterSchemaList = [ ];

				try{
					(
						await	Promise
								.all(
									(
										await	glob(
													(
														[
															SHELL_PARAMETER_SCHEMA_LIST_PATH_QUERY
														]
														.map(
															( globPathQuery ) => (
																resolveGlobPathQueryFormat(
																	globPathQuery
																)
															)
														)
													),
													{
														"absolute": true,
														"dot": true
													}
												)
									)
									.map(
										( shellParameterSchemaPath ) => {
											return	(
														async	( ) => {
																	return	(
																				await	fs
																						.readFile(
																							shellParameterSchemaPath
																						)
																			);
																}
													)( );
										}
									)
								)
					)
					.map(
						shellParameterSchemaContent => (
							JSON
							.parse(
								shellParameterSchemaContent
							)
						)
					)
					.reduce(
						(
							flatShellParameterSchemaList,
							currentShellParameterSchemaList
						) => {
							currentShellParameterSchemaList
							.forEach(
								( shellParameterSchemaData ) => {
									flatShellParameterSchemaList
									.push( shellParameterSchemaData );
								}
							);

							return	flatShellParameterSchemaList;
						},
						[ ]
					)
					.forEach(
						( shellParameterSchemaData ) => {
								shellParameterSchemaData
								.reference
							=	(
									`#${ nanoid( 4 ) };`
								);

							shellParameterSchemaList
							.push(
								shellParameterSchemaData
							);
						}
					);
				}
				catch( error ){
					console
					.error(
						"cannot resolve shell parameter schema",

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

				const SHELL_PARAMETER_SCHEMA_LIST = shellParameterSchemaList;

				harden(
					"SHELL_PARAMETER_SCHEMA_LIST",
					SHELL_PARAMETER_SCHEMA_LIST
				);

					option
					.shellParameterSchemaList
				=	shellParameterSchemaList;

				return	(
							await	proceedCallback(
										option,
										callback
									)
						);
			}
);

module.exports = resolveShellParameterSchemaList;