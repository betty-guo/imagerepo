import React, { Component } from "react";
import UploadService from "../services/file-upload.service";

export default class UploadImages extends Component {
  constructor(props) {
    super(props);
    this.selectFiles = this.selectFiles.bind(this);
    this.upload = this.upload.bind(this);
    this.uploadImages = this.uploadImages.bind(this);

    this.state = {
      selectedFiles: undefined,
      previewImages: [],
      message: [],

      imageInfos: [],
    };
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        imageInfos: response.data,
      });
    });
  }

  selectFiles(event) {
    let images = [];

    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]))
    }

    this.setState({
      message: [],
      selectedFiles: event.target.files,
      previewImages: images
    });
  }

  upload(idx, file) {

    UploadService.upload(file, (event) => {
    })
      .then(() => {
        this.setState((prev) => {
          let nextMessage = [...prev.message, "Uploaded the image successfully: " + file.name];
          return {
            message: nextMessage
          };
        });

        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          imageInfos: files.data,
        });
      })
      .catch(() => {
        this.setState((prev) => {
          let nextMessage = [...prev.message, "Could not upload the image: " + file.name];
          return {
            message: nextMessage
          };
        });
      });
  }

  uploadImages() {
    const selectedFiles = this.state.selectedFiles;


    this.setState(
      {
        message: [],
      },
      () => {
        for (let i = 0; i < selectedFiles.length; i++) {
          this.upload(i, selectedFiles[i]);
        }
      }
    );
  }

  render() {
    const { selectedFiles, previewImages, message, imageInfos } = this.state;

    return (
      <div>
        <div className="row">
          <div className="col-8">
              <label className="btn btn-default p-0">
                <input id="file-uploader" type="file" multiple accept="image/*" onChange={this.selectFiles} />
              </label>
          </div>

          <div className="col-4">
            <button
              className="btn btn-success btn-sm"
              disabled={!selectedFiles}
              onClick={this.uploadImages}
            >
              Upload
            </button>
          </div>
        </div>

        {previewImages && (
          <div>
            {previewImages.map((img, i) => {
              return <img className="preview" src={img} alt={"image-" + i}  key={i}/>;
            })}
          </div>
        )}

        {message.length > 0 && (
          <div className="alert alert-secondary mt-2" role="alert">
            <ul>
              {message.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>
        )}

        <div className="card mt-3">
          <div className="card-header">List of Images</div>
          <ul className="list-group list-group-flush">
            {imageInfos &&
              imageInfos.map((img, index) => (
                <li className="list-group-item" key={index}>
                  <p><a href={img.url}>{img.name}</a></p>
                  <img src={img.url} alt={img.name} height="80px" />
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}