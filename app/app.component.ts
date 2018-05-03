import { Component, ViewChild } from "@angular/core";
import {} from "@types/googlemaps";

@Component({
  selector: "app-root",
  styleUrls: ["app.component.scss"],
  template: `
  <div #map style="width:100%;height:600px"></div>
  `
})
export class AppComponent {
  constructor() {}

  @ViewChild("map") gmapElement: any;
  map: google.maps.Map;

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(54.700171, 25.2529321),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    //var fs = require("../history-2018-04-06.kml");

    //console.log(fs);

    var ctaLayer = new google.maps.KmlLayer({
      url: "../history-2018-04-06.kml",
      map: this.map
    });
  }
}
