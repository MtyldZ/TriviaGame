import {UIState} from './ui/state';
import {CounterState} from './count/state';
import {TriviaGameState} from './triviagame/state';

export interface GlobalState {
    ui: UIState;
    counter: CounterState;
    triviagame: TriviaGameState;
}
