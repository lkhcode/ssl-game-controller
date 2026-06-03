<script setup lang="ts">
import {computed, inject, ref} from 'vue'
import {useMatchStateStore} from "@/store/matchState";
import type {ControlApi} from "@/providers/controlApi";
import TextInput from "@/components/common/TextInput.vue";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')!

const suggestedStatusMessages = [
  '视觉问题',
  '规则讨论',
]

const dialogOpen = ref(false)
const customStatusMessage = ref<string>()

const sendStatusMessage = (value: string) => {
  if (value === store.matchState.statusMessage) {
    return
  }
  control.SubmitChange({
    origin: "UI",
    revertible: true,
    setStatusMessageChange: {
      statusMessage: value,
    }
  })
}

const clearStatusMessage = () => {
  if (!store.matchState.statusMessage) {
    return
  }

  control.SubmitChange({
    origin: "UI",
    revertible: true,
    setStatusMessageChange: {
      statusMessage: undefined,
    }
  })
}

const statusMessageType = computed(() => {
  const currentStatusMessage = store.matchState.statusMessage
  if (!currentStatusMessage) {
    return 'None'
  }
  if (suggestedStatusMessages.includes(currentStatusMessage)) {
    return currentStatusMessage
  }
  return 'Custom'
})

const onCustomStatusMessageUpdated = () => {
  if (statusMessageType.value !== 'Custom') {
    return
  }
  if (customStatusMessage.value) {
    sendStatusMessage(customStatusMessage.value)
  } else {
    clearStatusMessage()
  }
}

const onCustomStatusMessageSelected = () => {
  if (customStatusMessage.value) {
    sendStatusMessage(customStatusMessage.value)
  }
}

</script>

<template>
  <q-btn flat @click="dialogOpen = true">
    <q-icon name="feedback" color="white"/>
  </q-btn>
  <q-dialog v-model="dialogOpen">
    <q-card class="q-px-sm q-pb-md">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">状态消息</div>
        <q-space/>
        <q-btn icon="close" flat round dense v-close-popup/>
      </q-card-section>

      <q-card-section>
        状态消息将被广播并显示在状态板上。
      </q-card-section>

      <q-separator/>

      <q-list>
        <q-item tag="label" v-ripple
                v-for="suggestedMessage in suggestedStatusMessages"
                :key="suggestedMessage">
          <q-item-section avatar>
            <q-radio
              :model-value="statusMessageType"
              @update:model-value="sendStatusMessage(suggestedMessage)"
              :val="suggestedMessage"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ suggestedMessage }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section avatar>
            <q-radio
              :model-value="statusMessageType"
              @update:model-value="onCustomStatusMessageSelected"
              val="Custom"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>自定义</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <TextInput
              label="Custom Status Message"
              v-model="customStatusMessage"
              @focusout="onCustomStatusMessageUpdated"
              :clearable="false"
            />
          </q-item-section>
        </q-item>
      </q-list>

      <q-card-actions>
        <q-btn
          v-close-popup
          label="关闭"
          color="primary"
        />
        <q-btn
          label="清除"
          color="primary"
          @click="clearStatusMessage"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
