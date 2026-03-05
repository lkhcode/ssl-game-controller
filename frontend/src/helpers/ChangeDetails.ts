import {commandName, gameEventName, gameStateName, stageName} from "@/helpers/texts";
import {formatDurationJson, gameEventForTeam} from "@/helpers/index";
import {
  type Change_UpdateConfigJson,
  type Change_UpdateTeamStateJson,
  type ChangeJson
} from "@/proto/statemachine/ssl_gc_change_pb";
import type {GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {type TeamJson} from "@/proto/state/ssl_gc_common_pb";

export interface ChangeDetails {
  typeName: string,
  title: string,
  gameEvent?: GameEventJson,
  forTeam?: TeamJson,
  icon: string,
}

export function changeDetails(change: ChangeJson): ChangeDetails {
  if (change.newCommandChange) {
    return {
      typeName: "指令",
      title: commandName(change.newCommandChange.command?.type!),
      forTeam: change.newCommandChange.command?.forTeam,
      icon: "terminal",
    }
  } else if (change.changeStageChange) {
    return {
      typeName: "阶段",
      title: stageName(change.changeStageChange.newStage!),
      icon: "gavel",
    }
  } else if (change.setBallPlacementPosChange) {
    return {
      typeName: "放球位置",
      title: "坐标: " + JSON.stringify(change.setBallPlacementPosChange.pos!),
      icon: "sports_soccer",
    }
  } else if (change.addYellowCardChange) {
    const details = change.addYellowCardChange;
    const cause = details.causedByGameEvent
    return {
      typeName: "黄牌",
      title: cause ? "因" + gameEventName(cause.type) + "获得黄牌" : "黄牌",
      forTeam: details.forTeam,
      icon: "sim_card",
    }
  } else if (change.addRedCardChange) {
    const details = change.addRedCardChange;
    const gameEvent = details.causedByGameEvent
    return {
      typeName: "红牌",
      title: gameEvent ? "因" + gameEventName(gameEvent.type) + "获得红牌" : "红牌",
      forTeam: details.forTeam,
      gameEvent,
      icon: "sim_card",
    }
  } else if (change.yellowCardOverChange) {
    const details = change.yellowCardOverChange
    return {
      typeName: "黄牌到期",
      title: "黄牌到期",
      forTeam: details.forTeam,
      icon: "alarm",
    }
  } else if (change.addGameEventChange) {
    const details = change.addGameEventChange;
    const gameEvent = details.gameEvent!;
    return {
      typeName: "比赛事件",
      title: gameEventName(gameEvent.type),
      forTeam: gameEventForTeam(gameEvent),
      icon: "warning",
      gameEvent,
    }
  } else if (change.addPassiveGameEventChange) {
    const details = change.addPassiveGameEventChange;
    const gameEvent = details.gameEvent!;
    return {
      typeName: "比赛事件(被动接受)",
      title: "被动接受事件: " + gameEventName(gameEvent.type),
      forTeam: gameEventForTeam(gameEvent),
      icon: "recycling",
      gameEvent,
    }
  } else if (change.addProposalChange) {
    const details = change.addProposalChange;
    const gameEvent = details.proposal!.gameEvent!;
    return {
      typeName: "比赛事件提议",
      title: "接收到提议: " + gameEventName(gameEvent.type),
      forTeam: gameEventForTeam(gameEvent),
      icon: "front_hand",
      gameEvent,
    }
  } else if (change.updateConfigChange) {
    return {
      typeName: "配置",
      title: configChangeTitle(change.updateConfigChange),
      icon: "edit",
    }
  } else if (change.updateTeamStateChange) {
    const details = change.updateTeamStateChange
    return {
      typeName: "队伍状态",
      title: teamStateChangeTitle(details),
      forTeam: details.forTeam,
      icon: "edit",
    }
  } else if (change.switchColorsChange) {
    return {
      typeName: "交换颜色",
      title: "交换颜色",
      icon: "edit",
    }
  } else if (change.revertChange) {
    return {
      typeName: "Revert",
      title: `撤销变更 ${change.revertChange.changeId}`,
      icon: "undo",
    }
  } else if (change.newGameStateChange) {
    const details = change.newGameStateChange;
    return {
      typeName: "比赛状态",
      title: gameStateName(details.gameState?.type!),
      forTeam: details.gameState?.forTeam,
      icon: "gavel",
    }
  } else if (change.acceptProposalGroupChange) {
    const details = change.acceptProposalGroupChange;
    return {
      typeName: "提议已接受",
      title: `提议被${details.acceptedBy}接受: '${details.groupId}'`,
      icon: "check_circle_outline",
    }
  } else if (change.setStatusMessageChange) {
    const details = change.setStatusMessageChange;
    let title
    if (details.statusMessage) {
      title = `状态消息: ${details.statusMessage}`
    } else {
      title = '状态消息已清除'
    }
    return {
      typeName: "状态消息",
      title: title,
      icon: "message",
    }
  } else {
    return {
      typeName: "-",
      title: "-",
      icon: "help_outline",
    }
  }
}

function configChangeTitle(config: Change_UpdateConfigJson): string {
  if (config.firstKickoffTeam !== undefined && config.firstKickoffTeam !== 'UNKNOWN') {
    return `${config.firstKickoffTeam} 获得首次开球权`
  } else if (config.division !== undefined && config.division !== 'DIV_UNKNOWN') {
    return `组别: ${config.division}`
  } else if (config.maxRobotsPerTeam !== undefined) {
    return `最大机器人数量: ${config.maxRobotsPerTeam}`
  } else if (config.matchType !== undefined) {
    return `比赛类型: ${config.matchType}`
  }
  return "无法识别的配置变更" + JSON.stringify(config)
}

function teamStateChangeTitle(change: Change_UpdateTeamStateJson): string {
  if (change.teamName !== undefined) {
    return `队伍名称: ${change.teamName}`
  } else if (change.goals !== undefined) {
    return `进球数: ${change.goals}`
  } else if (change.goalkeeper !== undefined) {
    return `守门员: ${change.goalkeeper}`
  } else if (change.timeoutsLeft !== undefined) {
    return `Timeouts 剩余次数: ${change.timeoutsLeft}`
  } else if (change.timeoutTimeLeft !== undefined) {
    return `Timeout 剩余时间: ${change.timeoutTimeLeft}`
  } else if (change.onPositiveHalf !== undefined) {
    if (change.onPositiveHalf) {
      return "Goal is on positive half"
    }
    return "Goal is on negative half"
  } else if (change.ballPlacementFailures !== undefined) {
    return `放球失败次数: ${change.ballPlacementFailures}`
  } else if (change.canPlaceBall !== undefined) {
    return `可以放球: ${change.canPlaceBall}`
  } else if (change.challengeFlagsLeft !== undefined) {
    return `剩余质疑次数: ${change.challengeFlagsLeft}`
  } else if (change.requestsBotSubstitution !== undefined) {
    if (change.requestsBotSubstitution) {
      return "请求更换机器人"
    }
    return "取消更换机器人请求"
  } else if (change.requestsTimeout !== undefined) {
    if (change.requestsTimeout) {
      return "timeout 请求"
    }
    return "取消 timeout 请求"
  } else if (change.requestsChallenge !== undefined) {
    if (change.requestsChallenge) {
      return "请求质疑"
    }
    return "取消质疑请求"
  } else if (change.requestsEmergencyStop !== undefined) {
    if (change.requestsEmergencyStop) {
      return "请求紧急停止"
    }
    return "取消紧急停止请求"
  } else if (change.yellowCard !== undefined) {
    const timeRemaining = formatDurationJson(change.yellowCard.timeRemaining!)
    return `修改黄牌 ${change.yellowCard.id} (剩余 ${timeRemaining} 秒)`
  } else if (change.redCard !== undefined) {
    return `修改红牌 ${change.redCard.id}`
  } else if (change.foul !== undefined) {
    return `修改犯规 ${change.foul.id}`
  } else if (change.removeYellowCard !== undefined) {
    return `移除黄牌 ${change.removeYellowCard}`
  } else if (change.removeRedCard !== undefined) {
    return `移除红牌 ${change.removeRedCard}`
  } else if (change.removeFoul !== undefined) {
    return `移除犯规 ${change.removeFoul}`
  } else if (change.botSubstitutionsLeft !== undefined) {
    return `剩余机器人更换次数: ${change.botSubstitutionsLeft}`
  } else if (change.hullColor !== undefined) {
    return `更改外壳颜色: ${change.hullColor}`
  }
  return "未知的队伍状态变更: " + JSON.stringify(change)
}
