<script setup lang="ts">
import { Field, ErrorMessage, useFieldError } from 'vee-validate';
import { generateGuid } from '~/utils';

const props = withDefaults(defineProps<{
  type?: string | 'text' | 'password' | 'number' | 'tel' | 'url' | 'email' | 'hidden';
  fieldType?: 'input' | 'textarea';
  name: string;
  rules?: string | Object;
  label?: string;
  inputMode?: null | string | 'none' | 'text ' | 'numeric' | 'tel' | 'url';
  modelValue: string;
  maxlength?: null | string;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validateOnInput?: boolean;
  validateOnModelUpdate?: boolean;
  customError?: string;
  placeholder?: string;
  pattern?: string | null;
}>(), {
  fieldType: 'input',
  type: 'text',
  name: '',
  inputMode: null,
  rules: '',
  label: '',
  modelValue: '',
  customError: '',
  maxlength: null,
  placeholder: '',
  pattern: null,
  validateOnInput: false,
  validateOnBlur: true,
  validateOnChange: false,
  validateOnModelUpdate: true
});

const id = ref(generateGuid());

const input = ref(null);
const emit = defineEmits(['update:modelValue', 'blur', 'input', 'focus']);

const value = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue)
});

const hasErrors = useFieldError(props.name);

const focus = () => {
  if (!input.value) {
    return;
  }

  (input.value as any).$el.focus();
};

const isRequired = computed(() => {
  if (!props.rules) {
    return false;
  }

  if (typeof props.rules === 'object') {
    return (props.rules as any)?.required;
  }

  return props.rules.includes('required');
});

defineExpose({
  focus
});
</script>

<template>
  <div class="form-input-wrapper">
    <label v-if="label" class="form-label" :for="id">{{ label }}<span v-show="!isRequired"> (optional)</span></label>
    <Field
      :id="id"
      ref="input"
      v-model="value"
      :as="fieldType"
      :type="type"
      :rules="rules"
      :class="`form-input ${hasErrors ? 'form-input--invalid' : ''}`"
      :label="label"
      :name="name"
      :pattern="pattern"
      :placeholder="placeholder"
      :autocomplete="$attrs.autocomplete"
      :maxlength="maxlength"
      :inputmode="inputMode"
      :validate-on-input="validateOnInput"
      :validate-on-blur="validateOnBlur"
      :validate-on-change="validateOnChange"
      :validate-on-model-update="validateOnModelUpdate"
      @blur="$emit('blur', value)"
      @focus="$emit('focus', value)"
      @input="$emit('input', value)"
    />
    <span v-if="customError" class="form-input-error">
      {{ customError }}
    </span>
    <ErrorMessage v-else class="form-input-error" :name="name" />
  </div>
</template>
