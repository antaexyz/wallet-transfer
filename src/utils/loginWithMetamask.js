export default async function loginWithMetamask(method) {
	if (!window.ethereum) return alert('You need to install MetaMask!')
	const accounts = await window.ethereum.request({ method: method })
	return accounts && accounts[0] ? accounts[0] : null
}

