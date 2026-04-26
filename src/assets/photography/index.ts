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

import heroAcreage from "./hero-acreage-morning.jpg";
import heroDetail from "./hero-detail-trim.jpg";
import closingPrairie from "./closing-prairie-light.jpg";

import serviceInterior from "./service-interior-finishing.jpg";
import serviceExterior from "./service-exterior-finishing.jpg";
import serviceDecking from "./service-decking.jpg";

import workBraggCreekTrim from "./work-bragg-creek-trim-transitions.jpg";
import workWaterValleyShelving from "./work-water-valley-builtin-shelving.jpg";
import workRockyViewSiding from "./work-rocky-view-siding-repair.jpg";
import workBearspawSoffit from "./work-bearspaw-soffit-fascia.jpg";
import workBearspawDeck from "./work-bearspaw-wraparound-deck.jpg";
import workWaterValleyStepdown from "./work-water-valley-stepdown-platform.jpg";

import areaFoothills from "./area-foothills-evening.jpg";
import aboutToolsBench from "./about-tools-bench.jpg";

/** Hero / closing / atmospheric photography. */
export const photography = {
  heroAcreage,
  heroDetail,
  closingPrairie,
  serviceInterior,
  serviceExterior,
  serviceDecking,
  areaFoothills,
  aboutToolsBench,
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

/**
 * Map of preview-card slug → photograph (used by the home page §IV preview
 * cards which use a different slug set than the SelectedWorks gallery).
 * Each preview project shares its photograph with a matching gallery plate.
 */
export const previewPhotos: Record<string, string> = {
  "bragg-creek-interior-finishing": workBraggCreekTrim,
  "rocky-view-exterior-repairs": workRockyViewSiding,
  "bearspaw-deck-build": workBearspawDeck,
};

/** Map of service slug → photograph for ServicePlate cards. */
export const servicePhotos: Record<string, string> = {
  "interior-finishing": serviceInterior,
  "exterior-finishing": serviceExterior,
  decking: serviceDecking,
};
