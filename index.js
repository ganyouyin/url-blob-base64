var utils = (function() {
    var b64datas = {};

    function urlToBase64(url, callback) {
        if (b64datas[url]) {
            callback && callback(b64datas[url]);
            return;
        }
        var image = new Image();
        image.onload = function() {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');

            canvas.width = this.width;
            canvas.height = this.height;
            ctx.drawImage(this, 0, 0);

            var b64data = b64datas[url] = canvas.toDataURL('base64');
            callback && callback(b64data);
        };
        image.src = url;
    }

    function base64ToBlob(b64data, contentType, sliceSize) {
        sliceSize || (sliceSize = 512);

        var byteCharacters = atob(b64data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = [];
            for (var i = 0; i < slice.length; i++) {
                byteNumbers.push(slice.charCodeAt(i));
            }

            byteArrays.push(new Uint8Array(byteNumbers));
        }
        return new Blob(byteArrays, {
            type: contentType
        });
    }

    function blobToBase64(blob, callback) {
        var fileReader = new FileReader();
        fileReader.onload = function(e) {
            callback && callback(e.target.result);
        };
        fileReader.readAsDataURL(blob);
    }

    return {
        urlToBase64: urlToBase64,
        base64ToBlob: base64ToBlob,
        blobToBase64: blobToBase64
    };
})();
