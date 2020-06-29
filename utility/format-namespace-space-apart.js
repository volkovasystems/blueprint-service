"use strict";

const separateNamespaceToken = (
	require( `${ PLATFORM_UTILITY_PATH }/separate-namespace-token.js` )
);

const WHITE_SPACE_CHARACTER = (
	' '
);

const formatNamespaceSpaceApart = (
	function formatNamespaceSpaceApart( namespace ){
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

		const namespaceTokenList = (
			separateNamespaceToken( namespace )
		);

		namespace = (
			namespaceTokenList
			.join(
				WHITE_SPACE_CHARACTER
			)
		);

		return	namespace;
	}
);

module.exports = formatNamespaceSpaceApart;
