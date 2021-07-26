import React, { useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"

const PAGES_SEPARATOR = ", "
const EXTRACTS_SEPARATOR = "___SEPARATOR___"

const ZEBRA_COLORS = {
	odd: "bg-gray-100 hover:bg-blue-50",
	even: "bg-gray-200 hover:bg-blue-50",
}

let timer
const debounce =
	(callback, passthrough) =>
	(...args) => {
		if (!passthrough) {
			try {
				clearTimeout(timer)
			} catch (e) {}
			timer = setTimeout(() => {
				debounce(callback, true)(...args)
			}, 700)
			return
		}
		callback(...args)
	}
let loadingState = 0
const updateResults = (setResults, setLoading) => e => {
	loadingState++
	setLoading(true)
	fetch("http://localhost:3000/query?q=" + encodeURIComponent(e.target.value))
		.then(r => r.json())
		.then(result => {
			setResults(result)
			loadingState--
			if (loadingState === 0) {
				setLoading(false)
			}
		})
}
const App = () => {
	const [loading, setLoading] = useState(false)
	const [results, setResults] = useState([])

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<div className="flex flex-col m-4 rounded shadow-lg bg-gray-100 md:mx-8 lg:mx-16">
				<div className="m-3 border-bottom">
					<input
						type="text"
						className="w-full text-xl m-1 p-3 bg-gray-50"
						onChange={debounce(updateResults(setResults, setLoading))}
					></input>
				</div>
				<div className="m-3">
					{results.length > 0 ? (
						<ul>
							{results.map(({ name, pages, extracts }, i) => {
								const pageArray = pages.split(PAGES_SEPARATOR)
								const extractArray = extracts.split(EXTRACTS_SEPARATOR)
								const topBorder = i > 0 ? " border-t-2 border-gray-300" : ""
								return (
									<li key={name} className={"p-2" + topBorder}>
										<div className="text-xl font-bold">
											{name.replace(/_/g, " - ")}
										</div>
										<ul className="py-1">
											{pageArray.map((page, index) => {
												const zebra =
													ZEBRA_COLORS[index % 2 === 0 ? "even" : "odd"]
												return (
													<li
														key={page}
														className={
															"flex flex-row items-center p-2 " + zebra
														}
													>
														<div
															dangerouslySetInnerHTML={{
																__html: extractArray[index],
															}}
														></div>
														<div className="w-16 text-right text-xs font-bold">
															(p. {+page + 1})
														</div>
													</li>
												)
											})}
										</ul>
									</li>
								)
							})}
						</ul>
					) : (
						<div className="flex py-16 items-center justify-center text-xl font-bold">
							Search for something...
						</div>
					)}
				</div>
			</div>
			<div className="flex-auto" />
			<Footer />
		</div>
	)
}
export default App
