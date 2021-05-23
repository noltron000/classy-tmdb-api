import {cleanseIso6391} from '../helpers/conversions.js'

import config from '../config.js'
import PopularOpinion from './popular-opinion.js'

class Image {
	constructor (type, data) {
		this.type = type
		this.assignDefaults( )
		if (data) {
			this.assignData(data)
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
	assignData ({image}) {
		this.basePath = image.file_path
		this['iso639-1'] = cleanseIso6391(image.iso_639_1)
		this.originalWidth = image.width
		this.originalHeight = image.height

		this.ratings.assignData({data: image})

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
