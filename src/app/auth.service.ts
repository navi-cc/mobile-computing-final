import { Service } from '@angular/core';
import { auth } from './firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	User
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

@Service()
export class AuthService {
	async signIn(email: string, password: string) {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);

			return userCredential;
		} catch (error) {
			let errorMessage = 'Something went wrong. Please try again.';

			if (error instanceof FirebaseError) {
				if (error.code === 'auth/invalid-credential') {
					errorMessage = 'Invalid credentials. Please try again';
				}
			}

			console.log('error =>', error);

			throw new Error(errorMessage);
		}
	}
	async signUp(username: string, email: string, password: string) {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);

			await updateProfile(auth.currentUser as User, {
				displayName: username
			});
			await signOut(auth);

			return userCredential;
		} catch (error) {
			return null;
		}
	}

	isAuthenticated() {
		return auth.currentUser !== null;
	}

	async signOut() {
		try {
			await signOut(auth);
		} catch (error) {}
	}
}
