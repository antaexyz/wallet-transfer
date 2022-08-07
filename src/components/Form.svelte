<script>
	import { ensIsValid, addressIsValid } from '/src/utils/checkAddress'

	export let dstAddress

	let inputValue = null
	let buttonTxt = null

    const updateButtonTxt = (newAddress) => {
		if (!newAddress)
			buttonTxt = `<p style='font-size: 15px; color: #000000;'>Submit</p>`
		else if (newAddress === -1) buttonTxt = `<p>❌</p>`
		else buttonTxt = `<p style='font-size: 21px;'>👍</p>`
	}

    const cleanForm = (e) => {
		dstAddress = null
		inputValue = null
		localStorage.removeItem('stored-address')
	}

	const submit = async (e) => {
		e.preventDefault()
		if (!inputValue) return

		let tmpAddress = inputValue.toLowerCase()
		let tmpEns = await ensIsValid(tmpAddress)
		if (tmpEns) tmpAddress = tmpEns.toLowerCase()

		if (addressIsValid(tmpAddress)) {
			dstAddress = tmpAddress
			localStorage.setItem('stored-address', JSON.stringify([tmpAddress, inputValue]))
		} else dstAddress = -1
	}

	$: updateButtonTxt(dstAddress)
    const storedAddress = JSON.parse(localStorage.getItem('stored-address'))
	if (storedAddress) {
		dstAddress = storedAddress[0]
		inputValue = storedAddress[1]
	}
</script>

<p>Recipient wallet address ⤵</p>
<form on:submit={submit}>
    <input
		spellCheck="false"
		autoComplete="off"
		type="text"
		placeholder="ENS name or Ethereum address"
		on:change={(e) => (inputValue = e.target.value)}
		value={inputValue}
		on:click={cleanForm}
	/>
	<button>{@html buttonTxt}</button>
</form>

<style>
	p {
		margin-top: 20px;
	}

	form {
		margin-top: 2px;
		display: inline-flex;
	}

	input,
	button {
		height: 44px;
	}

	input {
		width: 72vw;
		max-width: 380px;
		font-size: 15px;
		color: #fff;
		background-color: #0f1916;
		padding-left: 10px;
	}

	::placeholder {
		color: #a0a0a0;
		opacity: 1;
	}

	button {
		width: 80px;
		background-color: #8bf5d3;
		font-weight: bold;
	}
</style>
