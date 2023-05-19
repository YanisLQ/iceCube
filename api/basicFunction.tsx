import { getDocs,  query, where, collection } from "firebase/firestore";
import { db } from '../firebase-config';


const getUserFromEmail = async (email) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data();
        return user
    } else {
        return null;
    }
}

const getMenu = async (restaurantId) => {
    const menu:any = []
    const q = query(collection(db, "categories"), where("menuId", "array-contains", restaurantId))
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        querySnapshot.docs.forEach(element => {
            menu.push(element.id)
        });
        return menu
    } else {
        return null;
    }
}

export { getUserFromEmail, getMenu };