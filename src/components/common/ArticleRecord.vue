<template>
  <p><a href={{data.link}}>{{ data.title }}</a> {{ data.remark }}</p>
</template>

<script setup>


const props = defineProps({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    default: true,
  },
  remark: {
    type: Number,
    default: true,
  }
})

const data = {
  title: props.title,
  link: '"' + props.link + '"',
  remark: '⭐'.repeat(4)
}

</script>

<style scoped>

</style>