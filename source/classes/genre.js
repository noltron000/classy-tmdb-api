class Genre {
	constructor (data) {
		this.assignDefaults( )
		if (data) {
			this.assignData(data)
		}
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		// External identification.
		this.ids ??= { }
		this.ids.api ??= null

		// Genre name.
		this.name ??= null
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({genre}) {
		// External identification.
		this.ids.api = genre.id

		// Genre name.
		this.name = genre.name

		// Clean up class data.
		this.assignDefaults( )
	}
}

export default Genre
