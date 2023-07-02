import types from "../Types/ProfileTypes";

export const fetchProfilesBegin = () => ({
    type: FETCH_Profiles_BEGIN
  });
  
  export const fetchProfilesSuccess = Profiles => ({
    type: FETCH_Profiles_SUCCESS,
    payload: { Profiles }
  });
  
  export const fetchProfilesFailure = error => ({
    type: FETCH_Profiles_FAILURE,
    payload: { error }
  });