<script lang="ts">
import Header from "$lib/components/NavBar/Header.svelte";
import HomestayInfo from "$lib/components/ItemPage/HomestayInfo.svelte";
import ImageGroup from "$lib/components/ItemPage/ImageGroup.svelte";
import Center from "$lib/components/Center.svelte";
import HostInfo from "$lib/components/ItemPage/ManagerInfo.svelte";
import HomestayDescription from "$lib/components/ItemPage/HomestayDescription.svelte";
import PricingConfiguration from "$lib/components/ItemPage/PricingConfiguration.svelte";
import IncludedServices from "$lib/components/ItemPage/IncludedServices.svelte";
import HomestayReviews from "$lib/components/ItemPage/HomestayReviews.svelte";
import ReservationZone from "$lib/components/ItemPage/ReservationZone.svelte";
import DetailHostInfo from "$lib/components/ItemPage/DetailManagerInfo.svelte";
import Footer from "$lib/components/LandingPage/Footer.svelte";

</script>

<Header />
<HomestayInfo className="mx-20 my-5" />
<Center className="mx-20 my-7">
  <ImageGroup></ImageGroup>
</Center>

<div class="mx-20">
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
    <div>
      <HostInfo className="border-b-[#777777] border-b-[1.8px] pb-5"></HostInfo>
      <HomestayDescription className="py-5 border-b-[#777777] border-b-[1.8px]"></HomestayDescription>
      <PricingConfiguration className="py-5 border-b-[#777777] border-b-[1.8px]"></PricingConfiguration>
      <IncludedServices className="py-5 border-b-[#777777] border-b-[1.8px]"></IncludedServices>
      <HomestayReviews className="py-5"></HomestayReviews>
    </div>
    <div>
      <ReservationZone></ReservationZone>
      <DetailHostInfo className="my-8"></DetailHostInfo>
    </div>
  </div>
</div>

<Footer className="mt-7" />

