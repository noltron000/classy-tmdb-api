class Country {
	constructor (data) {
		this.assignDefaults( )
		if (data) {
			this.assignData(data)
		}
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		this['iso3166-1'] ?? null
		this.name ??= null
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({country}) {
		this['iso3166-1'] = country.iso_3166_1
		this.name = country.name

		// Clean up class data.
		this.assignDefaults( )
	}
}

export default Country
