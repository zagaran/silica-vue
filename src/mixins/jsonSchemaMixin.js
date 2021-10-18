import Ajv from "ajv";
import _ from "lodash";
const jsonSchemaMixin = {
  methods: {
    evaluateRuleForField(field) {
      const ajv = new Ajv();
      const rule = this.uiSchema[field].rule;
      const schema = rule.condition.schema;
      const data = this.getDataByScope(rule.condition.scope);
      const validate = ajv.compile(schema);
      return validate(data);
    },
    initDataFromSchema(schema, data) {
      // schema is the ui schema object, which will necessarily have all values we need
      // data is an object which represents the initial values of the form
      const formData = {};
      for (const schemaKey of Object.keys(schema)) {
        const scope = schema[schemaKey].scope
          .replace("#/", "")
          .replaceAll("/", ".");
        _.set(formData, scope, data[schemaKey]);
      }
      return formData;
    },
    getDataByScope(scope) {
      return _.get(this, scope.replace("#/", "formData.").replaceAll("/", "."));
    }
  }
};

export { jsonSchemaMixin };
