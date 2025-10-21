<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {type GameEvent_AttackerTooCloseToDefenseAreaJson, type GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {gameEventName} from "@/helpers/texts";

const gameEvent = ref<GameEventJson>({
  type: 'ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA',
  attackerTooCloseToDefenseArea: {
    byTeam: 'YELLOW',
  }
})
const details = ref<GameEvent_AttackerTooCloseToDefenseAreaJson>(gameEvent.value.attackerTooCloseToDefenseArea!)

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
    <NumberItem v-model="details.byBot" label="持续时间"/>
    <NumberItem v-model="details.distance" label="距离"/>
    <LocationItem v-model="details.ballLocation" label="球的位置"/>
    <LocationItem v-model="details.location"/>

    <ButtonItem label="创建" @click="createGameEvent"/>
  </q-list>
</template>
