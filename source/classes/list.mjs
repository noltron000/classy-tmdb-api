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
		value = new this.ItemType(value)

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

	get values ( ) {
		return [...this]
	}

	toJSON ( ) {
		const json = [ ]
		if (this.main != undefined) {json.push(this.main)}
		json.push(...this.values)
		return json
	}
}

export {List}
