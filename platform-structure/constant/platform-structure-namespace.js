"use strict";

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const PLATFORM_STRUCTURE_NAMESPACE = "platform-structure";

hardenProperty(
	"PLATFORM_STRUCTURE_NAMESPACE",
	PLATFORM_STRUCTURE_NAMESPACE
);

module.exports = PLATFORM_STRUCTURE_NAMESPACE;
