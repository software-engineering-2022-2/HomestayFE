<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { UserDetail } from '$lib/types/types';

	const dispatch = createEventDispatcher();

	export let userDetail: UserDetail;

	function submit() {
		// dispatch a custom event with the rating and review
		dispatch('submit', {userDetail});
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
		<h2 class="text-xl font-bold text-gray-800">Update user profile: {userDetail.username}</h2>
		<div class="grid grid-cols-2 self-start w-full gap-3">
			<div>
				<div class="text-xl">First name</div>
				<input
					class="w-full value_input border-2 rounded"
					type="text"
					bind:value={userDetail.first_name}
				/>
			</div>
			<div>
				<div class="text-xl">Last name</div>
				<input
					class="w-full value_input border-2 rounded"
					type="text"
					bind:value={userDetail.last_name}
				/>
			</div>
			<div>
				<div class="text-xl">Username</div>
				<div class="text-lg text-gray-500">{userDetail.username}</div>
			</div>
			<div>
				<div class="text-xl">Phone</div>
				<input
					class="w-full value_input border-2 rounded"
					type="text"
					bind:value={userDetail.phone_number}
				/>
			</div>
			<div>
				<div class="text-xl">Email</div>
				<input
					class="w-full value_input border-2 rounded"
					type="email"
					bind:value={userDetail.email}
				/>
			</div>
		</div>
		<div class="grid grid-cols-2 self-start w-full gap-3">
			<div>
				<div class="text-xl">Street number</div>
				<input
					class="w-full value_input border-2 rounded"
					type="text"
					bind:value={userDetail.street_number}
				/>
			</div>
			<div>
				<div class="text-xl">Street name</div>
				<input
					class="w-full value_input border-2 rounded"
					type="text"
					bind:value={userDetail.street_name}
				/>
			</div>
			<div>
				<div class="text-xl">District</div>
				<input
					class="w-full value_input border-2 rounded"
					type="text"
					bind:value={userDetail.district}
				/>
			</div>
			<div>
				<div class="text-xl">City</div>
				<input
					class="w-full value_input border-2 rounded"
					type="text"
					bind:value={userDetail.city}
				/>
			</div>
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
