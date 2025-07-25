<script setup lang="ts">
import {useMatchStateStore} from "@/store/matchState";
import {useGcStateStore} from "@/store/gcState";

const store = useMatchStateStore()
const gcStore = useGcStateStore()
</script>

<template>
  <div class="q-ma-md">
    <h5>比赛状态</h5>
    <pre>{{ JSON.stringify(store.matchState, null, 2) }}</pre>
    <h5>GC状态</h5>
    <pre>{{ JSON.stringify(gcStore.gcState, null, 2) }}</pre>
    <h5>配置</h5>
    <pre>{{ JSON.stringify(gcStore.config, null, 2) }}</pre>
  </div>
</template>
