<script setup lang="ts">
import {useRoute} from "vue-router";
import RedCardsInput from "@/components/team/RedCardsInput.vue";
import YellowCardsInput from "@/components/team/YellowCardsInput.vue";
import FoulTable from "@/components/team/FoulTable.vue";
import {type TeamJson} from "@/proto/state/ssl_gc_common_pb";
import TeamBadge from "@/components/common/TeamBadge.vue";
import {useUiStateStore} from "@/store/uiState";

const route = useRoute()
const uiState = useUiStateStore()
const team: TeamJson = route.params.team.toString().toUpperCase() as TeamJson

</script>

<template>
  <div class="q-ma-xl">
    <q-list padding bordered class="rounded-borders">
      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        v-model="uiState.teamDetailsFoulsExpanded"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon name="fmd_bad"/>
          </q-item-section>

          <q-item-section>
            犯规
          </q-item-section>

          <q-item-section side>
            <TeamBadge :team="team"/>
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <FoulTable :team="team"/>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        v-model="uiState.teamDetailsYellowCardsExpanded"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon name="sd_card_alert"/>
          </q-item-section>

          <q-item-section>
            黄牌
          </q-item-section>

          <q-item-section side>
            <TeamBadge :team="team"/>
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <YellowCardsInput :team="team"/>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        v-model="uiState.teamDetailsRedCardsExpanded"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon name="sd_card_alert"/>
          </q-item-section>

          <q-item-section>
            红牌
          </q-item-section>

          <q-item-section side>
            <TeamBadge :team="team"/>
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <RedCardsInput :team="team"/>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>
