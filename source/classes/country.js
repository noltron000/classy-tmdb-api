import {cleanseIsoCode} from '../helpers/conversions.js'

class Country {
	constructor (data = { }) {
		this.assignDefaults( )
		this.assignData(data)
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		// this['iso3166-1'] ?? null
		// this.name ??= null
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({country}) {

		//+ ASSIGN COUNTRY DATA +//
		if (country != undefined) {

			// There is only a name and country-code.
			if (country.iso_3166_1 !== undefined) {
				this['iso3166-1'] = cleanseIsoCode(country.iso_3166_1)
			}

			if (country.name !== undefined) {
				this.name = country.name
			}
		}

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

export {Country}
