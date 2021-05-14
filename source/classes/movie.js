class List { }
class Resource { }
class Image { }
class Video { }
class Collection { }
class Company { }
class Country { }
class Genre { }
class Language { }
class Release { }
class Review { }
class PopularOpinion { }

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
