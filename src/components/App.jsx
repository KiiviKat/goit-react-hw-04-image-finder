import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { getSearchImages } from 'services/PixabayAPI';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    totalImages: 0,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        const resp = await getSearchImages(query, page);
        if (resp) {
          if (!resp.totalHits) {
            throw new Error('Bad query');
          }
          this.setState(prev => ({
            images:
              page === 1 ? [...resp.hits] : [...prev.images, ...resp.hits],
            totalImages: resp.totalHits,
            error: null,
          }));
        }
      } catch (error) {
        this.setState({ error, images: [] });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = query => {
    this.setState({ query, isLoading: true, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
  };

  renderLoaderOrButton = () => {
    const { isLoading, images, totalImages } = this.state;
    return isLoading ? (
      <Loader />
    ) : (
      !!images.length && images.length < totalImages && (
        <Button onLoadMore={this.handleLoadMore} />
      )
    );
  };

  render() {
    const { images, error } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />
        {!error && <div className="Wrapper">{this.renderLoaderOrButton()}</div>}
        {error && <ErrorMessage error={error} />}
      </>
    );
  }
}
