class Config {
	constructor (data = { }) {
		this.assignDefaults( )
		this.assignData(data)
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		this.images ??= { }

		this.images.baseURL ??= { }
		this.images.baseURL.default ??= null
		this.images.baseURL.secure ??= null

		this.images.backdropSizes ??= [ ]
		this.images.posterSizes ??= [ ]
		this.images.avatarSizes ??= [ ]
		this.images.logoSizes ??= [ ]
		this.images.stillSizes ??= [ ]

		this.changeKeys ??= [ ]
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({config}) {
		this.images.baseURL.default = config.images.base_url
		this.images.baseURL.secure = config.images.secure_base_url

		const cleanSize = (size) => {
			const cleaned = {
				facet: null,
				size: null,
			}
			if (size.type === 'tag') {
				cleaned.facet = size.value
			}
			else if (size.type === 'w') {
				cleaned.facet = 'width'
				cleaned.size = size.value
			}
			else if (size.type === 'h') {
				cleaned.facet = 'height'
				cleaned.size = size.value
			}
			return cleaned
		}

		this.images.backdropSizes = config.images.backdrop_sizes.map(size => cleanSize(size))
		this.images.posterSizes =     config.images.poster_sizes.map(size => cleanSize(size))
		this.images.avatarSizes =    config.images.profile_sizes.map(size => cleanSize(size))
		this.images.logoSizes =         config.images.logo_sizes.map(size => cleanSize(size))
		this.images.stillSizes =       config.images.still_sizes.map(size => cleanSize(size))

		config.changeKeys && (this.changeKeys = config.changeKeys)

		// Clean up class data.
		this.assignDefaults( )
	}
}

// 🗃️ this data should be fetched instead
const data = {
	'images': {
		'base_url': 'http://image.tmdb.org/t/p/',
		'secure_base_url': 'https://image.tmdb.org/t/p/',
		'backdrop_sizes': [
			{
				'type': 'tag',
				'value': 'original'
			},
			{
				'type': 'w',
				'value': 1280
			},
			{
				'type': 'w',
				'value': 780
			},
			{
				'type': 'w',
				'value': 300
			}
		],
		'logo_sizes': [
			{
				'type': 'tag',
				'value': 'original'
			},
			{
				'type': 'w',
				'value': 500
			},
			{
				'type': 'w',
				'value': 300
			},
			{
				'type': 'w',
				'value': 185
			},
			{
				'type': 'w',
				'value': 154
			},
			{
				'type': 'w',
				'value': 92
			},
			{
				'type': 'w',
				'value': 45
			}
		],
		'poster_sizes': [
			{
				'type': 'tag',
				'value': 'original'
			},
			{
				'type': 'w',
				'value': 780
			},
			{
				'type': 'w',
				'value': 500
			},
			{
				'type': 'w',
				'value': 342
			},
			{
				'type': 'w',
				'value': 185
			},
			{
				'type': 'w',
				'value': 154
			},
			{
				'type': 'w',
				'value': 92
			}
		],
		'profile_sizes': [
			{
				'type': 'tag',
				'value': 'original'
			},
			{
				'type': 'h',
				'value': 632
			},
			{
				'type': 'w',
				'value': 185
			},
			{
				'type': 'w',
				'value': 45
			}
		],
		'still_sizes': [
			{
				'type': 'tag',
				'value': 'original'
			},
			{
				'type': 'w',
				'value': 300
			},
			{
				'type': 'w',
				'value': 185
			},
			{
				'type': 'w',
				'value': 92
			}
		]
	},
	'change_keys': [
		'adult',
		'air_date',
		'also_known_as',
		'alternative_titles',
		'biography',
		'birthday',
		'budget',
		'cast',
		'certifications',
		'character_names',
		'created_by',
		'crew',
		'deathday',
		'episode',
		'episode_number',
		'episode_run_time',
		'freebase_id',
		'freebase_mid',
		'general',
		'genres',
		'guest_stars',
		'homepage',
		'images',
		'imdb_id',
		'languages',
		'name',
		'network',
		'origin_country',
		'original_name',
		'original_title',
		'overview',
		'parts',
		'place_of_birth',
		'plot_keywords',
		'production_code',
		'production_companies',
		'production_countries',
		'releases',
		'revenue',
		'runtime',
		'season',
		'season_number',
		'season_regular',
		'spoken_languages',
		'status',
		'tagline',
		'title',
		'translations',
		'tvdb_id',
		'tvrage_id',
		'type',
		'video',
		'videos'
	]
}

const configuration = new Config({config: data})
export default configuration
