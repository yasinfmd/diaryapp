export const readFileBase64 = (file) => {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var binaryFile = "";
            var base64File;
            if (typeof reader.readAsBinaryString === "undefined") {
                var bytes = new Uint8Array(e.target.result);
                for (var i = 0; i < bytes.byteLength; i++) {
                    binaryFile += String.fromCharCode(bytes[i]);
                }
                base64File = btoa(binaryFile);
            } else {
                base64File = btoa(e.target.result);
            }
            var data = {
                name: file.name,
                type: file.type != null ? file.type : file.name.split(".").pop(),
                size: file.size.toString(),
                base64: base64File
            };
            resolve(data);
        };
        if (typeof reader.readAsBinaryString !== "undefined") {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        }
    });
}
