import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { Property } from 'src/models/property';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  public propertyId!: number;
  property = new Property();

  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(private route: ActivatedRoute, private router: Router,
    private housingService: HousingService) { }

  ngOnInit() {
    const propertyId = +this.route.snapshot.params['id'];
    this.housingService.getPropertyById(propertyId).subscribe(
      (data: Property | null) => {
        const propertyData = data;
        if (propertyData !== null)
          this.property = propertyData;
      },
      (error) => {
        console.error('Error fetching property details:', error);
      }
    );

    this.galleryOptions = [
      {
        width: '100%',
        height: '500px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ]; this.galleryImages = [
      {
        small: 'assets/Images/prop-1.jfif',
        medium: 'assets/Images/prop-1.jfif',
        big: 'assets/Images/prop-1.jfif'
      },
      {
        small: 'assets/Images/prop-2.jfif',
        medium: 'assets/Images/prop-2.jfif',
        big: 'assets/Images/prop-2.jfif'
      },
      {
        small: 'assets/Images/prop-3.jfif',
        medium: 'assets/Images/prop-3.jfif',
        big: 'assets/Images/prop-3.jfif'
      },
      {
        small: 'assets/Images/prop-4.jfif',
        medium: 'assets/Images/prop-4.jfif',
        big: 'assets/Images/prop-4.jfif'
      },
    ];
  };

  onSelectNext() {
    this.propertyId += 1;
    this.router.navigate(['property-detail', this.propertyId]);
  }
}