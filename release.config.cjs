module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog', // This will generate the changelog file
    // '@semantic-release/git', // This will commit the changelog back to the repo
    {
      path: '@semantic-release/github',
      verifyConditions: false, // Skip actual release creation to avoid pushing new tags
      publish: false, // Skip the publishing of the release
    },
  ],
};
