##图片URL Blob Base64相互转换
###urlToBase64
实现：

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
    };
示例：

    urlToBase64('http://b6.hucdn.com/upload/im/1607/27/85273548789370_100x100.png!imthumb.jpg', function(b64data){
		//剩余逻辑
	});
###base64ToBlob
实现：

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
    };
示例：

    var url = 'http://b6.hucdn.com/upload/im/1607/27/85273548789370_100x100.png!imthumb.jpg';
	urlToBase64(url, function(b64data){		
		var blob = base64ToBlob(b64data.split(',')[1], 'image/png');
		//剩余逻辑
	});

### blobToBase64
实现：

	function blobToBase64(blob, callback) {
        var fileReader = new FileReader();
        fileReader.onload = function(e) {
            callback && callback(e.target.result);
        };
        fileReader.readAsDataURL(blob);
    };
示例：

    blobToBase64(blob, function(b64data){
		//剩余逻辑
	});
