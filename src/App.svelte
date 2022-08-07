<script>
  import Login from './components/Login.svelte'
  import Header from './components/Header.svelte'
  import Form from './components/Form.svelte'
  import List from './components/List.svelte'
  import Footer from './components/Footer.svelte'

  import fetchTokens from './utils/fetchTokens.js'

  let srcAddress = null
  let dstAddress = null
  let tokensList = null

  $: fetchTokens(srcAddress).then((ret) => (tokensList = ret))
</script>

<main>
  	<div class="main-container">
		<Login bind:srcAddress />
		<Header />
		<Form bind:dstAddress />
		{#if tokensList}
			<div class="items">
				{#each tokensList as data}
					<List {data} {dstAddress} />
				{/each}
			</div>
		{:else if srcAddress}
			<p>Fetching your wallet balance ...</p>
		{/if}
  	</div>
	<Footer />
</main>

<style>
	.main-container {
		min-height: calc(100vh - 115px);
	}

	.items {
		margin-bottom: 30px;
	}

	p {
		margin-top: 100px;
		color: #b3b3b3;
	}
</style>
