import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/CorporateErrorLog/Service/error-handler.service';
import { CorporateErrorService } from 'src/app/CorporateService/corporate-error.service';
import { GooleChart2Service } from 'src/app/Global/goole-chart.service';
import { ClsSet6ScoreModel, CorporateQuestionBM, CorporateTypeModel } from '../../CorporateModel/CorporateQuestionModel';
import { CorporateQuestionService } from '../../CorporateService/corporate-question.service';

declare var google: any;

@Component({
  selector: 'app-corporate-score',
  templateUrl: './corporate-score.component.html',
  styleUrls: ['./corporate-score.component.css']
})
export class CorporateScoreComponent implements OnInit {

  ScoreDetail: CorporateTypeModel[];
  ScoreDetailForSet6: ClsSet6ScoreModel[];

  height: number;
  weight: number;
  private gLib: any;
  loading = false;
  CurrentTestId: number;
  @Input() Question: CorporateQuestionBM;
  MultiBarScoreCard: any;

  constructor(private gChartService: GooleChart2Service,
    private QuesSVC: CorporateQuestionService,
    private _router: Router,
    private _ErrorSvc: ErrorHandlerService) { }

  ngOnInit() {
    debugger
    this.CurrentTestId = this.Question.TestId;
    this.ScoreDetail = Object.assign([], this.Question.ScoreBoard);
    this.ScoreDetailForSet6 = Object.assign([], this.Question.ScoreCardForSet6);

    if (this.Question.CurrentSetId === 1 || this.Question.CurrentSetId === 5 || this.Question.CurrentSetId === 8 || this.Question.CurrentSetId === 9 || this.Question.CurrentSetId === 10 || this.Question.CurrentSetId === 13) {
      this.height = 650;
      this.weight = 750;
    } else if (this.Question.CurrentSetId === 2 || this.Question.CurrentSetId === 6) {
      this.height = 150;
      this.weight = 700;
    } else if (this.Question.CurrentSetId === 3 || this.Question.CurrentSetId === 7) {
      this.height = 220;
      this.weight = 650;
    } else if (this.Question.CurrentSetId === 4) {
      localStorage.removeItem('Apptitude Timer');
      this.height = 470;
      this.weight = 750;
    }
    else if (this.Question.CurrentSetId === 14) {
      this.height = 320;
      this.weight = 850;

      this.ScoreDetail = Object.assign([], this.Question.CompentencyScoreCard.ScoreBoard);
      this.MultiBarScoreCard = this.Question.CompentencyScoreCard.MultiBarScoreCard;

      this.Question.CompentencyScoreCard.MultiBarScoreCard.forEach((number, index) => {
        debugger
        this.gLib = this.gChartService.getGoogle();
        this.gLib.charts.load("current", { packages: ["corechart"] });
        this.gLib.charts.setOnLoadCallback(this.MultiBarChar.bind(JSON.parse(number), index + 1,'#AFABAB','#F2D949'));

      });

    }
    else if (this.Question.CurrentSetId === 15) {
      this.height = 320;
      this.weight = 850;

      this.ScoreDetail = Object.assign([], this.Question.CompentencyScoreCard.ScoreBoard);
      this.MultiBarScoreCard = this.Question.CompentencyScoreCard.MultiBarScoreCard;

      this.Question.CompentencyScoreCard.MultiBarScoreCard.forEach((number, index) => {
        debugger
        this.gLib = this.gChartService.getGoogle();
        this.gLib.charts.load("current", { packages: ["corechart"] });
        this.gLib.charts.setOnLoadCallback(this.MultiBarChar.bind(JSON.parse(number), index + 1,'#628D93','#354350'));

      });

    }
    else if ( this.Question.CurrentSetId === 12) {
      this.height = 420;
      this.weight = 850;
    }
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load("current", { packages: ["corechart"] });
    this.gLib.charts.setOnLoadCallback(this.drawBarChart.bind(this));

  }
  public MultiBarChar(number,color1,color2) {
    debugger
    var ScoreCardData: any = [];
    ScoreCardData = this;
    var data = [];
    var TitleName;

    var Header = ['TypeName', 'NormativeScore', 'Score'];
    data.push(Header);

    ScoreCardData.forEach((score, index) => {
      var temp = [];
      TitleName = score.Title;
      temp.push(score.TypeName);
      temp.push(score.Score1);
      temp.push(score.Score);
      data.push(temp);

    });

    var Chartdata = google.visualization.arrayToDataTable(data);

    var view = new google.visualization.DataView(Chartdata);

    view.setColumns([0,
      // series 0
      1, {
        calc: function (dt, row) {
          debugger
          return dt.getValue(row, 1) + '%';
        },
        type: "string",
        role: "annotation"
      },
      // series 1
      2, {
        calc: function (dt, row) {
          return dt.getValue(row, 2) + '%';
        },
        type: "string",
        role: "annotation"
      }
    ]);
    var options = {
      width: 850,
      height: 380,
      title: number +". "+TitleName,
      chartArea: { width: '45%' },
      annotations: {
        textStyle: {
          color: 'black',
          fontSize: 11,
        },
        alwaysOutside: false
      },
      fontSize: 14,
      bars: 'horizontal', // Required for Material Bar Charts.
      tooltip: { textStyle: { fontName: 'Roboto', fontSize: 12, bold: false } },
      hAxis: {
        title: 'Score',
        minValue: 0,
        viewWindow: {
          min: 0,
          max: 100
        },
        ticks: [0, 20, 40, 60, 80, 100],

        gridlines: {
          color: 'transparent'
        }
      },
      vAxis: {
        title: 'Competency'
      },


      bar: { groupWidth: "75%" },
      series: [{ color: color1, visibleInLegend: true }, { color: color2, visibleInLegend: true }]
    };
    var container_name = 'Multibarchart_' + number;
    var container = document.getElementById(container_name);
    var barchart = new google.visualization.BarChart(container);
    barchart.draw(view, options);


    var chart_div1 = document.getElementById('chart_div_' + number);
    google.visualization.events.addListener(barchart, 'ready', function () {
      document.getElementById('png_' + number).outerHTML = '<a href="' + barchart.getImageURI() + '">Printable version</a>';
      // do something with the image URI, like:

      chart_div1.innerHTML = '<img style="display:none" src="' + barchart.getImageURI() + '" class="img-responsive">';

      //   console.log(chart_div1.innerHTML);

    });

  }
  public drawBarChart() {
    try {
      var data = [];
      var Header = ['TypeName', 'Score', { role: 'style' }];
      data.push(Header);
      this.ScoreDetail.forEach(item => {
        var temp = [];
        temp.push(item.TypeName);
        temp.push(item.Score);
        temp.push(item.ColorCode);
        data.push(temp);
      });
      var Chartdata = google.visualization.arrayToDataTable(data);

      var view = new google.visualization.DataView(Chartdata);
      view.setColumns([0, 1,
        {
          calc: "stringify",
          sourceColumn: 1,
          type: "string",
          role: "annotation"
        },
        2]);


      var options = {

        width: this.weight,
        height: this.height,
        titleTextStyle: {
          color: '#3D414D',
          fontName: "Roboto",
          fontSize: 15,
          bold: false
        },
        
        fontName: "Roboto",
        legend: {
          position: 'none'
        },
        chartArea: { width: '45%' },
        chart: { title: 'Typewise Scorecard' },
        fontSize: 14,
        bars: 'horizontal', // Required for Material Bar Charts.
        tooltip: { textStyle: { fontName: 'Roboto', fontSize: 12, bold: false } },
        axes: {
          x: {
            0: { side: 'top', label: 'Score' }// Top x-axis.
          }
        },

        hAxis: {
          viewWindow: {
            min: 0,
            max: 100
          },
          ticks: [0, 20, 40, 60, 80, 100],
          gridlines: {
            color: 'transparent'
          },
          textStyle:{color: 'snow'}
        },
        bar: { groupWidth: "70%" },




      };

      var container = document.getElementById('barchart');
      var barchart = new google.visualization.BarChart(container);



      barchart.draw(view, options);


      var chart_div1 = document.getElementById('chart_div1');
      google.visualization.events.addListener(barchart, 'ready', function () {
        document.getElementById('png').outerHTML = '<a href="' + barchart.getImageURI() + '">Printable version</a>';
        // do something with the image URI, like:

        chart_div1.innerHTML = '<img style="display:none" src="' + barchart.getImageURI() + '" class="img-responsive">';

        //   console.log(chart_div1.innerHTML);

      });


    }
    catch (error) {
      this._ErrorSvc.RedirectErrorPage(error, this.CurrentTestId);
    }

  }

