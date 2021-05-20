class Collection {
	constructor ({
		data,
		backdrops,
		posters,
	}) {
		this.assignDefaults( )
		if (data) {
			this.assignFromApi({
				data,
				backdrops,
				posters,
			})
		}
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		this.ids ??= { }
		this.ids.api ??= null

		this.name ??= null
		this.overview ??= null

		this.posters ??= new List(Poster)
		this.backdrops ??= new List(Backdrop)

		this.parts ??= new List(Movie)
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignFromApi ({
		data,
		backdrops,
		posters,
	}) {
		this.ids.api = data.id

		this.name = data.name
		this.overview = data.overview

		this.posters.setMain({file_path: data.poster_path})
		this.backdrops.setMain({file_path: data.backdrop_path})

		this.posters.add(...posters ?? [ ])
		this.backdrops.add(...backdrops ?? [ ])
		this.parts.add(...data.parts ?? [ ])

		// Clean up class data.
		this.assignDefaults( )
	}
}

export default Collection


		// "id": 729322,
		// "name": "Gabriel's Inferno Collection",
		// "poster_path": "/LdSn17U6ybhtPJT3S6fTNRni5Y.jpg",
		// "backdrop_path": "/hXF55codODfnzTZDExbUbfFmA9y.jpg"
