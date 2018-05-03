import { Component, ViewChild } from "@angular/core";
import {} from "@types/googlemaps";
//import { togeojson } from "@mapbox/togeojson";
//import { tokml } from "tokml";

@Component({
  selector: "app-root",
  styleUrls: ["app.component.scss"],
  //add input which refreshes the map
  //add input which recalculates transaction points
  template: `
  <div>
    <button (click)="refreshMap()">Refresh</button>
    <button (click)="recalculateTransactions()" >Recalculate</button>
  </div>
  <div #map style="width:100%;height:600px">
    </div>
  `
})
export class AppComponent {
  constructor() {}

  @ViewChild("map") gmapElement: any;
  map: google.maps.Map;
  lastUpdated: Date;

  ngOnInit() {
    this.setupMap();
  }

  setupMap() {
    var mapProp = {
      center: new google.maps.LatLng(54.700171, 25.2529321),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    var ctaLayer = new google.maps.KmlLayer({
      url:
        "https://raw.githubusercontent.com/kuujis/transmap/master/history-2018-04-06.kml",
      map: this.map
    });
  }

  refreshMap() {
    //check if need to refresh based on lastUpdated
    this.setupMap();
  }

  recalculateTransactions() {
    var togeojson = require("@mapbox/togeojson");

    var myRequest = new Request(
      "https://raw.githubusercontent.com/kuujis/transmap/master/history-2018-04-06.kml"
    );
    var kmls = "";

    fetch(myRequest)
      .then(function(response) {
        return response.text();
      })
      .then(function(response) {
        var kmls = new DOMParser().parseFromString(response, "application/xml");
        // console.log(kmls);

        var geoJson = togeojson.kml(kmls);

        console.log(geoJson);
      });
  }
}
