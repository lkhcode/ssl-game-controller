<script setup lang="ts">
import {computed, ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ToggleItem from "@/components/game-events/common/ToggleItem.vue";
import TextItem from "@/components/game-events/common/TextItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {type GameEvent_GoalJson, type GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";

const possibleGoal = ref(true)
const goal = ref<GameEvent_GoalJson>({
  byTeam: 'YELLOW',
})
const lastTouchByTeam = computed(() => {
  return Number(goal.value.lastTouchByTeam)
})

const constructGameEvent = (): GameEventJson => {
  const gameEventType = possibleGoal.value ? 'POSSIBLE_GOAL' : 'GOAL'
  if (possibleGoal.value) {
    return {
      type: gameEventType,
      possibleGoal: goal.value
    }
  } else {
    return {
      type: gameEventType,
      goal: goal.value
    }
  }
}

const emit = defineEmits(['create-game-event'])
const createGameEvent = () => {
  const gameEvent = constructGameEvent()
  if (gameEvent) {
    emit('create-game-event', gameEvent)
  }
}
</script>

<template>
  <q-list bordered>
    <q-item-label header>进球</q-item-label>

    <TeamItem v-model="goal.byTeam" label="队伍"/>
    <TeamItem v-model="goal.kickingTeam" label="进球方"/>
    <NumberItem v-model="goal.kickingBot" label="机器人"/>
    <LocationItem v-model="goal.location"/>
    <LocationItem v-model="goal.kickLocation" label="进球位置"/>
    <NumberItem v-model="goal.maxBallHeight" label="射门过程中球的最高高度 (米)"/>
    <NumberItem v-model="goal.numRobotsByTeam" label="队伍中的机器人数量"/>
    <NumberItem v-model="lastTouchByTeam" label="最后触球时间 (μs)"/>
    <TextItem v-model="goal.message" label="备注"/>

    <ToggleItem label="待确认的进球" v-model="possibleGoal"/>

    <ButtonItem label="创建" @click="createGameEvent"/>
  </q-list>
</template>
