const convertToStarGrade = (grade = null) => {
	if (typeof grade !== 'number') {
		return null
	}


	// When first ran the grade has a scale of 1 - 10.
	grade -= 1     // the grade has a scale of 0 - 9.
	grade *= 10/9  // the grade has a scale of 0 - 10.
	grade /= 2     // the grade has a scale of 0 - 5.
	return grade
}



const convertToVulgarFraction = (decimal = null) => {
	if (decimal === null || Number.isNaN(decimal)) {
		return null
	}

	decimal = Math.ceil(decimal * 100) / 100
	let integer = Math.floor(decimal)
	let fraction = decimal % 1
	let vulgarNumber = ''

	// Determine if whole number is necessary.
	if (integer >= 1 || fraction < 1/8) {
		vulgarNumber += integer.toString( )
	}

	// Add fractional representation of number.
	if (fraction >= 7/8) {
		vulgarNumber += '⅞'
	}
	else if (fraction >= 6/8) {
		vulgarNumber += '¾'
	}
	else if (fraction >= 6/9) {
		vulgarNumber += '⅔'
	}
	else if (fraction >= 5/8) {
		vulgarNumber += '⅝'
	}
	else if (fraction >= 4/8) {
		vulgarNumber += '½'
	}
	else if (fraction >= 3/8) {
		vulgarNumber += '⅜'
	}
	else if (fraction >= 3/9) {
		vulgarNumber += '⅓'
	}
	else if (fraction >= 2/8) {
		vulgarNumber += '¼'
	}
	else if (fraction >= 1/8) {
		vulgarNumber += '⅛'
	}
	else {
		vulgarNumber += ''
	}

	// Return combined vulgar number as a string.
	return vulgarNumber
}

export {
	convertToStarGrade,
	convertToVulgarFraction,
}
