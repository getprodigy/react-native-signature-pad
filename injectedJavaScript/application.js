var content = (penColor, backgroundColor, dataURL, defaultHeight, defaultWidth) => `

  var showSignaturePad = function (signaturePadCanvas, bodyWidth, bodyHeight) {
    var width = bodyWidth;
    var height = bodyHeight;

    var sizeSignaturePad = function () {
      var devicePixelRatio = 1; /*window.devicePixelRatio || 1;*/
      var canvasWidth = width * devicePixelRatio;
      var canvasHeight = height * devicePixelRatio;
      signaturePadCanvas.width = canvasWidth;
      signaturePadCanvas.height = canvasHeight;
      signaturePadCanvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
    };

    var finishedStroke = function(base64DataUrl) {
       executeNativeFunction('finishedStroke', {base64DataUrl: base64DataUrl});
    };
    
    document.addEventListener('message', function () {
      if (signaturePadCanvas) {
        executeNativeFunction('onSave', { image: signaturePadCanvas.toDataURL() });
      }
    });

    var enableSignaturePadFunctionality = function () {
      var signaturePad = new SignaturePad(signaturePadCanvas, {
        penColor: '${penColor || 'black'}',
        backgroundColor: '${backgroundColor || 'white'}',
        onEnd: function() { finishedStroke(signaturePad.toDataURL()); }
      });
      /* signaturePad.translateMouseCoordinates = function (point) {
        var translatedY = point.x;
        var translatedX = width - point.y;
        point.x = translatedX;
        point.y = translatedY;
      }; */
      signaturePad.minWidth = 1;
      signaturePad.maxWidth = 4;
      if ('${dataURL}') {
        signaturePad.fromDataURL('${dataURL}');
      }
    };

    sizeSignaturePad();
    enableSignaturePadFunctionality();
  };


  var bodyWidth = ${defaultWidth};
  var bodyHeight = ${defaultHeight};
  if(!bodyWidth) {
    bodyWidth = window.innerWidth ? window.innerWidth : ${defaultWidth};
  }
  if(!bodyHeight) {
    bodyHeight = window.innerHeight ? window.innerHeight : ${defaultHeight};
  }

  var canvasElement = document.querySelector('canvas');
  showSignaturePad(canvasElement, bodyWidth, bodyHeight);
`;

export default content;
