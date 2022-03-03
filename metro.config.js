const modulePathHashFunction = require('./moduleHashFunction')
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  serializer: {
    createModuleIdFactory: function () {
      return function (path) {
        return modulePathHashFunction(path)
      }
    }
  }
};
