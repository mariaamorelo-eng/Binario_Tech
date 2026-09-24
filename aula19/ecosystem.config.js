module.exports = {
  apps: [
    {
      name: 'aula19',
      script: 'server.js',
      env: {
        NODE_ENV: 'development',
        PORT: 3025
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3025
      }
    }
  ]
};
