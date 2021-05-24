import config from '../config.js'
import {cleanseIsoCode} from '../helpers/conversions.js'
import {PopularOpinion} from './popular-opinion.js'

class Image {
	constructor (type, data = { }) {
		this.type = type
		this.assignDefaults( )
		this.assignData(data)
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		// // Image Properties
		// this.basePath ??= null
		// this['iso639-1'] ??= null
		// this.originalWidth ??= null
		// this.originalHeight ??= null

		this.ratings ??= new PopularOpinion( )
		this.sizes ??= [ ]
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({
		image,
		movie,
	}) {

		//+ ASSIGN IMAGE DATA +//
		if (image != undefined) {

			// Image properties.
			if (image.height != undefined) {
				this.originalHeight = image.height
			}

			if (image.width != undefined) {
				this.originalWidth = image.width
			}

			if (image.iso_639_1 != undefined) {
				this['iso639-1'] = cleanseIsoCode(image.iso_639_1)
			}

			// URL construction and image identification.
			if (image.file_path != undefined) {
				this.basePath = image.file_path

				const regex = /^\/?https?:\/\//
				if (regex.test(this.basePath)) {
					this.sizes.push({
						facet: 'external',
						size: null,
						url: this.basePath.replace(regex, 'https://'),
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
			}

			// Add opinions from the image data.
			this.ratings.assignData({
				data: {vote_count: image.vote_count, vote_average: image.vote_average},
			})
		}

		// Clean up class data.
		this.assignDefaults( )
	}

	toJSON ( ) {
		const json = Object.assign({ }, this)
		json.aspectRatio = this.aspectRatio
		return json
	}

	get aspectRatio ( ) {
		return this.originalWidth / this.originalHeight
	}

	static matches (item01, item02) {
		if (!(item01 instanceof Image && item02 instanceof Image)) {
			throw new Error('Using Image.matches( ) with an invalid object')
		}

		return item01.basePath === item02.basePath
	}

	static combine (item01, item02) {
		// ⚠️ complete this function
		return item01
	}
}

class Backdrop extends Image {
	constructor ({backdrop}) {
		super('backdrop', {image: backdrop})
	}
}

class Poster extends Image {
	constructor ({poster}) {
		super('poster', {image: poster})
	}
}

class Avatar extends Image {
	constructor ({avatar}) {
		super('avatar', {image: avatar})
	}
}

class Logo extends Image {
	constructor ({logo}) {
		super('logo', {image: logo})
	}
}

class Still extends Image {
	constructor ({still}) {
		super('still', {image: still})
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
