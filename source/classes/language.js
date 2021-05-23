import {cleanseIsoCode} from '../helpers/conversions.js'

class Language {
	constructor (data = { }) {
		this.assignDefaults( )
		this.assignData(data)
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		// this['iso639-1'] ??= null
		// this.name ??= null
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({language}) {

		//+ ASSIGN LANGUAGE DATA +//
		if (language != undefined) {
			if (language.iso_639_1 !== undefined) {
				this['iso639-1'] = cleanseIsoCode(language.iso_639_1) || undefined
			}
			if (language.name !== undefined) {
				this.name = language.name
			}
		}

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
