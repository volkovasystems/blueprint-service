"use strict";

const checkNamespaceFormat = (
	require( `${ PLATFORM_UTILITY_PATH }/check-namespace-format.js` )
);

const NAMESPACE_LETTER_CASE_SEPARATOR_PATTERN = (
	/([a-z])([A-Z])/g
);

const NAMESPACE_LOW_LINE_SEPARATOR_PATTERN = (
	/[\_]+?/g
);

const NAMESPACE_EN_DASH_SEPARATOR_PATTERN = (
	/[\-]+?/g
);

const NAMESPACE_SPACE_SEPARATOR_PATTERN = (
	/[\s]+?/g
);

const WHITE_SPACE_CHARACTER = (
	' '
);

const NAMESPACE_LETTER_CASE_EXPANDER = (
	"$1 $2"
);

const separateNamespaceToken = (
	function separateNamespaceToken( namespace ){
		/*;
			@parameter-definition:
				{
					"namespace": "[@type: string <@required>]"
				}
			@end-parameter-definition

			@result-definition:
				{
					"result": "[@type: object as Array of string]"
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

		const namespaceTokenList = (
			namespace
			.replace(
				NAMESPACE_LETTER_CASE_SEPARATOR_PATTERN,
				NAMESPACE_LETTER_CASE_EXPANDER
			)
			.replace(
				NAMESPACE_EN_DASH_SEPARATOR_PATTERN,
				WHITE_SPACE_CHARACTER
			)
			.replace(
				NAMESPACE_LOW_LINE_SEPARATOR_PATTERN,
				WHITE_SPACE_CHARACTER
			)
			.split(
				NAMESPACE_SPACE_SEPARATOR_PATTERN
			)
		);

		return	namespaceTokenList;
	}
);

module.exports = separateNamespaceToken;
