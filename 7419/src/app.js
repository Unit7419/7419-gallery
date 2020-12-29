import React from 'react'
import ReactDOM from 'react-dom'
import jsonp from 'jsonp'
import Basic from './Basic'
import WithLightbox from './WithLightbox'
import CustomComponentSelection from './CustomComponentSelection'
import Sortable from './Sortable'
import DynamicLoading from './DynamicLoading'
import DynamicColumns from './DynamicColumns'
import { get, GET_PHOTOS_API, STATIC_DOMAIN } from './utils'
import { Uploader } from './Upload'

class App extends React.Component {
  constructor() {
    super()
    this.state = { width: -1 }
    this.loadPhotos = this.loadPhotos.bind(this)
  }

  componentDidMount() {
    this.loadPhotos()
  }

  loadPhotos() {
    get(GET_PHOTOS_API).then(data => {
      const photos = data.reduce((ps, imgPath) => {
        const demensions = /&wh=(.*)\./g.exec(imgPath)
        const [width, height] = !demensions
          ? [800, 533]
          : demensions[1].split('*').map(v => v * 1)

        const item = {
          src: `${STATIC_DOMAIN}/photos/${imgPath}`,
          key: imgPath,
          id: imgPath,
          height_c: height,
          height_h: height,
          height_l: height,
          height_m: height,
          height_o: height,
          title: '7419',
          width_c: width,
          width_h: width,
          width_l: width,
          width_m: width,
          width_o: width,
        }

        return [
          {
            src: item.src,
            width: parseInt(item.width_o),
            height: parseInt(item.height_o),
            title: item.title,
            alt: item.title,
            key: item.id,
            // srcSet: [
            //   `${item.src} ${item.width_m}w`,
            //   `${item.src} ${item.width_c}w`,
            //   `${item.src} ${item.width_l}w`,
            //   `${item.src} ${item.width_h}w`,
            // ],
            sizes: '(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw',
          },
          ...ps,
        ]
      }, [])

      this.setState({
        photos: this.state.photos ? this.state.photos.concat(photos) : photos,
      })
    })
  }

  render() {
    if (this.state.photos) {
      const width = this.state.width
      return (
        <div className="App">
          {/* <Basic title={'Basic Row Layout'} photos={this.state.photos.slice(0, 20)} />
          <Basic title={'Basic Column Layout'} direction="column" photos={this.state.photos.slice(40, 60)} />
          <WithLightbox photos={this.state.photos.slice(60, 75)} /> */}
          {/* <CustomComponentSelection photos={this.state.photos.slice(75, 90)} /> */}
          {/* <Sortable photos={this.state.photos.slice(90, 100)} /> */}
          <Uploader />
          <DynamicColumns
            title={''}
            photos={this.state.photos.slice(100, 120)}
          />
          <DynamicLoading photos={this.state.photos} />
        </div>
      )
    } else {
      return (
        <div className="App">
          <div id="msg-app-loading" className="loading-msg">
            Loading
          </div>
        </div>
      )
    }
  }
}
ReactDOM.render(<App />, document.getElementById('app'))
