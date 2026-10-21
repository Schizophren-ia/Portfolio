# Hero clapper image

- Final website asset: `public/images/hero-clapper-le-dang-dai-trang.jpg` (1526 × 1031, JPEG quality 90, approximately 167 KB).
- Mode: built-in `image_gen`, edit of the existing photograph; no CLI/API fallback.
- Source photo formerly used by the hero: `https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=85`.
- Changed the handwritten DIR credit from `Jakob & Ryan` to `Le Dang Dai Trang` and erased `Thomas Taugher` from CAM. Both language views use the same corrected photograph, with the name spelled exactly as requested. Other printed labels, numbers and the production title remain unchanged.
- The website serves the corrected image locally. The unrelated Big Buck Bunny sample video is no longer used, so it cannot replace the clapper photo after loading. The existing gradient, framing, content and scroll parallax remain intact. Reduced motion still skips parallax.
- The Open Graph image also uses the corrected local asset.

## Final image-edit prompt

Use case: text-localization / precise-object-edit.

Image 1 is the EDIT TARGET: the existing photographic hero background of a clapperboard held by hands outdoors in a desert landscape.

Primary request: edit ONLY the handwritten personal credits on the white clapperboard. In the DIR row, completely remove the handwritten words 'Jakob & Ryan' and replace them with the exact black handwritten name 'Le Dang Dai Trang'. Exact spelling without accents: L e [space] D a n g [space] D a i [space] T r a n g. Fit the complete name naturally on a single line within that same DIR row. Match the existing black dry-erase-marker handwriting, perspective, scale, ink texture and natural wear. In the bottom CAM row, completely erase the other person's handwritten name 'Thomas Taugher', leaving that row clean/blank with the same aged whiteboard surface and its printed CAM label and ruled borders intact. Do not leave any traces of Jakob, Ryan, or Thomas Taugher.

Invariants: preserve the original photograph, landscape 2000:1352 aspect ratio, composition, exact clapperboard geometry and placement, hands and fingers, wristwatch and bracelets, desert background, sky, lighting, color grade, focus, surface scratches, printed labels, colored clapper sticks, red digital timecode, and all other text and numbers including 'Roadside'. No new objects, no logos, no watermark, no overlaid UI, no cropping or zoom, no stylization, no transparent background. This is an in-place photographic text correction for an existing portfolio website, not a new scene.
