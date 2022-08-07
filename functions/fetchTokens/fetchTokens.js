import fetch from 'node-fetch'

const covalentKey = process.env.API_SECRET

const getApiUrl = (networkName, address) => {
	if (networkName === 'Ethereum')
		return `https://api.covalenthq.com/v1/1/address/${address}/balances_v2/?quote-currency=usd&key=${covalentKey}`
	if (networkName === 'Polygon')
		return `https://api.covalenthq.com/v1/137/address/${address}/balances_v2/?quote-currency=usd&key=${covalentKey}`
	if (networkName === 'Gnosis')
		return `https://blockscout.com/xdai/mainnet/api?module=account&action=tokenlist&address=${address}`
	if (networkName === 'Binance Smart Chain')
		return `https://api.covalenthq.com/v1/56/address/${address}/balances_v2/?quote-currency=usd&key=${covalentKey}`
}

const fetchApi = async (apiUrl) => {
	try {
		const response = await fetch(apiUrl)
		return response.json()
	} catch (e) {
		return null
	}
}

exports.handler = async (event) => {
	const address = event.queryStringParameters.address

	return {
		statusCode: 200,
		body: JSON.stringify([
			await fetchApi(getApiUrl('Ethereum', address)),
			await fetchApi(getApiUrl('Polygon', address)),
			await fetchApi(getApiUrl('Gnosis', address)),
			await fetchApi(getApiUrl('Binance Smart Chain', address))
		])
	}
}

