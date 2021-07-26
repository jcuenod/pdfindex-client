import React, { useState } from "react"

const Header = () => (
	<div className="flex flex-row py-1 px-2 bg-gray-100 shadow">
		<div className="p-2 flex-0 flex items-center text-red-500">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-file-text"
			>
				<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
				<polyline points="14 2 14 8 20 8"></polyline>
				<line x1="16" y1="13" x2="8" y2="13"></line>
				<line x1="16" y1="17" x2="8" y2="17"></line>
				<polyline points="10 9 9 9 8 9"></polyline>
			</svg>
		</div>
		<div className="p-2 flex-1 font-bold text-md sm:text-xl text-gray-700">
			PDF Searcher
		</div>
	</div>
)
export default Header
