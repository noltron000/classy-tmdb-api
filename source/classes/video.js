class Video {
	constructor (data) {
		this.assignDefaults( )
		this.assignData(data)
	}
	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		this.ids ??= { }
		this.ids.api ??= null
		this['iso639-1'] ??= null
		this['iso3166-1'] ??= null
		this.key ??= null
		this.name ??= null
		this.site ??= null
		this.size ??= null
		this.type ??= null
		this.url ??= null
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignData (data) {
		this.ids.api ??= data.id
		this['iso639-1'] ??= data['iso639-1']
		this['iso3166-1'] ??= data['iso3166-1']
		this.key ??= data.key
		this.name ??= data.name
		this.site ??= data.site
		this.size ??= data.size
		this.type ??= data.type
		this.url ??= data.url

		// Clean up class data.
		this.assignDefaults( )
	}
}

export default Video