  public drawBarChartForSet6() {

    try {
      var data = [];
      var Header = ['TypeName', 'Personality', 'Presence'];
      data.push(Header);

      this.ScoreDetailForSet6.forEach(item => {
        var temp = [];
        temp.push(item.SubModuleName);
        temp.push(item.PersonalityScore);
        temp.push(item.PresenceScore);
        data.push(temp);
      });

      var Chartdata = google.visualization.arrayToDataTable(data);

      var view = new google.visualization.DataView(Chartdata);
      view.setColumns([0, 1,
        {
          calc: "stringify",
          sourceColumn: 1,
          type: "string",
          role: "annotation"
        },
        2]);

      var options = {

        width: this.weight,
        height: this.height,
        titleTextStyle: {
          color: '#3D414D',
          fontName: "Roboto",
          fontSize: 15,
          bold: true
        },
        fontName: "Roboto",
        legend: {
          position: 'bottom',
          textStyle: {
            color: '#3D414D',
            fontName: "Roboto"
          }
        },
        fontSize: 11,
        tooltip: { textStyle: { fontName: 'Roboto', fontSize: 5, bold: false } },
        chart: {
          title: 'TypeWise Scorecard'
        },
        bars: 'horizontal', // Required for Material Bar Charts.

        hAxis: {
          format: 'number',
          viewWindow: {
            min: 0,
            max: 100
          },
          ticks: [0, 25, 50, 75, 100]
        },
        bar: { groupWidth: "55%" }
      };

      var barchart = new google.charts.Bar(document.getElementById('barchart'));
      barchart.draw(view, options);

      google.visualization.events.addListener(barchart, 'ready', function () {
        var canvas;
        var domURL;
        var imageNode;
        var imageURL;
        var svgParent;

        // add svg namespace to chart
        domURL = window.URL || window.webkitURL || window;
        svgParent = document.getElementById('barchart').getElementsByTagName('svg')[0];
        svgParent.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        imageNode = document.getElementById('barchart').cloneNode(true);
        imageURL = domURL.createObjectURL(new Blob([svgParent.outerHTML], { type: 'image/svg+xml' }));
        var image = new Image();
        image.onload = () => {
          canvas = document.getElementById('canvas');
          canvas.setAttribute('width', parseFloat(svgParent.getAttribute('width')));
          canvas.setAttribute('height', parseFloat(svgParent.getAttribute('height')));
          canvas.getContext('2d').drawImage(image, 0, 0);
          // console.log(canvas.toDataURL('image/png'));
          // container.style.display = 'none';
        }
        image.src = imageURL;
      });
    }
    catch (error) {
      this._ErrorSvc.RedirectErrorPage(error, this.CurrentTestId);
    }

  }

