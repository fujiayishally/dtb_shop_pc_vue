<template>
  <div class="alert">
    <div class="alert-main" v-for="item in notices" :key="item.name">
      <div class="alert-content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers'
let seed = 0
function getUid() {
  return `alert_${seed++}`
}

export default {
  data() {
    return {
      notices: [],
    }
  },
  methods: {
    add(notice) {
      const name = getUid()
      let _notice = Object.assign({ name }, notice)

      this.notices.push(_notice)

      // 定时移除,单位：s
      const duration = notice.duration
      setTimeout(() => {
        this.remove(name)
      }, duration * 1000)
    },
    remove(name) {
      this.notices.forEach((notice, index) => {
        if (notice.name === name) {
          return this.notices.splice(index, 1)
        }
      })
    },
  },
}
</script>

<style>
.alert {
  position: fixed;
  width: 100%;
  top: 16px;
  left: 0;
  text-align: center;
  pointer-events: none;
}
.alert-content {
  display: inline-block;
  padding: 8px 16px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 8px;
}
</style>
