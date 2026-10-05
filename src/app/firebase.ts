import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { environment } from '../environments/environment';

const firebaseConfig: FirebaseOptions = {
	apiKey: environment.firebase.apiKey,
	projectId: environment.firebase.projectId,
	appId: environment.firebase.appId,
	authDomain: environment.firebase.authDomain
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
