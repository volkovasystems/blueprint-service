SERVICE
.get(
	"/service/interface/platform-transaction/ping",
	function( request, response ){
		response
		.json(
			{
				"responseData": ( new Date( ) ).toISOString( )
			}
		);
	}
);
