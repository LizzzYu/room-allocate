// jest.config.js
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
	testPathIgnorePatterns: ['/node_modules/', '/.next/'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
