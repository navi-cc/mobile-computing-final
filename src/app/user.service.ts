import { Service } from '@angular/core';
import { auth } from './firebase';

@Service()
export class UserService {
	getUserName() {
		return auth.currentUser?.displayName;
	}

	getUserEmail() {
		return auth.currentUser?.email;
	}
}
