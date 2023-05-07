<script setup>
  // const props = defineProps(['decrement','increment'])

  const props = defineProps({
    decrement: Function,
    increment: Function,
  })
  
</script>

<template>
  <div class="mt-4 flex justify-between items-center">
    <button @click="decrement" class="h-10 w-10 bg-indigo-500 rounded-full font-black text-2xl grid place-content-center hover:ring-2 ring-indigo-700">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
      </svg>
    </button>

    <button @click="increment" class="h-10 w-10 bg-emerald-500 rounded-full font-black text-2xl grid place-content-center hover:ring-2 ring-emerald-700">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
  </div>
</template>