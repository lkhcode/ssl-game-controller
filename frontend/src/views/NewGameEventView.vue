<script setup lang="ts">
import {inject, ref} from "vue";
import GameEventBallLeftFieldInput from "@/components/game-events/GameEventBallLeftFieldInput.vue";
import GameEventGoalInput from "@/components/game-events/GameEventGoalInput.vue";
import TextInput from "@/components/common/TextInput.vue";
import ToggleInput from "@/components/common/ToggleInput.vue";
import FoulsPanel from "@/components/game-events/FoulsPanel.vue";
import type {GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import type {ControlApi} from "@/providers/controlApi";
import type {ProposalJson} from "@/proto/state/ssl_gc_state_pb";
import GameEventUnsportingBehaviorInput from "@/components/game-events/GameEventUnsportingBehaviorInput.vue";
import GameEventNoProgressInput from "@/components/game-events/GameEventNoProgressInput.vue";
import GameEventDoubleTouchInput from "@/components/game-events/GameEventDoubleTouchInput.vue";

const tab = ref("ballLeftField")
const propose = ref(false)
const origin = ref<string | undefined>(undefined)

const control = inject<ControlApi>('control-api')

const createGameEvent = (gameEvent: GameEventJson) => {
  if (origin.value) {
    gameEvent.origin = [origin.value]
  }
  if (propose.value) {
    const proposal: ProposalJson = {
      gameEvent,
      timestamp: new Date().toISOString(),
    }
    control?.ProposeGameEvent(proposal)
  } else {
    control?.AddGameEvent(gameEvent)
  }
}
</script>


<template>
  <q-tabs
    v-model="tab"
    active-color="primary"
    indicator-color="primary"
    align="justify"
  >
    <q-tab name="ballLeftField" label="界外球"/>
    <q-tab name="goal" label="进球"/>
    <q-tab name="foul" label="犯规"/>
    <q-tab name="matchProceeding" label="僵持状态"/>
    <q-tab name="unsportingBehavior" label="违反体育精神的行为"/>
  </q-tabs>
  <q-separator/>

  <div class="row q-gutter-md justify-evenly">
    <ToggleInput v-model="propose" label="仅提议"/>
    <TextInput v-model="origin" label="来源" :clearable="true"/>
  </div>

  <q-tab-panels v-model="tab" animated swipeable>
    <q-tab-panel name="ballLeftField">
      <GameEventBallLeftFieldInput @create-game-event="createGameEvent"/>
    </q-tab-panel>

    <q-tab-panel name="goal">
      <GameEventGoalInput @create-game-event="createGameEvent"/>
    </q-tab-panel>

    <q-tab-panel name="foul">
      <FoulsPanel @create-game-event="createGameEvent"/>
    </q-tab-panel>

    <q-tab-panel name="matchProceeding">
      <div class="row q-gutter-md justify-evenly">
        <GameEventNoProgressInput @create-game-event="createGameEvent"/>
        <GameEventDoubleTouchInput @create-game-event="createGameEvent"/>
      </div>
    </q-tab-panel>

    <q-tab-panel name="unsportingBehavior">
      <GameEventUnsportingBehaviorInput @create-game-event="createGameEvent"/>
    </q-tab-panel>
  </q-tab-panels>
</template>
