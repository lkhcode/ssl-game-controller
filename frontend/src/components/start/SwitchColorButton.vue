<script setup lang="ts">
import {inject} from "vue";
import type {ControlApi} from "@/providers/controlApi";

const control = inject<ControlApi>('control-api')

const update = () => {
  control?.SubmitChange({
    switchColorsChange: {}
  })
}
</script>

<template>
  <q-btn
    label="交换颜色"
    color="primary"
    icon="sync_alt"
    @click="update"
  />
</template>
