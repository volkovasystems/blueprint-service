"use strict";

const harden = require( "harden" );

const PLATFORM_STRUCTURE_NAMESPACE = "platform-structure";

harden(
	"PLATFORM_STRUCTURE_NAMESPACE",
	PLATFORM_STRUCTURE_NAMESPACE
);

module.exports = PLATFORM_STRUCTURE_NAMESPACE;
