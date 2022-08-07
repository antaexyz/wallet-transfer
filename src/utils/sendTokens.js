import { ethers } from 'ethers'

import switchNetwork from './switchNetwork'

const miniAbi = [
	'function name() view returns (string)',
	'function symbol() view returns (string)',
	'function balanceOf(address) view returns (uint)',
	'function transfer(address to, uint amount)',
	'event Transfer(address indexed from, address indexed to, uint amount)'
]

const checkNetwork = (chain) => {
	if (chain == 'Etherum' && ethers.networkVersion != 1)
		return switchNetwork('0x1')
	if (chain == 'Polygon' && ethers.networkVersion != 137)
		return switchNetwork('0x89')
	if (chain == 'Gnosis' && ethers.networkVersion != 100)
		return switchNetwork('0x64')
	if (chain == 'Binance Smart Chain' && ethers.networkVersion != 56)
		return switchNetwork('0x36')
}

const checkRequirements = (dstAddress, checkboxesState) => {
	if (!dstAddress)
		return alert('You have to set the recipient wallet address first.')
	if (checkboxesState.reduce((a, b) => a + b, 0) === 0)
		return alert('You have to select at least one token.')
	return 1
}

const sendToken = async (token, provider, signer, dstAddress) => {
	const tBalance = ethers.utils.formatEther(token.balance)
	const tAmount = ethers.utils.parseUnits(tBalance, token.decimal)
	const contract = new ethers.Contract(token.contractAddress, miniAbi, provider)
	const tokenSigner = contract.connect(signer)
	try {
		tokenSigner.transfer(dstAddress, tAmount)
	} catch (e) {
		return
	}
}

export default async function sendTokens(data, dstAddress, checkboxesState) {
	if (!checkRequirements(dstAddress, checkboxesState)) return
	await checkNetwork(data.chain)
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const signer = provider.getSigner()

	data.tokens.map((token, index) => {
		if (checkboxesState[index]) sendToken(token, provider, signer, dstAddress)
	})
}

// const sendToken = async (token, provider, signer, dstAddress) => {
// 	const tBalance = ethers.utils.formatEther(token.balance)
// 	const tAmount = ethers.utils.parseUnits(tBalance, token.decimal)
// 	const contract = new ethers.Contract(token.contractAddress, miniAbi, provider)
// 	const tokenSigner = contract.connect(signer)
// 	try {
// 	const tx = await tokenSigner.transfer(dstAddress, tAmount)
// 	await tx.wait()
// 	return true
// } catch(e) {
// 	return false
// }
// }

// export default async function sendTokens(
// 	data,
// 	dstAddress,
// 	checkboxesState,
// 	transactionStatus
// ) {
// 	if (!checkRequirements(dstAddress, checkboxesState)) return
// 	await checkNetwork(data.chain)
// 	const provider = new ethers.providers.Web3Provider(window.ethereum)
// 	const signer = provider.getSigner()

// 	const loop = async (index) => {
// 		if (index === checkboxesState.length) return
// 		if (!checkboxesState[index]) return loop(index+1)

// 		let token = data.tokens[index]
// 		transactionStatus[index] = await sendToken(token, provider, signer, dstAddress)
// 		loop(index+1)
// 	}
// 	return  loop(0)
// 	return transactionStatus
// }
