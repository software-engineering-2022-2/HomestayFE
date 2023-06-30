<script lang="ts">
    
</script>

<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <div class="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-first-name">
                    Homestay Name
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Homestay Name">
            </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-checkin-date">
                    Check-in date
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-checkin-date" type="date" placeholder="Check-in date">
            </div>
            <div class="md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-checkout-date">
                    Check-out date
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-checkout-date" type="date" placeholder="Check-out date">
            </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-adults">
                    Adults
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-adults" type="number" placeholder="0">
            </div>
            <div class="md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-children">
                    Children
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-children" type="number" placeholder="0">
            </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-services">
                    Additional services
                </label>
                <div class="grid grid-cols-2 gap-2">
                    <label class="inline-flex items-center">
                        <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" name="breakfast" value="breakfast" id="grid-breakfast">
                        <span class="ml-2 text-gray-700">Breakfast</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" name="bikes" value="bikes" id="grid-bikes">
                        <span class="ml-2 text-gray-700">Bike renting</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" name="bikes" value="bikes" id="grid-bikes">
                        <span class="ml-2 text-gray-700">Sauna</span>
                    </label>
                    <!-- add more services here -->
                </div>
            </div>
        </div>          
        <div class="flex items-center justify-between">
            <button class="bg-[#E86A33] hover:bg-[#FF8C66] text-white font-medium py-2 px-4 rounded" type="button">
                Calculate price
            </button>
            <button class="bg-gray-300 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded" type="button">
                Cancel
            </button>
        </div>
    </div>
</div>