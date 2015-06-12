(function () {
        function getUrlVars() {
            var vars = [],
                hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }

        document.addEventListener("deviceready", function () {

            var img = getUrlVars()["uri"];

            if (sessionStorage["images"] === undefined) {
                var images = [];
                images[0] = img;
                sessionStorage["images"] = JSON.stringify(images);
            } else {
                var storedImages = JSON.parse(sessionStorage["images"]);
                storedImages.push(img);
                sessionStorage["images"] = JSON.stringify(storedImages);
            }

            var storedImages = JSON.parse(sessionStorage["images"]);

            for (i = 0; i < storedImages.length; i++) {
                var html = "<li id='image" + i + "'><image style='max-width: 100%; position:relative' src='data:image/jpg;base64," + storedImages[i] + "'/> <image class='button-excluir' data-id='" + i + "' src='../img/32/Delete-32.png' style='position: absolute; top: 15px; left: 20px'/></li>";
                $("#images").append(html);
            }

            $('#button-concluir').click(function () {
                if (sessionStorage.getItem("isPendencia") == 1) {

                    try {
                        proposta = sessionStorage.getItem("proposta");
                        var apiKey = "kSrpI2x2pp9EPl65";
                        var el = new Everlive(apiKey);

                        var dataSource = new kendo.data.DataSource({
                            type: "everlive",
                            transport: {
                                typeName: "Formulario"
                            },
                            serverFiltering: true,
                            filter: {
                                logic: "and",
                                filters: [{
                                    field: "proposta",
                                    operator: "eq",
                                    value: proposta
                    			}]
                            }
                        });

                        dataSource.fetch(function () {
                            var view = dataSource.at(0);;
                            view.set("temPendencia", 0);
                            dataSource.sync();
                        });


                    } catch (erro) {
                        alert(erro);
                    }

                    var storedImages = JSON.parse(sessionStorage["images"]);

                    var files = [];
                    for (i = 0; i < storedImages.length; i++) {
                        var file = {
                            "Filename": proposta + "_" + i + ".jpg",
                            "ContentType": "image/jpg",
                            "CustomField": "customValue",
                            "base64": storedImages[i]
                        };

                        el.Files.create(file, onSuccess, onFail);
                    }

                } else {
                    window.location.href = "../views/formulario.html";
                }
            });
            var int = 0;

            function onSuccess(data) {
                try {
                    var storedImages = JSON.parse(sessionStorage["images"]);
                    int = int + 1;

                    if (int === storedImages.length) {
                        sessionStorage.clear();
                        window.location.href = "../index.html#index";
                    }
                } catch (erro) {
                    alert(erro);
                }
            }

            function onFail(error) {
                alert('Failed because: ' + message);
            }

            /*$('#button-capturar').click(function () {
                if ($("#proposta").val() !== undefined) {
                    proposta = $("#proposta").val();
                    cpf = $("#cpf").val();
                    sessionStorage.setItem("proposta", proposta);
                    sessionStorage.setItem("cpf", cpf);
                } else {
                    proposta = sessionStorage.getItem("proposta");
                    cpf = sessionStorage.getItem("cpf");
                }

                navigator.camera.getPicture(function (imageURI) {
                        var index;
                        if (sessionStorage["images"] === undefined) {
                            var images = [];
                            images[0] = imageURI;
                            sessionStorage["images"] = JSON.stringify(images);
                            index = 0;
                        } else {
                            var storedImages = JSON.parse(sessionStorage["images"]);
                            storedImages.push(imageURI);
                            index = storedImages.length - 1;
                            sessionStorage["images"] = JSON.stringify(storedImages);
                        }

                        $("#images").empty();

                        var storedImages = JSON.parse(sessionStorage["images"]);

                        for (i = 0; i < storedImages.length; i++) {
                            var html = "<li id='image" + i + "'><image style='max-width: 100%; position:relative' src='data:image/jpg;base64," + storedImages[i] + "'/> <image class='button-excluir' data-id='" + i + "' src='../img/32/Delete-32.png' style='position: absolute; top: 15px; left: 20px'/></li>";
                            $("#images").append(html);
                        }
                    
                    },
                    function (message) {
                        alert('Failed because: ' + message);
                    }, {
                        quality: 50,
                        correctOrientation: false,
                        targetWidth: 768,
                        targetHeight: 768,
                        destinationType: Camera.DestinationType.DATA_URL
                    });
            });*/


            $('.button-excluir').click(function () {
                var id = this.getAttribute("data-id");
                $("#image" + id).remove();

                if (id > -1) {
                    var storedImages = JSON.parse(sessionStorage["images"]);
                    if (storedImages.length === 1) {
                        var proposta = sessionStorage.getItem("proposta");
                        var cpf = sessionStorage.getItem("cpf");
                        sessionStorage.clear();
                        sessionStorage.setItem("proposta", proposta);
                        sessionStorage.setItem("cpf", cpf);
                    } else {
                        storedImages.splice(id, 1);
                        sessionStorage["images"] = JSON.stringify(storedImages);
                    }
                }
            });

            /*app = new kendo.mobile.Application(document.body);
            window.app = app;*/
        }, false);

    }
    ());