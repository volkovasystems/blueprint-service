"use strict";

const $checkNamespaceFormat = (
	require( `${ PLATFORM_UTILITY_PATH }/check-namespace-format.js` )
);

const $separateNamespaceToken = (
	require( `${ PLATFORM_UTILITY_PATH }/separate-namespace-token.js` )
);

const $formatNamespaceSpaceApart = (
	require( `${ PLATFORM_UTILITY_PATH }/format-namespace-space-apart.js` )
);

const $formatNamespaceUpperCaseLowLine = (
	require( `${ PLATFORM_UTILITY_PATH }/format-namespace-upper-case-low-line.js` )
);

const $formatNamespaceLowerCaseEnDash = (
	require( `${ PLATFORM_UTILITY_PATH }/format-namespace-lower-case-en-dash.js` )
);

const Namespace = (
	function Namespace( namespace ){
		/*;
			@parameter-definition:
				{
					"namespace": "[@type: string <@required>]"
				}
			@end-parameter-definition

			@result-definition:
				{
					"result": "[@type: object as Namespace]"
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
								this
					instanceof	Namespace
				)
			===	true
		){
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
										"cannot instantiate namespace object",
										"invalid namespace parameter",

										`@namespace: ${ namespace };`
									]
								)
						);
			}

			if(
					$checkNamespaceFormat(
						namespace
					)
				!==	true
			){
				throw	(
							new	Error(
									[
										"cannot instantiate namespace object",
										"invalid namespace format",

										`@namespace: ${ namespace };`
									]
								)
						);
			}

				this
				.namespace
			=	namespace;
		}
		else{
			return	(
						new	Namespace(
								namespace
							)
					);
		}
	}
);

Namespace.prototype.checkNamespaceFormat = (
	function checkNamespaceFormat( ){
		return	(
					$checkNamespaceFormat(
						this
						.namespace
					)
				);
	}
);

Namespace.prototype.separateNamespaceToken = (
	function separateNamespaceToken( ){
		return	(
					$separateNamespaceToken(
						this
						.namespace
					)
				);
	}
);

Namespace.prototype.formatNamespaceApart = (
	function formatNamespaceApart( ){
		return	(
					$formatNamespaceSpaceApart(
						this
						.namespace
					)
				);
	}
);

Namespace.prototype.formatNamespaceUpperCaseLowLine = (
	function formatNamespaceUpperCaseLowLine( ){
		return	(
					$formatNamespaceUpperCaseLowLine(
						this
						.namespace
					)
				);
	}
);

Namespace.prototype.formatNamespaceLowerCaseEnDash = (
	function formatNamespaceLowerCaseEnDash( ){
		return	(
					$formatNamespaceLowerCaseEnDash(
						this
						.namespace
					)
				);
	}
);

Namespace.prototype.toString = (
	function toString( ){
		return	(
					this
					.namespace
				);
	}
);

Namespace.prototype.valueOf = (
	function valueOf( ){
		return	(
					this
					.namespace
				);
	}
);
