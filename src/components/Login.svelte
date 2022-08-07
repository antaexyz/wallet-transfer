<script>
	import loginWithMetamask from '../utils/loginWithMetamask'

	export let srcAddress

	const onAccountChange = () =>
		window.ethereum.on('accountsChanged', () => window.location.reload())

	setInterval(async () => {
		if (!window.ethereum) return
		srcAddress = await loginWithMetamask('eth_accounts')
		onAccountChange()
	})
</script>

{#if !srcAddress}
	<button
		class="btn-light"
		on:click={async () =>
			(srcAddress = await loginWithMetamask('eth_requestAccounts'))}
	>
		Login with MetaMask
	</button>
{:else}
	<p>Logged with: {srcAddress}</p>
{/if}

<style>
	p {
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>

