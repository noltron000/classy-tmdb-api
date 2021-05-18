import {Logo} from './image.js'
import Country from './country.js'


class Company {
	constructor (data) {
		this.assignDefaults( )
		if (data) {
			this.assignFromApi(data)
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

		this.logo ??= new Logo( )
		this.originCountry ??= new Country( )
		this.parentCompany ??= null
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignFromApi (data) {
		this.ids.api = data.id

		this.name = data.name
		this.description = data.description
		this.homepage = data.homepage
		this.headquarters = data.headquarters

		data.logo_path && this.logo.assignFromApi(data.logo_path)
		data.origin_country && (this.originCountry.assignFromApi(data.origin_country))
		data.parent_company && (this.parentCompany = new Company(data.parent_company))

		// Clean up class data.
		this.assignDefaults( )
	}
}

export default Company
