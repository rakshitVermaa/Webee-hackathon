import { FIELD_TYPE } from "src/utils/enums";
import { generatedId } from "src/utils/helpers";
import { AppActions } from "..";
import {
  DO_CREATE_NEW_ITEM,
  DO_REMOVE_DATA,
  DO_UPDATE_DATA_FIELDS,
} from "../actions/dataActions";
import { DO_REMOVE_TYPE } from "../actions/typesAction";

export interface DataFields {
  value: string;
  label: string;
  type: FIELD_TYPE;
}

export interface Data {
  [key: string]: string | DataFields[];
  id: string;
  typeId: string;
  fields: DataFields[];
}

export interface DataState {
  [key: string]: Data[];
}

const addNewItem = (state: DataState, action: AppActions) => {
  const updatedState = JSON.parse(JSON.stringify(state));
  const typeId = action.payload.typeId;
  const fields = action.payload.fields;
  const object_title = action.payload.object_title;
  const object_type = action.payload.object_type;

  if (updatedState[typeId] === null || updatedState[typeId] === undefined) {
    updatedState[typeId] = [];
  }
  const data = {
    id: generatedId(8),
    typeId,
    fields,
    object_title,
    object_type,
  };
  updatedState[typeId].push(data);
  return updatedState;
};

const updateDataFields = (state: DataState, action: AppActions) => {
  const updatedState = JSON.parse(JSON.stringify(state));
  const typeId = action.payload.typeId;
  const dIndex = action.payload.dIndex;
  const fIndex = action.payload.fIndex;
  const value = action.payload.value;
  updatedState[typeId][dIndex].fields[fIndex].value = value;
  return updatedState;
};

const removeTypeData = (state: DataState, action: AppActions) => {
  const updatedState: DataState = JSON.parse(JSON.stringify(state));
  const typeId = action.payload.typeId;
  delete updatedState[typeId];
  return updatedState;
};

const removeData = (state: DataState, action: AppActions) => {
  const updatedState: DataState = JSON.parse(JSON.stringify(state));
  const typeId = action.payload.typeId;
  const index = action.payload.index;
  updatedState[typeId].filter((_, i) => i !== index);
  return updatedState;
};

function dataReducer(state: DataState = {}, action: AppActions) {
  switch (action.type) {
    case DO_CREATE_NEW_ITEM:
      return addNewItem(state, action);
    case DO_UPDATE_DATA_FIELDS:
      return updateDataFields(state, action);
    case DO_REMOVE_TYPE:
      return removeTypeData(state, action);
    case DO_REMOVE_DATA:
      return removeData(state, action);
    default:
      return state;
  }
}

export default dataReducer;
