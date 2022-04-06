module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '2eeb7c38110228cdc5f840cf3a3fe579'),
  },
});
