<script setup lang="ts">
import {inject} from "vue";
import type {ControlApi} from "@/providers/controlApi";

const control = inject<ControlApi>('control-api')

const update = () => {
  if (Math.random() < 0.5) {
    control?.SubmitChange({
      switchColorsChange: {}
    })
  }
}
</script>

<template>
  <q-btn
    label="随机颜色"
    color="primary"
    icon="casino"
    @click="update"
  />
</template>
