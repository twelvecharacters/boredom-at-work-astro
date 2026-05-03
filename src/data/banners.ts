import banner3D from '../assets/images/banners/justway-banner-W300H600.jpg';
import banner3DMobile from '../assets/images/banners/justway-banner-mobile.jpg';

export interface BannerConfig {
  tag: string;
  imageUrl: any;
  linkUrl: string;
  altText: string;
  active: boolean;
  startDate?: string;
  endDate?: string;
  mobileImageUrl?: any;
}

export const BANNERS: BannerConfig[] = [
  {
    tag: "3D Printing",
    imageUrl: banner3D,
    mobileImageUrl: banner3DMobile,
    linkUrl: "https://www.justway.com",
    altText: "CNC Machining Prototype | 3D Printing Service | Custom Parts & Rapid Prototyping - Justway.com",
    active: true,
    startDate: "2026-05-01",
    endDate: "2026-08-31",
  },
  // Add other banners here for different categories/tags
  /*
  {
    tag: "Photography",
    imageUrl: "https://placehold.co/300x600/11153b/white?text=Camera+Gear+Store",
    linkUrl: "https://example.com/photography",
    altText: "Premium Camera Gear",
    active: false,
  }
  */
];
