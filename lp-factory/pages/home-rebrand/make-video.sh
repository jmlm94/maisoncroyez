#!/usr/bin/env bash
# Hero loop for the home page proposal, cut from the owner's founder video (1080x1920, 51 s, with sound; not in the repo).
# usage: bash make-video.sh /path/to/source.mov      (needs ffmpeg with libx264 and libvpx-vp9)
# The loop is muted. Frame: 3:4, the full width of the source and three quarters of its height (the widest view a
# portrait frame that still fits one phone screen allows).
# Each shot: start, length, top edge of the 1080x1440 window on a phone, the same on desktop. On a phone the headline
# and button lie over the bottom of the video, so the subject sits in the upper part of the window there.
set -euo pipefail
SRC="$1"; D="$(cd "$(dirname "$0")" && pwd)"; OUT="$D/img"
SHOTS=(
  "19.90 2.40 250 150"   # Patricia at the filling machine, pulling the lever
  "41.80 2.00 480 400"   # the machine up close, a bottle being filled
  "11.08 1.24 380 250"   # pouring the scent into the bottle
  "25.30 2.20 400 420"   # Patricia on the chair, the bottle in her hand
  "22.76 2.00 120 60"    # the bottle drops into the diffuser
  "15.08 1.14 480 350"   # one press on the button
  "28.90 2.80 230 230"   # a book, a mug, the diffuser on the table
  "36.04 2.40 200 240"   # the diffuser next to a vase of flowers
  "46.30 2.40 280 150"   # Patricia at the machine, smiling at the camera
)
IN=(); F=""; N=0; CM=""; CD=""
for s in "${SHOTS[@]}"; do
  read -r t d ym yd <<<"$s"
  IN+=(-ss "$t" -t "$d" -i "$SRC")
  F+="[$N:v]fps=30,setsar=1,setpts=PTS-STARTPTS,split=2[s${N}a][s${N}b];[s${N}a]crop=1080:1440:0:$ym[m$N];[s${N}b]crop=1080:1440:0:$yd[d$N];"
  CM+="[m$N]"; CD+="[d$N]"; N=$((N+1))
done
F+="${CM}concat=n=$N:v=1:a=0,scale=720:960:flags=lanczos,split=2[m1][m2];${CD}concat=n=$N:v=1:a=0,scale=960:1280:flags=lanczos[d1]"
ffmpeg -v error -y "${IN[@]}" -filter_complex "$F" \
  -map "[m1]" -an -c:v libx264 -profile:v high -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart "$OUT/hero-m.mp4" \
  -map "[d1]" -an -c:v libx264 -profile:v high -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart "$OUT/hero-d.mp4" \
  -map "[m2]" -an -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 -pix_fmt yuv420p "$OUT/hero-m.webm"
# the stills that show before the video starts: the first frame of each loop
ffmpeg -v error -y -i "$OUT/hero-m.mp4" -frames:v 1 -c:v libwebp -quality 78 "$OUT/hero-poster-m.webp"
ffmpeg -v error -y -i "$OUT/hero-d.mp4" -frames:v 1 -c:v libwebp -quality 78 "$OUT/hero-poster-d.webp"
for f in hero-m.mp4 hero-d.mp4 hero-m.webm hero-poster-m.webp hero-poster-d.webp; do
  printf '%s %s KB %s\n' "$f" "$(( $(stat -c %s "$OUT/$f") / 1024 ))" "$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height:format=duration -of csv=p=0 "$OUT/$f" | tr '\n' ' ')"
done
