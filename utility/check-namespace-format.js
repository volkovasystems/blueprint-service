"use strict";

const NAMESPACE_FORMAT_PATTERN = (
	/^[A-Za-z\$\@][A-Za-z0-9\$\@\_\-\s]*?[A-Za-z0-9\$\@]$/
)

const checkNamespaceFormat = (
	function checkNamespaceFormat( namespace ){
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
									"cannot check namespace format",
									"invalid namespace parameter",

									`@namespace: ${ namespace };`
								]
							)
					);
		}

		if(
				NAMESPACE_FORMAT_PATTERN
				.test(
					namespace
				)
			!==	true
		){
			return	false;
		}

		return	true;
	}
);

module.exports = checkNamespaceFormat;
