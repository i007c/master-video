module.exports = {
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transform: {
        '.(ts|tsx)': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t)sx?$',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>'],
    moduleDirectories: ['node_modules'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/__tests__/config'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__tests__/config/fileMock.ts',
        '\\.(scss|sass)$': '<rootDir>/__tests__/config/styleMock.ts',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
