<template>
  <el-card>
    <p>延迟执行: {{ counter }}</p>
    <button @click="pause">Pause</button>
    <button @click="resume">Resume</button>
  </el-card>
  <el-card>
    <p>窗口尺寸: {{ width }} x {{ height }}</p>
  </el-card>
  <el-card>
    <p>全屏: {{ isFullscreen ? '是' : '否' }}</p>
    <el-button @click="toggle">Toggle</el-button>
  </el-card>
  <el-card>
    <p class="mb-2">输入一些内容以触发watch</p>
    <el-input
        ref="input"
        v-model="source"
        type="text"
    />

    <el-button :disabled="!isActive" class="orange" @click="pauseW">
      Pause
    </el-button>
    <el-button :disabled="isActive" @click="resumeW">
      Resume
    </el-button>
    <el-button @click="clearW">
      Clear Log
    </el-button>

    <br>
    <br>

    <p>Log</p>

    <pre>{{ log }}</pre>
  </el-card>
</template>

<script setup lang="ts">
import {nextTick, ref} from 'vue'
import {
  useInterval,
  useWindowSize,
  useFullscreen,
  watchOnce,
  onStartTyping,
  watchPausable
} from '@vueuse/core'


const {counter, pause, resume} = useInterval(1000, {controls: true})

const {width, height} = useWindowSize()

const {isFullscreen, toggle} = useFullscreen()


const input = ref<HTMLInputElement | null>()
const log = ref('')

const source = ref('')

const watcher = watchPausable(
    source,
    v => (log.value += `Changed to "${v}"\n`),
)

onStartTyping(() => input.value?.focus())

function clearW() {
  log.value = ''
}

function pauseW() {
  log.value += 'Paused\n'
  watcher.pause()
}

function resumeW() {
  log.value += 'Resumed\n'
  watcher.resume()
}

const {isActive} = watcher
</script>