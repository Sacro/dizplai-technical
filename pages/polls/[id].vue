<script setup lang="ts">
const { data } = await useFetch('/api/poll/jkna3xbfu4uligs3uc23m8zs')

const logit = (foo) => {
  console.log(foo)
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
        @submit.prevent="logit"
      >
        <ul class="flex flex-col gap-4">
          <ResponseButton
            v-for="response in data.responses"
            :id="response.id"
            :key="response.id"
            :response="response.response"
          />
        </ul>
        <SubmitButton />
      </form>
    </div>
  </div>
</template>
