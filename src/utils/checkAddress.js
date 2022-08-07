import { ethers } from 'ethers'

import switchNetwork from './switchNetwork'

export async function ensIsValid(address) {
	if (address.slice(-4) !== '.eth') return false
	if (!window.ethereum) {
		alert('You need to install MetaMask to resolve ENS')
		return false
	}
	if (ethers.networkVersion != 1) await switchNetwork('0x1')
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const ret = await provider.resolveName(address)
	return ret ? ret : false
}

export function addressIsValid(address) {
	return !address ||
		address.length !== 42 ||
		!address.match(/^[0-9a-z]+$/) ||
		address.slice(0, 2) !== '0x'
		? false
		: true
}

