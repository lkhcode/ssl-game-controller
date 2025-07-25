<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import ToggleItem from "@/components/game-events/common/ToggleItem.vue";
import {type GameEvent_BotKickedBallTooFastJson, type GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {gameEventName} from "@/helpers/texts";

const gameEvent = ref<GameEventJson>({
  type: 'BOT_KICKED_BALL_TOO_FAST',
  botKickedBallTooFast: {
    byTeam: 'YELLOW',
  }
})
const details = ref<GameEvent_BotKickedBallTooFastJson>(gameEvent.value.botKickedBallTooFast!)

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
    <NumberItem v-model="details.initialBallSpeed" label="初始球速"/>
    <ToggleItem v-model="details.chipped" label="是否挑射"/>
    <LocationItem v-model="details.location"/>

    <ButtonItem label="创建" @click="createGameEvent"/>
  </q-list>
</template>
