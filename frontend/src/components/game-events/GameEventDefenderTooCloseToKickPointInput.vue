<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {type GameEvent_DefenderTooCloseToKickPointJson, type GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {gameEventName} from "@/helpers/texts";

const gameEvent = ref<GameEventJson>({
  type: 'DEFENDER_TOO_CLOSE_TO_KICK_POINT',
  defenderTooCloseToKickPoint: {
    byTeam: 'YELLOW',
  }
})
const details = ref<GameEvent_DefenderTooCloseToKickPointJson>(gameEvent.value.defenderTooCloseToKickPoint!)

const emit = defineEmits(['create-game-event'])
const createGameEvent = () => {
  emit('create-game-event', gameEvent.value)
}
</script>

<template>
  <q-list bordered>
    <q-item-label header>
      {{ gameEventName(gameEvent.type) }}
    </q-item-label>

    <TeamItem v-model="details.byTeam" label="队伍"/>
    <NumberItem v-model="details.byBot" label="机器人"/>
    <NumberItem v-model="details.distance" label="距离"/>
    <LocationItem v-model="details.location"/>

    <ButtonItem label="创建" @click="createGameEvent"/>
  </q-list>
</template>
