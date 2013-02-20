Ext.require('Ext.chart.*');
Ext.require(['Ext.layout.container.Fit', 'Ext.window.MessageBox']);

Ext.onReady(function () {
    
    function updateMyShit() {
        var rows = $('table#simpleForm-formTable').children();
        var values = [];
        for (var v = 0; v < rows.length; v++) {
            var val = parseInt($(rows[v]).find('input').val());
            if (!isNaN(val)) {
                window.store2.data.items[v].data.data1 = val + window.store2.data.items[v].data.data1;
            }
        }
        window.store1.data1 = values;
        chart.redraw();
    }

    var simple = Ext.widget({
        xtype: 'form',
        layout: 'form',
        collapsible: true,
        id: 'simpleForm',
        url: 'save-form.php',
        frame: true,
        title: 'Simple Form',
        bodyPadding: '5 5 0',
        width: 600,
        height: 450,
        colspan:2,
        fieldDefaults: {
            msgTarget: 'side',
            labelWidth: 75
        },
        defaultType: 'textfield',
        items: [{
            fieldLabel: 'Apple $4',
            name: 'apple',
            xtype: 'numberfield',
            minValue: 0,
            maxValue: 100
        }, {
            fieldLabel: 'Blueberry $5',
            name: 'blueberry',
            xtype: 'numberfield',
            minValue: 0,
            maxValue: 100
        }, {
            fieldLabel: 'Strawberry $12',
            name: 'strawberry',
            xtype: 'numberfield',
            minValue: 0,
            maxValue: 100
        }, {
            fieldLabel: 'Orange $1',
            name: 'orange',
            xtype: 'numberfield',
            minValue: 0,
            maxValue: 100
        }, {
            fieldLabel: 'Banana $40',
            name: 'banana',
            xtype: 'numberfield',
            minValue: 0,
            maxValue: 100
        }, {
            fieldLabel: 'Grape $40',
            name: 'grape',
            xtype: 'numberfield',
            minValue: 0,
            maxValue: 100
        }],

        buttons: [{
            text: 'Purchase',
            handler: function () {
                updateMyShit();
                this.up('form').getForm().reset();
            }
        }]
    });

    var donut = false,
        chart = Ext.create('Ext.chart.Chart', {
            xtype: 'chart',
            id: 'chartCmp',
            animate: true,
            store: store2,
            shadow: true,
            legend: {
                position: 'right'
            },
            insetPadding: 60,
            theme: 'Base:gradients',
            series: [{
                type: 'pie',
                field: 'data1',
                showInLegend: true,
                donut: donut,
                tips: {
                    trackMouse: true,
                    width: 140,
                    height: 28,
                    renderer: function (storeItem, item) {
                        //calculate percentage.
                        var total = 0;
                        store1.each(function (rec) {
                            total += rec.get('data1');
                        });
                        this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
                    }
                },
                highlight: {
                    segment: {
                        margin: 20
                    }
                },
                label: {
                    field: 'name',
                    display: 'rotate',
                    contrast: true,
                    font: '18px Arial'
                }
            }]
        });


    var panel2 = Ext.create('widget.panel', {
        width: 600,
        height: 450,
        title: 'Percent Sale by Fruit',
        //renderTo: Ext.getBody(),
        layout: 'fit',
        //tbar: [{
        //    text: 'Save Chart',
        //    handler: function () {
        //        Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function (choice) {
        //            if (choice == 'yes') {
        //                chart.save({
        //                    type: 'image/png'
        //                });
        //            }
        //        });
        //    }
        //}, {
        //    text: 'Reload Data',
        //    handler: function () {
        //        store1.loadData(generateData(6, 20));
        //    }
        //}, {
        //    enableToggle: true,
        //    pressed: false,
        //    text: 'Donut',
        //    toggleHandler: function (btn, pressed) {
        //        var chart = Ext.getCmp('chartCmp');
        //        chart.series.first().donut = pressed ? 35 : false;
        //        chart.refresh();
        //    }
        //}],
        items: chart
    });

    var chart1 = Ext.create('Ext.chart.Chart', {
        xtype: 'chart',
        animate: false,
        store: store1,
        insetPadding: 30,
        axes: [{
            type: 'Numeric',
            minimum: 0,
            position: 'left',
            fields: ['data1'],
            title: false,
            grid: true,
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0'),
                font: '10px Arial'
            }
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: false,
            label: {
                font: '11px Arial',
                renderer: function (name) {
                    return name.substr(0, 3) + ' 11';
                }
            }
        }],
        series: [{
            type: 'line',
            axis: 'left',
            xField: 'name',
            yField: 'data1',
            listeners: {
                itemmouseup: function (item) {
                    Ext.example.msg('Item Selected', item.value[1] + ' visits on ' + Ext.Date.monthNames[item.value[0]]);
                }
            },
            tips: {
                trackMouse: true,
                width: 80,
                height: 40,
                renderer: function (storeItem, item) {
                    this.setTitle(storeItem.get('name'));
                    this.update(storeItem.get('data1'));
                }
            },
            style: {
                fill: '#38B8BF',
                stroke: '#38B8BF',
                'stroke-width': 3
            },
            markerConfig: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0,
                fill: '#38B8BF',
                stroke: '#38B8BF'
            }
        }]
    });


    var panel1 = Ext.create('widget.panel', {
        width: 600,
        height: 450,
        title: 'Sales over the past year',
        layout: 'fit',
        items: chart1
    });
    
    var panel = Ext.create('Ext.panel.Panel', {
        id: 'main-panel',
        baseCls: 'x-plain',
        renderTo: Ext.getBody(),
        layout: {
            type: 'table',
            columns: 2
        },
        // applied to child components
        defaults: { frame: true, width: 600, height: 300 },
        items: [panel1, panel2, simple]
    });

    
});