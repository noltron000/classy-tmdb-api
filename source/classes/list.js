class List {
	#main
	constructor (ItemType, ...values) {
		this.values = [ ]
		this.ItemType = ItemType
		this.add(...values)
	}

	add (...values) {
		this.values.push(...values.map((value) => (
			new this.ItemType(value)
		)))
	}

	set main (value) {
		this.#main = new this.ItemType(value)
	}

	get main ( ) {
		return this.#main
	}

	toJSON ( ) {
		const json = Object.assign(this, { })
		json.main = this.main
		return json
	}
}

export default List
