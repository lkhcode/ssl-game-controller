package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"log"
)

func (s *StateMachine) processChangeNewCommand(newState *state.State, newCommand *Change_NewCommand) (changes []*Change) {
	prevGameState := newState.GameState
	newState.GameState = s.newGameState(newState, newCommand)
	newState.Command = newCommand.Command

	newState.CurrentActionTimeRemaining = s.currentActionTimeRemainingForCommand(
		*newState.Command.Type,
		newState.Division.Div(),
	)

	if *newState.Command.Type == state.Command_TIMEOUT {
		*newState.TeamInfo(*newState.Command.ForTeam).TimeoutsLeft--
		newState.TeamInfo(*newState.Command.ForTeam).RequestsTimeoutSince = nil
	}

	if *newState.GameState.Type == state.GameState_STOP {
		if prevGameState.IsHalted() {
			newState.ReadyContinueTime = timestamppb.New(s.timeProvider().Add(s.gameConfig.PreparationTimeAfterHalt))
			// reset robot substitution flags
			for _, team := range state.BothTeams() {
				newState.TeamInfo(team).RequestsBotSubstitutionSince = nil
				*newState.TeamInfo(team).BotSubstitutionAllowed = false
			}
		} else if newState.ReadyContinueTime == nil {
			newState.ReadyContinueTime = timestamppb.New(s.timeProvider().Add(s.gameConfig.PreparationTimeBeforeResume))
		}
	} else {
		newState.ReadyContinueTime = nil
	}

	if newState.Command.IsRunning() {
		if newState.Stage.IsPreStage() {
			log.Print("Pre-Stage is over, because game is running now")
			changes = append(changes, &Change{
				Change: &Change_ChangeStageChange{
					ChangeStageChange: &Change_ChangeStage{
						NewStage: newState.Stage.Next(),
					},
				},
			})
		}

		// reset game events and proposals
		newState.ProposalGroups = nil
		newState.GameEvents = nil

		// reset ball placement pos and follow ups
		newState.PlacementPos = nil
		newState.NextCommand = nil

		// reset status message
		newState.StatusMessage = nil
	}

	if *newState.Stage == state.Referee_PENALTY_SHOOTOUT &&
		newState.ShootoutState != nil {
		if *newCommand.Command.Type == state.Command_NORMAL_START {
			newState.ShootoutState.NumberOfAttempts[newState.ShootoutState.NextTeam.String()]++
			*newState.ShootoutState.NextTeam = newState.ShootoutState.NextTeam.Opposite()
		} else if *newState.GameState.Type == state.GameState_STOP {
			forTeam := *newState.ShootoutState.NextTeam
			newState.NextCommand = state.NewCommand(state.Command_PENALTY, forTeam)
			determiner := BallPlacementPosDeterminer{
				State:    newState,
				Event:    nil,
				Geometry: s.Geometry,
				OnPositiveHalf: map[state.Team]bool{
					state.Team_BLUE:   *newState.TeamInfo(state.Team_BLUE).OnPositiveHalf,
					state.Team_YELLOW: *newState.TeamInfo(state.Team_YELLOW).OnPositiveHalf,
				},
			}
			newState.PlacementPos = determiner.Location()
		}
	}

	return
}

func (s *StateMachine) currentActionTimeRemainingForCommand(command state.Command_Type, division config.Division) *durationpb.Duration {
	switch command {
	case state.Command_BALL_PLACEMENT:
		return durationpb.New(s.gameConfig.BallPlacementTime)
	case state.Command_DIRECT:
		return durationpb.New(s.gameConfig.FreeKickTimeout[division])
	case state.Command_INDIRECT:
		//INDIRECT 与 DIRECT 超时相同，可沿用FreeKickTimeout
		return durationpb.New(s.gameConfig.FreeKickTimeout[division])
	case state.Command_KICKOFF, state.Command_PENALTY, state.Command_NORMAL_START:
		return durationpb.New(s.gameConfig.PrepareTimeout)
	default:
		return durationpb.New(0)
	}
}

func (s *StateMachine) newGameState(newState *state.State, newCommand *Change_NewCommand) *state.GameState {
	switch *newCommand.Command.Type {
	case state.Command_HALT:
		return state.NewGameStateNeutral(state.GameState_HALT)
	case state.Command_STOP:
		return state.NewGameStateNeutral(state.GameState_STOP)
	case state.Command_NORMAL_START:
		// Keep previous state
		return newState.GameState
	case state.Command_FORCE_START:
		return state.NewGameStateNeutral(state.GameState_RUNNING)
	case state.Command_DIRECT:
		return state.NewGameStateWithTeam(state.GameState_FREE_KICK, *newCommand.Command.ForTeam)
	case state.Command_KICKOFF:
		return state.NewGameStateWithTeam(state.GameState_KICKOFF, *newCommand.Command.ForTeam)
	case state.Command_PENALTY:
		return state.NewGameStateWithTeam(state.GameState_PENALTY, *newCommand.Command.ForTeam)
	case state.Command_TIMEOUT:
		return state.NewGameStateWithTeam(state.GameState_TIMEOUT, *newCommand.Command.ForTeam)
	case state.Command_BALL_PLACEMENT:
		return state.NewGameStateWithTeam(state.GameState_BALL_PLACEMENT, *newCommand.Command.ForTeam)
	case state.Command_UNKNOWN:
		return state.NewGameStateNeutral(state.GameState_UNKNOWN)
	default:
		return state.NewGameStateNeutral(state.GameState_UNKNOWN)
	}
}
