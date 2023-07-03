<script lang="ts">
    import Center from "$lib/components/Center.svelte";
	import Contact from "$lib/components/LandingPage/Contact.svelte";
	import Footer from "$lib/components/LandingPage/Footer.svelte";
    import Header from "$lib/components/NavBar/Header.svelte";
	import UserProfile from "$lib/components/Profile/UserProfile.svelte";
</script>

<div class="relative bg-homestay-bg bg-no-repeat bg-cover bg-opacity-50 min-h-screen min-w-full">

    <Header></Header>

    <Center className="my-6">
        <UserProfile></UserProfile>
    </Center>

    <Contact></Contact>
    <Footer></Footer>

</div>

