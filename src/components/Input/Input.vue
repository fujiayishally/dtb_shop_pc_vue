<template>
  <input
    type="text"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
import Emitter from '@/mixins/Emitter.js'

export default {
  name: 'Input',
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentValue: this.value,
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
  },
  methods: {
    handleInput(event) {
      const value = event.target.value
      this.currentValue = value

      this.$emit('input', value)
      this.dispatch('FormItem', 'on-form-change', value)
    },
    handleBlur() {
      this.$emit('blur', this.currentValue)
      this.dispatch('FormItem', 'on-form-blur', this.currentValue)
    },
  },
}
</script>

<style></style>
