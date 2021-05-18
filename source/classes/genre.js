class Genre {
	constructor (data) {
		this.assignDefaults( )
		if (data) {
			this.assignFromApi(data)
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
	assignFromApi (data) {
		// External identification.
		this.ids.api = data.id

		// Genre name.
		this.name = data.name

		// Clean up class data.
		this.assignDefaults( )
	}
}

export default Genre
