import List from './list.js'
import Resource from './resource.js'
import Image from './image.js'
import Video from './video.js'
import Collection from './collection.js'
import Company from './company.js'
import Country from './country.js'
import Genre from './genre.js'
import Language from './language.js'
import PopularOpinion from './popular-opinion.js'
import Release from './release.js'
import Review from './review.js'

class Movie {
	constructor ( ) {
		// External identification.
		this.ids = { }
		this.ids.api = null
		this.ids.imdb = null

		// Basic movie information.
		this.title = null
		this.tagline = null
		this.overview = null

		// Detailed movie information.
		this.originalTitle = null
		// this.originalLanguage = null // ⚠️ see this.languages.main
		// this.releaseDate = null // ⚠️ see this.releases.main
		this.runtime = null

		// Categorical movie information.
		this.isAdult = null
		this.isVideo = null // ℹ️ note usage in readme.
		this.status = null

		// Trivial movie information.
		this.homepage = null
		this.budget = null
		this.revenue = null
		this.popularity = null

		// References to other resources.
		this.genres = new List(Genre)
		this.collections = new List(Collection)
		this.releases = new List(Release)
		this.languages = new List(Language)
		this.productionCompanies = new List(Company)
		this.productionCountries = new List(Country)

		// References to other fetchable resources.
		this.posters = new Resource(Image)
		this.backdrops = new Resource(Image)
		this.videos = new Resource(Video)
		this.reviews = new Resource(Review)

		// Popular Opinion for ratings histogram etc.
		this.ratings = new PopularOpinion( )
	}
}

export default Movie
