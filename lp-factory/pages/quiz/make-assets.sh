#!/usr/bin/env bash
# Pictures and video for the quiz proposal.
# usage: bash make-assets.sh /path/to/founder-video.mov /path/to/venv/python   (needs curl, ffmpeg, pillow)
# 1. The owner's 29 creator photos (Drive, link-shared; list in ../adv-kits/drive/ids.txt) -> img/c-01..29.webp,
#    square, 480 px, no names in the file names.
# 2. The founder video, whole and with sound, for the screen where Patricia speaks -> img/patricia.mp4 + its still.
# 3. The muted hero loop and its still, copied from the home proposal.
set -euo pipefail
SRC="$1"; PY="$2"; D="$(cd "$(dirname "$0")" && pwd)"; OUT="$D/img"; TMP="$(mktemp -d)"
n=0
grep -v '^#' "$D/../adv-kits/drive/ids.txt" | while read -r name id; do
  [ -n "${id:-}" ] || continue
  n=$((n+1)); f="$TMP/$(printf '%02d' "$n").jpg"
  curl -sS -L --max-time 60 -o "$f" "https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t"
done
"$PY" -I - "$TMP" "$OUT" <<'EOF'
import sys, os, glob
from PIL import Image, ImageOps
tmp, out = sys.argv[1], sys.argv[2]
ok = 0
for f in sorted(glob.glob(os.path.join(tmp, '*.jpg'))):
    try:
        im = ImageOps.exif_transpose(Image.open(f)).convert('RGB')
    except Exception as e:
        print('skipped', os.path.basename(f), e); continue
    w, h = im.size; s = min(w, h)
    top = 0 if h <= w else int((h - s) * 0.22)          # portraits: keep the face, cut more from the bottom
    im = im.crop(((w - s) // 2, top, (w - s) // 2 + s, top + s)).resize((480, 480), Image.LANCZOS)
    im.save(os.path.join(out, 'c-' + os.path.basename(f)[:2] + '.webp'), quality=76, method=6); ok += 1
print(ok, 'creator photos')
EOF
ffmpeg -v error -y -i "$SRC" -vf "scale=540:960:flags=lanczos,fps=30" -c:v libx264 -profile:v high -preset slow -crf 27 -pix_fmt yuv420p -c:a aac -b:a 80k -ac 1 -movflags +faststart "$OUT/patricia.mp4"
ffmpeg -v error -y -ss 46.9 -i "$SRC" -frames:v 1 -vf "scale=720:1280:flags=lanczos" -c:v libwebp -quality 78 "$OUT/patricia-still.webp"
cp "$D/../home-rebrand/img/hero-m.mp4" "$D/../home-rebrand/img/hero-m.webm" "$D/../home-rebrand/img/hero-poster-m.webp" "$D/../home-rebrand/img/patricia1.webp" "$OUT/"
for f in patricia.mp4 patricia-still.webp hero-m.mp4; do printf '%s %s KB\n' "$f" "$(( $(stat -c %s "$OUT/$f") / 1024 ))"; done
ffprobe -v error -show_entries stream=codec_type,codec_name:format=duration -of csv=p=0 "$OUT/patricia.mp4" | tr '\n' ' '; echo
