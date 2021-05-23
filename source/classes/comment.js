class Comment {
	constructor (data) {
		this.assignDefaults( )
		this.assignData(data)
	}
	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) { }

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({comment}) {
		// Clean up class data.
		this.assignDefaults( )
	}
}

export default Comment
