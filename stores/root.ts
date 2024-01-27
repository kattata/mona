export const useRootStore = defineStore('root', () => {
  function initialize() {
    // eslint-disable-next-line no-console
    console.log('initialized');
  }

  return {
    initialize
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRootStore as any, import.meta.hot));
}
