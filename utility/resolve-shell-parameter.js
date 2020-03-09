"use strict";

const called = require( "called" );
const harden = require( "harden" );
const llamalize =  require( "llamalize" );
const truly = require( "truly" );
const util = require( "util" );

const proceedCallback = (
	require( "./proceed-callback.js" )
);

const restrictPlatformServiceList = (
	require( "./restrict-platform-service-list.js" )
);

const restrictShellParameterSchemaList = (
	require( "./restrict-shell-parameter-schema-list.js" )
);

const restrictShellProgramHelp = (
	require( "./restrict-shell-program-help.js" )
);

const resolveShellParameter = (
	async	function resolveShellParameter( option, callback ){
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

				const shellParameter = { };

				let shellProgram = (
						(
								(
										(
												"SHELL_PROGRAM"
											in	global
										)
									=== true
								)

							&&	(
										typeof
										global
										.SHELL_PROGRAM
									==	"object"
								)

							&&	(
										global
										.SHELL_PROGRAM
									!==	null
								)
						)
					?	SHELL_PROGRAM
					:	(
								(
										(
												(
														"shellProgram"
													in	option
												)
											=== true
										)

									&&	(
												typeof
												option
												.shellProgram
											==	"object"
										)

									&&	(
												option
												.shellProgram
											!==	null
										)
								)
							?	(
									option
									.shellProgram
								)
							:	undefined
						)
				);

				if(
						(
								typeof
								shellProgram
							!=	"object"
						)
					||	(
								shellProgram
							===	null
						)
				){
					/*;
						@todo-note:
							If the shellProgram is not existent
							then detour flow for alternative support.
						@end-todo-note
					*/
				}

				if(
						(
								typeof
								shellProgram
							==	"object"
						)
					&&	(
								shellProgram
							!==	null
						)
				){
					const shellParameterPropertyList = [ ];

					SHELL_PARAMETER_SCHEMA_LIST
					.forEach(
						( shellParameterSchemaData ) => {
							const property = (
								shellParameterSchemaData
								.property
							);

							if(
									shellParameterPropertyList
									.includes(
										property
									)
								!==	true
							){
								shellParameterPropertyList
								.push(
									property
								);
							}

							const optionProperty = (
								shellParameterSchemaData
								.optionProperty
							);

							const description = (
								shellParameterSchemaData
								.description
							);

							const instruction = (
								shellParameterSchemaData
								.instruction
							);

							const example = (
								shellParameterSchemaData
								.example
							);

							const defaultValue = (
								shellParameterSchemaData
								.defaultValue
							);

							shellProgram
							.option(
								[
									[
										`--${ property }`,
									]
									.join(
										","
									),

									`<${ property }>`
								]
								.join( " " ),

								[
									(
										shellParameterSchemaData
										.reference
									),
									(
										shellParameterSchemaData
										.description
									),
									(
										shellParameterSchemaData
										.instruction
									),
									(
										shellParameterSchemaData
										.example
									)
								]
								.filter(
									Boolean
								)
								.join(
									" "
								),

								(
									shellParameterSchemaData
									.defaultValue
								)
							);

							shellProgram
							.option(
								[
									[
										`--${ optionProperty }`,
									]
									.join(
										","
									),

									`<${ property }>`
								]
								.join( " " ),

								[
									(
										shellParameterSchemaData
										.reference
									),
									(
										shellParameterSchemaData
										.description
									),
									(
										shellParameterSchemaData
										.instruction
									),
									(
										shellParameterSchemaData
										.example
									)
								]
								.filter(
									Boolean
								)
								.join(
									" "
								),

								(
									shellParameterSchemaData
									.defaultValue
								)
							)
							.action(
								function( commandData ){
									const internalOptionProperty = (
										llamalize( optionProperty )
									);

									if(
										truly( commandData[ internalOptionProperty ] )
									){
											commandData[ property ]
										=	commandData[ internalOptionProperty ];

											shellParameter[ property ]
										=	commandData[ internalOptionProperty ];
									}
								}
							);
						}
					);

					shellProgram
					.name(
						PLATFORM_PACKAGE
						.name
					)
					.usage(
						"[optionList]"
					);

					if(
							(
									process
									.argv
									.includes(
										"-h"
									)
								===	true
							)

						||	(
									process
									.argv
									.includes(
										"--help"
									)
								===	true
							)
					){
						shellProgram
						.help(
							function( helpData ){
									option
									.helpData
								=	helpData;

								restrictPlatformServiceList( option );

								restrictShellParameterSchemaList( option );

								restrictShellProgramHelp( option );

									helpData
								=	option
									.helpData;

								return	helpData;
							}
						);
					}

					shellProgram
					.parse(
						process
						.argv
					);

					shellParameterPropertyList
					.forEach(
						( shellParameterProperty ) => {
							shellParameter[ shellParameterProperty ] = (
									shellParameter[ shellParameterProperty ]
								||	shellProgram[ shellParameterProperty ]
							);
						}
					);
				}

				const SHELL_PARAMETER = shellParameter;

				harden(
					"SHELL_PARAMETER",
					SHELL_PARAMETER
				);

					option
					.shellParameter
				=	shellParameter;

				return	(
							await	proceedCallback(
										option,
										callback
									)
						);
			}
);

module.exports = resolveShellParameter;