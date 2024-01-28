import * as rules from '@vee-validate/rules';
import { defineRule } from 'vee-validate';

const includedRules = [
  'required',
  'email',
  'integer',
  'regex',
  'min',
  'max',
  'min_value',
  'max_value'
];

export default defineNuxtPlugin(() => {
  Object.keys(rules).forEach((rule) => {
    if (includedRules.includes(rule)) {
      defineRule(rule, rules[rule]);
    }
  });
});
