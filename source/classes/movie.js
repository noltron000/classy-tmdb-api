import {convertToEasyDuration} from '../helpers/conversions.js'
import List from './list.js'
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
	constructor ({
		movie,
		backdrops,
		collections,
		companies,
		posters,
		releases,
		reviews,
		videos,
	}) {
		this.assignDefaults( )
		if (movie) {
			this.assignFromApi({
				movie,
				backdrops,
				collections,
				companies,
				posters,
				releases,
				reviews,
				videos,
			})
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
		this.backdrops ??= new List(Backdrop)
		this.languages ??= new List(Language)
		this.posters ??= new List(Poster)
		this.releases ??= new List(Release)

		this.genres ??= new List(Genre)
		this.productionCountries ??= new List(Country)

		this.collections ??= new List(Collection)
		this.productionCompanies ??= new List(Company)

		this.reviews ??= new List(Review)
		this.videos ??= new List(Video)

		// Popular Opinion for ratings histogram etc.
		this.ratings ??= new PopularOpinion( )
	}

	/* STEP 2: CLEAN INPUT movie */
	assignFromApi ({
		movie,
		backdrops,
		collections,
		companies,
		posters,
		releases,
		reviews,
		videos,
	}) {
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
		this.runtime = convertToEasyDuration(movie.runtime * 60)

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
		// These have a main value found from the movie.
		this.backdrops.setMain({file_path: movie.backdrop_path})
		this.languages.setMain({iso_639_1: movie.original_language})
		this.posters.setMain({file_path: movie.poster_path})
		this.releases.setMain({date: movie.release_date})

		// Add data from movie source.
		this.genres.add(...movie.genres ?? [ ])
		this.languages.add(...movie.spoken_languages ?? [ ])
		this.productionCountries.add(...movie.production_countries ?? [ ])

		// These are enhanced via a secondary request.
		this.collections.add(...collections ?? movie.belongs_to_collection ?? [ ])
		this.productionCompanies.add(...companies ?? movie.production_companies ?? [ ])

		// These are only accessible via a secondary request.
		this.backdrops.add(...backdrops ?? [ ])
		this.posters.add(...posters ?? [ ])
		this.releases.add(...releases ?? [ ])
		this.reviews.add(...reviews ?? [ ])   // ⚠️ TODO: improve class
		this.videos.add(...videos ?? [ ])     // ⚠️ TODO: improve class

		// Popular Opinion for ratings histogram etc.
		this.ratings.assignFromApi({movie})

		// Clean up class data.
		this.assignDefaults( )
	}
}

export default Movie
