import {convertToStarGrade, convertToVulgarFraction} from '../helpers/conversions.js'

class PopularOpinion {
	constructor ( ) {
		this.assignDefaults( )
	}

	/* STEP 1: INITIALIZE CLASS STRUCTURE */
	assignDefaults ( ) {
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
	assignFromApi (data) {
		if (data.vote_count && data.vote_average) {
			const dataCount = data.vote_count
			const dataAverage = convertToStarGrade(data.vote_average)
			const dataTotal = dataAverage * dataCount

			this.total += dataTotal
			this.count += dataCount
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
