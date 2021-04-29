import { AccountService } from './../../../Services/account.service';
import { User } from './../../../Models/user';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
})
export class BarchartComponent implements OnInit {
  users: User[] = [];
  public barChartType = 'bar';
  public barChartLabel = [];
  public barChartData = [];

  public barChartOption = {
    scalesShowVerticalLines: false,
    responsive: true,
    layout: {
      padding: {
        top: 10,
      },
    },
    tooltips: {
      enabled: true,
    },
    element: {
      rectangle: {
        borderWidth: 0,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            // drawBorder: false,
            borderDash: [5, 2],
            zeroLineBorderDash: [5, 2],
            zeroLineColor: '#c5c0bc',
            color: '#c5c0bc',
          },
          ticks: {
            fontStyle: 'normal',
          },
        },
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            display: true,
            drawBorder: false,
            lineWidth: 1,
          },
          ticks: {
            min: 0,
            max: 100,
          },
        },
      ],
    },
  };

  constructor(private accountService: AccountService) {
    this.addbarChart();
  }

  ngOnInit(): void {}
  addbarChart() {
    // this.barChartData = [];
    this.barChartData.push({ data: [], label: 'Users' });
    this.accountService
      .getAll()
      .subscribe((users) => {
        this.users = users['value'];
        this.users.forEach((u) => {
          this.barChartLabel.push(u.Fname);

          //dataChart.push(u.YearOld1);
          this.barChartData[0].data.push(u.YearOld1);
        });
      });
  }
}
