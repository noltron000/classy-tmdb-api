import {Logo} from './image.js'
import {Country} from './country.js'


class Company {
	#config
	constructor (data = { }) {
		let self = this  // allow forgetting of "this"
		data = {...data}  // dont mutate input data
		// If the data already has an instance of this class,
		// 	then there is no point in creating a new instance.
		// We can replace "self" instance, thus forgetting it.
		if (data.company instanceof Company) {
			self = data.company
			delete data.company
		}

		self.assignDefaults( )
		self.assignData(data)

		// override the returning of "this".
		return self
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		this.ids ??= { }
		// this.ids.api ??= null

		// this.name ??= null
		// this.description ??= null
		// this.homepage ??= null
		// this.headquarters ??= null

		// this.logo ??= null
		// this.originCountry ??= null
		// this.parentCompany ??= null
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({company}) {

		//+ ASSIGN COMPANY DATA +//
		if (company != undefined) {

			// External identification.
			if (company.id !== undefined) {
				this.ids.api = company.id
			}

			// Basic information.
			if (company.name !== undefined) {
				this.name = company.name
			}

			if (company.description !== undefined) {
				this.description = company.description
			}

			if (company.homepage !== undefined) {
				this.homepage = company.homepage
			}

			if (company.headquarters !== undefined) {
				this.headquarters = company.headquarters
			}

			// Other resources.
			if (company.logo_path !== undefined) {
				this.logo = new Logo({logo: {file_path: company.logo_path}})
			}
			if (company.origin_country !== undefined) {
				this.originCountry = new Country({country: {'iso_3166_1': company.origin_country}})
			}
			if (company.parent_company !== undefined) {
				this.parentCompany = new Company({company: {name: company.parent_company}})
			}
		}

		// Clean up class data.
		this.assignDefaults( )
	}

	toJSON ( ) {
		return this
	}

	static matches (item01, item02) {
		if (!(item01 instanceof Company && item02 instanceof Company)) {
			throw new Error('Using Company.matches( ) with an invalid object')
		}

		return item01.ids.api === item02.ids.api
	}

	static combine (item01, item02) {
		// ⚠️ complete this function
		return item01
	}
}

export {Company}
