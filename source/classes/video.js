import {cleanseIsoCode} from '../helpers/conversions.js'

class Video {
	constructor (data) {
		this.assignDefaults( )
		this.assignData(data)
	}
	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		this.ids ??= { }
		// this.ids.api ??= null
		// this['iso639-1'] ??= null
		// this['iso3166-1'] ??= null
		// this.key ??= null
		// this.name ??= null
		// this.site ??= null
		// this.size ??= null
		// this.type ??= null
		// this.url ??= null
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({video}) {
		//+ ASSIGN VIDEO DATA +//
		if (video != undefined) {
			if (video.id !== undefined) {
				this.ids.api = video.id
			}

			if (video.key !== undefined) {
				this.key = video.key
			}

			if (video.iso_639_1 !== undefined) {
				this['iso639-1'] = cleanseIsoCode(video.iso_639_1)
			}

			if (video.iso_3166_1 !== undefined) {
				this['iso3166-1'] = cleanseIsoCode(video.iso_3166_1)
			}

			if (video.name !== undefined) {
				this.name = video.name
			}

			if (video.site !== undefined) {
				this.site = video.site
			}

			if (video.size !== undefined) {
				this.size = video.size
			}

			if (video.type !== undefined) {
				this.type = video.type
			}

			if (this.site !== undefined && this.key !== undefined) {
				if (this.site === 'YouTube') {
					this.url = `https://www.youtube.com/watch?v=${this.key}`
				}

				else if (this.site === 'Vimeo') {
					this.url = `https://vimeo.com/${this.key}`
				}
			}
		}

		// Clean up class data.
		this.assignDefaults( )
	}

	static matches (item01, item02) {
		if (!(item01 instanceof Video && item02 instanceof Video)) {
			throw new Error('Using Video.matches( ) with an invalid object')
		}

		return item01.ids.api === item02.ids.api
	}

	static combine (item01, item02) {
		// ⚠️ complete this function
		return item01
	}
}

export default Video
