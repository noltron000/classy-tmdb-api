import data from './test-data.js'
import {Movie} from './classes/movie.js'

const main = ( ) => {
	const movie = new Movie(data)
	console.info(/*JSON.parse*/((JSON.stringify(movie, null, '  '))))
}

main( )
