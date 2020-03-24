"use strict";

const separateNamespaceToken = (
	require( `${ PLATFORM_UTILITY_PATH }/separate-namespace-token.js` )
);

const LOW_LINE_CHARACTER = '_';

const formatNamespaceUpperCaseLowLine = (
	function formatNamespaceUpperCaseLowLine( namespace ){
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
									"cannot format namespace upper case low line",
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
									"cannot format namespace upper case low line",
									"invalid namespace format",

									`@namespace: ${ namespace };`
								]
							)
					);
		}

		const namespaceTokenList = (
			separateNamespaceToken( namespace )
		);

		namespaceTokenList
		.map(
			( namespaceToken ) => (
				namespaceToken
				.toUpperCase( )
			)
		)
		.join(
			LOW_LINE_CHARACTER
		)
	}
);

module.exports = formatNamespaceUpperCaseLowLine;
