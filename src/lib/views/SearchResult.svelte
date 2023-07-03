<script lang="ts">
	import Center from "$lib/components/Center.svelte";
	import Contact from "$lib/components/LandingPage/Contact.svelte";
	import Footer from "$lib/components/LandingPage/Footer.svelte";
	import SearchBar from "$lib/components/LandingPage/SearchBar.svelte";
	import Header from "$lib/components/NavBar/Header.svelte";
	import SearchItems from "$lib/components/SearchResult/SearchItems.svelte";
</script>

<Header></Header>

<Center className="py-12">
	<SearchBar></SearchBar>
</Center>

<Center>
	<SearchItems></SearchItems>
</Center>

<Contact className="mt-28"></Contact>
<Footer></Footer>