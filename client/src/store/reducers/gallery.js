import * as actionTypes from '../actions/actionTypes';

const initialState = {
  id: null,
  title: null,
  images: null,
  uploaded: false,
  galleries: null,
  error: null
}

export default (state = initialState, action) => {
  switch(action.type){
    case actionTypes.DOWNLOAD_GALLERY:
    case actionTypes.DOWNLOAD_GALLERIES:  
      return {
        ...state,
        id: null,
        title: null,
        images: null,
        uploaded: false,
        galleries: null,
        error: null
      };
    case actionTypes.UPLOAD_SUCCESS:
      return {
        ...state,
        id: action.id,
        uploaded: true,
        title: null,
        images: null,
        galleries: null,
        error: null
      };
    case actionTypes.DOWNLOAD_GALLERY_SUCCESS:
      return {
        ...state,
        id: action.id,
        title: action.title,
        images: action.images,
        uploaded: false,
        galleries: null,
        error: null
      }
    case actionTypes.UPLOAD_FAILURE:
    case actionTypes.DOWNLOAD_GALLERY_FAILURE:
    case actionTypes.DOWNLOAD_GALLERIES_FAILURE:  
      return {
        ...state,
        id: null,
        title: null,
        images: null,
        uploaded: false,
        galleries: null,
        error: action.error
      }  
    case actionTypes.UPLOAD_FILES:
    case actionTypes.RESET_STATE:
      return {
        ...state,
        id: null,
        title: null,
        images: null,
        uploaded: false,
        galleries: null,
        error: null
      }
    case actionTypes.DOWNLOAD_GALLERIES_SUCCESS:  
      return {
        ...state,
        galleries: action.galleries,
        error: null
      }
    default:
      return state;
  }
}