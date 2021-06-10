import {Config} from './config.mjs'

class Genre {
	#config
	constructor (data = { }) {
		let self = this  // allow forgetting of "this"
		data = {...data}  // dont mutate input data
		// If the data already has an instance of this class,
		// 	then there is no point in creating a new instance.
		// We can replace "self" instance, thus forgetting it.
		if (data.genre instanceof Genre) {
			self = data.genre
			delete data.genre
		}

		self.assignDefaults( )
		self.assignData(data)

		// override the returning of "this".
		return self
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		// External identification.
		this.ids ??= { }
		// this.ids.api ??= null

		// // Genre name.
		// this.name ??= null
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({
		config,
		genre,
	}) {
		//+ FIRST, PREPARE THE CONFIG +//
		if (config != undefined) {
			this.#config = new Config({...this.#shared, config})
		}

		//+ ASSIGN GENRE DATA +//
		if (genre != undefined) {

			// There is only a name and api-id.
			if (genre.id !== undefined) {
				this.ids.api = genre.id
			}

			// Genre name.
			if (genre.name !== undefined) {
				this.name = genre.name
			}
		}

		// Clean up class data.
		this.assignDefaults( )
	}

	toJSON ( ) {
		return this
	}

	get #shared ( ) {
		return {
			genre: this,
			config: this.#config,
		}
	}

	static matches (item01, item02) {
		if (!(item01 instanceof Genre && item02 instanceof Genre)) {
			return false
		}

		return item01.ids.api === item02.ids.api
	}

	static combine (item01, item02) {
		// ⚠️ complete this function
		return item01
	}
}

export {Genre}
