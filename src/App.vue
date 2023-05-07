<script setup>
  import { ref, computed} from "vue"
  import Buttons from "./components/Buttons.vue";

  const cantidad = ref(50000)
  const MIN = 0
  const MAX = 50000
  const STEP = 100

  const formatMoney = computed(()=>{
    const formatter = new Intl.NumberFormat('pt',{
      style:'currency',
      currency: 'BRL'
    }) 
    return formatter.format(cantidad.value)
  })

  const decrement = ()=>{
    if(cantidad.value - STEP >= MIN){
      cantidad.value -= STEP
    }
  }

  const increment = ()=>{
    if(cantidad.value + STEP <= MAX){
      cantidad.value += STEP
    }
  }

</script>

<template>
  <div class="px-4">
    
    <div class="mx-auto mt-20 bg-[#000] max-w-xl shadow-lg p-10 rounded-lg">
      <h1 class="font-black text-4xl text-center">
        Quanto
        <span
          class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
        >
        dinheiro
        </span>
        você precisa?
      </h1>

      <Buttons :decrement="decrement" :increment="increment"/>

      <div class="my-4">
        <input
          class="w-full h-3 accent-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-lg appearance-none cursor-pointer"
          type="range"
          :min="MIN"
          :max="MAX"
          :step="STEP"
          v-model.number="cantidad" 
        />
      </div>

      <p class="text-center text-4xl font-black">{{formatMoney}}</p>
      
    </div>

    

  </div>
</template>

<style scoped></style>
