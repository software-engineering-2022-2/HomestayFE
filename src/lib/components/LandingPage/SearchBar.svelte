<script lang="ts">
	import Autocomplete from '@smui-extra/autocomplete';
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	let places = ['Apple', 'Orange', 'Banana', 'Mango'];
	let value: string | undefined = undefined;
	let text = '';
</script>

	<div class="absolute flex flex-row justify-center pt-24 w-full">
		<Autocomplete class="w-[1000px]" options={places} bind:value bind:text>
			<Textfield
				label="Enter where you want to go"
				bind:value={text}
				variant="filled"
				class="w-full rounded-full"
			>
				<Icon class="material-icons !text-[#E86A33] !text-4xl" slot="leadingIcon">search</Icon>
			</Textfield>
		</Autocomplete>
	</div>
