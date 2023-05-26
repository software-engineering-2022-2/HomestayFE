<script lang="ts">
    export let className:string = "";
</script>

<div class="flex justify-center items-center {className}">
    <slot/>
</div>