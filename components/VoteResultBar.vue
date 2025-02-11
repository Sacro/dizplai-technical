<script setup lang="ts">
interface Props {
  percentage: number
  response: string
}

const { percentage, response } = defineProps<Props>()

const gradient = `(to right, oklch(0.715 0.143 215.221) 10%, oklab(0 0 0 / 0) 10%, rgba(0, 0, 0, 0) 100%)`
</script>

<template>
  <div
    id="bar"
    class="w-72 h-12 border-white border-2 rounded-lg
            place-items-center
            grid grid-cols-6
            bg-linear-[--gradient]
    "
  >
    <div class="text-lg col-start-2 col-span-4">
      {{ response }}
    </div>
    <div class="text-lg">
      {{ percentage }}%
    </div>
  </div>
</template>

<style>
#bar {
  --gradient: v-bind(gradient);
  --percentage: v-bind(percentage);
}
</style>
