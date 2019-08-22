import { Passenger } from '../Entity/Passenger';
import { Action } from '@ngrx/store';

export const ADD_PASSENGER = 'ADD_PASSENGER';

export function addPassengerDetails(state: Passenger[] = [], action) {
  switch (action.type) {
    case ADD_PASSENGER:
        return [...state, action.payload];
    default:
        return state;
    }
}
