<template>
  <main-layout>
    <button @click="count++">count is: {{ count }}</button>
  </main-layout>>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import MainLayout from '../../layouts/Main.vue'
export default defineComponent({
  name: 'HelloWorld',
  components:{
    MainLayout
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>

<style scoped>

</style>
