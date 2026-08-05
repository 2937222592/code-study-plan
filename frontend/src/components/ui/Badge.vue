<script setup>
defineProps({ color: { type: String, default: 'gray' }, text: { type: String, default: '' } })
</script>
<template><span class="badge" :class="color">{{ text || $slots.default?.() }}</span></template>