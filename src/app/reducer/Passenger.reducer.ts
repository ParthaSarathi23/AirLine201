import { Passenger } from '../Entity/Passenger';
import { Action } from '@ngrx/store';

export const ADD_PASSENGER = 'ADD_PASSENGER';
export const EDIT_PASSENGER = 'EDIT_PASSENGER';
export const REMOVE_PASSENGER = 'REMOVE_PASSENGER';



export function addPassengerDetails(state: Passenger[] = [], action) {


    switch (action.type) {
        case ADD_PASSENGER:
            
            return [...state, action.payload];
        case EDIT_PASSENGER:
            console.log(state);
            state.forEach((p, index) => {
                console.log(p);
                console.log(index);
                if (p.id === action.payload.id) {
                    console.log(index);

                    console.log(state[index]);
                    console.log(action.payload);

                    state[index] = action.payload;
                    console.log(state);
                }
            });

            return state;
        case REMOVE_PASSENGER:
            console.log(state);
            state.forEach((p, index) => {
                console.log(p);
                console.log(index);
                if (p.id === action.payload.id) {
                    state.splice(index, 1);
                }
            });
            return state;
        default:
            return state;
    }

}

