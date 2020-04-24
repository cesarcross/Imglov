import React from 'react';
import { connect } from 'react-redux';

import { fetchGalleriesImages } from '../../store/actions/index';
import Banner from '../ui/banner';

class Gallery extends React.Component {
  state = {
    galleries: []
  }

  componentDidMount(){
    this.props.fetchGalleries();
  }

  renderImageGallery = () => {
    const galleries = this.props.galleries;
    if(galleries){
      let images = [];
      galleries.forEach((gallery) => {
        images.push({galleryId: gallery.id, image: gallery.image_files[0], title: gallery.title})
      })
      images = images.sort(this.reverseImagesOrder);

      return images.map(obj => {
        if (obj.image) {
          return (<li className="image" key={ obj.galleryId }>
                <a href={`/gallery/${obj.galleryId}`}>
                  <img src={ obj.image.url } alt={ obj.image.name }/>
                  <div className="title">
                    <h3>{ obj.title }</h3>
                  </div>
                </a>
              </li>
            );
        }
      })
    }
  };

  reverseImagesOrder = (a, b) => {
    if(a.galleryId < b.galleryId) return 1;
    if(a.galleryId > b.galleryId) return -1;
    return 0;
  }

  render(){
    return(
      <div className="GalleryIndex">
        <Banner />
        <ul className="container gallery">
          { this.renderImageGallery() }
        </ul>
      </div>  
    );
  }
};

const mapStateToProps = (state) => {
  return {
    galleries: state.gallery.galleries
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGalleries: () => dispatch(fetchGalleriesImages())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);