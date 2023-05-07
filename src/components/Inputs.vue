<script setup>

  const props = defineProps(['periods','changePeriods','interestRate','changeInterestRate'])
</script>


<template>
  <div class="flex justify-center items-center gap-12 mt-6">
        
    <div class="flex flex-col items-center gap-1">
      <label for="periods" class="text-center font-bold">Parcelas</label>
      <input
        id="periods"
        type="number"
        class="bg-[#111] rounded-lg w-12 font-black text-center"
        min="0"
        :value="periods"
        @input="changePeriods"
      />
    </div>

    <div class="flex flex-col items-center gap-1">
      <label for="interestRate" class="text-center font-bold">Taxa</label>
      <div class="flex">
        <input
          id="interestRate"
          type="number"
          class="bg-[#111] rounded-lg w-12 font-black text-center"
          min="0"
          :value="interestRate"
          @input="changeInterestRate"
        />
        <p class="font-black text-xl">%</p>
      </div>
    </div>

  </div>
</template>