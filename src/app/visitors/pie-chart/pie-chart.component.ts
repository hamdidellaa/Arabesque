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
    if (this.data.length==2) {
      return;
    } else {
      this.createChart();
    }
  }

  createChart() {
    d3.select("svg").remove();
    const width = 600;
    const height = 500;
    const element = this.chartContainer.nativeElement;

    const colors = d3.scaleOrdinal(d3.schemeDark2);
    let svg = d3
      .select(element)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      

    let data = d3
      .pie()
      .sort(null)
      .value(function(d) {
        return d.nbVisite;
      })(this.data);
    console.log(data);

    let segments = d3
      .arc()
      .innerRadius(0)
      .outerRadius(200)
      .padAngle(0.05)
      .padRadius(50);
    let sections = svg
      .append("g")
      .attr("transform", "translate(250, 250)")
      .selectAll("path")
      .data(data);

    sections
      .enter()
      .append("path")
      .attr("d", segments)
      .attr("fill", function(a) {
        return colors(a.data.nbVisite);
      });

    let content = d3
      .select("g")
      .selectAll("text")
      .data(data);
    content
      .enter()
      .append("text")
      .each(function(h) {
        var center = segments.centroid(h);
        d3.select(this)
          .attr("x", center[0])
          .attr("y", center[1])
          .text(h.data.nbVisite);
      });
  }
}
