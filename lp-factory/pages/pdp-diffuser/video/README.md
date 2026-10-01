# PDP hero video (from My_Moviexx_34_1.mov, 1080x1080, 8.04 s, 6.17 MB, H.264 6.3 Mbps + silent AAC)

| file | codec | size | notes |
|---|---|---|---|
| mc-pdp-hero-720.mp4 | H.264 High, 720x720, 24 fps, CRF 30, no audio, faststart | 328 KB | plays everywhere; use this one |
| mc-pdp-hero-720-hevc.mp4 | HEVC (hvc1), 720x720, 24 fps, CRF 30, no audio | 255 KB | Safari/iOS + recent Chrome; optional second `<source>` |
| mc-pdp-hero-poster.webp | first frame, 720x720, q72 | 32 KB | poster so the slot paints before the video |

Also measured but not kept: AV1 338 KB, VP9 webm 376 KB, H.264 540p 297 KB, H.264 720p CRF 26 509 KB.

Encode (ffmpeg 7.0.2):
    ffmpeg -i src.mov -an -vf "scale=720:720,fps=24" -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -profile:v high -level 4.0 -movflags +faststart mc-pdp-hero-720.mp4
    ffmpeg -i src.mov -an -vf "scale=720:720,fps=24" -c:v libx265 -preset slow -crf 30 -tag:v hvc1 -pix_fmt yuv420p -movflags +faststart mc-pdp-hero-720-hevc.mp4

Why not product media: Shopify re-transcodes product/`VIDEO` uploads. The 614 KB video already on product 8153621921901
becomes 1.07 MB (480p) and 1.89 MB (720p) renditions (video-probe/*-renditions.txt). Files uploaded as generic FILE
(cdn/shop/files/*.mp4) are served byte-for-byte, like mc-hero-loop-720.mp4. The PDP gallery is an Instant slider over
product images and does not render product-media videos at all (video-probe/*-live.txt: zero <video> elements).

Uploaded to Shopify Files 2026-10-01 (generic FILE, served as-is):
- https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-pdp-hero-720.mp4?v=1790870731 (GenericFile 46247392116845, 336,061 B)
- https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-pdp-hero-720-hevc.mp4?v=1790870731 (GenericFile 46247392149613, 260,715 B)
- https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-pdp-hero-poster.webp?v=1790870731 (GenericFile 46247392182381, 32,132 B)
