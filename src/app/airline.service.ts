import { Subject } from 'rxjs';
import { Passenger } from './Entity/Passenger';

export class AirlineService {
    showLogoutEvent = new Subject<String[]>();
    passengerChangedEvent = new Subject<Passenger[]>();
    selectedSeats = new Subject<String[]>();

    string: String[];
    
    passengerData: Passenger[] = [
        {
            id: 1, name: 'Subha', email: 'subha064@gmail.com', passport: 'BL78785634', address: 'String', dob: '05/07/1991', disability: 'No', food: true, seatnumber: 'B_1', ischeckedin: true, infants: 2, ancilarservices: true,
        },
        {
            id: 2, name: 'partha', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 3, name: 'sonali', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: 'A_1', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 4, name: 'Arijit', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 5, name: 'Adrita', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 6, name: 'Gopi', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 7, name: 'Biswa', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 8, name: 'Abhisek', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: 'E_1', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 9, name: 'Swapna', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: 'E_2', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 10, name: 'Neel', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: 'E_4', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 11, name: 'Sanjib', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 12, name: 'Nidhi', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 13, name: 'Mohit', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 14, name: 'Madhu', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 15, name: 'queen', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 16, name: 'Lipa', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 17, name: 'Abakash', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 18, name: 'Rinky', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 19, name: 'Satya', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 20, name: 'Sai', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 21, name: 'Gungun', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 22, name: 'Ananya', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 23, name: 'Ardhendu', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 24, name: 'Rajib', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 25, name: 'Arun', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 26, name: 'Ashok', email: 'String', passport: 'String', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        },
    ]

    showLogout(email: String,type:String) {
        this.string= [email,type];
        this.showLogoutEvent.next(this.string);
    }

    getPassengerData() {
        return this.passengerData.slice();
    }
    getPassengerSeatData() {
        var seatArray:string[]=[];
        this.passengerData.slice().forEach(map_element => {
            seatArray.push(map_element.seatnumber);
        });
        return seatArray;
        }
    getParticularPassengerData(id: number) {
        return this.passengerData[id - 1];
    }
    updatePassenger(id: number, passengerData: Passenger) {
        this.passengerData[id] = passengerData;
        console.log(this.passengerData[0].name);
        this.passengerChangedEvent.next(this.passengerData.slice());
    }

    newPassenger(passengerData: Passenger) {
        this.passengerData.push(passengerData);
        this.passengerChangedEvent.next(this.passengerData.slice());
    }

    deletePassenger(index: number) {
        this.passengerData.splice(index, 1);
        this.passengerChangedEvent.next(this.passengerData.slice());
    }

   getSelectedSeats(seat:string[]){
         this.selectedSeats.next(seat);
   }

}