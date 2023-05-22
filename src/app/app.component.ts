import {Component} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  title = 'wcc-distance-web';
  postcodesForm = this.formBuilder.group({
    postcode1: '',
    postcode2: ''
  });
  center: google.maps.LatLngLiteral = {lat: 54, lng: -2};
  zoom = 6;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markers: {label: google.maps.MarkerLabel, position: google.maps.LatLngLiteral}[] = [];
  polylineOptions: google.maps.PolylineOptions = {
    geodesic: true,
    strokeColor: '#512DA8',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };
  polylinePaths: google.maps.LatLngLiteral[][] = []
  distance: number = 0

  addMarker(name: string,position: google.maps.LatLngLiteral) {
    const label: google.maps.MarkerLabel =
      {text: name, color: '#512DA8', fontSize: "16pt", fontWeight: "bold"}
    this.markers.push({label, position});
  }

  addPathLine(positions: google.maps.LatLngLiteral[]) {
    this.polylinePaths.push(positions);
  }

  Submit() {
    const {postcode1, postcode2} = this.postcodesForm.value
    if (!postcode1 || !postcode2) {
      return
    }

    this.markers = []
    this.polylinePaths = []

    this.http.get<any>(`http://localhost:8081/distance/${postcode1}/${postcode2}`)
      .subscribe(data => {
        const {startLocation, endLocation, distance } = data
        const startPoint = {lat: Number(startLocation.latitude),lng:Number(startLocation.longitude)}
        const endPoint=  {lat: Number(endLocation.latitude),lng:Number(endLocation.longitude)}
        this.addMarker(postcode1,startPoint)
        this.addMarker(postcode2, endPoint)
        this.addPathLine([startPoint, endPoint])
        this.center = startPoint
        this.zoom = 8
        this.distance = distance
    })
  }
}
