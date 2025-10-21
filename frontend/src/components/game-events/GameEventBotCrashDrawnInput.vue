<script setup lang="ts">
import {ref} from "vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {type GameEvent_BotCrashDrawnJson, type GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {gameEventName} from "@/helpers/texts";

const gameEvent = ref<GameEventJson>({
  type: 'BOT_CRASH_DRAWN',
  botCrashDrawn: {}
})
const details = ref<GameEvent_BotCrashDrawnJson>(gameEvent.value.botCrashDrawn!)

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
    <q-item-label header class="text-grey-7" style="margin-top: -12px;">
      {{ gameEvent.type }}
    </q-item-label>


    <NumberItem v-model="details.botYellow" label="黄方机器人"/>
    <NumberItem v-model="details.botBlue" label="蓝方机器人"/>
    <NumberItem v-model="details.crashSpeed" label="碰撞速度"/>
    <NumberItem v-model="details.speedDiff" label="速度差"/>
    <NumberItem v-model="details.crashAngle" label="碰撞角度"/>
    <LocationItem v-model="details.location"/>

    <ButtonItem label="创建" @click="createGameEvent"/>
  </q-list>
</template>
