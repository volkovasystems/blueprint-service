"use strict";

const separateNamespaceToken = (
	require( `${ PLATFORM_UTILITY_PATH }/separate-namespace-token.js` )
);

const formatNamespaceSpaceApart = (
	function formatNamespaceSpaceApart( namespace ){
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
									"cannot format namespace space apart",
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
									"cannot format namespace space apart",
									"invalid namespace format",

									`@namespace: ${ namespace };`
								]
							)
					);
		}


	}
);

module.exports = formatNamespaceSpaceApart;
