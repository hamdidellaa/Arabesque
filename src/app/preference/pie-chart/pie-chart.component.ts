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
    const width = 1300;
    const height = 700;
    const element = this.chartContainer.nativeElement;

    const colors = d3.scaleOrdinal(d3.schemeDark2);
    const svg = d3
      .select(element)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const data = d3
      .pie()
      .sort(null)
      .value(function(d: any) {
        return d.value;
      })(this.data);

    const segments: any = d3
      .arc()
      .innerRadius(0)
      .outerRadius(300)
      .padAngle(0.05)
      .padRadius(50);
    const sections = svg
      .append("g")
      .attr("transform", "translate(570, 350)")
      .attr("width", "1200")
      .selectAll("path")
      .data(data);

    sections
      .enter()
      .append("path")
      .attr("d", segments)
      .attr("fill", function(a: any) {
        return colors(a.data.value);
      });

    const content = d3
      .select("g")
      .selectAll("text")
      .data(data);
    content
      .enter()
      .append("text")
      .classed("pieText", true)
      .each(function(h: any) {
        var center = segments.centroid(h);
        d3.select(this)
          .attr("x", center[0])
          .attr("y", center[1])
          .text(h.data.value);
      });

    const legends = svg
      .append("g")
      .attr("transform", "translate(900,10)")
      .selectAll(".legends")
      .data(data);
    const legend = legends
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
      .attr("fill", function(d: any) {
        return colors(d.data.value);
      });

    legend
      .append("text")
      .classed("label", true)
      .text(function(d: any) {
        return d.data.preferance + " : " + d.data.value;
      })
      .attr("fill", function(d: any) {
        return colors(d.data.value);
      })
      .attr("x", 30)
      .attr("y", 15);

    ///////////
    const tooltip = d3
      .select(element)
      .append("div")
      .attr("class", "tooltip");
    tooltip.append("div").attr("class", "label");
    tooltip.append("div").attr("class", "count");

    content.on("mouseover", function(d: any) {
      tooltip.select(".label").html("d.data.preferance");
      tooltip.select(".count").html("d.data.value");
      tooltip.style("display", "block");
    });
    content.on("mouseout", function() {
      tooltip.style("display", "none");
    });

    content.on("mousemove", function(d) {
      tooltip
        .style("top", d3.event.layerY + 10 + "px")
        .style("left", d3.event.layerX + 10 + "px");
    });

    ///////////
  }
}
