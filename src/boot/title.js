import { boot } from "quasar/wrappers";
import titleMixin from "src/mixin/title-mixin";

export default boot(({app}) => {

  app.mixin(titleMixin);
  //set i18n instance on app
})
