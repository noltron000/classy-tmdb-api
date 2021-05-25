import data from './test-data.mjs'

import {Movie} from './main.mjs'

const eject = (instance) => (JSON.parse(JSON.stringify(instance)))

const main = ( ) => {
	const movie = eject(new Movie(data))
	console.info(movie.videos[1].thumbnail.sizes[0])
}

main( )
