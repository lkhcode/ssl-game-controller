<script setup lang="ts">
import {computed, inject} from "vue";
import {useMatchStateStore} from "@/store/matchState";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";
import type {ControlApi} from "@/providers/controlApi";
import SelectInput from "@/components/common/SelectInput.vue";
import {useGcStateStore} from "@/store/gcState";

const props = defineProps<{
  team: TeamJson,
}>()

const store = useMatchStateStore()
const gcStore = useGcStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.teamState![props.team].name
})
const options = computed(() => {
  const teams = [...gcStore.config.teams!]
  teams.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  })
  return teams
})

const updateValue = (value: string) => {
  control?.UpdateTeamState({
    forTeam: props.team,
    teamName: value,
  })
}
</script>

<template>
  <SelectInput
    :options="options"
    :modelValue="model"
    label="队伍名称"
    @update:model-value="updateValue"
  />
</template>
