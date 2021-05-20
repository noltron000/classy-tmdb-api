import {convertToEasyDate} from '../helpers/conversions.js'

class Release {
	constructor ({
		data,
		date,
	}) {
		this.assignDefaults( )
		this.assignFromApi({
			data,
			date,
		})
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		this.certification ??= null
		this['iso3166-1'] ??= null
		this['iso639-1']  ??= null
		this.releaseDate ??= null
		this.type ??= null
		this.note ??= null
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignFromApi ({
		data = { },
		date,
	}) {
		this.certification = data.certification
		this['iso3166-1'] = data['iso3166-1']
		this['iso639-1']  = data['iso639-1']
		this.releaseDate = convertToEasyDate(new Date(Date.parse(date ?? data.release_date)))
		this.type = data.type
		this.note = data.note

		// Clean up class data.
		this.assignDefaults( )
	}
}

export default Release
