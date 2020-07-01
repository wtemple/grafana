import memoizeOne from 'memoize-one';
import { SelectableValue } from '@grafana/data';
import { config } from '@grafana/runtime';
import { NotificationChannelDTO, NotificationChannelType } from 'app/types';

export const defaultValues: NotificationChannelDTO = {
  name: '',
  type: { value: 'email', label: 'Email' },
  sendReminder: false,
  disableResolveMessage: false,
  frequency: '15m',
  settings: {
    uploadImage: config.rendererAvailable,
    autoResolve: true,
    httpMethod: 'POST',
    severity: 'critical',
  },
  isDefault: false,
};

export const selectableChannels = memoizeOne(
  (notificationChannels: NotificationChannelType[]): Array<SelectableValue<string>> => {
    return notificationChannels.map(channel => ({
      value: channel.value,
      label: channel.label,
      description: channel.description,
    }));
  }
);

export const transformSubmitData = (formData: NotificationChannelDTO) => {
  /*
    Some settings can be options in a select, in order to not save a SelectableValue<T>
    we need to use check if it is a SelectableValue and use its value.
  */
  const settings = Object.fromEntries(
    Object.entries(formData.settings).map(([key, value]) => {
      return [key, value.hasOwnProperty('value') ? value.value : value];
    })
  );

  return {
    ...defaultValues,
    ...formData,
    type: formData.type.value,
    settings: { ...defaultValues.settings, ...settings },
  };
};

export const transformTestData = (formData: NotificationChannelDTO) => {
  return {
    name: formData.name,
    type: formData.type.value,
    frequency: formData.frequency ?? defaultValues.frequency,
    settings: { ...Object.assign(defaultValues.settings, formData.settings) },
  };
};