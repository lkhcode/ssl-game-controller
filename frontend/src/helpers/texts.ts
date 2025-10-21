import {type MatchTypeJson, type Referee_StageJson} from "@/proto/state/ssl_gc_referee_message_pb";
import {type Command_TypeJson, type CommandJson, type GameState_TypeJson} from "@/proto/state/ssl_gc_state_pb";
import {type GameEvent_TypeJson} from "@/proto/state/ssl_gc_game_event_pb";
import {type ContinueAction_TypeJson} from "@/proto/engine/ssl_gc_engine_pb";

export function stageName(stage: Referee_StageJson): string {
  switch (stage) {
    case 'NORMAL_FIRST_HALF_PRE':
      return '上半场准备'
    case 'NORMAL_FIRST_HALF':
      return '上半场'
    case 'NORMAL_HALF_TIME':
      return '中场休息'
    case 'NORMAL_SECOND_HALF_PRE':
      return '下半场准备'
    case 'NORMAL_SECOND_HALF':
      return '下半场'
    case 'EXTRA_TIME_BREAK':
      return '加时赛前休息'
    case 'EXTRA_FIRST_HALF_PRE':
      return '加时赛上半场准备'
    case 'EXTRA_FIRST_HALF':
      return '加时赛上半场'
    case 'EXTRA_HALF_TIME':
      return '加时赛中场休息'
    case 'EXTRA_SECOND_HALF_PRE':
      return '加时赛下半场准备'
    case 'EXTRA_SECOND_HALF':
      return '加时赛下半场'
    case 'PENALTY_SHOOTOUT_BREAK':
      return '点球大战前休息'
    case 'PENALTY_SHOOTOUT':
      return '点球大战'
    case 'POST_GAME':
      return '比赛结束'
  }
  return 'Unknown'
}

export function commandName(type: Command_TypeJson): string {
  switch (type) {
    case 'HALT':
      return 'Halt 终止'
    case 'STOP':
      return 'Stop 停止'
    case 'NORMAL_START':
      return 'Normal Start 标准开始'
    case 'FORCE_START':
      return 'Force Start 强制开始'
    case 'DIRECT':
      return 'Direct Kick 直接任意球'
    case 'INDIRECT':
      return 'Indirect Kick 间接任意球'
    case 'KICKOFF':
      return 'Kick-Off 开球'
    case 'PENALTY':
      return 'Penalty 点球'
    case 'TIMEOUT':
      return 'Timeout 暂停'
    case 'BALL_PLACEMENT':
      return 'Ball Placement 放球'
    case 'UNKNOWN':
      return 'Unknown'
  }
  return 'Unknown'
}

export function gameStateName(type: GameState_TypeJson): string {
  switch (type) {
    case 'HALT':
      return "Halt"
    case 'STOP':
      return "Stop"
    case 'RUNNING':
      return "Running"
    case 'FREE_KICK':
      return "Free Kick"
    case 'KICKOFF':
      return "Kick-Off"
    case 'PENALTY':
      return "Penalty"
    case 'TIMEOUT':
      return "Timeout"
    case 'BALL_PLACEMENT':
      return "Ball Placement"
    case 'DIRECT':
      return "Direct Kick"
    case 'INDIRECT':
      return "Indirect Kick"
    case 'UNKNOWN':
      return "Unknown"
  }
  return 'Unknown'
}

