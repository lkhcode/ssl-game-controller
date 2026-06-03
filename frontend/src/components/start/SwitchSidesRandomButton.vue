<script setup lang="ts">
import {inject, ref} from "vue";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";
import type {ControlApi} from "@/providers/controlApi";
import TeamInput from "@/components/common/TeamInput.vue";
import FieldHalfInput from "@/components/team/FieldHalfInput.vue";
import {opponent} from "@/helpers";
import {useMatchStateStore} from "@/store/matchState";

const control = inject<ControlApi>('control-api')
const matchStore = useMatchStateStore()

const showDialog = ref(false)
const team = ref<TeamJson>('YELLOW')

const randomize = (counter: number) => {
  if (Math.random() < 0.5) {
    team.value = 'YELLOW'
  } else {
    team.value = 'BLUE'
  }
  if (counter > 0) {
    setTimeout(() => randomize(counter - 1), 100)
  }
}

function accept() {
  const firstKickoffTeam = opponent(team.value);
  if (matchStore.matchState.firstKickoffTeam !== firstKickoffTeam) {
    control?.UpdateMatchConfig({
      firstKickoffTeam: firstKickoffTeam
    })
  }
}
</script>

<template>
  <q-btn
    label="确定半场和开球权"
    color="primary"
    icon="home"
    @click="showDialog = true"
  />
  <q-dialog v-model="showDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">确定选边队伍</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-item-section>
          <TeamInput
            :model-value="team"
            @update:model-value="(v) => team = v"
          />
        </q-item-section>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Randomize" color="primary" @click="randomize(10)"/>
      </q-card-actions>

      <q-card-section>
        <div class="text-h6">让该队选择</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-item-section>
          <FieldHalfInput :team="team"/>
        </q-item-section>
        <q-item-label header>另一队将获得首次次开球权</q-item-label>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="确认" color="primary" @click="accept" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
