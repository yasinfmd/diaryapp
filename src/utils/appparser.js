export const urlParse = {
    parse: function (value, type) {
        var dizi = [];
        var param = value.split("&");
        param.forEach(function (row, index) {
            if (row.indexOf("=") > 0) {
                var value = row.split("=");

                dizi.push({
                    PropertyName: value[0],
                    Operation: value[1].split(",").length > 1 ? "IN" : "EQ",
                    PropertyValue: value[1]
                });
            } else if (row.indexOf("<") > 0) {
                var value = row.split("<");
                dizi.push({
                    PropertyName: value[0],
                    Operation: "LT",
                    PropertyValue: value[1]
                });
            } else if (row.indexOf(">") > 0) {
                var value = row.split(">");
                dizi.push({
                    PropertyName: value[0],
                    Operation: "GT",
                    PropertyValue: value[1]
                });
            } else if (row.indexOf("%") > 0) {
                var value = row.split("%");
                dizi.push({
                    PropertyName: value[0],
                    Operation: "CT",
                    PropertyValue: value[1]
                });
            } else if (row.indexOf("-") > 0) {
                var value = row.split("-");
                dizi.push({
                    PropertyName: value[0],
                    Operation: "NE",
                    PropertyValue: value[1]
                });
            } else if (row.indexOf("!") > 0) {
                var value = row.split("!");
                if (type == "N") {
                    value[1] = parseFloat(value[1]);
                }
            }
        });
        return dizi;
    },
}
