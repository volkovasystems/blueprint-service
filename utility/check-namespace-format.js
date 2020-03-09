"use strict";

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
			return	undefined;
		}

		
	}
);

module.exports = checkNamespaceFormat;
