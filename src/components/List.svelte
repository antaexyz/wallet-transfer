<script>
	import Item from './Item.svelte'

	import sendTokens from '/src/utils/sendTokens.js'

	export let data, dstAddress

	let checkboxesState = Array(data.tokens.length).fill(false)
	let transactionStatus = Array(data.tokens.length).fill(null)
	let check = '[ ]'

	const toggleCheck = () => {
		let b = check === '[ ]'
		checkboxesState = Array(data.tokens.length).fill(b)
		check = b ? '[X]' : '[ ]'
	}
</script>

<div class="container">
	<div class="top-container">
		<h3>{data.chain}</h3>
		{#if data.error_code === 2}
			<p class="check" on:click={toggleCheck}>{check}</p>
		{/if}
	</div>
	{#if data.error_code !== 2}
		<p class="error-message">{data.error_message}</p>
	{:else}
		<div class="items">
			{#each data.tokens as token, index}
				<Item {index} {token} bind:check bind:checkboxesState />
			{/each}
		</div>
		<button
			class="btn-light"
			on:click={sendTokens(data, dstAddress, checkboxesState)}
		>
			Send Tokens
		</button>
	{/if}
</div>

<style>
	.container {
		margin-top: 60px;
	}

	.top-container {
		width: 100%;
		display: inline-flex;
		align-items: center;
	}

	.check {
		margin-left: 15px;
		font-size: 20px;
		cursor: pointer;
	}

	.error-message {
		color: #b3b3b3;
	}

	.items {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin: 15px 0 15px 0;
	}
</style>

