var lib = (() => {
    var instance = {};
    var res;
    var newLine;
    var tab;
    var addSpan = (cls, val, index = "") => {
        return `<span ng-class="options('${cls}')" data-before="${index}">${val}</span>`
    }
    var closeObj = () => {
        if (newLine != "") res = res.slice(0,-2)
        else res = res.slice(0, -1);
    }
    var travel = (obj, prefix) => {
        //JSON types: string, number, array, object, null, boolean
        var isArray = Array.isArray(obj);
        var propertyField;
        let currentIndex = 0;
        for (var property in obj) {
            ///Array => just value
            propertyField = addSpan("key", '"' + property + '"') + ":";
            if (isArray)
                propertyField = addSpan("index", "", currentIndex++);


            if (obj[property] === null) {
                res += prefix + propertyField + addSpan("null", "null") + "," + newLine;
                continue;
            }
            if (typeof obj[property] === 'object') {
                let openc = '{';
                let closec = '}';
                let realType = 'object';
                if (Array.isArray(obj[property])) {
                    openc = '[';
                    closec = ']';
                    realType = 'array';
                }
                res += prefix + propertyField + addSpan(realType, openc) + newLine;
                travel(obj[property], prefix + tab);
                closeObj();
                res += newLine;
                res += prefix + addSpan(realType+"-close",closec) + "," + newLine;
                continue;
            }
            //String, Number, Boolean
            var val = obj[property];
            if (typeof obj[property] == 'string')
                val = '"' + val + '"';
            res += prefix + propertyField + addSpan(typeof obj[property], val) + "," + newLine;
        }
    }
    var getPrettyJson = (obj, tabSize, lineBreak) => {
        newLine = lineBreak ? "\n" : "";
        tab = Array(tabSize).join(' ');
        res = addSpan('object','{') + newLine;
        travel(obj, tab);
        closeObj();
        // res = res.slice(0, -2);
        res += newLine;
        res += "}";
        console.log(res);
        return res;
    }

    instance.getPrettyJson = getPrettyJson;

    return instance;
})();