import {convertToEasyDuration} from '../helpers/conversions.js'
import {List} from './list.js'
import {Poster, Backdrop} from './image.js'
import {Video} from './video.js'
import {Collection} from './collection.js'
import {Company} from './company.js'
import {Country} from './country.js'
import {Genre} from './genre.js'
import {Language} from './language.js'
import {PopularOpinion} from './popular-opinion.js'
import {Release} from './release.js'
import {Review} from './review.js'

/*
Types of Movie Data:
1. ID Only (ie. from review index)
2. Shallow (ie. from movie index)
3. Complete (ie. from movie details)
*/

class Movie {
	#config
	constructor (data = { }) {
		let self = this  // allow forgetting of "this"
		data = {...data}  // dont mutate input data
		// If the data already has an instance of this class,
		// 	then there is no point in creating a new instance.
		// We can replace "self" instance, thus forgetting it.
		if (data.movie instanceof Movie) {
			self = data.movie
			delete data.movie
		}

		self.assignDefaults( )
		self.assignData(data)

		// override the returning of "this".
		return self
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		// External identification.
		this.ids ??= { }
		// this.ids.api ??= undefined
		// this.ids.imdb ??= undefined

		// // Basic movie information.
		// this.title ??= undefined
		// this.tagline ??= undefined
		// this.overview ??= undefined

		// // Detailed movie information.
		// this.originalTitle ??= undefined
		this.runtime ??= { }

		// // Categorical movie information.
		// this.isAdult ??= undefined
		// this.isVideo ??= undefined // ℹ️ note usage in readme
		// this.status ??= undefined

		// // Trivial movie information.
		// this.homepage ??= undefined
		// this.budget ??= undefined
		// this.revenue ??= undefined
		// this.popularity ??= undefined

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

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({
		config,
		movie,
		backdrops,
		collections,
		companies,
		countries, // not expected
		genres,    // not expected
		images,    // contains backdrops and posters
		languages, // not expected
		posters,
		releases,
		reviews,
		videos,
	}) {

		//+ FIRST, PREPARE THE CONFIG +//
		if (config != undefined) {
			this.#config = new Config(data)
		}

		//+ ASSIGN MOVIE DATA +//
		if (movie != undefined) {

			// External identification.
			if (movie.id !== undefined) {
				this.ids.api = movie.id
			}

			if (movie.imdb_id !== undefined) {
				this.ids.imdb = movie.imdb_id
			}

			if (movie.title !== undefined) {
				this.title = movie.title
			}

			if (movie.tagline !== undefined) {
				this.tagline = movie.tagline
			}

			if (movie.overview !== undefined) {
				this.overview = movie.overview
			}

			// Detailed movie information.
			if (movie.original_title !== undefined) {
				if (movie.original_title !== movie.title) {
					this.originalTitle = movie.original_title
				}
				else {
					this.originalTitle = null
				}
			}

			if (movie.runtime !== undefined) {
				this.runtime = convertToEasyDuration(movie.runtime * 60)
			}

			// Categorical movie information.
			if (movie.adult !== undefined) {
				this.isAdult = movie.adult
			}

			if (movie.video !== undefined) {
				this.isVideo = movie.video
			}

			if (movie.status !== undefined) {
				this.status = movie.status
			}

			// Trivial movie information.
			if (movie.homepage !== undefined) {
				this.homepage = movie.homepage
			}

			if (movie.budget !== undefined) {
				this.budget = movie.budget
			}

			if (movie.revenue !== undefined) {
				this.revenue = movie.revenue
			}

			if (movie.popularity !== undefined) {
				this.popularity = movie.popularity
			}

			// References to other resources.
			// These have a main value found from within the movie.
			if (movie.backdrop_path !== undefined) {
				this.backdrops.setMain({backdrop: {file_path: movie.backdrop_path}})
			}

			if (movie.belongs_to_collection != undefined) {
				this.collections.setMain({collection: movie.belongs_to_collection})
			}

			if (movie.backdrop_path !== undefined) {
				this.languages.setMain({language: {iso_639_1: movie.original_language}})
			}

			if (movie.poster_path !== undefined) {
				this.posters.setMain({poster: {file_path: movie.poster_path}})
			}

			if (movie.release_date !== undefined) {
				this.releases.setMain({release: {release_date: movie.release_date}})
			}

			// Add data from movie source.
			if (movie.genres != undefined) {
				let movieGenres = movie.genres
				movieGenres = movieGenres.map((genre) => ({genre, movie: this}))
				this.genres.add(...movieGenres)
			}

			if (movie.languages != undefined) {
				let movieLanguages = movie.languages
				movieLanguages = movieLanguages.map((language) => ({language, movie: this}))
				this.languages.add(...movieLanguages)
			}

			if (movie.production_companies != undefined) {
				let movieCompanies = movie.production_companies
				movieCompanies = movieCompanies.map((company) => ({company, movie: this}))
				this.productionCompanies.add(...movieCompanies)
			}

			if (movie.production_countries != undefined) {
				let movieCountries = movie.production_countries
				movieCountries = movieCountries.map((country) => ({country, movie: this}))
				this.productionCountries.add(...movieCountries)
			}

			// Add opinions from the movie data.
			this.ratings.assignData({
				polling: {vote_count: movie.vote_count, vote_average: movie.vote_average},
			})
		}

		//+ ASSIGN BACKDROPS ARRAY +//
		if (backdrops != undefined) {
			// Prepare items to be used in the class constructor.
			backdrops = backdrops.map((backdrop) => ({backdrop, movie: this}))
			this.backdrops.add(...backdrops)
		}

		//+ ASSIGN COLLECTIONS ARRAY +//
		if (collections != undefined) {
			// Prepare items to be used in the class constructor.
			collections = collections.map((collection) => ({collection, movie: this}))
			this.collections.add(...collections)
		}

		//+ ASSIGN COMPANIES ARRAY +//
		if (companies != undefined) {
			// Prepare items to be used in the class constructor.
			companies = companies.map((company) => ({company, movie: this}))
			this.productionCompanies.add(...companies)
		}

		//+ ASSIGN POSTERS ARRAY +//
		if (posters != undefined) {
			// Prepare items to be used in the class constructor.
			posters = posters.map((poster) => ({poster, movie: this}))
			this.posters.add(...posters)
		}

		//+ ASSIGN RELEASES ARRAY +//
		if (releases != undefined) {
			// Prepare items to be used in the class constructor.
			releases = releases.results.map((isoGroup) => {
				const iso_3166_1 = isoGroup.iso_3166_1
				return isoGroup.release_dates.map((release) => ({...release, iso_3166_1}))
			}).flat( ).map((release) => ({release, movie: this}))
			this.releases.add(...releases)
		}

		//+ ASSIGN REVIEWS ARRAY +//
		if (reviews != undefined) {
			// Prepare items to be used in the class constructor.
			reviews = reviews.results.map((review) => ({review, movie: this}))
			this.reviews.add(...reviews)

			// Add opinions from the review data.
			this.ratings.assignData({reviews})
		}

		//+ ASSIGN VIDEOS ARRAY +//
		if (videos != undefined) {
			// Prepare items to be used in the class constructor.
			videos = videos.results.map((video) => ({video, movie: this}))
			this.videos.add(...videos)
		}

		// Clean up class data.
		this.assignDefaults( )
	}

	toJSON ( ) {
		return this
	}

	static matches (item01, item02) {
		if (!(item01 instanceof Movie && item02 instanceof Movie)) {
			throw new Error('Using Movie.matches( ) with an invalid object')
		}

		return item01.ids.api === item02.ids.api
	}

	static combine (item01, item02) {
		// ⚠️ complete this function
		return item01
	}
}

export {Movie}
