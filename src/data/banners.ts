export interface BannerConfig {
  tag: string;
  imageUrl: string;
  linkUrl: string;
  altText: string;
  active: boolean;
}

export const BANNERS: BannerConfig[] = [
  {
    tag: "3D Printing",
    imageUrl: "https://placehold.co/300x600/11153b/white?text=JUSTWAY+3D+Printing",
    linkUrl: "https://www.justway.com",
    altText: "JUSTWAY 3D Printers",
    active: false,
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
