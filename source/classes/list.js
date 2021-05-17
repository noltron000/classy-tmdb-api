class List extends Array {
	constructor (ItemType, ...entries) {
		super(...entries)
		this.ItemType = ItemType
	}

	add (...values) {
		this.push(...values.map((value) => (
			new this.ItemType(value)
		)))
	}
}

export default List
