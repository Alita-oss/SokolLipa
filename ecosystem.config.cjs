module.exports = {
  apps: [
    {
      name: 'sokollipa',
      script: './.output/server/index.mjs',
      cwd: '/var/www/sokollipa.cz',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/log/pm2/sokollipa-error.log',
      out_file: '/var/log/pm2/sokollipa-out.log',
      merge_logs: true,
      restart_delay: 3000,
      max_memory_restart: '500M',
    },
  ],
};
