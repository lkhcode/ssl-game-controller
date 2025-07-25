<script setup lang="ts">
import AutoRefereeConfigBehaviorInput from "@/components/settings/AutoRefereeBehaviorConfigInput.vue";
import {computed, inject} from "vue";
import {type AutoRefConfig_BehaviorJson, type AutoRefConfigJson} from "@/proto/engine/ssl_gc_engine_config_pb";
import {gameEventName} from "@/helpers/texts";
import type {ControlApi} from "@/providers/controlApi";
import {type GameEvent_TypeJson} from "@/proto/state/ssl_gc_game_event_pb";

const props = defineProps<{
  autoRefId: string,
  autoRefConfig: AutoRefConfigJson,
}>()

const control = inject<ControlApi>('control-api')

const behaviors = computed(() => props.autoRefConfig.gameEventBehavior!)
const gameEventTypes = computed(() => Object.keys(behaviors.value))

const commonBehaviorValue = computed(() => {
  const first = behaviors.value[gameEventTypes.value[0]]
  for (const behaviorKey of gameEventTypes.value) {
    if (behaviors.value[behaviorKey] !== first) {
      return 'UNKNOWN' as AutoRefConfig_BehaviorJson
    }
  }
  return first
})

function behaviorName(key: string) {
  const gameEventType = key as GameEvent_TypeJson;
  return gameEventName(gameEventType)
}

function update(key: string, behavior: AutoRefConfig_BehaviorJson) {
  control?.ChangeConfig({
    autoRefConfigs: {
      [props.autoRefId]: {
        gameEventBehavior: {
          [key]: behavior,
        }
      }
    }
  })
}

function changeAll(behavior: AutoRefConfig_BehaviorJson) {
  const gameEventBehavior: { [key: string]: AutoRefConfig_BehaviorJson } = {}
  for (const key of gameEventTypes.value) {
    gameEventBehavior[key] = behavior
  }
  control?.ChangeConfig({
    autoRefConfigs: {
      [props.autoRefId]: {
        gameEventBehavior,
      }
    }
  })
}
</script>

<template>
  <p>
    来自此自动裁判盒的比赛事件可以通过以下方式处理:
  </p>
  <ul>
    <li>接受: 根据全局配置的行为（第一个选项卡）处理事件。</li>
    <li>记录: 将被动事件添加到日志中，但完全不处理它。</li>
    <li>忽略: 静默丢弃事件。</li>
  </ul>
  <p>
    注意: 如果某个比赛事件启用了多数通过处理方式，则只考虑那些将相应事件配置为"接受"的自动裁判盒。
    如果已知某个自动裁判不支持特定事件，应将其行为设置为"忽略"。
  </p>
  <q-list bordered class="rounded-borders">
    <q-item>
      <q-item-section>
        <q-item-label><strong>全部</strong></q-item-label>
      </q-item-section>

      <q-item-section side>
        <AutoRefereeConfigBehaviorInput
          :model-value="commonBehaviorValue"
          @update:model-value="changeAll"
        />
      </q-item-section>
    </q-item>

    <q-separator spaced/>

    <q-item
      bordered dense
      v-for="behaviorKey of gameEventTypes"
      :key="behaviorKey"
    >
      <q-item-section>
        {{ behaviorName(behaviorKey) }}
      </q-item-section>

      <q-item-section side>
        <AutoRefereeConfigBehaviorInput
          :model-value="behaviors[behaviorKey]"
          @update:model-value="v => update(behaviorKey, v)"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>
