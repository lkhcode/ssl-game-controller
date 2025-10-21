<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {type GameEvent_KeeperHeldBallJson, type GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {gameEventName} from "@/helpers/texts";

const gameEvent = ref<GameEventJson>({
  type: 'KEEPER_HELD_BALL',
  keeperHeldBall: {
    byTeam: 'YELLOW',
  }
})
const details = ref<GameEvent_KeeperHeldBallJson>(gameEvent.value.keeperHeldBall!)

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

    <TeamItem v-model="details.byTeam" label="队伍"/>
    <LocationItem v-model="details.location"/>
    <NumberItem v-model="details.duration" label="持续时间"/>

    <ButtonItem label="创建" @click="createGameEvent"/>
  </q-list>
</template>
