export default defineNuxtPlugin(() => {
  const { serverInit, clientInit } = useRootStore();

  if (process.server) {
    serverInit();
  } else {
    clientInit();
  }
});