  GoToNextSet(UserId, SetId, TestId, TypeId) {
    let IsSuccess;
    this.loading = true;

   // var Element = document.getElementById("chart_div1"); //canvas.toDataURL('image/png');

  //  var ImgByte = Element.getElementsByTagName('img')[0].src;;

    var ImgByte = [];

    var Element = document.getElementById("chart_div1"); //canvas.toDataURL('image/png');

    ImgByte.push(Element.getElementsByTagName('img')[0].src);

    let ScoreModel = {
      "UserId": UserId,
      "setId": SetId,
      "TestId": TestId,
      "TypeId": TypeId,
      "ImgByte": ImgByte,
      "currentSetId": this.Question.CurrentSetId
    };

    this.QuesSVC.SaveAndNextSetOpen(ScoreModel).subscribe(
      data => {
        IsSuccess = data.isSuccess;
        if (IsSuccess) {
          this._router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          }
          this._router.onSameUrlNavigation = 'reload';
          this._router.navigate(['/QuestionSeries', TestId]);

          this.loading = false;
        }
      },
      (error) => {
        this._ErrorSvc.RedirectErrorPage(error, this.CurrentTestId);
      }
    );
  }

  CompleteTest(UserId, TestId) {
    debugger
    //let IsSuccess;
    this.loading = true;
    var ImgByte = [];

    var Element = document.getElementById("chart_div1"); //canvas.toDataURL('image/png');

    ImgByte.push(Element.getElementsByTagName('img')[0].src);
    //var ImgByte = Element.getElementsByTagName('img')[0].src;

    this.Question.CompentencyScoreCard.MultiBarScoreCard.forEach((number, index) => {
      var Id = index+1;
      var Container = document.getElementById("chart_div_"+Id);
      ImgByte.push(Container.getElementsByTagName('img')[0].src);
    });

    debugger
    let ScoreModel = {
      "UserId": UserId,
      "setId": this.Question.CurrentSetId,
      "TestId": TestId,
      "TypeId": '',
      "ImgByte": ImgByte,
      "currentSetId": this.Question.CurrentSetId
    };

    this.QuesSVC.CompleteUserTest(ScoreModel).subscribe(
      data => {
       // IsSuccess = data.isSuccess;
        if (data.isSuccess) {
          this._router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          }
          this._router.onSameUrlNavigation = 'reload';
          this._router.navigate(['/QuestionSeries', TestId]);

          this.loading = false;
        }
      },
      (error) => {
        this._ErrorSvc.RedirectErrorPage(error, this.CurrentTestId);
      }
    );
  }




}
