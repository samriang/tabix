/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 */

'use strict';

class Widget {
    constructor(DataProvider,draw=false) {
        this.data = DataProvider;
        this._draw=draw;
        this.init=false;
        this.x=0;
        this.y=0;
        this.height=1;
        this.width=6;
        this.type=false;
    }

    toString() {
        return '(' + this.name + ', ' + this.y + ')';
    }
}

class WidgetDraw extends Widget
{
    constructor(DataProvider, draw) {
        super(DataProvider, draw);

        this.height=1;
        this.width=12;
        this.type="amchart";
        this.init=true;

    }
}

class WidgetPivot extends Widget
{
    constructor(DataProvider, draw) {
        super(DataProvider, draw);

        this.height=1;
        this.width=6;
        this.type="pivot";
        this.init=true;
        this.pivot={
            config:{}
        };
    }
}
class WidgetTable extends Widget
{
    constructor(DataProvider, draw) {
        super(DataProvider, draw);

        this.height=1;
        this.width=12;
        this.init=true;
        this.type='table';


        this.items = [
            {
                "id": 1,
                "name": {
                    "first": "John",
                    "last": "Schmidt"
                },
                "address": "45024 France",
                "price": 760.41,
                "isActive": "Yes",
                "product": {
                    "description": "Fried Potatoes",
                    "options": [
                        {
                            "description": "Fried Potatoes",
                            "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png"
                        },
                        {
                            "description": "Fried Onions",
                            "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png"
                        }
                    ]
                }
            },
            //more items go here
        ];
        let handsontable=this.makeColumns();

        // make columns

        this.table= {
            settings: {
                dropdownMenu: true,
                // manualColumnResize: handsontable.columns,
                // colWidths:handsontable.colWidths;
                // manualColumnMove: true,
                // manualColumnResize: true,
                //
                // autoWrapRow: true,
                // // rowHeaders: true,
                // // colHeaders: _(headers).map(function(header, i) {
                // //     return "<report-header display-name='" + header.colName + "' index='" + i + "' > </report-header>";
                // // }),
                // //colWidths: 100,
                // rowHeights: [50, 40, 100],
                // renderer: 'html',
                // fillHandle: false,
                // stretchH: 'all',
                // preventOverflow: 'horizontal',
                // persistentState:true,
                // contextMenu: ['row_above', 'row_below', 'remove_row'],
                // filters: true,
                //
                // // fixedRowsTop: 1,
                // // fixedColumnsLeft: 1,
                columnSorting: true,
                sortIndicator: true,
                manualRowResize: true,
                // viewportColumnRenderingOffset:'auto',
                // // maxRows: 10,
                // // visibleRows:10,
                //
                // wordWrap:false,
                // // autoColumnSize: {
                // //     samplingRatio: 23
                // // }

            },
            columns: handsontable.columns,
            colHeaders: handsontable.colHeaders
        }
        ;

        console.table(this.table);



    }

    makeColumns() {
    // colHeaders: ['A', 'B', 'C', 'D'],
    // colWidths: [200, 200, 200, 200, 200],
    // columns: [
    //     { data: 'a' },
    //     { data: 'b' },
    //     { data: 'c' },
    //     { data: 'd' }
    // ],
    // data: data,

        let colHeaders = [];
        let columns = [];
        this.data.meta.forEach((cell) => {

            colHeaders.push(cell.name);
            let c={};
            c.type='text';
            c.width=100;


            switch (cell.type) {
                case 'Date':        c.width=90; c.type='date'; c.dateFormat='MM/DD/YYYY';break;
                case 'DateTime':    c.width=150; c.type='time'; c.timeFormat='HH:mm:ss'; break;
                case 'Int32':       c.width=80;c.type='numeric'; break;
                case 'Float64':     c.width=80; c.type='numeric';c.format='0,0.0000';break;
                case 'UInt32':      c.width=80; c.type='numeric';break;
                case 'String':      c.width=180; break;
            }

            c.data=cell.name;
            columns.push(c);
        });

        return {
            colHeaders: colHeaders,
            columns: columns
    };
};

}


angular.module(smi2.app.name).service('Widget', Widget);
angular.module(smi2.app.name).service('WidgetDraw', WidgetDraw);
angular.module(smi2.app.name).service('WidgetTable', WidgetTable);
angular.module(smi2.app.name).service('WidgetPivot', WidgetPivot);
// Widget.$inject = ['$http', '$q', 'localStorageService', '$sanitize', 'ThemeService'];