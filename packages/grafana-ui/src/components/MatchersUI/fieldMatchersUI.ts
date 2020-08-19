import { Registry } from '@grafana/data';
import { FieldMatcherUIRegistryItem } from './types';
import { fieldNameMatcherItem } from './FieldNameMatcherEditor';
import { fieldNameByRegexMatcherItem } from './FieldNameByRegexMatcherEditor';

export const fieldMatchersUI = new Registry<FieldMatcherUIRegistryItem<any>>(() => {
  return [fieldNameMatcherItem, fieldNameByRegexMatcherItem];
});
