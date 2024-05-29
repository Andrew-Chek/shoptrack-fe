import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {

    chartTypes: string[] = ['vertical bar', 'horizontal bar', 'grouped vertical bar', 'grouped horizontal bar', 'pie chart', 'pie grid'];
    themes: string[] = ['dark', 'light'];
    selectedChartType: string = 'vertical bar';
    selectedTheme: string = 'light';
  
    chartData = [
        { name: 'KitKat', value: 35 },
        { name: 'Oranges', value: 77 }
    ];
  
    view: [number, number] = [700, 400];
    colorScheme: Color = {
      name: 'light',
      selectable: true,
      group: ScaleType.Ordinal,
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
  
    // Options for the charts
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    showYAxisLabel = true;
    xAxisLabel = 'Products';
    yAxisLabel = 'Sales';
  
    constructor() { }
  
    importData(event: any) {
      // Handle data import
    }
  
    generateChart() {
      // Set color scheme based on the selected theme
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
  
      // Generate the chart based on the selected type
    }
}
