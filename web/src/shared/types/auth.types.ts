export interface IGetUser {
	getLoggedInUser: GetLoggedInUser
}

interface GetLoggedInUser {
	user: User
	accessToken: string
	refreshToken: string
}

export interface User {
	id: string
	name: string
	email: string
	password: string
	role: string
}
