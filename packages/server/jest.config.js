const { name } = require('./package.json')

module.exports = {
	clearMocks: true,
	displayName: name,
	name,
	moduleDirectories: ['node_modules', '.'],
	transform: {
		'^.+\\.(t|j)sx?$': ['@swc/jest']
	}
}
