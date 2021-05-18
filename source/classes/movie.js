import List from './list.js'
import Resource from './resource.js'
import {Poster, Backdrop} from './image.js'
import Video from './video.js'
import Collection from './collection.js'
import Company from './company.js'
import Country from './country.js'
import Genre from './genre.js'
import Language from './language.js'
import PopularOpinion from './popular-opinion.js'
import Release from './release.js'
import Review from './review.js'

/*
Types of Movie Data:
1. Shallow (ie. from movie index)
2. Complete (ie. from movie show)
*/

class Movie {
	constructor (data, source) {
		this.assignDefaults( )
		if (data && source === 'api') {
			this.assignFromApi(data)
		}
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		// External identification.
		this.ids ??= { }
		this.ids.api ??= null
		this.ids.imdb ??= null

		// Basic movie information.
		this.title ??= null
		this.tagline ??= null
		this.overview ??= null

		// Detailed movie information.
		this.originalTitle ??= null
		// this.originalLanguage ??= null // ⚠️ see this.languages.main
		// this.releaseDate ??= null // ⚠️ see this.releases.main
		this.runtime ??= null

		// Categorical movie information.
		this.isAdult ??= null
		this.isVideo ??= null // ℹ️ note usage in readme
		this.status ??= null

		// Trivial movie information.
		this.homepage ??= null
		this.budget ??= null
		this.revenue ??= null
		this.popularity ??= null

		// References to other resources.
		this.genres ??= new List(Genre)
		this.collections ??= new List(Collection)
		this.languages ??= new List(Language)
		this.productionCompanies ??= new List(Company)
		this.productionCountries ??= new List(Country)

		// References to other fetchable resources.
		this.posters ??= new Resource(Poster)
		this.backdrops ??= new Resource(Backdrop)
		this.videos ??= new Resource(Video)
		this.reviews ??= new Resource(Review)
		this.releases ??= new Resource(Release)

		// Popular Opinion for ratings histogram etc.
		this.ratings ??= new PopularOpinion( )
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignFromApi (data) {
		// External identification.
		this.ids.api = data.id
		this.ids.imdb = data.imdb_id

		this.title = data.title
		this.tagline = data.tagline
		this.overview = data.overview

		// Detailed movie information.
		if (data.title !== data.original_title) {
			this.originalTitle = data.original_title
		}
		// this.originalLanguage // ⚠️ see this.languages.main
		// this.releaseDate // ⚠️ see this.releases.main
		// this.runtime = null // ⚠️ convert input to date-time string

		// Categorical movie information.
		this.isAdult = data.adult
		this.isVideo = data.video
		this.status = data.status

		// Trivial movie information.
		this.homepage = data.homepage
		this.budget = data.budget
		this.revenue = data.revenue
		this.popularity = data.popularity

		// References to other resources.
		data.genres && this.genres.add(...data.genres)
		data.belongs_to_collection && this.collections.add(data.belongs_to_collection)
		data.spoken_languages && this.languages.add(...data.spoken_languages)
		data.production_companies && this.productionCompanies.add(...data.production_companies)
		data.production_countries && this.productionCountries.add(...data.production_countries)

		// References to other fetchable resources.
		data.poster_path && this.posters.addMain(data.poster_path)
		data.backdrop_path && this.backdrops.addMain(data.backdrop_path)
		// this.videos ??= new Resource(Video) // ⚠️ requires another fetch
		// this.reviews ??= new Resource(Review) // ⚠️ requires another fetch
		// this.releases.add(data.release_date) // ⚠️ requires another fetch

		// Popular Opinion for ratings histogram etc.
		data.vote_count && data.vote_average && this.ratings.assignFromApi(data)

		this.assignDefaults( )
	}
}

export default Movie
