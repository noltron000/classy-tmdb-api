class List extends Array {
	constructor (ItemType, ...values) {
		super(...values.map(value => (new ItemType(value))))
		this.main = null
		this.ItemType = ItemType
	}

	add (...values) {
		this.push(...values.map((value) => (
			new this.ItemType(value)
		)))
	}

	setMain (value) {
		this.main = new this.ItemType(value)
	}

	toJSON ( ) {
		const json = { }
		json.ItemType = this.ItemType
		json.main = this.main
		json.values = [...this]
		return json
	}
}

export default List
