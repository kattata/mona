export const useLayoutStore = defineStore('layout', () => {
  const isToastDisplayed = ref<boolean>(false);

  interface ToastOptions {
    message: string;
    duration?: number;
  }

  const options = reactive<ToastOptions>({
    message: '',
    duration: 2000
  });

  function showToast(toastOptions: ToastOptions) {
    options.message = toastOptions.message;
    options.duration = toastOptions.duration || 2000;

    isToastDisplayed.value = true;

    setTimeout(() => {
      isToastDisplayed.value = false;
    }, 2000);
  }

  return {
    showToast,
    isToastDisplayed,
    options
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore as any, import.meta.hot));
}
