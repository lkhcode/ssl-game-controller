<script setup lang="ts">
import {computed, inject} from "vue";
import {useMatchStateStore} from "@/store/matchState";
import {gameEventName} from "@/helpers/texts";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";
import type {ControlApi} from "@/providers/controlApi";
import type {GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";

const props = defineProps<{
  team: TeamJson,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const cards = computed(() => {
  return store.matchState.teamState![props.team].redCards
})
const hasData = computed(() => {
  return cards.value?.length! > 0
})

const causeText = (cause?: GameEventJson) => {
  if (cause) {
    return gameEventName(cause.type!)
  }
  return "-"
}

const removeCard = (cardId?: number) => {
  control?.UpdateTeamState({
    forTeam: props.team,
    removeRedCard: cardId,
  })
}
</script>

<template>
  <q-markup-table dense v-if="hasData">
    <thead>
    <tr>
      <th class="text-left" scope="col">原因</th>
      <th class="text-center" scope="col"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="card in cards" :key="card.id">
      <td class="text-left">{{ causeText(card.causedByGameEvent) }}</td>
      <td class="text-right">
        <q-btn round @click="() => removeCard(card.id)" icon="delete"></q-btn>
      </td>
    </tr>
    </tbody>
  </q-markup-table>
  <p v-else>
    无红牌
  </p>
</template>
