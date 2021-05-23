class List extends Array {
	constructor (ItemType, ...values) {
		super( )
		this.ItemType = ItemType
		this.main = null
		this.add(...values)
	}

	add (...values) {
		values = values.map((value) => (
			new this.ItemType(value)
		))

		values.forEach((value) => {
			// Check if value is in current array.
			const oldValue = [...this].find((oldValue) => (
				this.ItemType.matches(oldValue, value)
			))

			// If value is in array, join original with new.
			if (oldValue !== undefined) {
				this.ItemType.combine(oldValue, value)
			}

			// If value is not in array, add to array.
			else {
				this.push(value)
			}
		})
	}

	setMain (value) {
		// Check if value is in current array.
		const oldValue = [...this].find((oldValue) => (
			this.ItemType.matches(oldValue, value)
		))

		// If value is in array, join with original and set to main.
		if (oldValue !== undefined) {
			this.ItemType.combine(oldValue, value)
			this.main = oldValue
		}

		// If value is not in array, set to main.
		else {
			this.main = value
		}
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
