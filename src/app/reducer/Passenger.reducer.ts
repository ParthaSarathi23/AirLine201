import { Passenger } from '../Entity/Passenger';
import { Action } from '@ngrx/store';
import { stat } from 'fs';

export const ADD_PASSENGER = 'ADD_PASSENGER';
export const EDIT_PASSENGER = 'EDIT_PASSENGER';
export const REMOVE_PASSENGER = 'REMOVE_PASSENGER';



export function addPassengerDetails(state: Passenger[] = [], action) {


    switch (action.type) {
        case ADD_PASSENGER:
            return [...state, action.payload];
        case EDIT_PASSENGER:
            console.log(state);
          // if(state.length==0){
                var passengerData = [];
               // this.passenger = this.getParticularPassengerData(action.payload.i);
                var retrievedObject = localStorage.getItem('PassengerList');
                if (retrievedObject == '' || retrievedObject==null) {
                    passengerData.push(action.payload);
                    localStorage.setItem('PassengerList', JSON.stringify(passengerData));
                }else {
                    passengerData = JSON.parse(retrievedObject);
                    passengerData.forEach((element,index) => {
                        if(action.payload.id==element.id){
                            passengerData[index]=action.payload;
                        }
                    });
                    localStorage.setItem('PassengerList', JSON.stringify(passengerData));
                }
            // }else{
            //     state.forEach((p, index) => {
            //         console.log(p);
            //         console.log(index);
            //         if (p.id === action.payload.id) {
            //             console.log(index);
            //             console.log(state[index]);
            //             console.log(action.payload);
            //             state[index] = action.payload;
            //             console.log(state);
            //         }
            //     });
            // }
        
            return state;
        case REMOVE_PASSENGER:

            // console.log(state);
            // state.forEach((p, index) => {
            //     console.log(p);
            //     console.log(index);
            //     if (p.id === action.payload.id) {
            //         state.splice(index, 1);
            //     }
            // });
            console.log(state);
          // if(state.length==0){
                var passengerData = [];
               // this.passenger = this.getParticularPassengerData(action.payload.i);
                var retrievedObject = localStorage.getItem('PassengerList');
                if (retrievedObject == '' || retrievedObject==null) {
                    passengerData.push(action.payload);
                    localStorage.setItem('PassengerList', JSON.stringify(passengerData));
                }else {
                    passengerData = JSON.parse(retrievedObject);
                    passengerData.forEach((element,index) => {
                        if(action.payload.id==element.id){
                            passengerData.splice(index,1);
                        }
                    });
                    localStorage.setItem('PassengerList', JSON.stringify(passengerData));
                }
            return state;
        default:
            return state;
    }

}

