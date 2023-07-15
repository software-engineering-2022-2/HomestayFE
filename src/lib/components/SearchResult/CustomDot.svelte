<script lang="ts">
    export let symbol: number;
    export let active: boolean;

    $: opacity = active === true? 'bg-opacity-100': 'bg-opacity-50';
</script>

<button on:click class="caret-transparent h-[0.5rem] w-[0.5rem] rounded-full bg-white {opacity} cursor-pointer">
<div style="display: none;">{symbol}</div>
</button>