export const gameEventNames = new Map<GameEvent_TypeJson, string>([
  ['BALL_LEFT_FIELD_TOUCH_LINE', "球从边线出界"],
  ['BALL_LEFT_FIELD_GOAL_LINE', "球从球门线出界"],
  ['AIMLESS_KICK', "无意义射门"],
  ['ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA', "机器人到对方禁区距离过短"],
  ['DEFENDER_IN_DEFENSE_AREA', "非守门员完全进入己方禁区内触球"],
  ['DEFENDER_IN_DEFENSE_AREA_PARTIALLY', "非守门员部分进入己方禁区内触球"],
  ['BOUNDARY_CROSSING', "机器人将球踢出场外"],
  ['KEEPER_HELD_BALL', "守门员清球超时"],
  ['BOT_DRIBBLED_BALL_TOO_FAR', "带球过度"],
  ['BOT_PUSHED_BOT', "机器人推挤"],
  ['BOT_HELD_BALL_DELIBERATELY', "机器人护球"],
  ['BOT_TIPPED_OVER', "机器人翻倒"],
  ['BOT_DROPPED_PARTS', "机器人掉落零件"],
  ['ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA', "机器人在对方禁区内触球"],
  ['ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA', "机器人在对方禁区内触碰对方机器人"],
  ['ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA_SKIPPED', "机器人在对方禁区内触碰对方机器人 (忽略)"],
  ['BOT_KICKED_BALL_TOO_FAST', "球速过快"],
  ['BOT_CRASH_UNIQUE', "机器人碰撞"],
  ['BOT_CRASH_DRAWN', "机器人相互碰撞"],
  ['DEFENDER_TOO_CLOSE_TO_KICK_POINT', "机器人离开球点过近"],
  ['BOT_TOO_FAST_IN_STOP', "机器人在停止阶段超速"],
  ['BOT_INTERFERED_PLACEMENT', "机器人干扰放球"],
  ['POSSIBLE_GOAL', "待确认的进球"],
  ['GOAL', "进球有效"],
  ['INVALID_GOAL', "进球无效"],
  ['ATTACKER_DOUBLE_TOUCHED_BALL', "二次触球"],
  ['PLACEMENT_SUCCEEDED', "放球成功"],
  ['PENALTY_KICK_FAILED', "点球失败"],
  ['NO_PROGRESS_IN_GAME', "僵持状态"],
  ['PLACEMENT_FAILED', "放球失败"],
  ['MULTIPLE_CARDS', "因多次受牌获得红牌"],
  ['MULTIPLE_FOULS', "因多次犯规获得黄牌"],
  ['BOT_SUBSTITUTION', "机器人更换"],
  ['EXCESSIVE_BOT_SUBSTITUTION', "更换机器人次数过多"],
  ['TOO_MANY_ROBOTS', "场上存在过多机器人"],
  ['CHALLENGE_FLAG', "提出异议"],
  ['CHALLENGE_FLAG_HANDLED', "异议已受理"],
  ['EMERGENCY_STOP', "紧急停止"],
  ['UNSPORTING_BEHAVIOR_MINOR', "违反体育精神的行为(轻微)"],
  ['UNSPORTING_BEHAVIOR_MAJOR', "违反体育精神的行为(严重)"],
])

export function gameEventName(type?: GameEvent_TypeJson): string {
  return gameEventNames.get(type!) ?? "Unknown"
}

export function matchTypeName(matchType: MatchTypeJson): string {
  switch (matchType) {
    case 'UNKNOWN_MATCH':
      return "Unknown"
    case 'GROUP_PHASE':
      return "小组赛"
    case 'ELIMINATION_PHASE':
      return "淘汰赛"
    case 'FRIENDLY':
      return "友谊赛"
  }
  return 'Unknown'
}

export function continueActionLabel(type: ContinueAction_TypeJson, nextCommand?: CommandJson): string {
  switch (type) {
    case 'HALT':
      return 'Halt 终止'
    case 'RESUME_FROM_HALT':
      return '恢复 (Halt -> Stop)'
    case 'STOP_GAME':
      return 'Stop 停止'
    case 'FORCE_START':
      return 'Force Start 强制开始 (无下一指令)'
    case 'FREE_KICK':
      return 'Direct Kick 直接任意球 (无下一指令)'
    case 'DIRECT_KICK':
      return 'Direct Kick 直接任意球 (无下一指令)'
    case 'INDIRECT_KICK':
      return 'Indirect Kick 间接任意球 (无下一指令)'
    case 'NEXT_COMMAND':
      return commandName(nextCommand?.type!)
    case 'BALL_PLACEMENT_START':
      return 'Start Ball Placement 开始放球'
    case 'BALL_PLACEMENT_CANCEL':
      return 'Cancel Ball Placement 取消放球'
    case 'BALL_PLACEMENT_COMPLETE':
      return 'Complete Ball Placement 完成放球'
    case 'BALL_PLACEMENT_FAIL':
      return 'Ball Placement Failed 放球失败'
    case 'TIMEOUT_START':
      return 'Start Timeout 开始暂停'
    case 'TIMEOUT_STOP':
      return 'Timeout Stop 暂停结束'
    case 'BOT_SUBSTITUTION':
      return 'Start Bot Substitution 开始机器人更换'
    case 'NEXT_STAGE':
      return 'Next Stage 下一阶段'
    case 'END_GAME':
      return 'End Game 比赛结束'
    case 'ACCEPT_GOAL':
      return 'Accept Goal 进球有效'
    case 'REJECT_GOAL':
      return 'Reject Goal 进球无效'
    case 'NORMAL_START':
      return 'Normal Start 标准开始'
    case 'CHALLENGE_ACCEPT':
      return 'Accept Challenge 接受异议'
    case 'CHALLENGE_REJECT':
      return 'Reject Challenge 反对异议'
    case 'TYPE_UNKNOWN':
      return '无法识别的指令'
  }
  return '指令异常'
}
