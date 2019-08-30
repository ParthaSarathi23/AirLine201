import { Passenger } from './Passenger';
import { Ancilary } from './Ancilary';
import { Meal } from './Meal';
import { ShoppingItem } from './ShoppingItem';

export interface Flight{
    id:number,
    name:string,
    arrivaltime:string,
    depaturetime:string,
    passengerDetails:Passenger[],
    passengerNo:number,
    ancilaryService:Ancilary;
    meal:Meal,
    shoppingItems:ShoppingItem
}