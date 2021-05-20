class Language {
	constructor (data) {
		this.assignDefaults( )
		if (data) {
			this.assignData(data)
		}
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		this['iso639-1'] ??= null
		this.name ??= null
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({language}) {
		this['iso639-1'] = language.iso_639_1
		this.name = language.name

		// Clean up class data.
		this.assignDefaults( )
	}
}

export default Language
