# Classy MovieDB API Wrapper
## Classes
### Generic Class Methods
| Method Tags                       | Method Name &amp; Params |
|:---------------------------------:|:------------------------ |
|                                   | `assignDefaults( )`      |
|                                   | `assignData({data})`     |
| <kbd>PRIVATE</kbd> <kbd>GET</kbd> | `sharedMetadata( )`      |
| <kbd>STATIC</kbd>                 | `toJSON( )`              |
| <kbd>STATIC</kbd>                 | `parseFromAPI({data})`   |
| <kbd>STATIC</kbd>                 | `parseFromDB({data})`    |
| <kbd>STATIC</kbd>                 | `matches(...instances)`  |
| <kbd>STATIC</kbd>                 | `combine(...instances)`  |

#### `assignDefaults( )`
Sets defaults to the instance's various attributes.
Valid defaults include:
- `undefined`
- empty `List` instances

#### `assignData({data})`
Takes well-formatted data object and applies it to various class attributes.
A well-formatted, JSON-compatible data object is output by the `toJSON`, `parseFromAPI`, and `parseFromDB` methods.

#### <kbd>PRIVATE</kbd> <kbd>GET</kbd> `sharedMetadata`
Hidden data that can be used by child elements.

#### <kbd>STATIC</kbd> `toJSON( )`
Takes a class instance into well-formatted, JSON-compatible data object.

#### <kbd>STATIC</kbd> `parseFromApi({data})`
Takes API data into well-formatted, JSON-compatible data object.

#### <kbd>STATIC</kbd> `parseFromDb({data})`
Takes DB data into well-formatted, JSON-compatible data object.

#### <kbd>STATIC</kbd> `matches(...instances)`
Checks if one or more instances are matching.
Returns `true` if all items match.
Returns `false` if any of the items do not match, or if there are no items.

#### <kbd>STATIC</kbd> `combine(...instances)`
Combines one or more matching instances into a singular item.
Returns `false` if any of the items do not match, or if there are no items.
Returns a new instance of the combined elements if they all match.
