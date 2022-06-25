module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/query-search',
     handler: 'query-search.advancedHomepageQuery',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
