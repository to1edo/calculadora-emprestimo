<script setup>
  import { reactive,watch } from 'vue';
  import formatterMoney from '../helpers/formatter.js'

  const props = defineProps({
    data: Object,
    loanAmount: Number,
    payPerPeriod:Number,
    periods: Number
  })

  const calculateTotals = (data,payPerPeriod)=>{
    const total = data.reduce((acc,period)=>{
      acc.totalPayment +=  payPerPeriod
      acc.totalInterest += period.interest
      acc.totalAmortization += period.amortization
      return acc
    },{totalPayment:0,totalAmortization:0,totalInterest:0})
    return total
  }

  const total = reactive({
    value: calculateTotals(props.data,props.payPerPeriod)
  })

  watch(()=>[props.payPerPeriod, props.data], () => {
    total.value = calculateTotals(props.data,props.payPerPeriod)
  }, { deep: true });

</script>

<template>
  <table class="mt-6 w-full font-bold">
    <thead>
      <tr class="bg-gradient-to-r from-indigo-700 from-10% via-sky-700 via-30% to-emerald-700 to-90%">
        <th class="border-2">Período</th>
        <th class="border-2">Parcela</th>
        <th class="border-2">Juros</th>
        <th class="border-2">Amortização</th>
        <th class="border-2">Saldo Devedor</th>
      </tr>
    </thead>
    <tbody v-for="period in data">
      <tr v-if="period.period == 1">
        <td class="border-2 text-center">{{ '0' }}</td>
        <td class="border-2 text-center">{{ '--' }}</td>
        <td class="border-2 text-center">{{ '--' }}</td>
        <td class="border-2 text-center">{{ '--' }}</td>
        <td class="border-2 text-center">{{ formatterMoney(loanAmount) }}</td>
      </tr>
      <tr v-bind:class="{'bg-gray-800':period.period%2!==0}">
        <td class="border-2 text-center">{{ period.period }}</td>
        <td class="border-2 text-center">{{ formatterMoney(payPerPeriod) }}</td>
        <td class="border-2 text-center">{{ formatterMoney(period.interest)}}</td>
        <td class="border-2 text-center">{{ formatterMoney(period.amortization) }}</td>
        <td class="border-2 text-center">{{ formatterMoney(period.balance) }}</td>
      </tr>

      <tr v-if="period.period == periods"  class="bg-gradient-to-r from-indigo-700 from-10% via-sky-700 via-30% to-emerald-700 to-90%">
        <td class="text-center bg-[#000]">Total:</td>
        <td class="border-2 text-center">{{ formatterMoney(total.value.totalPayment ) }}</td>
        <td class="border-2 text-center">{{ formatterMoney(total.value.totalPayment - total.value.totalAmortization) }}</td>
        <td class="border-2 text-center">{{ formatterMoney(total.value.totalAmortization) }}</td>
        <td class="bg-[#000]"></td>
      </tr>
    </tbody>
    <!-- <p>{{ calculateTotals(data,payPerPeriod) }}</p> -->
  </table>
</template>