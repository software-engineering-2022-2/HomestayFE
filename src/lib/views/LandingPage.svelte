<script lang="ts">
    import SearchBar from "$lib/components/LandingPage/SearchBar.svelte";
    import Offer from "$lib/components/LandingPage/Offer.svelte";
    import CustomerReview from "$lib/components/LandingPage/CustomerReview.svelte";
    import Center from "$lib/components/Center.svelte";
    import Discount from "$lib/components/LandingPage/Discount.svelte";
	import Contact from "$lib/components/LandingPage/Contact.svelte";
	import Footer from "$lib/components/LandingPage/Footer.svelte";
</script>

<div class="relative bg-homestay-bg bg-no-repeat bg-cover bg-opacity-50 min-h-screen min-w-full">
    
    <Center className="pt-20 px-8">
        <SearchBar></SearchBar>
    </Center>

    <Offer></Offer>
    <Center className="pt-20">
        <CustomerReview></CustomerReview>
    </Center>

    <Discount className="mt-20"></Discount>
    <Contact></Contact>
    <Footer></Footer>
</div>