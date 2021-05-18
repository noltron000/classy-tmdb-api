import List from './list.js'

class Resource extends List {
	constructor (ItemType, data) {
		super(ItemType)

		this.assignDefaults( )
		if (data) {
			this.assignFromApi(data)
		}
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		this.main ??= null
		this.pages ??= [ ]

		this.pageLength ??= null
		this.totalPages ??= null
		this.totalResults ??= null
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignFromApi (data) {
		if (data.page && !(data.page in this.pages)) {
			this.values.add(...data.results)
			this.pages.push(data.page)

			this.pageLength = data.results.length
			this.totalPages = data.total_pages
			this.totalResults = data.total_results
		}

		// Clean up class data.
		this.assignDefaults( )
	}

	addMain (value) {
		console.log(value)
		this.main = new this.ItemType(value)
	}
}

export default Resource
