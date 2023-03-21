//import i18n from "../plugins/i18n.js"
import { useToast } from "vue-toastification";

export default {
  /**4
   * If success show toast message and return response
   * otherwise if error status is 401 redirect to the login screen.
   * @param {String} type type of error
   * @param {Number} status number of status code
   */
  handleStatusCode(type, status) {

    const toast = useToast();
    const chars = status.toString().split('');

    if (parseInt(chars[0]) === 2) {
      toast('OK'), {
         toastClassName: "success-class",
       };
    } else {
      toast('FAIL'), {
        toastClassName: "danger-class",
      };
    }
  },
};
