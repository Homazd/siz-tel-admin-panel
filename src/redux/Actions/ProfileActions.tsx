import {
  FETCH_SUBSCRIBER_BEGIN,
  FETCH_SUBSCRIBER_SUCCESS,
  FETCH_SUBSCRIBER_FAILURE,
} from "../Types/subscribers";

import { SubscriberType } from "../../services/api";

export const fetchSUBSCRIBERSBegin = () => ({
  type: FETCH_SUBSCRIBER_BEGIN,
});

export const fetchSUBSCRIBERSSuccess = (subscriber: SubscriberType) => ({
  type: FETCH_SUBSCRIBER_SUCCESS,
  payload: { subscriber },
});

export const fetchSUBSCRIBERSFailure = (error: any) => ({
  type: FETCH_SUBSCRIBER_FAILURE,
  payload: { error },
});
