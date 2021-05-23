class Genre {
	constructor (data = { }) {
		this.assignDefaults( )
		this.assignData(data)
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
	assignData ({genre}) {
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

	static matches (item01, item02) {
		if (!(item01 instanceof Genre && item02 instanceof Genre)) {
			throw new Error('Using Genre.matches( ) with an invalid object')
		}

		return item01.ids.api === item02.ids.api
	}

	static combine (item01, item02) {
		// ⚠️ complete this function
		return item01
	}
}

export default Genre
