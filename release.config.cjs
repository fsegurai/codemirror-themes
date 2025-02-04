module.exports = {
  branches: ['main', 'development'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog', // This will generate the changelog file
    '@semantic-release/git', // This will commit the changelog back to the repo
  ],
};
