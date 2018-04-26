routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('basic-test', {
      url: '/basic-test',
      template: require("./basic-test.html")
    });
};
