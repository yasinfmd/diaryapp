export const urlParse = {
    parse: function (value, type) {
        var parsedarray = [];
        var param = value.split("&");
        var val;
        param.forEach(function (row, index) {
            if (row.indexOf("=") > 0) {
                val = row.split("=");

                parsedarray.push({
                    PropertyName: val[0],
                    Operation: val[1].split(",").length > 1 ? "IN" : "EQ",
                    PropertyValue: val[1]
                });
            } else if (row.indexOf("<") > 0) {
                val = row.split("<");
                parsedarray.push({
                    PropertyName: val[0],
                    Operation: "LT",
                    PropertyValue: val[1]
                });
            } else if (row.indexOf(">") > 0) {
                val = row.split(">");
                parsedarray.push({
                    PropertyName: val[0],
                    Operation: "GT",
                    PropertyValue: val[1]
                });
            } else if (row.indexOf("%") > 0) {
                val = row.split("%");
                parsedarray.push({
                    PropertyName: val[0],
                    Operation: "CT",
                    PropertyValue: val[1]
                });
            } else if (row.indexOf("-") > 0) {
                val = row.split("-");
                parsedarray.push({
                    PropertyName: val[0],
                    Operation: "NE",
                    PropertyValue: val[1]
                });
            } else if (row.indexOf("!") > 0) {
                val = row.split("!");
                if (type == "N") {
                    val[1] = parseFloat(val[1]);
                }
            }
        });
        return parsedarray;
    },
}
