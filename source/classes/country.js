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

	static matches (item01, item02) {
		if (!(item01 instanceof Country && item02 instanceof Country)) {
			throw new Error('Using Country.matches( ) with an invalid object')
		}

		return item01.ids.api === item02.ids.api
	}

	static combine (item01, item02) {
		// ⚠️ complete this function
		return item01
	}
}

export default Country
