<script lang="ts">
	import { goto } from "$app/navigation";
    import { userDetailStore } from "$lib/store/store";

    $: if ($userDetailStore.username === ""){
        goto("/")
    }
</script>

<div class="bg-white w-[41.5rem] h-[42rem] rounded-xl flex flex-col items-center py-6 px-12 space-y-6 justify-between">
    <div class="text-[#374151] font-bold underline text-3xl">User profile</div>
    
    <div class="overflow-clip rounded-full h-[10rem] w-[10rem] border border-black">
        <div class="relative flex flex-col items-center">
            <iconify-icon class="text-[10rem] rounded-full" icon="healthicons:ui-user-profile"></iconify-icon>
            <div class="absolute bottom-0 w-[8.4rem] h-[2.3rem] text-white bg-[#374151B2]"><button class="h-full w-full">Replace</button></div>
        </div>
    </div>

    <div class="grid grid-cols-2 self-start w-full">
        <div>
            <div class="key">First name</div>
            <div class="value">{$userDetailStore.firstName === ""? "Unfilled": $userDetailStore.firstName}</div>
        </div>
        <div>
            <div class="key">Last name</div>
            <div class="value">{$userDetailStore.lastName === ""? "Unfilled": $userDetailStore.lastName}</div>
        </div>
        <div>
            <div class="key">Username</div>
            <div class="value">{$userDetailStore.username}</div>
        </div>
        <div>
            <div class="key">Password</div>
            <div class="value">********</div>
        </div>
        <div>
            <div class="key">Phone</div>
            <div class="value">{$userDetailStore.phoneNumber || "Unfilled"}</div>
        </div>
        <div>
            <div class="key">Email</div>
            <div class="value">{$userDetailStore.email || "Unfilled"}</div>
        </div>
    </div>

    <div class="grid grid-cols-2 self-start w-full">
        <div>
            <div class="key">Street number</div>
            <div class="value">{$userDetailStore.streetNumber || "Unfilled"}</div>
        </div>
        <div>
            <div class="key">Street name</div>
            <div class="value">{$userDetailStore.streetName || "Unfilled"}</div>
        </div>
        <div>
            <div class="key">District</div>
            <div class="value">{$userDetailStore.district || "Unfilled"}</div>
        </div>
        <div>
            <div class="key">City</div>
            <div class="value">{$userDetailStore.city || "Unfilled"}</div>
        </div>
    </div>

    <div>
        <button class="rounded-xl bg-[#41644A] w-[10rem] h-[2.5rem]">
            <div class="button_text">Update profile</div>
        </button>
    </div>
</div>

<style>
    .key{
        color: #374151;
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }

    .value{
        color: #777;
        font-size: 1.125rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
    .button_text {
        color: #FFF;
        font-size: 1.125rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
</style>