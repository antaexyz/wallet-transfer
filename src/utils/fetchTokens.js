import formatData from './formatData.js'

export default async function fetchTokens(address) {
	if (!address) return null

	const apiUrl = `/.netlify/functions/fetchTokens?address=${address}`
	let response = await fetch(apiUrl)
	let rawData = await response.json()

	return [
		await formatData(rawData[0], 'Ethereum'),
		await formatData(rawData[1], 'Polygon'),
		await formatData(rawData[2], 'Gnosis'),
		await formatData(rawData[3], 'Binance Smart Chain')
	]
}

