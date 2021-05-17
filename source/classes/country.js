class Country {
	constructor (data) {
		this.assignDefaults( )
		if (data) {
			this.assignFromApi(data)
		}
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		this['iso3166-1'] ?? null
		this.name ??= null
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignFromApi (data) {
		this['iso3166-1'] = data.iso_3166_1
		this.name = data.name

		// Clean up class data.
		this.assignDefaults( )
	}
}

export default Country
