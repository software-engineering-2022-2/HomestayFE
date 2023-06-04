<!-- <div class="bg-homestay-bg min-w-full h-auto object-contain"> -->

<script lang="ts">
    import SearchBar from "$lib/components/LandingPage/SearchBar.svelte";
    import Offer from "$lib/components/LandingPage/Offer.svelte";
    import CustomerReview from "$lib/components/LandingPage/CustomerReview.svelte";
    import Center from "$lib/components/Center.svelte";
    import Discount from "$lib/components/LandingPage/Discount.svelte";
	import Contact from "$lib/components/LandingPage/Contact.svelte";
	import Footer from "$lib/components/LandingPage/Footer.svelte";
    
</script>

<div class="relative bg-homestay-bg bg-no-repeat bg-cover bg-opacity-50 min-h-screen min-w-full pb-36">
    
    <Center className="pt-24">
        <SearchBar></SearchBar>
    </Center>

    <Offer></Offer>
    <Center className="mt-32">
        <CustomerReview></CustomerReview>
    </Center>

    <Discount className="mt-24"></Discount>
    <Contact></Contact>
    <Footer></Footer>
</div>