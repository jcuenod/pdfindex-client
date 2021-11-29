import React, { useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"

const ExternalLinkIcon = () => (
	<div className="text-blue-600 mr-2">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			aria-hidden="true"
			role="img"
			width="22"
			height="22"
			preserveAspectRatio="xMidYMid meet"
			viewBox="0 0 50 50"
		>
			<path d="M38.288 10.297l1.414 1.415l-14.99 14.99l-1.414-1.414z" fill="currentColor" /><path d="M40 20h-2v-8h-8v-2h10z" fill="currentColor" /><path d="M35 38H15c-1.7 0-3-1.3-3-3V15c0-1.7 1.3-3 3-3h11v2H15c-.6 0-1 .4-1 1v20c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V24h2v11c0 1.7-1.3 3-3 3z" fill="currentColor" />
		</svg>
	</div>
)

const PAGES_SEPARATOR = ", "
const EXTRACTS_SEPARATOR = "___SEPARATOR___"

const Zebra_colors = () => (
	<style>{`
		.table-row-style {
			border-bottom: 1px solid #ccc;
		}
		.table-row-style:last-child {
			border-bottom: none;
		}
		`}
	</style>
)


let timer
const debounce =
	(callback, passthrough) =>
		(...args) => {
			if (!passthrough) {
				try {
					clearTimeout(timer)
				} catch (e) { }
				timer = setTimeout(() => {
					debounce(callback, true)(...args)
				}, 700)
				return
			}
			callback(...args)
		}
const doOpen = ({ filename, page }) => () => {
	console.log("opening", filename, page)
	fetch("http://localhost:3000/open?filename=" + encodeURIComponent(filename) + "&page=" + encodeURIComponent(page))
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
		<div className="flex flex-col min-h-screen bg-gray-50">
			<Header />
			<Zebra_colors />
			<div className="flex flex-col m-6 bg-gray-100 border-2 border-gray-200 rounded-lg md:mx-8 lg:mx-16">
				<div className="my-4 mx-10 border-bottom">
					<input
						type="text"
						className="w-full text-xl m-1 p-3 border-b-2 focus:border-blue-200 rounded-sm outline-none"
						onChange={debounce(updateResults(setResults, setLoading))}
						placeholder="Search"
					></input>
				</div>
				<div className="m-3">
					{results.length > 0 && (
						<ul>
							{results.map(({ name, pages, extracts }, i) => {
								const pageArray = pages.split(PAGES_SEPARATOR)
								const extractArray = extracts.split(EXTRACTS_SEPARATOR)
								const topBorder = i + 1 < results.length ? " border-b-4 border-gray-200" : ""
								return (
									<li key={name} className={"m-5 p-2" + topBorder}>
										<div className="text-md font-bold">
											{name.replace(/_/g, " - ")}
										</div>
										<ul className="py-1">
											{pageArray.map((page, index) => {
												return (
													<li key={page} className="table-row-style">
														<button className="flex flex-row items-center p-2 w-full hover:bg-blue-100 active:bg-blue-200"
															onClick={doOpen({ filename: name, page })}
														>
															<ExternalLinkIcon />
															<div
																dangerouslySetInnerHTML={{
																	__html: extractArray[index],
																}}
															></div>
															<div className="w-16 text-right text-xs font-bold">
																(p. {+page + 1})
															</div>
														</button>
													</li>
												)
											})}
										</ul>
									</li>
								)
							})}
						</ul>
					)}
				</div>
			</div>
			<div className="flex-auto" />
			<Footer />
		</div>
	)
}
export default App
