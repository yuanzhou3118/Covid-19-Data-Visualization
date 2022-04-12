export default (router) => {
  router.map({
    '/products': {
      name: 'ProductList',
      component: require('./views/Product/Index.vue'),
    },
  });
};
