export default defineNuxtPlugin(() => {
  const rootStore = useRootStore();

  rootStore.initialize();
});
