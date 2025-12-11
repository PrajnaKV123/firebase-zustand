import { auth, db } from "./firebaseApp";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function createAccount(email, password, name, position, department) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    
    await setDoc(doc(db, "employees", user.uid), {
      name,
      position,
      department,
      email: user.email,
      employeeId: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      joinedOn: new Date().toISOString().split("T")[0],
    });

    return user;

  } catch (error) {
    throw error;
  }
}
