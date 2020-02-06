import Axios from "axios";
import * as Constants from "@/Constants"

export class API {

    constructor(props) {

        this.http = Axios.create();
        this.http.defaults.baseURL = Constants.BASE_URL;
        this.http.defaults.headers.common[constants.ACCESS_TOKEN_HEADER_NAME] = Constants.BASE_URL;
        this.http.defaults.headers.common['X-Requested-With'] = Constants.BASE_URL;
        this.http.defaults.withCredentials = true;
    }


}