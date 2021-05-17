import List from './list.js'

class Resource extends List {
	constructor (ItemType, data, ...entries) {
		super(ItemType, ...entries)

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
		this.add(...data.results)
		data.page && this.pages.push(data.page)

		this.pageLength = data.results.length
		this.totalPages = data.total_pages
		this.totalResults = data.total_results

		// Clean up class data.
		this.assignDefaults( )
	}

	add (...values) {
		this.push(...values.map((value) => (
			new this.ItemType(value)
		)))
	}
}

export default Resource
