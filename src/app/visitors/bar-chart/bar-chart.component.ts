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
  selector: "app-bar-chart",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"]
})
export class BarChartComponent implements OnChanges {
  @Input()
  data: DataBarModel[];
  margin = { top: 20, right: 30, bottom: 30, left: 40 };
element : any ;
  constructor() {

  }

  @ViewChild("chart")
  private chartContainer: ElementRef;

  ngOnChanges(): void {
    this.element = this.chartContainer.nativeElement;
    if (!this.data) {
      return;
    } else {
      this.createChart(this.element);
    }
  }

  createChart(element): void {
    d3.select("removeDiv").remove();
    const data = this.data;
  
    const svg = d3
      .select(element)
      .append("removeDiv")
      .append("svg")
      .attr("width", element.offsetWidth)
      .attr("height", 450)
      

    const contentWidth =
      element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = 380
      //element.offsetHeight - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map(d => d.Date));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.nbVisite)]);

    const g = svg
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      );

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + contentHeight + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Visites");

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.Date))
      .attr("y", d => y(d.nbVisite))
      .attr("width", x.bandwidth())
      .attr("height", d => contentHeight - y(d.nbVisite));
  }
}
