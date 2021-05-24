import {Avatar} from './image.js'

class User {
	constructor (data = { }) {
		this.assignDefaults( )
		this.assignData(data)
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		this.ids ??= { }
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({user}) {
		if (user != undefined) {
			console.log(user)
			if (user.id !== undefined) {
				this.ids.api = user.id
			}
			if (user.name !== undefined) {
				this.name = user.name || undefined
			}
			if (user.username !== undefined) {
				this.username = user.username || undefined
			}
			if (user.avatar_path !== undefined) {
				this.avatar = new Avatar({avatar: {file_path: user.avatar_path}})
			}
			else if (user.avatar?.gravatar?.hash !== undefined) {
				this.avatar = new Avatar({avatar: {file_path: `https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}`}})
			}
			else {
				this.avatar = new Avatar({avatar: {file_path: 'https://secure.gravatar.com/avatar/'}})
			}
		}

		// Clean up class data.
		this.assignDefaults( )
	}
}

export {User}
