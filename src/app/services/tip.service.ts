import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, docData } from '@angular/fire/firestore';
import { Observable, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { User } from "../interfaces/user"
import { Order } from '../interfaces/order';
import { DatePipe } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class TipService {
    pipe = new DatePipe('en-US');
	auth: boolean = false
	constructor(private firestore: Firestore, private router: Router) { }
	signUp(user: User) {
		const orderRef = collection(this.firestore, 'users')
		user.orders = []
		return addDoc(orderRef, user)
	}
	signIn(user: User) {
		this.getUser(user)
		this.router.navigate(['/']);
	}
	getUser(user: User) {
		this.getOrders().subscribe((data) => {
			const { email, password } = user
			data.forEach((element: any) => {
				if (element.email == email && element.password == password) {
					this.auth = true
					window.localStorage.setItem('auth', element.id)
					return element
				}
			});
		})
	}
	getUserById(id: string) {
		console.log('getUserById')
		const ref = doc(this.firestore, `users/${id}`);
		return docData(ref, { idField: 'id' })
	}
	getOrders(): Observable<User[]> {
		const ref = collection(this.firestore, 'users')
		return collectionData(ref, { idField: 'id' }) as Observable<any>
	}
	async addOrder(order: Order) {
		const orderRef = doc(this.firestore, `users/${window.localStorage.getItem('auth')}`)
		const id: any = window.localStorage.getItem('auth')
		const user = await firstValueFrom(this.getUserById(id))
		let newOrder = user
		order.date = this.pipe.transform(Date.now(), 'M/d/yy, h:mm a')
		newOrder?.orders?.push(order)
		return updateDoc(orderRef, {...newOrder})
	}
	update(user: any) {
		const userRef = doc(this.firestore, `users/${user.id}`);
		return updateDoc(userRef, { ...user });
	}
	async deleteOrder(order: any) {
		const id =  window.localStorage.getItem('auth')
		const userRef = doc(this.firestore, `users/${id}`);
		console.log('delete')
		const users: any = await firstValueFrom(this.getOrders())
		const orders = users[0].orders.filter((data: any) => {
			return data.orderNumber !== order.orderNumber
		})
		users[0].orders = orders
		return updateDoc(userRef, { ...users[0] });

	}
}
