/**
 * Haven Creek Renovations — typed photography manifest.
 *
 * Single source of truth for every brand photograph on the site. All images
 * are AI-generated worksite documentary photographs, calibrated to the brand
 * contract in knowledge/source-documents/brand-identity/1.5-brand-identity-north-star.md
 * (rural Alberta, no people, no faces, calm cedar/evergreen/warm-off-white palette).
 *
 * Vite hashes and serves these via the asset pipeline (modern formats served
 * automatically). Add a new image by dropping the file in this folder and
 * extending the relevant export.
 */

import heroDetail from "./hero-detail-trim.jpg";
import closingPrairie from "./closing-prairie-light.jpg";

import workBraggCreekTrim from "./work-bragg-creek-trim-transitions.jpg";
import workWaterValleyShelving from "./work-water-valley-builtin-shelving.jpg";
import workRockyViewSiding from "./work-rocky-view-siding-repair.jpg";
import workBearspawSoffit from "./work-bearspaw-soffit-fascia.jpg";
import workBearspawDeck from "./work-bearspaw-wraparound-deck.jpg";
import workWaterValleyStepdown from "./work-water-valley-stepdown-platform.jpg";

import areaFoothills from "./area-foothills-evening.jpg";
import aboutToolsBench from "./about-tools-bench.jpg";

import closingPhotoMoment from "./closing-photo-moment.jpg";
import interiorDetailTrim from "./interior-detail-trim-corner.jpg";
import exteriorDetailSoffit from "./exterior-detail-soffit.jpg";
import deckingDetailEndgrain from "./decking-detail-endgrain.jpg";

/** Hero / closing / atmospheric photography. */
export const photography = {
  heroDetail,
  closingPrairie,
  areaFoothills,
  aboutToolsBench,
  closingPhotoMoment,
  interiorDetailTrim,
  exteriorDetailSoffit,
  deckingDetailEndgrain,
} as const;

/**
 * Map of gallery-plate slug → photograph. Keys mirror `galleryPlates[].slug`
 * exactly so consumers can do `workPhotos[plate.slug]` with no glue layer.
 * If a slug is missing, the consumer should fall back to the typographic
 * `<ProjectPlaceholder>` shell.
 */
export const workPhotos: Record<string, string> = {
  "bragg-creek-trim-transitions": workBraggCreekTrim,
  "water-valley-builtin-shelving": workWaterValleyShelving,
  "rocky-view-siding-repair": workRockyViewSiding,
  "bearspaw-soffit-fascia": workBearspawSoffit,
  "bearspaw-wraparound-deck": workBearspawDeck,
  "water-valley-stepdown-platform": workWaterValleyStepdown,
};

// Real project photographs supplied by Haven Creek. Order is intentional —
// strongest establishing shots first so the Work grid leads with impact.
import upload01 from "./uploads/IMG_6394.jpeg";
import upload02 from "./uploads/IMG_6395.jpeg";
import upload03 from "./uploads/IMG_6396.jpeg";
import upload04 from "./uploads/IMG_6397.jpeg";
import upload05 from "./uploads/IMG_6398.jpeg";
import upload06 from "./uploads/IMG_6399.jpeg";
import upload07 from "./uploads/IMG_6400.jpeg";
import upload08 from "./uploads/IMG_6401.jpeg";
import upload09 from "./uploads/IMG_6402.jpeg";
import upload10 from "./uploads/IMG_6403.jpeg";

import upload13 from "./uploads/IMG_6406.jpeg";
import upload14 from "./uploads/IMG_6407.jpeg";
import upload15 from "./uploads/IMG_6408.jpeg";
import upload16 from "./uploads/IMG_6409.jpeg";
import upload17 from "./uploads/IMG_6410.jpeg";
import coryHeadshotSrc from "./uploads/IMG_3788_1.jpeg";

export const coryHeadshot = coryHeadshotSrc;

export interface UploadedProjectPhoto {
  src: string;
  alt: string;
}

export const uploadedProjectPhotos: UploadedProjectPhoto[] = [
  { src: upload01, alt: "Haven Creek Renovations project photograph" },
  { src: upload02, alt: "Haven Creek Renovations project photograph" },
  { src: upload03, alt: "Haven Creek Renovations project photograph" },
  { src: upload04, alt: "Haven Creek Renovations project photograph" },
  { src: upload05, alt: "Haven Creek Renovations project photograph" },
  { src: upload06, alt: "Haven Creek Renovations project photograph" },
  { src: upload07, alt: "Haven Creek Renovations project photograph" },
  { src: upload08, alt: "Haven Creek Renovations project photograph" },
  { src: upload09, alt: "Haven Creek Renovations project photograph" },
  { src: upload10, alt: "Haven Creek Renovations project photograph" },
  { src: upload13, alt: "Haven Creek Renovations project photograph" },
  { src: upload14, alt: "Haven Creek Renovations project photograph" },
  { src: upload15, alt: "Haven Creek Renovations project photograph" },
  { src: upload16, alt: "Haven Creek Renovations project photograph" },
  { src: upload17, alt: "Haven Creek Renovations project photograph" },

];

// Curated 6-photo subset for the home Recent Work grid. Spread across the
// 18 uploads to maximise visual variety (different subjects, framings, scales)
// so the home teaser never reads as "the same photo twice".
export const homeRecentPhotos: UploadedProjectPhoto[] = [
  uploadedProjectPhotos[0],
  uploadedProjectPhotos[3],
  uploadedProjectPhotos[6],
  uploadedProjectPhotos[9],
  uploadedProjectPhotos[11],
  uploadedProjectPhotos[15],
];

