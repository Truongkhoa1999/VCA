import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";


export const checkIfUserLogin = (): Promise<string | null> =>{
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user:User | null) => {
            if(user){
                resolve(user.uid)
            } else{
                reject(null)
            }
            unsubscribe()
        })
    })
}

