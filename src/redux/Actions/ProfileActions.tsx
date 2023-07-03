import {
  FETCH_PROFILES_BEGIN,
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_FAILURE,
} from "../Types/ProfileTypes";

export const fetchProfilesBegin = () => ({
    type: FETCH_PROFILES_BEGIN
  });
  
  export const fetchProfilesSuccess = Profiles => ({
    type: FETCH_PROFILES_SUCCESS,
    payload: { Profiles }
  });
  
  export const fetchProfilesFailure = error => ({
    type:  FETCH_PROFILES_FAILURE,
    payload: { error }
  });