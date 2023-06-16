<script lang="ts">
    import Header from "$lib/components/ItemPage/Header.svelte";
    import HomestayInfo from "$lib/components/ItemPage/HomestayInfo.svelte";
    import ImageGroup from "$lib/components/ItemPage/ImageGroup.svelte";
    import Center from "$lib/components/Center.svelte";
	import HostInfo from "$lib/components/ItemPage/HostInfo.svelte";
	import HomestayDescription from "$lib/components/ItemPage/HomestayDescription.svelte";
	import PricingConfiguration from "$lib/components/ItemPage/PricingConfiguration.svelte";
	import IncludedServices from "$lib/components/ItemPage/IncludedServices.svelte";
	import HomestayReviews from "$lib/components/ItemPage/HomestayReviews.svelte";
	import ReservationZone from "$lib/components/ItemPage/ReservationZone.svelte";
	import DetailHostInfo from "$lib/components/ItemPage/DetailHostInfo.svelte";
	import Footer from "$lib/components/LandingPage/Footer.svelte";
    
</script>

<Header></Header>
<HomestayInfo className="mx-14 my-5"></HomestayInfo>
<Center className="mx-16 my-5">
    <ImageGroup></ImageGroup>
</Center>

<div class="grid grid-cols-2 mx-16 gap-5">
    <div>
        <HostInfo className="border-b-black border-b-[1px] pb-5"></HostInfo>
        <HomestayDescription className="py-5 border-b-black border-b-[1px]"></HomestayDescription>
        <PricingConfiguration className="py-5 border-b-black border-b-[1px]"></PricingConfiguration>
        <IncludedServices className="py-5 border-b-black border-b-[1px]"></IncludedServices>
        <HomestayReviews className="py-5"></HomestayReviews>
    </div>
    <div>
        <ReservationZone></ReservationZone>
        <DetailHostInfo className="mt-5"></DetailHostInfo>
    </div>
</div>

<Footer className="mt-16"></Footer>

