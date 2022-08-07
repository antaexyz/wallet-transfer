export default async function switchNetwork(chainId) {
	await window.ethereum.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId: chainId }]
	})
}

