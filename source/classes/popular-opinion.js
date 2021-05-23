import {convertToStarGrade, convertToVulgarFraction} from '../helpers/conversions.js'
import List from './list.js'
import Review from './review.js'

class PopularOpinion {
	constructor (data = { }) {
		this.assignDefaults( )
		this.assignData(data)
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
		// Zero out counts and totals.
		this.count ??= 0
		this.total ??= 0
		this.histogram ??= { }
		this.histogram['0'] ??= 0
		this.histogram['1'] ??= 0
		this.histogram['2'] ??= 0
		this.histogram['3'] ??= 0
		this.histogram['4'] ??= 0
		this.histogram['5'] ??= 0
	}

	/* STEP 2: CLEAN INPUT DATA */
	assignData ({
		polling,
		reviews,
	}) {
		//+ ASSIGN POLLING DATA +//
		if (polling != undefined) {
			// Check vote counts and average. Extract the total and count.
			if (polling.vote_count !== undefined && polling.vote_average !== undefined) {
				const dataCount = data.vote_count
				const dataAverage = convertToStarGrade(data.vote_average)
				const dataTotal = dataAverage * dataCount
				this.total += dataTotal
				this.count += dataCount
			}
		}

		//+ ASSIGN REVIEWS ARRAY +//
		if (reviews != undefined) {
			// Use reviews for histogram information.
			reviews = new List(Review, ...reviews)
			reviews.forEach((review) => {
				if (review.source === 'api') {
					if (review.rating != undefined) {
						this.histogram[review.rating] += 1
					}
				}
				else if (review.source === 'db') {
					if (review.rating != undefined) {
						this.count += 1
						this.total += review.rating
						this.histogram[review.rating] += 1
					}
				}
			})
		}

		// Clean up class data.
		this.assignDefaults( )
	}

	assignFromDb (data) {
		// Clean up class data.
		this.assignDefaults( )
	}

	get average ( )  {
		return this.total / this.count
	}

	get vulgarAverage ( ) {
		return convertToVulgarFraction(this.average)
	}

	get histogramCount ( ) {
		return Object.values(this.histogram).reduce((a, b) => (a + b), 0)
	}

	toJSON ( ) {
		const json = Object.assign({ }, this)
		json.average = this.average
		json.vulgarAverage = this.vulgarAverage
		json.histogramCount = this.histogramCount
		return json
	}
}

export default PopularOpinion
