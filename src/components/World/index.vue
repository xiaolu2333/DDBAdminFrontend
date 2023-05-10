<template>
  <div>
    <div class="message">
      {{ message }}
    </div>
    Enter your username: <input :value="name"/>
    <div v-if="error" class="error">
      Please enter a username with at least seven letters.
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(
    defineProps<{
      message: string;
      username: string;
    }>(),
    {
      message: "",
      username: "",
    }
);

const name = computed(() => props.username);

const error = computed(() => {
  // props.username.trim().length < 7 将检查props.username长度是否小于7，如果小于7，返回true，否则返回false
  return props.username.trim().length < 7;
});
</script>