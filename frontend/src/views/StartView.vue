<script setup lang="ts">
import TeamBadge from "@/components/common/TeamBadge.vue";
import DivisionInput from "@/components/start/DivisionInput.vue";
import MatchTypeInput from "@/components/start/MatchTypeInput.vue";
import ResetMatchButton from "@/components/start/ResetMatchButton.vue";
import SwitchColorButton from "@/components/start/SwitchColorButton.vue";
import SwitchSidesRandomButton from "@/components/start/SwitchSidesRandomButton.vue";
import SwitchColorRandomButton from "@/components/start/SwitchColorRandomButton.vue";
import EndMatchButton from "@/components/start/EndMatchButton.vue";
import TeamNameInput from "@/components/team/TeamNameInput.vue";
import GoalKeeperIdInput from "@/components/team/GoalKeeperIdInput.vue";
import BallPlacementEnabledInput from "@/components/team/BallPlacementEnabledInput.vue";
import FirstKickOffInput from "@/components/team/FirstKickOffInput.vue";
import FieldHalfInput from "@/components/team/FieldHalfInput.vue";
import StageInput from "@/components/start/StageInput.vue";
import {teams} from "@/helpers";
import MaxRobotsPerTeamInput from "@/components/start/MaxRobotsPerTeamInput.vue";
import HullColorInput from "@/components/team/HullColorInput.vue";
</script>

<template>
  <div class="q-ma-md">
    <div class="row justify-evenly">
      <div class="q-pa-md">
        <ResetMatchButton/>
      </div>
      <div class="q-pa-md">
        <DivisionInput/>
      </div>
      <MatchTypeInput/>
    </div>

    <div class="q-ma-lg row justify-evenly">
      <q-list bordered padding v-for="team in teams" :key="team">
        <q-item-label header>
          <TeamBadge :team="team"/>
        </q-item-label>

        <q-item v-ripple>
          <q-item-section>
            <TeamNameInput :team="team"/>
          </q-item-section>
        </q-item>

        <q-item v-ripple>
          <q-item-section>
            <GoalKeeperIdInput :team="team"/>
          </q-item-section>
        </q-item>

        <q-separator spaced/>

        <q-item v-ripple>
          <q-item-section>
            <BallPlacementEnabledInput :team="team"/>
          </q-item-section>
        </q-item>

        <q-item v-ripple>
          <q-item-section>
            <FirstKickOffInput :team="team"/>
          </q-item-section>
        </q-item>

        <q-item v-ripple>
          <q-item-section>
            <FieldHalfInput :team="team"/>
          </q-item-section>
        </q-item>

        <q-item v-ripple>
          <q-item-section>
            <div class="row justify-evenly">
              <HullColorInput :team="team"/>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div class="row justify-evenly">
      <SwitchColorButton/>
      <SwitchColorRandomButton/>
      <SwitchSidesRandomButton/>
    </div>

    <q-separator spaced/>

    <div class="row justify-evenly">
      <MaxRobotsPerTeamInput/>
      <StageInput/>
      <div class="q-pa-md">
        <EndMatchButton/>
      </div>
    </div>

    <div class="q-ma-md">
      <p>
        要设置新比赛，请从上到下浏览此页面。
        完整流程可在
        <q-btn color="primary" target="_blank"
               href="https://robocup-ssl.github.io/ssl-rules/sslrules.html#_match_preparation">
          规则手册
        </q-btn>
        中找到。
      </p>
    </div>
  </div>
</template>
