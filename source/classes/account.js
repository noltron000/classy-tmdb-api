class Account {
	constructor (data) {
		this.assignDefaults( )
		this.assignData(data)
	}
	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) { }

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({account}) {
		// Clean up class data.
		this.assignDefaults( )
	}
}

export default Account
