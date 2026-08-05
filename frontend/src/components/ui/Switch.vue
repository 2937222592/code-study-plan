<script setup>
defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])
</script>
<template><div class="switch" :class="{ on: modelValue }" @click="emit('update:modelValue', !modelValue)"></div></template>