(function () {
    document.addEventListener("deviceready", function () {
        var proposta;
        var cpf;

        $('#button-capturar').click(function () {

            if ($("#proposta").val() !== undefined) {
                proposta = $("#proposta").val();
                cpf = $("#cpf").val();
                sessionStorage.setItem("proposta", proposta);
                sessionStorage.setItem("cpf", cpf);
            } else {
                proposta = sessionStorage.getItem("proposta");
                cpf = sessionStorage.getItem("cpf");
            }

            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,
                correctOrientation: false,
                targetWidth: 768,
                targetHeight: 768,
                destinationType: Camera.DestinationType.DATA_URL
            });
        });

        function onSuccess(imageURI) {
            try {
                window.location.href = "../views/captura.html?uri=" + imageURI;
            } catch (erro) {
                alert(erro);
            }
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }

        function convertImgToBase64(url, callback, outputFormat) {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function () {
                var canvas = document.createElement('CANVAS');
                var ctx = canvas.getContext('2d');
                canvas.height = this.height;
                canvas.width = this.width;
                ctx.drawImage(this, 0, 0);
                var dataURL = canvas.toDataURL(outputFormat || 'image/jpg');
                callback(dataURL);
                canvas = null;
            };
            img.src = url;
        }

        function onSuccessConvert(base64Img) {
            alert(base64Img);
            everlive.Files.create({
                Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
                ContentType: "image/jpeg",
                base64: base64Img
            });
        }

    });
}());