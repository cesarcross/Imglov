import * as actionTypes from './actionTypes';
import * as api from '../../utilities/api-helpers';

const uploadFiles = () => {
  return {
    type: actionTypes.UPLOAD_FILES
  }
};

const uploadSuccess = (id) => {
  return {
    type: actionTypes.UPLOAD_SUCCESS,
    id: id
  }
};

const uploadFailure = (error) => {
  return {
    type: actionTypes.UPLOAD_FAILURE,
    error: error
  }
};

const downloadGallery = () => {
  return {
    type: actionTypes.DOWNLOAD_GALLERY
  }
};

const downloadGallerySuccess = (id, title, images) => {
  return {
    type: actionTypes.DOWNLOAD_GALLERY_SUCCESS,
    id: id,
    title: title,
    images: images
  }
};

const downloadGalleryFailure = (error) => {
  return {
    type: actionTypes.DOWNLOAD_GALLERY_FAILURE,
    error: error
  }
};

const downloadGalleries = () => {
  return {
    type: actionTypes.DOWNLOAD_GALLERIES
  }
};

const downloadGalleriesSuccess = (galleries) => {
  return {
    type: actionTypes.DOWNLOAD_GALLERIES_SUCCESS,
    galleries: galleries
  }
};

const downloadGalleriesFailure = (error) => {
  return {
    type: actionTypes.DOWNLOAD_GALLERIES_FAILURE,
    error: error
  }
};

export const uploader = (formData) => {
  return (dispatch) => {
    dispatch(uploadFiles());
    api.fileUploader(formData)
      .then(res => {
        if(res && res.status === 201) {
          const id = res.data.id;
          dispatch(uploadSuccess(id));
        } else {
          console.log('Error uploading files');
          dispatch(uploadFailure('Error uploading files'));
        }
      })
      .catch(err => {
        console.log('FileUploaderError', err);
        dispatch(uploadFailure(err));
      });
  }
};

export const resetGallery = () => {
  return {
    type: actionTypes.RESET_STATE
  }
};

export const fetchGalleryImages = (id) => {
  return (dispatch) => {
    dispatch(downloadGallery());
    api.fetchGalleryImages(id)
      .then(res => {
        if(res.ok && res.status === 200){
          return res.json();
        }
      }) 
      .then(res => {
        dispatch(downloadGallerySuccess(res.id, res.title, res.image_files));
      })
      .catch(err => {
        console.log('Error fetching gallery images:', err);
        dispatch(downloadGalleryFailure(err));
      });
  }  
}

export const fetchGalleriesImages = () => {
  return (dispatch) => {
    dispatch(downloadGalleries());
    api.fetchGalleriesImages()
    .then(res => {
      if(res.ok && res.status === 200){
        return res.json();  
      }
    })
    .then(res => dispatch(downloadGalleriesSuccess(res)))
    .catch(err => {
      console.log('Error fetching galleries', err)
      dispatch(downloadGalleriesFailure(err));
    });
  }
}