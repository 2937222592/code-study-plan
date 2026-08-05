<script setup>
const props = defineProps({ options: Array, modelValue: [String, Number] })
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <div class="seg">
    <button v-for="o in options" :key="o" :class="{ on: o === modelValue }" @click="emit('update:modelValue', o)">{{ o }}</button>
  </div>
</template>