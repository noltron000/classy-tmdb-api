import config from '../config.js'

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
		this.variants ??= [ ]
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignFromApi (data) {
		this.basePath = data

		const regex = /^\/https?:\/\//
		if (regex.test(this.basePath)) {
			this.variants.push({
				facet: 'external',
				size: null,
				url: this.basePath.slice(1),
			})
		}
		else {
			this.variants.push(
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
