import data from './test-data.js'

import {Movie} from './main.js'

const eject = (instance) => (JSON.parse(JSON.stringify(instance)))

const main = ( ) => {
	const movie = eject(new Movie(data))
	console.info(movie.videos[1].thumbnail.sizes[0])
}

main( )
