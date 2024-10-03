<script setup lang="ts">
defineProps<{
  name: string,
  msg: string,
  CarriageNum: string
}>()
</script>

<template>
  <div class="info">
    <h1 class="text-center">{{ name }}</h1>
    <h2 class="mt-[45px]">{{ msg }}</h2>
    <p class="mt-[25px]">Carriage: {{ CarriageNum }}</p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
