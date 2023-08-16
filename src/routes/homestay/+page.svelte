<script lang="ts">
	import Center from "$lib/components/Center.svelte";
	import Contact from "$lib/components/LandingPage/Contact.svelte";
	import Footer from "$lib/components/LandingPage/Footer.svelte";
	import Item from "$lib/components/SearchResult/Item.svelte";
	import SearchBar from "$lib/components/LandingPage/SearchBar.svelte";
	import Header from "$lib/components/NavBar/Header.svelte";
	import { goto } from "$app/navigation";
    
    export let data;
	function goToHomestayDetail(id: string){
		goto(`homestay/${id}`)
	}
</script>

<Header></Header>

<Center className="py-12 px-8">
	<SearchBar></SearchBar>
</Center>

<Center>
	<div class="grid grid-cols-4 gap-x-8 gap-y-8 mx-8" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
        {#each data.info.data as { id, name, description, district, city, price, image}}
            <Item onClick={()=> goToHomestayDetail(id)} {district} {city} {price} {image}></Item>
        {/each}
    </div>
</Center>

<Contact className="mt-28"></Contact>
<Footer></Footer>