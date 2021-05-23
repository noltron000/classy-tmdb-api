import {Logo} from './image.js'
import Country from './country.js'


class Company {
	constructor (data) {
		this.assignDefaults( )
		if (data) {
			this.assignData(data)
		}
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		this.ids ??= { }
		this.ids.api ??= null

		this.name ??= null
		this.description ??= null
		this.homepage ??= null
		this.headquarters ??= null

		this.logo ??= null
		this.originCountry ??= null
		this.parentCompany ??= null
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({company}) {
		this.ids.api = company.id

		this.name = company.name
		this.description = company.description
		this.homepage = company.homepage
		this.headquarters = company.headquarters

		company.logo_path && (this.logo = new Logo({logo: {file_path: company.logo_path}}))
		company.origin_country && (this.originCountry = new Country({country: {'iso3166-1': company.origin_country}}))
		company.parent_company && (this.parentCompany = new Company({company: {name: company.parent_company}})) // ⚠️ VERIFY

		// Clean up class data.
		this.assignDefaults( )
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

export default Company
