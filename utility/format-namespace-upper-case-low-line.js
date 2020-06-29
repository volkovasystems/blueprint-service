"use strict";

const checkNamespaceFormat = (
	require( `${ PLATFORM_UTILITY_PATH }/check-namespace-format.js` )
);

const separateNamespaceToken = (
	require( `${ PLATFORM_UTILITY_PATH }/separate-namespace-token.js` )
);

const LOW_LINE_CHARACTER = (
	'_'
);

const formatNamespaceUpperCaseLowLine = (
	function formatNamespaceUpperCaseLowLine( namespace ){
		/*;
			@parameter-definition:
				{
					"namespace": "[@type: string <@required>]"
				}
			@end-parameter-definition

			@result-definition:
				{
					"result": "[@type: string]"
				}
			@end-result-definition

			@trigger-definition:
				{
					"trigger": "[@type: object as Error <@throwable>]"
				}
			@end-trigger-definition
		*/

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

		namespace = (
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
		);

		return	namespace;
	}
);

module.exports = formatNamespaceUpperCaseLowLine;
