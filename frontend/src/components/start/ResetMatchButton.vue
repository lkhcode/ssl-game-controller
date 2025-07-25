<script setup lang="ts">
import {inject, ref} from "vue";
import type {ControlApi} from "@/providers/controlApi";

const control = inject<ControlApi>('control-api')

const confirm = ref(false)

const resetMatch = () => {
  control?.ResetMatch()
}
</script>

<template>
  <q-btn
    label="开始新比赛"
    icon="restart_alt"
    color="primary"
    @click="confirm = true"
  />
  <q-dialog v-model="confirm">
    <q-card>
      <q-card-section class="row no-wrap flex-center">
        <q-avatar icon="warning" color="primary" text-color="white"/>
        <div class="q-mt-md q-ml-md">
          您确定要开始新比赛并重置所有状态吗？当前状态将会被备份
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="取消" color="primary" v-close-popup/>
        <q-btn flat label="开始新比赛" color="primary" v-close-popup @click="resetMatch"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
