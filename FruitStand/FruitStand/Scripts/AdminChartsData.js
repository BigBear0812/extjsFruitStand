Ext.require(['Ext.data.*']);

Ext.onReady(function () {

    window.generateData = function (n, floor) {
        var data = [];

        floor = (!floor && floor !== 0) ? 20 : floor;

        for (var i = 0; i < (n || 12) ; i++) {
            data.push({
                name: Ext.Date.monthNames[i % 12],
                data1: Math.floor(Math.max((Math.random() * 100), floor))
            });
        }
        return data;
    };
    
    window.generateFruitData = function (n, floor) {
        var data = [];
        var names = ['Apple', 'Blueberry', 'Strawberry', 'Orange', 'Banana', 'Grape'];
        var prices = [4, 5, 12, 1, 40, 20];
        floor = (!floor && floor !== 0) ? 20 : floor;

        for (var i = 0; i < (n || 6); i++) {
            data.push({
                name: names[i],
                data1: Math.floor(Math.max((Math.random() * 100), floor)),
                price: prices[i]
            });
        }
        return data;
    };

    window.store1 = Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data1'],
        data: generateData()
    });
    window.store2 = Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data1', 'price'],
        data: generateFruitData()
    });


});