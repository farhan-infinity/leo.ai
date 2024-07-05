// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import createVideo from "./slices/createVideoSlice";
import authUser from "./slices/authSlice"
import document from "./slices/documentSlice"
import suggestion from "./slices/suggestionSlice"
import subscription from "./subscription";
import deactivate from "./deactivate";
import card from "./slices/cardSlice"
import billing from "./slices/billingSlice"
import creationHub from "./slices/CreationHubSlice"
import notification from "./slices/notificationSlice"
import dashboard from "./slices/dashboardSlice"
import promoter from "./slices/promoterSlice"

const rootReducer = { navbar, layout, creationHub, createVideo, authUser, document, dashboard, suggestion, promoter, notification, subscription, deactivate, card, billing };

export default rootReducer;
