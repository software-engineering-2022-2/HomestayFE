<script lang="ts">
    import ItemPage from "$lib/views/ItemPage.svelte";
    export let data;
    import { homestayInfo } from "$lib/stores/stores";

    homestayInfo.set(data.info);
</script>

<ItemPage></ItemPage>