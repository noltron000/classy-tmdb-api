import Movie from './classes/movie.js'
import data from './test-data.js'

const main = ( ) => {
	const movie = new Movie(data)
	console.info(/*JSON.parse*/((JSON.stringify(movie, null, '  '))))
}

main( )
