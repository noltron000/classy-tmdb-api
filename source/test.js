import data from './test-data.js'
import {Movie} from './classes/movie.js'
const eject = (instance) => (JSON.parse(JSON.stringify(instance)))

const main = ( ) => {
	const movie = new Movie(data)
	console.info(eject(movie))
}

main( )
