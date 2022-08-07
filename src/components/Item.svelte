<script>
	import { ethers } from 'ethers'

	export let index, token, check, checkboxesState, transactionStatus

	const balance = !parseInt(token.decimals)
		? ethers.utils.formatEther(token.balance)
		: ethers.utils.formatUnits(token.balance, parseInt(token.decimals))

	const updateSelectButton = () => {
		let t = 0,
			f = 0
		checkboxesState.map((item) => (item ? t++ : f++))
		check = f > 0 ? '[ ]' : '[X]'
	}

	const onChange = () => {
		checkboxesState[index] = !checkboxesState[index]
		updateSelectButton()
	}
</script>

<div class="item-container">
	{#if !transactionStatus || transactionStatus[index] === null}
		<input
			type="checkbox"
			checked={checkboxesState[index]}
			on:change={onChange}
		/>
	{:else if transactionStatus[index] === true}
		<p class="status">✅</p>
	{:else if transactionStatus[index] === false}
		<p class="status">❌</p>
	{/if}

	<p>{token.name}</p>
	<p class="balance">({parseFloat(balance).toFixed(3)})</p>
</div>
<a target="_blank" href={token.explorer}>{token.contractAddress}</a>

<style>
	.item-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 10px;
	}

	.item-container:first-child {
		margin-top: 0;
	}

	input {
		-webkit-appearance: none;
		-moz-appearance: none;
		-ms-appearance: none;
		height: 15px;
		width: 15px;
		background-color: #000000;
		border: 1px solid #fff;
		border-radius: 4px;
		cursor: pointer;
	}

	input:checked {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2px;
	}

	input:checked:before {
		width: 100%;
		height: 100%;
		background-color: #fff;
		content: ' ';
		overflow: hidden;
		border-radius: 2px;
	}

	p {
		margin-left: 10px;
	}

	.status {
		margin: 0;
		font-size: 13px;
	}

	.balance {
		font-size: 15px;
	}

	a {
		margin-left: 25px;
	}
</style>
