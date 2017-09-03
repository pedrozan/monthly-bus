let monthForm = document.querySelector("#days-form");

let opt = '1 <select id="day-1"><option value="1">One</option><option value="2">Two</option></select><br>';
opt += '2 <select id="day-2"><option value="1">One</option><option value="2">Two</option></select>';
monthForm.innerHTML = opt;

//    var monthTrips = [
//        {
//            Day: "1"
//            Trips: document.querySelector("#day-1").value,
//        },
//        {
//            Day: "2",
//            Trips: document.querySelector("#day-1").value,
//        },
//    ];

    function convertArrayOfObjectsToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    function downloadCSV(args) {
        var data, filename, link;

        let monthTrips = prepareData();

        var csv = convertArrayOfObjectsToCSV({
            data: monthTrips 
        });
        if (csv == null) return;

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }

    function prepareData() {
        let tripsday1 = document.querySelector("#day-1").value,
            tripsday2 = document.querySelector("#day-2").value;
        var key=["Day", "Trips"]
        var value=[["Day 1",tripsday1],["Day 2",tripsday2]]; // notice it's an array of array instead of an array of objects

        var elements = [];

        for (var i = 0; i< value.length; i++) {
            var elem = new Object();
            for (var j=0; j< key.length; j++) {
                elem[key[j]] = value[i][j];
            }
            elements.push(elem);
        } 

        return elements;
    }
