<script setup>
import { ref, reactive, computed, watch } from "vue";
import Buttons from "./components/Buttons.vue";
import Inputs from "./components/Inputs.vue";
import AmortizationTable from "./components/AmortizationTable.vue";

const loanAmount = ref(50000);
const payPerPeriod = ref(0);
const interestRate = ref(2);
const periods = ref(6);
const showTable = ref(false);
const dataTable = reactive({
  value: [],
});

const MIN = 0;
const MAX = 100000;
const STEP = 100;

const formatMoney = computed(() => {
  const formatter = new Intl.NumberFormat("pt", {
    style: "currency",
    currency: "BRL",
  });
  return formatter.format(loanAmount.value);
});

const decrement = () => {
  if (loanAmount.value - STEP >= MIN) {
    loanAmount.value -= STEP;
  }
};

const increment = () => {
  if (loanAmount.value + STEP <= MAX) {
    loanAmount.value += STEP;
  }
};

const changePeriods = (e) => {
  periods.value = +e.target.value;
};

const changeInterestRate = (e) => {
  interestRate.value = +e.target.value;
};

const calculate = () => {
  dataTable.value = [];
  if (loanAmount.value > 0 && interestRate.value > 0 && periods.value > 0) {
    let value = (loanAmount.value * interestRate.value) /100 / (1 - Math.pow(1 + interestRate.value / 100, -periods.value));

    payPerPeriod.value = +value.toFixed(2);

    let amount = loanAmount.value;

    for (let period = 1; period <= periods.value; period++) {
      const temp = {};

      temp.period = period;
      temp.interest = +((amount * interestRate.value) / 100).toFixed(2)
      temp.amortization = +(payPerPeriod.value - temp.interest).toFixed(2);

      if (period == periods.value) {
        temp.amortization = amount;
      }

      temp.balance = amount - temp.amortization;

      dataTable.value.push(temp);

      amount = amount - temp.amortization;
    }

  } else {
    showTable.value = false;
  }
};

watch([loanAmount, periods, interestRate], () => {
  calculate()
});

const twoDecimal = (number) => {
  let temp = number.toFixed(3).split(".");
  return Number(temp[0] + "." + temp[1].substring(0, 2));
};
</script>

<template>
  <div class="px-4">
    <div class="mx-auto my-4 bg-[#000] max-w-2xl shadow-lg p-4 md:p-10 rounded-lg">
      <h1 class="font-black text-4xl text-center">
        Quanto
        <span
          class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
        >
          dinheiro
        </span>
        você precisa?
      </h1>

      <Buttons :decrement="decrement" :increment="increment" />

      <div class="my-4">
        <input
          class="w-full h-3 accent-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-lg appearance-none cursor-pointer"
          type="range"
          :min="MIN"
          :max="MAX"
          :step="STEP"
          v-model.number="loanAmount"
        />
      </div>

      <p class="text-center text-4xl font-black">{{ formatMoney }}</p>

      <Inputs
        :periods="periods"
        :changePeriods="changePeriods"
        :interestRate="interestRate"
        :changeInterestRate="changeInterestRate"
      />

      <button
        class="p-2 rounded-xl font-bold block mt-6 mx-auto bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:ring-2"
        @click="()=> {
            calculate(); 
            if (loanAmount > 0 && interestRate > 0 && periods > 0){
              showTable = true
            }
          }"
      >
        Calcular
      </button>

      <div class="overflow-x-auto">
        <AmortizationTable
          v-if="showTable"
          :data="dataTable.value"
          :loanAmount="loanAmount"
          :payPerPeriod="payPerPeriod"
          :periods="periods"
        />
        <p v-if="!showTable" class="text-center mt-6">Digite os valores necessários para realizar o cálculo</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
