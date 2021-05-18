class List {
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
}

export default List
