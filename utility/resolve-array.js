"use strict";

const ARGUMENTS_PATTERN = (
	/^\[object Arguments\]$/
);

const resolveArray = (
	function resolveArray( entity ){
		/*;
			@meta-configuration:
				{
					"entity:required": "*"
				}
			@end-meta-configuration
		*/

		/*;
			@note:
				If entity is falsy, return empty array.
			@end-note
		*/
		if(
				(
						typeof
						entity
					==	"undefined"
				)

			||	(
						(
								typeof
								entity
							==	"string"
						)

					&&	(
								entity
								.length
							===	0
						)
				)

			||	(
						(
								typeof
								entity
							==	"object"
						)

					&&	(
								entity
							===	null
						)
				)

			||	(
				 		(
								typeof
								entity
							==	"number"
						)

					&&	(
								isNaN( entity )
							===	true
						)
				)
		){
			return	[ ];
		}

		/*;
			@note:
				All array, array-like, iterable, are object ( with exception )

				Non-object take up the first position of the array.

				Function with Symbol.iterable might be an exception.
			@end-note
		*/
		if(
				typeof
				entity
			!=	"object"
		){
			return	[ entity ];
		}

		try{
			const array = (
				Array
				.from(
					entity
				)
			);

			/*;
				@note:
					If the array result is empty,
					then check if it is an argument entity,
					else return the entity as the first position in the object
					because the object is not absorbed
					because the object is not array-like or iterable.
				@end-note
			*/
			if(
					array
					.length
				=== 0
			){
				if(
						ARGUMENTS_PATTERN
						.test(
							`${ entity }`
						)
					===	true
				){
					return	array;
				}

				if(
						Array
						.isArray(
							entity
						)
					===	true
				){
					return	array;
				}

				return	[ entity ];
			}

			return	array;
		}
		catch( error ){
			return	[ ];
		}
	}
);

module.exports = resolveArray;
