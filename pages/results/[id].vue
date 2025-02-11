<script setup lang="ts">
const route = useRoute()
const { id: pollId } = route.params

const { data: votes } = await useFetch(`/api/poll/${pollId}/votes`)

const total = ref(0)
total.value = (votes.value?.reduce((acc, { votes }) => acc + votes, 0)) ?? 0
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="text-4xl">
      Thank you for your response
    </div>
    <div class="flex flex-col gap-4 items-center">
      <VoteResultBar
        v-for="vote in votes"
        :key="vote.response_id"
        :response="vote.response"
        :percentage="Math.round(vote.votes / total * 100)"
      />
    </div>
  </div>
</template>
