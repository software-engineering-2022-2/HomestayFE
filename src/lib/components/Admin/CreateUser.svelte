<script lang="ts">
	import { authAPI, userAPI } from '$lib/api/api';
	import { FieldsError } from '$lib/api/exception';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let username = '';
	let password = '';
	let passwordConfirm = '';
	let isHomestayManager = false;

	async function submit() {
		// dispatch a custom event with the rating and review
		if (password !== passwordConfirm) {
			alert('Passwords do not match!');
			return;
		}

		try {
			await authAPI.userRegister(username, password, isHomestayManager);
		} catch (error) {
			if (error instanceof FieldsError) {
				alert(error.getMessage());
			}
			return;
		} finally {
			// Dispatch the "close" event to close the modal
			alert("Create user success!")
			dispatch('submit');
		}
	}

	// Define a function to handle the cancel button click
	function cancel() {
		// Hide the review modal
		dispatch('cancel');
	}
</script>

<div class="overlay fixed inset-0 bg-black bg-opacity-50">
	<div
		class="modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-8 rounded-lg w-[40rem]"
	>
		<h2 class="text-xl font-bold text-gray-800">Create new user</h2>

		<div>
			<label class="block text-lg font-bold mb-2 text-gray-700" for="email-input">
				Username:
			</label>
			<input
				class="w-full text-lg py-2 px-3 rounded border border-gray-300 text-gray-700"
				type="text"
				id="email-input"
				bind:value={username}
				required
				autocomplete="off"
			/>
		</div>
		<div>
			<label class="block text-lg font-bold mb-2 text-gray-700" for="password-input">
				Password:
			</label>
			<input
				class="w-full text-lg py-2 px-3 rounded border border-gray-300 text-gray-700"
				type="password"
				id="password-input"
				bind:value={password}
				required
				autocomplete="off"
			/>
		</div>
		<div>
			<label class="block text-lg font-bold mb-2 text-gray-700" for="password-input">
				Password Confirm:
			</label>
			<input
				class="w-full text-lg py-2 px-3 rounded border border-gray-300 text-gray-700"
				type="password"
				id="password-confirm"
				bind:value={passwordConfirm}
				required
				autocomplete="off"
			/>
		</div>
		<div>
			<label class="block text-lg font-bold mb-2 text-gray-700" for="password-input">
				Is Homestay Manager:
			</label>
			<input type="checkbox" class="w-[20px] h-[20px]" bind:checked={isHomestayManager} />
		</div>

		<div class="button mt-4 flex justify-center">
			<!-- Add a cancel button -->
			<button
				on:click={cancel}
				class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded mr-4"
				>Cancel</button
			>
			<button
				on:click={submit}
				class="bg-[#E86A33] hover:bg-[#FF8C66] text-white font-medium py-2 px-4 rounded"
				>Submit</button
			>
		</div>
	</div>
</div>
