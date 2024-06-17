import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { Property } from 'src/models/property';
import { HousingService } from './housing.service';

@Injectable({
    providedIn: 'root'
})
export class PropertyDetailsResolverService implements Resolve<Property | null> {
    constructor(private housingService: HousingService, private router: Router) { }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Property> {
        const propertyId = route.params['id'];
        return this.housingService.getPropertyById(propertyId).pipe(
            map(property => {
                if (property) {
                    return property;
                } else {
                    this.router.navigate(['/not-found']);
                    throw new Error('Property not found');
                }
            }),
            catchError(error => {
                this.router.navigate(['/error']);
                return of(null as any);
            })
        );
    }
}
