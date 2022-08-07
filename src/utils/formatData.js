const finalFormat = (error_code, error_message, tokens, chain) => {
	return {
		error_code: error_code,
		chain: chain,
		error_message: error_message,
		tokens: tokens
	}
}

const getExplorer = (chain) => {
	if (chain === 'Ethereum') return `https://etherscan.io/token/`
	if (chain === 'Polygon') return `https://polygonscan.com/token/`
	if (chain === 'Gnosis') return `https://blockscout.com/xdai/mainnet/token/`
	if (chain === 'Binance Smart Chain') return `https://bscscan.com/token/`
}

const checkData = (rawData, chain) => {
	if (!rawData) return 0
	if (chain === 'Gnosis' && rawData.length <= 0) return 1
	if (
		chain !== 'Gnosis' &&
		rawData[0].balance.length == 1 &&
		rawData[0].balance == 0
	)
		return 1
	return 2
}

export default async function formatData(rawData, chain) {
	let tokens = []
	let error_message = [`Can't fetch ${chain} API.`, `No tokens found.`, `Ok`]

	rawData = chain === 'Gnosis' ? rawData.result : rawData.data.items

	let explorer = getExplorer(chain)
	let error_code = checkData(rawData, chain)

	if (error_code === 2) {
		rawData.map((token) => {
			if (token && token.balance && token.balance > 0)
				tokens.push({
					name: token.contract_name || token.name,
					contractAddress: token.contract_address || token.contractAddress,
					balance: token.balance,
					decimals: token.contract_decimals || token.decimals,
					type: token.supports_erc || token.type,
					explorer: explorer + (token.contract_address || token.contractAddress)
				})
		})
	}
	return finalFormat(error_code, error_message[error_code], tokens, chain)
}
