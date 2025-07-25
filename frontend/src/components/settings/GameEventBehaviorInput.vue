<script setup lang="ts">
import {type Config_BehaviorJson} from "@/proto/engine/ssl_gc_engine_config_pb";

defineProps<{
  modelValue: Config_BehaviorJson
}>()
const emit = defineEmits(['update:model-value'])

const options = [
  {value: 'BEHAVIOR_ACCEPT', label: "接受"},
  {value: 'BEHAVIOR_ACCEPT_MAJORITY', label: "多数通过"},
  {value: 'BEHAVIOR_PROPOSE_ONLY', label: "仅提议"},
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
