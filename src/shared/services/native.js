const nativeOperations = {
  gps: async () => {
    navigator.geolocation.getCurrentPosition((pos) => {});
  },
};
module.exports = nativeOperations;
