import {
	convertToEasyDate,
	cleanseIso6391,
} from '../helpers/conversions.js'

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
		this['iso639-1'] = cleanseIso6391(review.iso_639_1)

		// this.author = new Author( )
		this.rating = review.author_details.rating
		// this.title = ???
		this.content = review.content

		this.creationDate = convertToEasyDate(new Date(Date.parse(review.created_at)))
		this.revisionDate = convertToEasyDate(new Date(Date.parse(review.updated_at)))

		// Clean up class data.
		this.assignDefaults( )
	}

	static matches (item01, item02) {
		if (!(item01 instanceof Review && item02 instanceof Review)) {
			throw new Error('Using Review.matches( ) with an invalid object')
		}

		return item01.ids.api === item02.ids.api
	}

	static combine (item01, item02) {
		// ⚠️ complete this function
		return item01
	}
}

export default Review
