<script setup lang="ts">
import {computed} from "vue";
import {useGcStateStore} from "@/store/gcState";

const store = useGcStateStore()

const numTrackerSource = computed(() => {
  if (store.gcState.trackers === undefined) {
    return 0
  }
  return Object.keys(store.gcState.trackers!).length
})
const numAutoRefs = computed(() => {
  if (store.gcState.autoRefState === undefined) {
    return 0
  }
  return Object.keys(store.gcState.autoRefState!).length
})
const warn = computed(() => {
  return numTrackerSource.value === 0 || numAutoRefs.value === 0
})
</script>

<template>
  <span :class="{'text-warning': warn}">
  自动裁判盒: {{ numAutoRefs }} | 追踪源: {{ numTrackerSource }}
  </span>
</template>
