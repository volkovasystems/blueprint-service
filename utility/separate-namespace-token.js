"use strict";

const checkNamespaceFormat = (
	require( `${ PLATFORM_UTILITY_PATH }/check-namespace-format.js` )
);

const separateNamespaceToken = (
	function separateNamespaceToken( namespace ){
		if(
				(
						typeof
						namespace
					!=	"string"
				)

			||	(
						namespace
						.length
					<=	0
				)
		){
			throw	(
						new	Error(
								[
									"cannot separate namespace token",
									"invalid namespace parameter",

									`@namespace: ${ namespace };`
								]
							)
					);
		}

		if(
				checkNamespaceFormat(
					namespace
				)
			!==	true
		){
			throw	(
						new	Error(
								[
									"cannot separate namespace token",
									"invalid namespace format",

									`@namespace: ${ namespace };`
								]
							)
					);
		}

	}
);

module.exports = separateNamespaceToken;
