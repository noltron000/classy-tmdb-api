import config from '../config.js'
import PopularOpinion from './popular-opinion.js'

class Image {
	constructor (type, data) {
		this.type = type
		this.assignDefaults( )
		if (data) {
			this.assignFromApi(data)
		}
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		this.basePath ??= null
		this['iso639-1'] ??= null
		this.originalWidth ??= null
		this.originalHeight ??= null

		this.ratings ??= new PopularOpinion( )
		this.sizes ??= [ ]
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignFromApi (data) {
		this.basePath = data.file_path
		this['iso639-1'] = data.iso_639_1
		this.originalWidth = data.width
		this.originalHeight = data.height

		this.ratings.assignFromApi(data)

		const regex = /^\/https?:\/\//
		if (regex.test(this.basePath)) {
			this.sizes.push({
				facet: 'external',
				size: null,
				url: this.basePath.slice(1),
			})
		}
		else {
			this.sizes.push(
				...config
				.images[`${this.type}Sizes`]
				.map((imageSize) => {

					let url = config.images.baseURL.secure ?? config.images.baseURL.default
					if (imageSize.facet === 'original') {
						url += imageSize.facet
					}
					else {
						url += imageSize.facet.slice(0, 1)
						url += imageSize.size
					}
					url += this.basePath
					return {...imageSize, url}
				})
			)
		}

		// Clean up class data.
		this.assignDefaults( )
	}

	get aspectRatio ( ) {
		return this.originalWidth / this.originalHeight
	}

	toJSON ( ) {
		const json = Object.assign({ }, this)
		json.aspectRatio = this.aspectRatio
		return json
	}
}

class Backdrop extends Image {
	constructor (data) {
		super('backdrop', data)
	}
}

class Poster extends Image {
	constructor (data) {
		super('poster', data)
	}
}

class Avatar extends Image {
	constructor (data) {
		super('avatar', data)
	}
}

class Logo extends Image {
	constructor (data) {
		super('logo', data)
	}
}

class Still extends Image {
	constructor (data) {
		super('still', data)
	}
}

export {
	Image,
	Backdrop,
	Poster,
	Avatar,
	Logo,
	Still,
}
