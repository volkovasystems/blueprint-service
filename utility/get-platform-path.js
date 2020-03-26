"use strict";

const fs = require( "fs" );
const os = require( "os" );
const path = require( "path" );
const util = require( "util" );

const fsAsync = fs.promises;

const getPlatformPath = (
	async	function getPlatformPath( ){
				const homeDirectoryPath = (
						(
								(
										(
												"PLATFORM_DIRECTORY"
											in	global
										)
									===	true
								)

							&&	(
										typeof
										PLATFORM_DIRECTORY
									==	"string"
								)

							&&	(
										PLATFORM_DIRECTORY
										.length
									>	0
								)
						)
					?	PLATFORM_DIRECTORY
					:	(
							os
							.homedir( )
						)
				);

				const homeDirectoryPathTokenList = (
					homeDirectoryPath
					.split(
						path
						.sep
					)
				);

				const platformDirectoryPathTokenList = (
					path
					.resolve(
						__dirname,
						"../"
					)
					.split(
						path
						.sep
					)
				);

				const platformDirectoryPath = (
					path
					.resolve(
						homeDirectoryPath,

						(
							homeDirectoryPathTokenList
							.filter(
								pathToken => (
										platformDirectoryPathTokenList
										.includes(
											pathToken
										)
									===	false
								)
							)
							.concat(
								platformDirectoryPathTokenList
								.filter(
									pathToken => (
											homeDirectoryPathTokenList
											.includes(
												pathToken
											)
										===	false
									)
								)
							)
							.pop( )
						)
					)
				);

				if(
						(
							await	fsAsync
									.stat(
										platformDirectoryPath
									)
						)
						.isDirectory( )
					===	true
				){
					return	platformDirectoryPath;
				}
				else{
					throw	(
								new Error(
										[
											"cannot get platform path",

											"cannot determine platform directory path",

											`@platformDirectoryPath: ${ platformDirectoryPath };`
										]
									)
							)
				}
			}
);

module.exports = getPlatformPath;
