<script lang="ts">
	import UpdateHomestayServices from "$lib/components/Admin/Homestay/UpdateHomestayServices.svelte";
	import { setContext } from "svelte";

	import type { PageData } from './$types';
  
	export let data: PageData;

	setContext("homestay_id", data.homestay_id)
</script>
<UpdateHomestayServices></UpdateHomestayServices>