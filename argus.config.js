module.exports = {
  environments: [
    {
      extension: 'js',
      testNameSuffix: '.test',
      testDir: 'test',
      sourceDir: 'src',
      testRunnerCommand: {
        command: 'npm',
        arguments: ['t', '--silent', '--'],
      },
      runAllTestsCommand: { command: 'npm', arguments: ['t', '--silent'] },
    },
    {
      extension: 'jsx',
      testNameSuffix: '.test',
      testDir: 'test',
      sourceDir: 'src',
      testRunnerCommand: {
        command: 'npm',
        arguments: ['t', '--silent', '--'],
      },
      runAllTestsCommand: { command: 'npm', arguments: ['t', '--silent'] },
    },
  ],
};
