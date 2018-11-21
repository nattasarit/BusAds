import { Injectable } from '@angular/core';
/*import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';*/

@Injectable()
export class FirebaseService {

  constructor() { }

  uploadToFirebase(file) {
    const id = Math.random().toString(36).substring(2);
  }
  /*
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  constructor(private afStorage: AngularFireStorage) { }

  uploadToFirebase(file) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(file);
  }

  public upload(event) {
    console.log(event);
    const elem = event.target;
    if (elem.files.length > 0) {
      console.log(elem.files[0]);
      //this.uploadToFirebase(elem.files[0]);

      // let reader = new FileReader();
      // reader.onload = (e) => {
      //   console.log("Test");
      //   let image = document.createElement("img");
      //   // the result image data
      //   image.src = e.target["result"];
      //   const kImage = new Konva.Image({
      //     image: image,
      //     width: 100,
      //     height: 100,
      //     x: 10,
      //     y: 10,
      //     draggable: true
      //   });

      //   this._gLayer.add(kImage);
      // }
      // reader.readAsDataURL(elem.files[0]);
    }
  }

  checkForMIMEType(response) {
    var blob;
    if (response.mimetype == 'pdf') {
      blob = this.converBase64toBlob(response.content, 'image/png');
    } else if (response.mimetype == 'doc') {
      blob = this.converBase64toBlob(response.content, 'application/msword');
    }
    var blobURL = URL.createObjectURL(blob);
    window.open(blobURL);
  }

  converBase64toBlob(content, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = window.atob(content); //method which converts base64 to binary
    var byteArrays = [
    ];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
      type: contentType
    }); //statement which creates the blob
    return blob;
  }

  getBase64FromImageUrl(url) {
    var img = new Image();

    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 100;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    };

    img.src = url;

    console.log("PPPPPPPPPPimg ", img);
  }
  */
}
