import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import * as d3 from "d3";
import { DataBarModel } from "src/app/models/data.model";
@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./pie-chart.component.css"]
})
export class PieChartComponent implements OnChanges {
  @ViewChild("pieChart")
  private chartContainer: ElementRef;
  @Input()
  data: any;
  constructor() {}

  ngOnChanges(): void {
    if (!this.data) {
      return;
    } else {
      this.createChart();
    }
  }

  createChart() {
    // d3.select("svg").remove();
    const width = 1300;
    const height = 700;
    const element = this.chartContainer.nativeElement;

    const colors = d3.scaleOrdinal(d3.schemeDark2);
    let svg = d3
      .select(element)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    let data = d3
      .pie()
      .sort(null)
      .value(function(d) {
        return d.value;
      })(this.data);

    let segments = d3
      .arc()
      .innerRadius(0)
      .outerRadius(330)
      .padAngle(0.05)
      .padRadius(50);
    let sections = svg
      .append("g")
      .attr("transform", "translate(350, 350)")
      .attr("width", "1200")
      .selectAll("path")
      .data(data);

    sections
      .enter()
      .append("path")
      .attr("d", segments)
      .attr("fill", function(a) {
        return colors(a.data.value);
      });

    let content = d3
      .select("g")
      .selectAll("text")
      .data(data);
    content
      .enter()
      .append("text")
      .classed("pieText",true)
      .each(function(h) {
        var center = segments.centroid(h);
        d3.select(this)
          .attr("x", center[0])
          .attr("y", center[1])
          .text(h.data.value);
      });

    let legends = svg
      .append("g")
      .attr("transform", "translate(700,10)")
      .selectAll(".legends")
      .data(data);
    let legend = legends
      .enter()
      .append("g")
      .classed("legends", true)
      .attr("transform", function(d, i) {
        return "translate(0," + (i + 1) * 30 + ")";
      });
      legend
      .append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", function(d) {
        return colors(d.data.value);
      })

    legend
      .append("text")
      .classed("label", true)
      .text(function(d) {
        return d.data.preferance + " : " + d.data.value;
      })
      .attr("fill", function(d) {
        return colors(d.data.value);
      })
      .attr("x", 30)
      .attr("y", 18);
  }
}
