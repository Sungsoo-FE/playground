import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import {
  ref,
  set,
  get,
  child,
  remove,
  update as fbUpdate,
} from "firebase/database";
import { uid } from "uid";

const firebaseConfig = {
  apiKey: "AIzaSyArGicDj35TlSfUIIKl97LdcLWrMOFD3rI",
  authDomain: "playground-bf722.firebaseapp.com",
  databaseURL: "https://playground-bf722-default-rtdb.firebaseio.com",
  projectId: "playground-bf722",
  storageBucket: "playground-bf722.appspot.com",
  messagingSenderId: "235071679515",
  appId: "1:235071679515:web:69343f62271adc58f09cbe",
  measurementId: "G-VLY9FQ9FJL",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export class DB {
  static create = (path: string, input: object) => {
    const uuid = uid();

    set(ref(db, path + uuid), {
      input,
    });
  };

  static read = (path: string) => {
    const dbRef = ref(db);
    get(child(dbRef, path))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  static update = (path: string, id: string, input: object) => {
    fbUpdate(ref(db, `${path}/${id}`), {
      input,
    });
  };

  static delete = (path: string, id: string) => {
    remove(ref(db, `${path}/${id}`));
  };
}
