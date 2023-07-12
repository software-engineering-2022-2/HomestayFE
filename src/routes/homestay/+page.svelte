<script lang="ts">
	import Center from "$lib/components/Center.svelte";
	import Contact from "$lib/components/LandingPage/Contact.svelte";
	import Footer from "$lib/components/LandingPage/Footer.svelte";
	import Item from "$lib/components/SearchResult/Item.svelte";
	import SearchBar from "$lib/components/LandingPage/SearchBar.svelte";
	import Header from "$lib/components/NavBar/Header.svelte";
    
    export let data;
</script>

<Header></Header>

<Center className="py-12">
	<SearchBar></SearchBar>
</Center>

<Center>
	<div class="grid grid-cols-4 gap-x-8 gap-y-8 mx-8">
        {#each data.info as { id, name, description, address, price}}
        <a href="homestay/{id}">
            <Item address={address} price={price}></Item>
        </a>
        {/each}
    </div>
</Center>

<Contact className="mt-28"></Contact>
<Footer></Footer>


