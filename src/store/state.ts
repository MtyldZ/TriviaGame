import {UIState} from './ui/state';
import {TriviaGameState} from './triviaGame/state';

export interface GlobalState {
    ui: UIState;
    triviaGame: TriviaGameState;
}
