import React from 'react';
import { connect } from 'react-redux';
import { fetchGalleryImages, resetGallery } from '../../store/actions/index';

// import { fetchGalleryImages } from '../../utilities/api-helpers';

class Show extends React.Component {
  componentDidMount(){
    const id = this.props.match.params.id;
    if(id) {
      this.props.fetchImages(id);
    }
  }

  componentWillUnmount(){
    this.props.reset();
  }
 
  renderGalleryImages = () => {
    const error = this.props.error;
    const images = this.props.images;
    if(!error && images && images.length > 0){
      return images.map(image => {
        return <li className="image" key={ image.id }><img src={ image.url } alt={ image.name } /></li>
      })
    }
  }

  render(){
    return(
      <div className="App container">
        <h1>{ this.props.title }</h1>
        <ul className="gallery">
          { this.renderGalleryImages() }
        </ul>
      </div> 
    );
  };
}

const mapStateToProps = (state) => {
  return {
    title: state.gallery.title,
    images: state.gallery.images,
    error: state.gallery.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchImages: (id) => dispatch(fetchGalleryImages(id)),
    reset: () => dispatch(resetGallery())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Show);