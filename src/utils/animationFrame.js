const prefixes = ['webkit', 'moz', 'ms', 'o']
const isServer = typeof window === void 0

let lastTime = 0
let requestAnimationFrame
let cancelAnimationFrame

if (isServer) {
  requestAnimationFrame = function() {
    return
  }
  cancelAnimationFrame = function() {
    return
  }
} else {
  requestAnimationFrame = window.requestAnimationFrame
  cancelAnimationFrame = window.cancelAnimationFrame

  // 通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
  for (let i = 0, prefix = prefixes[i]; i < prefixes.length; i++) {
    if (requestAnimationFrame && cancelAnimationFrame) break

    requestAnimationFrame =
      requestAnimationFrame || window[`${prefix}RequestAnimationFrame`]
    cancelAnimationFrame =
      cancelAnimationFrame || window[`${prefix}CancelRequestAnimationFrame`]
  }
}

// 如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则回退到setTimeout
if (!requestAnimationFrame || !cancelAnimationFrame) {
  requestAnimationFrame = function(callback) {
    const currTime = new Date().getTime()

    // 为了使setTimteout的尽可能的接近每秒60帧的效果
    const timeToCall = Math.max(0, 16 - (currTime - lastTime))
    const id = window.setTimeout(() => {
      callback(currTime + timeToCall)
    }, timeToCall)
    lastTime = currTime + timeToCall
    return id
  }

  cancelAnimationFrame = function(id) {
    window.clearTimeout(id)
  }
}

export { requestAnimationFrame, cancelAnimationFrame }
