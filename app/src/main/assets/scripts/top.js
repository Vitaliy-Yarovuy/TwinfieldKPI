var responseDataMock = {
    "periods": [{
        "startInDays": 0,
        "endInDays": 30,
        "invoiceAmount": 502.85,
        "invoiceCount": 6.0
    }, {
        "startInDays": 31,
        "endInDays": 60,
        "invoiceAmount": 200.43,
        "invoiceCount": 4.0
    }, {
        "startInDays": 61,
        "endInDays": 90,
        "invoiceAmount": 56.0,
        "invoiceCount": 5.0
    }, {
        "startInDays": 91,
        "endInDays": null,
        "invoiceAmount": 9.91,
        "invoiceCount": 3.0
    }]
}

function normaliseBarValue(value, min, max){
    var minDiff = (max - min)/50;
    var absValue = Math.abs(value);
    var sign = value >= 0 ? 1 : -1;
    if(min === 0 && max === 0){
        return 1;
    } else if( absValue < minDiff ){
        return minDiff  * sign;
    }
    return value;
}

function prepareChartdata(response) {
    var periods = response.periods;
    var labels = series = null;
    var maxInvoiceAmount = minInvoiceAmount = 0;

    var dataObject = {
        options: {
            height: 210,
            width: 340,
            axisX: {
                showGrid: false
            },
            axisY: {
                scaleMinSpace: 20,
                showLabel: false
            },
            plugins: [
                Chartist.plugins.ctBarLabels({
                    labelInterpolationFnc: function(value, meta, data){
                        return meta;
                    }
                })
            ]
        },
        data: {
            labels: null,
            series: []
        }
    };

    var totalOverdue = periods.reduce(function(sum, item){
        maxInvoiceAmount = Math.max(maxInvoiceAmount,item.invoiceAmount);
        minInvoiceAmount = Math.min(minInvoiceAmount,item.invoiceAmount);
        return sum + item.invoiceAmount;
    },0);

    document.getElementById('total-overdue').innerHTML = '€' + totalOverdue.toFixed(2);

    if (maxInvoiceAmount === 0 && minInvoiceAmount === 0) {
        dataObject.options.high = 70;
    } else {
        dataObject.options.high = Math.floor((maxInvoiceAmount - minInvoiceAmount) * 1.25 + minInvoiceAmount + 5);
    }

    labels = periods
        .map(function(period ){
            var label;
            if(period.endInDays == null){
                label = period.startInDays + "+";
            } else {
                label = period.startInDays + "-" + period.endInDays ;
            }
            label += " " + 'days' + '\n' + 'overdue';
            console.log('label',label);
            return label;
        });

    series = periods.map(function(period){
        return {
            value: normaliseBarValue(period.invoiceAmount, minInvoiceAmount, maxInvoiceAmount),
            meta:  period.invoiceAmount + '€' + "\n" + period.invoiceCount  + " " + 'invoices'
        };
    });

    dataObject.data.labels = labels;
    dataObject.data.series = [series];

    return dataObject;
}

function createBarChart(response) {
    var chart = prepareChartdata(response);
    console.log('chart.data',chart.data);
    new Chartist.Bar('.ct-chart', chart.data, chart.options);
}

createBarChart(responseDataMock);





