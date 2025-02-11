<script setup lang="ts">
const route = useRoute()
const { id: pollId } = route.params

const { data } = await useFetch(`/api/poll/${pollId}`)

const selectedVote = ref<string>()

const onSubmit = async () => {
  await $fetch(`/api/response/${selectedVote.value}/vote`, {
    method: 'POST',
  })
  return navigateTo(`/results/${pollId}`)
}
</script>

<template>
  <div v-if="data === null">
    No data
  </div>
  <div
    v-else
    class="flex flex-col gap-8"
  >
    <div class="text-4xl font-sans">
      {{ data.question }}
    </div>

    <div>
      <form
        class="flex flex-col gap-6 items-center"
        @submit.prevent="onSubmit"
      >
        <ul class="flex flex-col gap-4">
          <ResponseButton
            v-for="response in data.responses"
            :id="response.id"
            :key="response.id"
            :response="response.response"
            @click="selectedVote = response.id"
          />
        </ul>
        <SubmitButton />
      </form>
    </div>
  </div>
</template>
