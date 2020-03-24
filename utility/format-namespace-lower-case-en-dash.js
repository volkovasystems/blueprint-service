"use strict";

const separateNamespaceToken = (
	require( `${ PLATFORM_UTILITY_PATH }/separate-namespace-token.js` )
);

const EN_DASH_CHARACTER = (
	'-'
);

const formatNamespaceLowerCaseEnDash = (
	function formatNamespaceLowerCaseEnDash( namespace ){
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
									"cannot format namespace lower case en dash",
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
									"cannot format namespace lower case en dash",
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
					.toLowerCase( )
				)
			)
			.join(
				EN_DASH_CHARACTER
			)
		);

		return	namespace;
	}
);

module.exports = formatNamespaceLowerCaseEnDash;
