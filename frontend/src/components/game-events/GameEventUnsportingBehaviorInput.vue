<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import TextItem from "@/components/game-events/common/TextItem.vue";
import type {GameEvent_TypeJson, GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";

const gameEventType = ref<GameEvent_TypeJson>('UNSPORTING_BEHAVIOR_MINOR')
const byTeam = ref<TeamJson>('YELLOW')
const reason = ref<string>("")

const gameEventTypeOptions = [
  {label: 'minor', value: 'UNSPORTING_BEHAVIOR_MINOR'},
  {label: 'major', value: 'UNSPORTING_BEHAVIOR_MAJOR'},
]

const constructGameEvent = (): GameEventJson | undefined => {
  if (gameEventType.value === 'UNSPORTING_BEHAVIOR_MINOR') {
    return {
      type: gameEventType.value,
      unsportingBehaviorMinor: {
        byTeam: byTeam.value,
        reason: reason.value,
      }
    }
  } else if (gameEventType.value === 'UNSPORTING_BEHAVIOR_MAJOR') {
    return {
      type: gameEventType.value,
      unsportingBehaviorMajor: {
        byTeam: byTeam.value,
        reason: reason.value,
      }
    }
  }
  return undefined
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
    <q-item-label header>
      违反体育精神的行为
    </q-item-label>

    <div class="q-mx-md q-mb-md">
      轻微的违反体育精神行为将给予黄牌，严重的违反体育精神行为将给予红牌。
      详情请参阅 <a href="https://robocup-ssl.github.io/ssl-rules/sslrules.html#_unsporting_behavior"
                  target="_blank">SSL 规则</a>。
    </div>

    <q-item>
      <q-item-section>
        <q-btn-toggle
          spread no-wrap
          :options="gameEventTypeOptions"
          v-model="gameEventType"
        />
      </q-item-section>
    </q-item>

    <TeamItem v-model="byTeam" label="队伍"/>
    <TextItem v-model="reason" label="原因"/>

    <ButtonItem label="创建" @click="createGameEvent"/>
  </q-list>
</template>
