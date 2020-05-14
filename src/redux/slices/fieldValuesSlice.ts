import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { TextDto } from '../../apiWorker/typings/index';

export interface valueType extends TextDto {
  fieldId: number;
}

export type valuesType = valueType[];

export type setValueType = {
  text: string;
  fieldId: number;
};

const initialState: valuesType = [];

const asyncValuesActions = {
  setFieldValueRequest: createAction<setValueType>(
    'screens/setFieldValue_request' as const
  ),
};

export const valuesSlise = createSlice({
  name: 'values',
  initialState,
  reducers: {
    getValues: (state, action: PayloadAction<valueType[]>) => {
      return action.payload;
    },
    setValue: (state, action: PayloadAction<valueType>) => {
      return [...state, action.payload];
    },
  },
});

export const valuesActions = {
  ...valuesSlise.actions,
  ...asyncValuesActions,
};