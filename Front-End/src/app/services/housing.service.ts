import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Property } from 'src/models/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }

  getPropertyById(Id: number): Observable<Property | null> {
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        return propertiesArray.find(p => p.Id === Id) || null;
      })
    );
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get<{ [key: string]: Property }>("assets/Data/properties.json").pipe(
      map(data => {
        const propertiesArray: Property[] = [];
        const propInStorage = localStorage.getItem('newProp');
        if (propInStorage) {
          const localProperties = JSON.parse(propInStorage);
          if (localProperties) {
            for (const id in localProperties) {
              if (SellRent) {
                if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
                  propertiesArray.push(localProperties[id]);
                }
              }
              else {
                propertiesArray.push(localProperties[id]);
              }
            }
          }
        }
        for (const id in data) {
          if (SellRent) {
            if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
              propertiesArray.push(data[id]);
            }
          }
          else {
            propertiesArray.push(data[id]);
          }

        }
        return propertiesArray;
      })
    );
  }
  addProperty(property: Property) {
    let newProp = [property];
    // refactor this in future, add new property in array if
    const propInStorage = localStorage.getItem('newProp');
    if (propInStorage) {
      newProp = [property, ...JSON.parse(propInStorage)];
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropID(): number {
    let pid = localStorage.getItem('PID');
    if (pid !== null) {
      localStorage.setItem('PID', String(+pid + 1));
      pid = localStorage.getItem('PID');
      if (pid !== null) {
        return +pid;
      } return 101;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }

  getAllCities():Observable<string[]>
  {
    return this.http.get<string[]>("https://localhost:7175/api/City");
  }
}
