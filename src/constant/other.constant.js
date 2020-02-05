export const API = 'https://restcountries.eu';

export const toast = {
    display: null,
    show: function (message, variant = "success", autoHideDuration) {
      if (this.display && this.display.show) {
        this.display.show(message, variant, autoHideDuration)
      }
    }
  }

  export const realTimeVariables = {
    token: null
  }
  
  export const TIMEOUT_DELAY = 20000;
