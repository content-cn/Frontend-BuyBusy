import data from "./data";
import {
  doc,
  writeBatch,
  query,
  where,
  getDocs,
  collection,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

const addDataToCollection = async () => {
  try {
    const batch = writeBatch(db);
    data.forEach((product) => {
      const docRef = doc(db, "products", product.id.toString());
      batch.set(docRef, product);
    });

    const res = await batch.commit();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const getProductsUsingProductIds = async (cart) => {
  const productIds = Object.keys(cart).map(Number);
  if (!productIds.length) {
    return false;
  }

  const productsRef = collection(db, "products");

  const productsSnapshot = await getDocs(
    query(productsRef, where("id", "in", productIds))
  );

  const productsData = productsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    date: cart?.date,
    quantity: cart[doc.data().id],
  }));

  return productsData;
};

const getUserCartProducts = async (uid) => {
  const docRef = doc(db, "usersCarts", uid);
  const docSnap = await getDoc(docRef);
  return { docRef, data: docSnap.data() };
};

const convertDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

export {
  addDataToCollection,
  getProductsUsingProductIds,
  getUserCartProducts,
  convertDate,
};
