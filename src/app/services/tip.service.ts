import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, docData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { User } from "../interfaces/user"
import { Order } from '../interfaces/order';
import { DatePipe } from '@angular/common';

export interface SearchOptions {
	searchBy?: (keyof Order)[];
}
@Injectable({
	providedIn: 'root'
})
export class TipService {
	pipe = new DatePipe('en-US');
	auth: boolean = false
	userId: any;
	error: string = ''
	miSubject = new BehaviorSubject<any>('')
	isAuthenticated$ = new BehaviorSubject<any>(false)
	constructor(private firestore: Firestore, private router: Router) {
		this.getOrders().subscribe((data: any) => {
			this.miSubject.next(data.orders)
		})
	}
	signUp(user: User) {
		const orderRef = collection(this.firestore, 'users')
		user.orders = []
		return addDoc(orderRef, user)
	}
	isAuthenticated() {
		const isUserAuthenticated = window.localStorage.getItem('auth')
		
		return isUserAuthenticated ? isUserAuthenticated.length > 0 : this.auth
	}
	public getAuthenticationObservable(): any{
		const isUserAuthenticated = window.localStorage.getItem('auth')
		this.isAuthenticated$.next(isUserAuthenticated ? isUserAuthenticated.length > 0 : this.auth)
		return this.isAuthenticated$;
	}
	async signIn(user: User) {
		await this.getUser(user)
		!this.auth ? this.error = 'El email o la contraseña es incorrecta' : ''
		return this.error
	}
	async getUser(user: User) {
		const data: any = await firstValueFrom(this.getUsers())
		const { email, password } = user
		data?.forEach((element: any) => {
			if (element.email == email && element.password == password) {
				this.auth = true
				this.userId = element.id
				window.localStorage.setItem('auth', element.id)
				window.localStorage.setItem('email', element.email)
				window.localStorage.setItem('username', element.username)
				this.isAuthenticated$.next(true)
				this.router.navigate(['/']);
				return element
			} else {
				this.auth = false
			}
		});
	}
	getUsers(): Observable<User[]> {
		const ref = collection(this.firestore, 'users')
		return collectionData(ref, { idField: 'id' }) as Observable<any>
	}
	getUserById(id: string) {
		const ref = doc(this.firestore, `users/${id}`);
		return docData(ref, { idField: 'id' })
	}
	getOrders() {
		const ref = doc(this.firestore, `users/${window.localStorage.getItem('auth')}`);
		return docData(ref, { idField: 'id' })
	}
	async addOrder(order: Order) {
		const orderRef = doc(this.firestore, `users/${this.userId || window.localStorage.getItem('auth')}`)
		const id: any = this.userId || window.localStorage.getItem('auth')
		const user = await firstValueFrom(this.getUserById(id))
		let newOrder = user
		order.date = this.pipe.transform(Date.now(), 'M/d/yy, h:mm a')
		newOrder?.orders?.push(order)
		return updateDoc(orderRef, { ...newOrder })
	}
	async update(id: any, order: Order) {
		const userRef = doc(this.firestore, `users/${id}`);
		const user = await firstValueFrom(this.getUserById(id))
		console.log(user)
		console.log(order)
		user.orders.forEach((data: Order) => {
			if (order.date === data.date) {
				data.orderNumber = order.orderNumber
				data.address = order.address
				data.amount = order.amount
				data.paymentMethod = order.paymentMethod
				data.tip = order.tip
			}
		})
		return await updateDoc(userRef, { ...user });
	}
	async deleteOrder(order: any) {
		const id = window.localStorage.getItem('auth')
		const userRef = doc(this.firestore, `users/${id}`);
		const user: any = await firstValueFrom(this.getOrders())
		const orders = user.orders.filter((data: any) => {
			return data.orderNumber !== order.orderNumber
		})
		user.orders = orders
		await updateDoc(userRef, { ...user });
	}
	async search(query: any, data: any, options?: SearchOptions) {
		if (query == '') {
			const { orders } = await firstValueFrom(this.getOrders())
			this.miSubject.next(orders)
			return { data: orders, message: "" };
		}
		const { searchBy = Object.keys(data[0]) } = options ?? {};
		const newData = data.filter((item: any) => {
			return searchBy.some((prop) => {
				const value = item[prop];
				return value && value.toString().toLowerCase().includes(query.toLowerCase());
			});
		});
		const message = newData.length > 0 ? "" : "No se encontraron datos que coincidan con la búsqueda";
		if (message != '') {
			this.miSubject.next(newData)
		}
		return { data: newData, message: message };
	}
}
