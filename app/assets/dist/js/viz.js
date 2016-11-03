function getAlertCountByDayAndTag(alerts, date, tag) {
    var format = d3.time.format('%Y-%m-%d');
    return alerts.filter(function (x) {
        return format(new Date(x.createdAtTimestamp)) == format(date) && x.tag.indexOf(tag) > -1;
    }).length;
}

function getAlertCountByOwner(alerts) {
    var owners = [];
    alerts.forEach(function (x) {
        var key = '';

        if (!x.owner) {
            key = 'No owner'
        }
        else {
            key = x.owner
        }

        if (!owners[key]) {
            owners[key] = [];
        }
        owners[key].push(x);
    });

    columns = [];

    for (var i in owners) {
        var count = owners[i].length;
        columns.push([i, count]);

    }
    return columns;
}

function renderOwnerPieChart(allData) {
    c3.generate({
        bindto: '#pieChartByOwner',
        data: {
            type: 'pie',
            columns: getAlertCountByOwner(allData.alerts)
        }
    });
}

function renderDayTagLineChart(allData) {
    var dateFormat = d3.time.format('%Y-%m-%d'),
        tags = {},
        columns = [];

    allData.alerts.forEach(function (x) {
        x.tag.forEach(function (tag) {
            tags[tag] = true;
        })
    });

    tags = Object.keys(tags);

    var dates = allData.alerts.map(function (x) {
        return dateFormat(new Date(x.createdAtTimestamp));
    }).sort();

    tags.forEach(function (tag) {
        var counts = allData.alerts.map(function (x, i) {
            return getAlertCountByDayAndTag(allData.alerts, dateFormat.parse(dates[i]), tag)
        });
        counts.splice(0, 0, tag);
        columns.push(counts);
    });

    dates.splice(0, 0, 'x');
    columns.push(dates);

    var chart = c3.generate({
        bindto: '#chart',
        data: {
            x: 'x',
            xFormat: '%Y-%m-%d', // 'xFormat' can be used as custom format of 'x'
            columns: columns
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m-%d'
                }
            }
        },
        subchart: {
            show: true
        }
    })
}

d3.json('services/static/alerts.json', function (err, allData) {
    renderDayTagLineChart(allData);
    renderOwnerPieChart(allData);

});