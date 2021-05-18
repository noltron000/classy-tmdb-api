class Rating {
	constructor (data) {
		this.assignDefaults( )
		this.assignFromApi(data)
	}
	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) { }

	/* STEP 2: CLEAN INPUT DATA */
	assignFromApi (data) {
		// Clean up class data.
		this.assignDefaults( )
	}
}

export default Rating
