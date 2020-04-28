import * as firebase from "firebase/app";
import firebaseConfig from "./firebase.config";
import "firebase/firestore";

class FirebaseService {
  private readonly app: firebase.app.App;
  private readonly db: firebase.firestore.Firestore;
  constructor() {
    this.app = firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore(this.app);
    this.enablePersistence();
  }
  enablePersistence() {
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

  snapshot(
    collection: string,
    callback: (docs: firebase.firestore.DocumentData[]) => void,
    condition?: [
      string | firebase.firestore.FieldPath,
      firebase.firestore.WhereFilterOp,
      any
    ]
  ) {
    let ref = null;

    if (condition) {
      const [fieldPath, opStr, value] = condition;
      ref = this.db.collection(collection).where(fieldPath, opStr, value);
    } else {
      ref = this.db.collection(collection);
    }

    ref.onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
      callback(snapshot.docs);
    });
  }

  updateItem(collection: string, text: string, id: string) {
    this.db
      .collection(collection)
      .doc(id)
      .set({ text }, { merge: true })
      .then((docRef: any) => {
        console.log("document successfully updated");
      })
      .catch((error: Error) =>
        console.error("Error writing document: ", error)
      );
  }

  addItem(
    collection: string,
    objectToCreateOrUpdate: any,
    callbackAdd?: (id: string) => void
  ) {
    console.log("add called");
    this.db
      .collection(collection)
      .add(objectToCreateOrUpdate)
      .then((docRef: any) => {
        if (callbackAdd) callbackAdd(docRef.id);
        console.log("document has been added");
      })
      .catch((error: Error) => console.log(error));
  }

  checkItemByDateAndUserId(collection: string, date: string): Promise<any> {
    return this.db
      .collection(collection)
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
    collection: string,
    text: string,
    callbackAdd: (id: string) => void,
    callbackUpdate: (document: any) => void
  ) {
    const date = new Date().toLocaleDateString();
    const document = await this.checkItemByDateAndUserId(collection, date);

    const objectToCreateOrUpdate = { text, date, userId: 1, languageId: 1 };
    document
      ? callbackUpdate(document)
      : this.addItem(collection, objectToCreateOrUpdate, callbackAdd);
  }
}
export default FirebaseService;
