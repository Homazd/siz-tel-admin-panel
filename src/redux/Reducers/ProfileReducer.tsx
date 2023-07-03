import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchCount } from './counterAPI';

export interface ProfileState {
  loading: boolean;
  error: any;
  items: any;
}
const initialState: ProfileState = {
  items: [],
  loading: false,
  error: null,
};
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers : {
    
  }
})
