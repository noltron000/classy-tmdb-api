import {cleanseIsoCode} from '../helpers/conversions.js'
import {Config} from './config.js'
class Country {
	#config
	constructor (data = { }) {
		let self = this  // allow forgetting of "this"
		data = {...data}  // dont mutate input data
		// If the data already has an instance of this class,
		// 	then there is no point in creating a new instance.
		// We can replace "self" instance, thus forgetting it.
		if (data.country instanceof Country) {
			self = data.country
			delete data.country
		}

		self.assignDefaults( )
		self.assignData(data)

		// override the returning of "this".
		return self
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		// this['iso3166-1'] ?? null
		// this.name ??= null
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({
		config,
		country,
	}) {

		//+ FIRST, PREPARE THE CONFIG +//
		if (config != undefined) {
		this.#config = new Config({config})
		}

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

	toJSON ( ) {
		return this
	}

	static matches (item01, item02) {
		if (!(item01 instanceof Country && item02 instanceof Country)) {
			throw new Error('Using Country.matches( ) with an invalid object')
		}

		return item01.name === item02.name
	}

	static combine (item01, item02) {
		// ⚠️ complete this function
		return item01
	}
}

export {Country}
