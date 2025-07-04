import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/authentication';
import ecosystemDomainReducer from './features/ecosystemDomain';
import activeSectionReducer from './features/Template/activeTemplate';
import mainTemplateReducer from './features/Template/mainTemplate';
import createNewServiceReducer from './features/CreateService'
import editTemplateReducer from "./features/Template/editTemplate"
import ecosystemPlanReducer from "./features/ecosystemPlan"
import ecosystemStatusReducer from "./features/ecosystemStatus"

const rootReducer = combineReducers({
  auth: authReducer,
  ecosystemDomain: ecosystemDomainReducer, 
  activeSection: activeSectionReducer,
  mainTemplate: mainTemplateReducer,
  createNewService: createNewServiceReducer,
  editTemplate: editTemplateReducer,
  ecosystemPlan: ecosystemPlanReducer,
  ecosystemStatus: ecosystemStatusReducer
});

export default rootReducer;
