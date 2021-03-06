"use strict";

const hardenProperty = (
	function hardenProperty( property, value, entity ){
		/*;
			@meta-configuration:
				{
					"property:required": [
						"string",
						"symbol",
						"number"
					],
					"value:required": "*",
					"entity:optional": "object"
				}
			@end-meta-configuration
		*/

		if(
				(
						property
					===	""
				)

			||	(
						(
								typeof
								property
							!=	"string"
						)

					&&	(
								typeof
								property
							!=	"symbol"
						)

					&&	(
								typeof
								property
							!=	"number"
						)
				)

			||	(
						(
								typeof
								property
							==	"number"
						)

					&&	(
								isNaN( property )
							===	true
						)
				)
		){
			throw	(
						new	Error(
								"invalid property"
							)
					);
		}

		if(
				(
						typeof
						entity
					==	"undefined"
				)

			&&	(
						arguments
						.length
					===	2
				)
		){
			if(
					typeof
					this
				!=	"undefined"
			){
					entity
				=	this;
			}
			else if(
					typeof
					global
				!=	"undefined"
			){
					entity
				=	global;
			}
			else if(
					typeof
					window
				!=	"undefined"
			){
					entity
				=	window;
			}
			else{
				throw	(
							new	Error(
									"cannot resolve context entity"
								)
						);
			}
		}

		/*;
			@note:
				Checking if key exists is intensive
				because we can define an undefined property
				and the key will still exists.
			@end-note
		*/
		if(
				(
						typeof
						entity[ property ]
					!=	"undefined"
				)

			||	(
						Object
						.getOwnPropertyNames(
							entity
						)
						.some(
							( key ) => (
									key
								===	property
							)
						)
					===	true
				)

			||	(
						(
								typeof
								property
							==	"symbol"
						)

					&&	(
								Object
								.getOwnPropertySymbols(
									entity
								)
								.some(
									( symbol ) => (
											symbol
										===	property
									)
								)
							===	true
						)
				)
		){
			return	entity;
		}

		try{
			Object
			.defineProperty(
				entity,
				property,

				{
					"value": value,

					"configurable": false,
					"enumerable": false,
					"writable": false
				}
			);
		}
		catch( error ){
			throw	(
						new	Error(
								`cannot harden property, ${ property }`
							)
					);
		}

		return	entity;
	}
);

module.exports = hardenProperty;
