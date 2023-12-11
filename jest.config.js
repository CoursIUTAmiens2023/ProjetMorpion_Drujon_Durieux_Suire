export default {
    // An array of file extensions your modules use
    moduleFileExtensions: [
        "web.js",
        "js",
        "web.ts",
        "ts",
        "web.tsx",
        "tsx",
        "json",
        "web.jsx",
        "jsx",
        "node",
    ],

    // A preset that is used as a base for Jest's configuration
    preset: "ts-jest",

    // Automatically reset mock state before every test
    resetMocks: true,

    // A list of paths to directories that Jest should use to search for files in
    roots: ["<rootDir>/src"],

    // // A list of paths to modules that run some code to configure or set up the testing framework before each test
    // setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

    // The test environment that will be used for testing
    testEnvironment: "jsdom",

    // Options that will be passed to the testEnvironment
    testEnvironmentOptions: {
        customExportConditions: [""],
    },

    // The glob patterns Jest uses to detect test files
    testMatch: [
        "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
    ],
}
