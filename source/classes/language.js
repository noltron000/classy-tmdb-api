class Language {
	constructor (data) {
		this.assignDefaults( )
		this.assignFromApi(data)
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		this['iso639-1'] ??= null
		this.name ??= null
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignFromApi (data) {
		this['iso639-1'] = data.iso_639_1
		this.name = data.name

		// Clean up class data.
		this.assignDefaults( )
	}
}

export default Language
