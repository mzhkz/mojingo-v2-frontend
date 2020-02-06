import {DEFINE_API_TOKEN} from "./actionType";

export const defineApi = token => ({
   type: DEFINE_API_TOKEN,
   apiToken: token,
});