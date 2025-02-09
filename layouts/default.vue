<template>
  <div class="bg-[url(/assets/images/background.jpg)] text-white min-h-screen min-w-screen">
    <div>
      <header>
        <slot name="header">
          Default Header content
        </slot>
      </header>
      <main class="container mx-auto p-16 text-center">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
