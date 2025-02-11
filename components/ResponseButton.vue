<script setup lang="ts">
interface Props {
  id: string
  response: string
}

const { id, response } = defineProps<Props>()
</script>

<template>
  <li>
    <input
      :id="id"
      type="radio"
      name="response"
      :value="id"
      class="hidden peer"
    >
    <label
      :for="id"
      class="
      inline-flex items-center justify-between
      w-72 h-12
    border-white border-2 rounded-lg
    bg-white/10
    peer-checked:bg-purple-400/80
    hover:bg-white/60
      "
    ><span class="block w-full text-center">{{ response }}</span></label>
  </li>
</template>
