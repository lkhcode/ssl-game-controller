<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {type GameEvent_BotDribbledBallTooFarJson, type GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {gameEventName} from "@/helpers/texts";

const gameEvent = ref<GameEventJson>({
  type: 'BOT_DRIBBLED_BALL_TOO_FAR',
  botDribbledBallTooFar: {
    byTeam: 'YELLOW',
  }
})
const details = ref<GameEvent_BotDribbledBallTooFarJson>(gameEvent.value.botDribbledBallTooFar!)

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
    <NumberItem v-model="details.byBot" label="持续时间"/>
    <LocationItem v-model="details.start" label="开始"/>
    <LocationItem v-model="details.end" label="结束"/>

    <ButtonItem label="创建" @click="createGameEvent"/>
  </q-list>
</template>
