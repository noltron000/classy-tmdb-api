import List from './list.js'
import {Poster, Backdrop} from './image.js'
import Movie from './movie.js'

class Collection {
	constructor (data) {
		this.assignDefaults( )
		if (data) {
			this.assignData(data)
		}
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		this.ids ??= { }
		// this.ids.api ??= null

		// this.name ??= null
		// this.overview ??= null

		this.posters ??= new List(Poster)
		this.backdrops ??= new List(Backdrop)

		this.parts ??= new List(Movie)
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({
		collection,
		backdrops,
		posters,
	}) {
		//+ ADD COLLECTION DATA +//
		if (collection != undefined) {

			// Set external references.
			if (collection.id !== undefined) {
				this.ids.api = collection.id
			}

			// Add basic information.
			if (collection.name !== undefined) {
				this.name = collection.name
			}

			if (collection.overview !== undefined) {
				this.overview = collection.overview
			}

			// Set primary items.
			if (collection.poster_path !== undefined) {
				this.posters.setMain({poster: {file_path: collection.poster_path}})
			}

			if (collection.backdrop_path !== undefined) {
				this.backdrops.setMain({backdrop: {file_path: collection.backdrop_path}})
			}

			// Spread out the parts.
			if (collection.parts != undefined) {
				let collectionParts = collection.parts
				collectionParts = collectionParts.map((part) => ({movie: part}))
				this.parts.add(...collectionParts)
			}
		}

		//+ ASSIGN BACKDROPS ARRAY +//
		if (backdrops != undefined) {
			// Prepare items to be used in the class constructor.
			backdrops = backdrops.map((backdrop) => ({backdrop}))
			this.backdrops.add(...backdrops)
		}
		//+ ASSIGN POSTERS ARRAY +//
		if (posters != undefined) {
			// Prepare items to be used in the class constructor.
			posters = posters.map((poster) => ({poster}))
			this.posters.add(...posters)
		}

		// Clean up class data.
		this.assignDefaults( )
	}

	static matches (item01, item02) {
		if (!(item01 instanceof Collection && item02 instanceof Collection)) {
			throw new Error('Using Collection.matches( ) with an invalid object')
		}

		return item01.ids.api === item02.ids.api
	}

	static combine (item01, item02) {
		// ⚠️ complete this function
		return item01
	}
}

export default Collection


		// "id": 729322,
		// "name": "Gabriel's Inferno Collection",
		// "poster_path": "/LdSn17U6ybhtPJT3S6fTNRni5Y.jpg",
		// "backdrop_path": "/hXF55codODfnzTZDExbUbfFmA9y.jpg"
