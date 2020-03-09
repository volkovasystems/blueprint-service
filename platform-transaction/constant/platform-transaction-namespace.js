"use strict";

const harden = require( "harden" );

const PLATFORM_TRANSACTION_NAMESPACE = "platform-transaction";

harden(
	"PLATFORM_TRANSACTION_NAMESPACE",
	PLATFORM_TRANSACTION_NAMESPACE
);

module.exports = PLATFORM_TRANSACTION_NAMESPACE;
