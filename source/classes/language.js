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

	static matches (item01, item02) {
		if (!(item01 instanceof Language && item02 instanceof Language)) {
			throw new Error('Using Language.matches( ) with an invalid object')
		}

		return item01.ids.api === item02.ids.api
	}

	static combine (item01, item02) {
		// ⚠️ complete this function
		return item01
	}
}

export default Language
