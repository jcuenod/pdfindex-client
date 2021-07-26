import React from 'react'

const Link = ({ url, children }) =>
	<a className="mx-1 text-blue-500 border-b-2 font-bold hover:text-blue-600 hover:border-blue-600" href={url}>{children}</a>

const Footer = () =>
	<div className="flex flex-row p-2 mt-2 justify-center bg-gray-200 text-xs text-gray-900">
		<span className="text-center">
			Made with <span className="text-red-500">♥</span> by <Link url="https://jcuenod.github.io/">James Cuénod</Link>.
			Want to contribute:
			<Link url="https://github.com/jcuenod/hebrewTools">code</Link>
			/
			<Link url="https://donorbox.org/support-parabible">money</Link>
		</span>
	</div>
export default Footer