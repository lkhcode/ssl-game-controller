<script setup lang="ts">
import {type AutoRefConfig_BehaviorJson} from "@/proto/engine/ssl_gc_engine_config_pb";

defineProps<{
  modelValue: AutoRefConfig_BehaviorJson
}>()
const emit = defineEmits(['update:model-value'])

const options = [
  {value: 'BEHAVIOR_ACCEPT', label: "同意"},
  {value: 'BEHAVIOR_LOG', label: "记录"},
  {value: 'BEHAVIOR_IGNORE', label: "忽略"},
]

const updateValue = (value: any) => {
  emit('update:model-value', value)
}
</script>

<template>
  <q-btn-toggle
    :model-value="modelValue"
    :options="options"
    @update:model-value="updateValue"
  />
</template>
