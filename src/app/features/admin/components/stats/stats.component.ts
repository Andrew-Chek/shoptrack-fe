import { StatisticsService } from './../../../../core/api/stats.service';
import { Location } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaxDiscountPerProductDto } from '@app/core/dto/discount-per-product.api.interface';
import { ProductPriceDto } from '@app/core/dto/product.price.api.interface';
import { IconEnum } from '@app/core/icons.enum';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {

    @ViewChild('chart') chart!: ElementRef;

    chartTypes: string[] = ['vertical bar', 'horizontal bar', 'grouped vertical bar', 'grouped horizontal bar', 'pie chart', 'pie grid'];
    themes: string[] = ['dark', 'light'];
    selectedChartType: string = 'vertical bar';
    selectedTheme: string = 'light';
    dataShortCuts: ChartInfo[] = 
    [
        {
            "dataInfo": "Max discounts per product",
            "possibleChartTypes": ["vertical bar", "horizontal bar"],
            "xLabel": "Product",
            "yLabel": "Discount"
        },
        {
            "dataInfo": "Cheapest products in a store",
            "possibleChartTypes": ["vertical bar", "horizontal bar", "pie chart"],
            "xLabel": "Product",
            "yLabel": "Price"
        },
        {
            "dataInfo": "Most expensive products in a store",
            "possibleChartTypes": ["vertical bar", "horizontal bar", "pie chart"],
            "xLabel": "Product",
            "yLabel": "Price"
        },
        {
            "dataInfo": "Product counts in lists per store",
            "possibleChartTypes": ["grouped vertical bar", "grouped horizontal bar"],
            "xLabel": "Product",
            "yLabel": "Lists Count"
        }
    ];

    selectedDataShortCut: string = this.dataShortCuts[0].dataInfo;
    filteredDataShortCuts: ChartInfo[] = this.dataShortCuts.filter(data => data.possibleChartTypes.some(type => type === this.selectedChartType));

    storeName = this.route.snapshot.params['storeName'];
    backIcon = IconEnum.BackIcon;

    constructor(
        private location: Location, 
        private statsService: StatisticsService,
        private route: ActivatedRoute
    ) { }

    onChartDataChange(selectedData: string) {
        this.selectedDataShortCut = selectedData;
        const chartInfo = this.dataShortCuts.find(data => data.dataInfo === selectedData);
        this.xAxisLabel = chartInfo!.xLabel;
        this.yAxisLabel = chartInfo!.yLabel;
    }

    exportChart() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const svgElement = this.chart.nativeElement.querySelector('svg');

        const svgData = new XMLSerializer().serializeToString(svgElement);
        const img = new Image();
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            
            context!.fillStyle = 'white';
            context!.fillRect(0, 0, canvas.width, canvas.height);
            
            context!.drawImage(img, 0, 0);

            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'chart.png';
            link.click();
        };
    }
  
    chartData = [
        { name: 'KitKat', value: 35 },
        { name: 'Oranges', value: 77 }
    ];
  
    view: [number, number] = this.getView();
    colorScheme: Color = {
        name: 'light',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    public getView(): [number, number] {
        if(window.innerWidth < 512) {
            return [window.innerWidth - 30, 400];
        }
        return [window.innerWidth - 100, 500];
    }

    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    showYAxisLabel = true;
    xAxisLabel = 'Products';
    yAxisLabel = 'Sales';
    groupPadding = 16;
  
    generateChart() {
        if (this.selectedTheme === 'dark') {
            this.colorScheme = {
                name: 'dark',
                selectable: true,
                group: ScaleType.Ordinal,
                domain: ['#1f1f1f', '#525252', '#737373', '#969696']
            };
        } else {
            this.colorScheme = {
                name: 'light',
                selectable: true,
                group: ScaleType.Ordinal,
                domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
            };
        }

        const selectedChartData = this.dataShortCuts.find(data => data.dataInfo === this.selectedDataShortCut);
        if(selectedChartData?.dataInfo === 'Max discounts per product') {
            this.statsService.getMaxDiscountsPerProduct(this.storeName).subscribe((data) => {
                console.log(data);
                this.chartData = this.transformData(data, 'maxDiscounts');
            });
        } else if(selectedChartData?.dataInfo === 'Cheapest products in a store') {
            this.statsService.getCheapestProducts().subscribe((data) => {
                this.chartData = this.transformData(data, 'cheapestProducts');
            });
        } else if(selectedChartData?.dataInfo === 'Most expensive products in a store') {
            this.statsService.getMostExpensiveProducts().subscribe((data) => {
                this.chartData = this.transformData(data, 'mostExpensiveProducts');
            });
        } else if(selectedChartData?.dataInfo === 'Product counts in lists per store') {
            this.statsService.getProductsInListPerStore(this.storeName).subscribe((data) => {
                this.chartData = this.transformData(data, 'productInListPerStore');
            });
        }
    }

    transformData(data: any, type: string) {
        let transformedData: { name: string, value: number }[] = [];
        switch (type) {
            case 'maxDiscounts':
            transformedData = data.map((item: MaxDiscountPerProductDto) => ({
                name: item.productName,
                value: item.maxDiscount
            }));
            break;
            // case 'cheapestProducts':
            // this.data = data.map((item: ProductPriceDto) => ({
            //     name: item.productName,
            //     value: item.price
            // }));
            // break;
            // case 'mostExpensiveProducts':
            // this.data = data.map((item: ProductPriceDto) => ({
            //     name: item.productName,
            //     value: item.price
            // }));
            // break;
            // default:
            // console.error('Unknown data type');
        }

        return transformedData;
    }

    goToAdminStores() {
        this.location.back();
    }
}

interface ChartInfo {
    dataInfo: string;
    possibleChartTypes: string[];
    xLabel: string;
    yLabel: string;
}
