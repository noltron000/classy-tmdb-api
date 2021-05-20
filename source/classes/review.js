import {convertToEasyDate} from '../helpers/conversions.js'
import Movie from './movie.js'

class Review {
	constructor (data) {
		this.assignDefaults( )
		this.assignData(data)
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
	assignData ({review}) {
		this.ids.api = review.id

		this.url = review.url
		this.movie = new Movie({movie: {id: review.movie_id}})
		this['iso639-1'] = review.iso_639_1

		// this.author = new Author( )
		this.rating = review.author_details.rating
		// this.title = ???
		this.content = review.content

		this.creationDate = convertToEasyDate(new Date(Date.parse(review.created_at)))
		this.revisionDate = convertToEasyDate(new Date(Date.parse(review.updated_at)))

		// Clean up class data.
		this.assignDefaults( )
	}
}

export default Review
