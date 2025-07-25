<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {type GameEvent_BotCrashUniqueJson, type GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {gameEventName} from "@/helpers/texts";

const gameEvent = ref<GameEventJson>({
  type: 'BOT_CRASH_UNIQUE',
  botCrashUnique: {
    byTeam: 'YELLOW',
  }
})
const details = ref<GameEvent_BotCrashUniqueJson>(gameEvent.value.botCrashUnique!)

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
    <NumberItem v-model="details.violator" label="违规机器人"/>
    <NumberItem v-model="details.victim" label="受害机器人"/>
    <NumberItem v-model="details.crashSpeed" label="碰撞速度"/>
    <NumberItem v-model="details.speedDiff" label="速度差"/>
    <NumberItem v-model="details.crashAngle" label="碰撞角度"/>
    <LocationItem v-model="details.location"/>

    <ButtonItem label="创建" @click="createGameEvent"/>
  </q-list>
</template>
