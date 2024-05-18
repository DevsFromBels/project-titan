module.exports = {
  apps: [
    {
      name: "gateway",
      script: "dist/apps/gateway/main.js",
    },
    {
      name: "users",
      script: "dist/apps/users/main.js",
    },
    {
      name: "profile",
      script: "dist/apps/profile/main.js",
    },
    {
      name: "market",
      script: "dist/apps/market/main.js",
    },
    {
      name: "avatars",
      script: "dist/apps/avatars/main.js",
    },
    {
      name: "notifications",
      script: "dist/apps/notifications/main.js",
    },
  ],
};
