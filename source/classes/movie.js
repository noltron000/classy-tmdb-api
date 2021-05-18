import {convertToEasyDuration} from '../helpers/conversions.js'
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
	constructor ({movie}) {
		this.assignDefaults( )
		if (movie) {
			this.assignFromApi({movie})
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

	/* STEP 2: CLEAN INPUT movie */
	assignFromApi ({movie}) {
		// External identification.
		this.ids.api = movie.id
		this.ids.imdb = movie.imdb_id

		this.title = movie.title
		this.tagline = movie.tagline
		this.overview = movie.overview

		// Detailed movie information.
		if (movie.title !== movie.original_title) {
			this.originalTitle = movie.original_title
		}
		// this.originalLanguage // ⚠️ see this.languages.main
		// this.releaseDate // ⚠️ see this.releases.main
		this.runtime = convertToEasyDuration(movie.runtime)

		// Categorical movie information.
		this.isAdult = movie.adult
		this.isVideo = movie.video
		this.status = movie.status

		// Trivial movie information.
		this.homepage = movie.homepage
		this.budget = movie.budget
		this.revenue = movie.revenue
		this.popularity = movie.popularity

		// References to other resources.
		movie.genres && this.genres.add(...movie.genres)
		movie.belongs_to_collection && this.collections.add(movie.belongs_to_collection)
		movie.spoken_languages && this.languages.add(...movie.spoken_languages)
		movie.production_companies && this.productionCompanies.add(...movie.production_companies)
		movie.production_countries && this.productionCountries.add(...movie.production_countries)

		// References to other fetchable resources.
		movie.poster_path && this.posters.addMain(movie.poster_path)
		movie.backdrop_path && this.backdrops.addMain(movie.backdrop_path)
		// this.videos ??= new Resource(Video) // ⚠️ requires another fetch
		// this.reviews ??= new Resource(Review) // ⚠️ requires another fetch
		// this.releases.add(movie.release_date) // ⚠️ requires another fetch

		// Popular Opinion for ratings histogram etc.
		movie.vote_count && movie.vote_average && this.ratings.assignFromApi(movie)

		this.assignDefaults( )
	}
}

export default Movie
