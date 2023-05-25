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
const getRestaurantId = async (restaurantId) => {
    const restaurant:any = []
    const q = query(collection(db, "restaurants"), where("id", "==", restaurantId))
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        querySnapshot.docs.forEach(element => {
            restaurant.push(element.id)
        });
        return restaurant
    } else {
        return null;
    }
}

const getRestaurant = async (restaurantId) => {
    console.log(restaurantId)
    const q = query(collection(db, "restaurants"), where("id", "==", restaurantId))
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const restaurant = querySnapshot.docs[0].data();
        return restaurant
    } else {
        return null;
    }
}
export { getUserFromEmail, getMenu, getRestaurantId, getRestaurant };