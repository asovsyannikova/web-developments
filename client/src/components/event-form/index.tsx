import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import dayjs, { type Dayjs } from 'dayjs';

import { Form, Input, DatePicker, Button } from 'antd';

import { yupResolver } from '@hookform/resolvers/yup';

import type { EventsType } from '@/types';

import styles from './index.module.scss';

export interface EventFormData {
  title: string;
  description: string;
  date: Dayjs;
}

interface EventFormProps {
  initialData?: EventsType;
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Название обязательно')
    .min(3, 'Минимальная длина - 3 символа')
    .max(100, 'Максимальная длина - 100 символов'),
  description: yup
    .string()
    .required('Описание обязательно')
    .min(10, 'Минимальная длина - 10 символов')
    .max(500, 'Максимальная длина - 500 символов'),
  date: yup
    .mixed<dayjs.Dayjs>()
    .required('Дата обязательна')
    .test(
      'is-future',
      'Дата не может быть раньше текущей',
      (value) => !value || value.isAfter(dayjs()),
    ),
});

const EventForm: React.FC<EventFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          date: dayjs(initialData.createdAt),
        }
      : {
          title: '',
          description: '',
          date: undefined,
        },
  });

  // Обновляем значения формы при изменении initialData
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        date: dayjs(initialData.createdAt),
      });
    } else {
      reset({
        title: '',
        description: '',
        date: undefined,
      });
    }
  }, [initialData, reset]);

  const onSubmitHandler = (data: EventFormData) => {
    onSubmit(data);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmitHandler)}>
      <Form.Item
        label="Название"
        validateStatus={errors.title ? 'error' : undefined}
        help={errors.title?.message}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Описание"
        validateStatus={errors.description ? 'error' : undefined}
        help={errors.description?.message}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Input.TextArea rows={4} {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Дата"
        validateStatus={errors.date ? 'error' : undefined}
        help={errors.date?.message}
      >
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              showTime
              format="YYYY-MM-DD HH:mm"
              disabledDate={(current) =>
                current && current < dayjs().startOf('day')
              }
            />
          )}
        />
      </Form.Item>

      <Form.Item>
        <div className={styles.buttonContainer}>
          <Button onClick={onCancel}>Отмена</Button>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {initialData ? 'Сохранить' : 'Создать'}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default EventForm;
