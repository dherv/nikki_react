import * as firebase from "firebase/app";
import { IDaily } from "../types/interfaces";
import firebaseConfig from "./firebase.config";
import "firebase/firestore";

// Initialize Firebase
class FirebaseService {
  private readonly app: firebase.app.App;
  private readonly db: firebase.firestore.Firestore;
  constructor() {
    this.app = firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore(this.app);
    this.enablePersistence();
  }
  enablePersistence() {
    // offline data
    this.db
      .enablePersistence()
      .catch((error: firebase.firestore.FirestoreError) => {
        if (error.code === "failed-precondition") {
          console.log("persistence failed");
        } else if (error.code === "unimplemented") {
          console.log("persistence is not available");
        }
      });
  }

  snapshot(callback: (type: string, data: IDaily, id: string) => void) {
    // real time listener
    this.db
      .collection("dailies")
      .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
        snapshot
          .docChanges()
          .forEach((change: firebase.firestore.DocumentChange) => {
            console.log(change, change.doc.data(), change.doc.id);
            // if (change.type === "added") {
            callback(change.type, change.doc.data() as IDaily, change.doc.id);
          });
      });
  }

  updateItem(text: string, id: string) {
    this.db
      .collection("dailies")
      .doc(id)
      .set({ text }, { merge: true })
      .then((docRef: any) => {
        console.log("document successfully updated");
      })
      .catch((error: Error) =>
        console.error("Error writing document: ", error)
      );
  }

  addItem(text: string, date: string, callbackAdd: (id: string) => void) {
    console.log("add called");
    this.db
      .collection("dailies")
      .add({ userId: 1, languageId: 1, date, text })
      .then((docRef: any) => {
        callbackAdd(docRef.id);
        console.log("document has been added");
      })
      .catch((error: Error) => console.log(error));
  }

  checkItem(date: string): Promise<any> {
    return this.db
      .collection("dailies")
      .where("userId", "==", 1)
      .where("date", "==", date)
      .get()
      .then((querySnapshot: any) => {
        console.log(querySnapshot);
        if (querySnapshot.empty) {
          console.info("document does not exist");
          return false;
        } else {
          console.info("document exist");
          return querySnapshot.docs.shift();
        }
      })
      .catch((error: Error) => {
        console.log(error);
        return error;
      });
  }

  async checkDocumentOrCreate(
    text: string,
    callbackAdd: (id: string) => void,
    callbackUpdate: (document: any) => void
  ) {
    // create doc if date does not exist yet
    const date = new Date().toLocaleDateString();

    const document = await this.checkItem(date);
    document ? callbackUpdate(document) : this.addItem(text, date, callbackAdd);
  }
}
export default FirebaseService;
