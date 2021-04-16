<template>
  <a
      :href="href"
      @click.prevent="go"
  >
    <slot></slot>
  </a>
</template>

<script>
import routes from '../../router'
import {defineComponent} from 'vue'
export default defineComponent({
  props: {
    href: {
      type:String,
      required: true
    }
  },
  methods: {
    go () {
      this.$root.currentRoute = this.href
      window.history.pushState(null, routes[this.href], this.href)
    }
  }
})
</script>
