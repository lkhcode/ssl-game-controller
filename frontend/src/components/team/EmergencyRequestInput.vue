<script setup lang="ts">
import {computed, inject} from "vue";
import ToggleInput from "@/components/common/ToggleInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import type {ControlApi} from "@/providers/controlApi";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";

const props = defineProps<{
  team: TeamJson,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.teamState![props.team].requestsEmergencyStopSince !== undefined
})

const onChange = (newValue: boolean) => {
  control?.UpdateTeamState({
    forTeam: props.team,
    requestsEmergencyStop: newValue
  })
}
</script>

<template>
  <ToggleInput
    :modelValue="model"
    label="紧急停止请求"
    @update:model-value="onChange"
  />
</template>
