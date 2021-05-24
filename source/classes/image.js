import {Config} from './config.js'
import {cleanseIsoCode} from '../helpers/conversions.js'
import {PopularOpinion} from './popular-opinion.js'

class Image {
	#config
	constructor (data = { }) {
		let self = this  // allow forgetting of "this"
		data = {...data}  // dont mutate input data
		// If the data already has an instance of this class,
		// 	then there is no point in creating a new instance.
		// We can replace "self" instance, thus forgetting it.
		if (data.image instanceof Image && type === data.image.type) {
			self = data.image
			delete data.image
		}

		self.assignDefaults( )
		self.assignData(data)

		// override the returning of "this".
		return self
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
		config,
		image,
		movie,
	}) {

		//+ FIRST, PREPARE THE CONFIG +//
		if (config != undefined) {
			this.#config = new Config(data)
		}

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
						urls: {main: this.basePath.replace(regex, 'https://')},
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
							return {...imageSize, urls: {main: url}}
						})
					)
				}
			}

			// Special case for thumbnails.
			if (image.key != undefined && this.type === 'thumbnail') {
				this.basePath = `https://img.youtube.com/vi/${image.key}`
				const sizes = [
					{
						urls: {main: `${this.basePath}/hqdefault.jpg`},
						facet: 'width',
						size: 480,
					},
					{
						urls: {main: `${this.basePath}/mqdefault.jpg`},
						facet: 'width',
						size: 320,
					},
					{
						urls: {main: `${this.basePath}/default.jpg`},
						facet: 'width',
						size: 120,
					},
				]
				this.sizes.push(...sizes)
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

class Thumbnail extends Image {
	constructor ({thumbnail}) {
		super('thumbnail', {image: thumbnail})
	}
}

export {
	Image,
	Backdrop,
	Poster,
	Avatar,
	Logo,
	Still,
	Thumbnail,
}
