import { Passenger } from './Entity/Passenger';

export interface AppState {
  readonly passenger: Passenger[];
}
