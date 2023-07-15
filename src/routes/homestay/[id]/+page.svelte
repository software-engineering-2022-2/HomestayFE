<script lang="ts">
    import ItemPage from "$lib/views/ItemPage.svelte";
    export let data;
    import { homestayInfo, managerInfo } from "$lib/stores/stores";

    homestayInfo.set(data.homestayInfo);
    managerInfo.set(data.managerInfo);
</script>

<ItemPage></ItemPage>