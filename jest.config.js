module.exports = {
	clearMocks: true,
	moduleDirectories: ['node_modules', 'src'],
	// roots: ['<rootDir>/src'],
	projects: ['<rootDir>/packages/**/jest.config.js'],
	testEnvironment: 'node',
	// transform: {
	// 	'^.+\\.(t|j)sx?$': ['@swc/jest']
	// },
	testMatch: ['*.spec.ts', '*.spec.tsx'],
	moduleNameMapper: {
		'@/(.*)': '<rootDir>/src/$1'
	}
}
