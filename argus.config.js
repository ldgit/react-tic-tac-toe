module.exports = {
  environments: [
    {
      extension: 'js',
      testNameSuffix: '.test',
      testDir: 'test',
      sourceDir: 'src',
      testRunnerCommand: { command: 'npm', arguments: ['t', '--'] },
      runAllTestsCommand: { command: 'npm', arguments: ['t'] },
    },
    {
      extension: 'jsx',
      testNameSuffix: '.test',
      testDir: 'test',
      sourceDir: 'src',
      testRunnerCommand: { command: 'npm', arguments: ['t', '--'] },
      runAllTestsCommand: { command: 'npm', arguments: ['t'] },
    },
  ],
};
