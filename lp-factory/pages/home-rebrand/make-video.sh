#!/usr/bin/env bash
# Hero loop for the home page proposal, cut from the owner's founder video (1080x1920, 51 s, not in the repo).
# usage: bash make-video.sh /path/to/source.mov      (needs ffmpeg with libx264 and libvpx-vp9)
# Only the silent product close-ups are used; the parts where the founder speaks need sound and stay out of the loop.
# Each shot: start, length, top edge of the 1080x1080 crop.
set -euo pipefail
SRC="$1"; D="$(cd "$(dirname "$0")" && pwd)"; OUT="$D/img"
SHOTS=(
  "28.90 3.56 270"   # a book, a mug, the diffuser on the table
  "11.08 1.24 260"   # pouring the scent into the bottle
  "12.38 1.20 0"     # the head goes on the bottle
  "22.76 2.03 250"   # the bottle drops into the diffuser
  "15.08 1.14 520"   # one press on the button
  "36.04 2.80 200"   # the diffuser next to a vase of flowers
)
IN=(); F=""; N=0
for s in "${SHOTS[@]}"; do
  read -r t d y <<<"$s"
  IN+=(-ss "$t" -t "$d" -i "$SRC")
  F+="[$N:v]crop=1080:1080:0:$y,fps=30,setsar=1,setpts=PTS-STARTPTS[v$N];"
  N=$((N+1))
done
CAT=""; for i in $(seq 0 $((N-1))); do CAT+="[v$i]"; done
F+="${CAT}concat=n=$N:v=1:a=0,split=3[a][b][c];[b]scale=720:720:flags=lanczos[b2];[c]scale=720:720:flags=lanczos[c2]"
ffmpeg -v error -y "${IN[@]}" -filter_complex "$F" \
  -map "[a]"  -an -c:v libx264 -profile:v high -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart "$OUT/hero-1080.mp4" \
  -map "[b2]" -an -c:v libx264 -profile:v high -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart "$OUT/hero-720.mp4" \
  -map "[c2]" -an -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 -pix_fmt yuv420p "$OUT/hero-720.webm"
# the still that shows before the video starts: the first frame of the loop
ffmpeg -v error -y -i "$OUT/hero-1080.mp4" -frames:v 1 -c:v libwebp -quality 80 "$OUT/hero-poster.webp"
for f in hero-1080.mp4 hero-720.mp4 hero-720.webm hero-poster.webp; do
  printf '%s %s KB %s\n' "$f" "$(( $(stat -c %s "$OUT/$f") / 1024 ))" "$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height:format=duration -of csv=p=0 "$OUT/$f" | tr '\n' ' ')"
done
