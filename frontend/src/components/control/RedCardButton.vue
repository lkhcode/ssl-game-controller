<script setup lang="ts">
import {inject} from "vue";
import ControlButton from "@/components/control/ControlButton.vue";
import type {ControlApi} from "@/providers/controlApi";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";

const props = defineProps<{
  team: TeamJson,
}>()

const control = inject<ControlApi>('control-api')

const submit = () => {
  control?.SubmitChange({
    origin: "UI",
    revertible: true,
    addRedCardChange: {
      forTeam: props.team,
      causedByGameEvent: undefined,
    }
  })
}

</script>

<template>
  <ControlButton label="红牌" :disable="false" :action="submit" :team="team"/>
</template>
