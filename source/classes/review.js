import {convertToEasyDuration} from '../helpers/conversions.js'
import Movie from './movie.js'

class Review {
	constructor (data) {
		this.assignDefaults( )
		this.assignFromApi(data)
	}
	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		this.ids ??= { }
		this.ids.api ??= null

		this.url ??= null
		this.movie ??= null
		this['iso639-1'] ??= null

		this.author ??= null
		this.rating ??= null
		this.title ??= null
		this.content ??= null

		this.creationDate ??= null
		this.revisionDate ??= null
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignFromApi (data) {
		this.ids.api = data.id

		this.url = data.url
		this.movie = new Movie({id: data.movie_id})
		this['iso639-1'] = data.iso_639_1

		// this.author = new Author( )
		this.rating = data.author_details.rating
		// this.title = ???
		this.content = data.content

		this.creationDate = convertToEasyDate(new Date(Date.parse(data.created_at)))
		this.revisionDate = convertToEasyDate(new Date(Date.parse(data.updated_at)))

		// Clean up class data.
		this.assignDefaults( )
	}
}

export default Review
