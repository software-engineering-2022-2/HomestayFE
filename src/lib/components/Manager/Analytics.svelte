<script lang="ts">
    import { analyticsListStore } from "$lib/stores/stores";
    import type { HomestayAnalytics, MonthlyRating } from "$lib/types/types";
    import { Line } from "svelte-chartjs";
    import { Chart } from "chart.js/auto";
  
    let showModal = false;
    let analyticsModal: HomestayAnalytics | null;
    let numData = {
        labels: [] as string[], // Use Date type for x-axis labels
        datasets: [{
            label: "",
            data: [] as number[],
            fill: false,
            tension: 0.1
        },
        {   
            label: "",
            data: [] as number[],
            fill: false,
            tension: 0.1
        },
        ]
    };
    let ratingData = {
        labels: [] as string[],
        datasets: [{
            label: "",
            data: [] as number[],
            fill: false,
            tension: 0.1
        }]   
    };
    
    let chartOptions = {
        responsive: true
    };
    
    function formatMonthYear(date: Date): string {
        return `${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    function showAnalyticsModal(homestayAnalytics: HomestayAnalytics) {
        showModal = true;
        analyticsModal = homestayAnalytics;
        numData.datasets[0].label = "Num. bookings";
        numData.datasets[1].label = "Num. rated bookings";
        ratingData.datasets[0].label = "Avg. rating";
        homestayAnalytics.ratings.forEach((rating) => {
        const date = new Date(rating.date);
        numData.labels.push(formatMonthYear(date));
        numData.datasets[0].data.push(rating.num_bookings);
        numData.datasets[1].data.push(rating.num_rated_bookings);

        ratingData.labels.push(formatMonthYear(date));
        ratingData.datasets[0].data.push(rating.avg_rating);
        });
    }
  
    function closeAnalyticsModal() {
        showModal = false;
        analyticsModal = null;
        numData.labels = [];
        numData.datasets.forEach((element) => {
            element.label = "";
            element.data = [];
        })
        ratingData.labels = [];
        ratingData.datasets.forEach((element) => {
            element.label = "";
            element.data = [];
        })
    }
  </script>
  
  <div class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <div class="px-2 py-5 border-b border-gray-200 flex justify-center">
        <h3 class="text-xl leading-6 text-gray-800">Analytics</h3>
      </div>
      <ul class="divide-y divide-gray-200">
        {#if $analyticsListStore && $analyticsListStore.length > 0}
          {#each $analyticsListStore as homestayAnalytics}
            <li class="px-4 py-5 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="text-lg">{homestayAnalytics.homestay_id}</div>
                <button
                  class="ml-4 text-blue-500 border-blue-500 border-2 text-lg py-0.5 px-4 rounded-md"
                  on:click={() => showAnalyticsModal(homestayAnalytics)}
                >
                  View
                </button>
              </div>
            </li>
          {/each}
        {:else}
          <div class="px-4 py-5 sm:px-6">
            <p class="text-lg text-gray-500 text-center">Wait while we crunch the numbers!</p>
          </div>
        {/if}
      </ul>
    </div>
  
    {#if showModal && analyticsModal !== null}
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
        <div class="bg-white p-4 rounded-lg w-[80%] max-h-[80%] overflow-auto">
        <div class="flex justify-between">
            <h3 class="text-lg font-semibold mb-2">Analytics for {analyticsModal.homestay_id}</h3>
            <button class="px-3 py-0.5 border-2 border-gray-500 text-gray-500 rounded-md" on:click={closeAnalyticsModal}>Close</button>
        </div>
        <div class="mt-4">
            <Line data={numData} options={chartOptions}/>
        </div>
        <div class="mt-4">
            <Line data={ratingData} options={chartOptions}/>
        </div>
        </div>
    </div>
    {/if}
  </div>
  