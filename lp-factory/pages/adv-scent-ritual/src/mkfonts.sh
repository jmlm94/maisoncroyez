#!/bin/bash
A=assets
out=fonts.css
: > $out
emit() { # family file weight style
  b64=$(base64 -w0 "$2")
  cat >> $out <<CSS
@font-face{font-family:'$1';font-style:$4;font-weight:$3;font-display:swap;src:url(data:font/woff2;base64,$b64) format('woff2');}
CSS
}
emit Unna $A/unna/package/files/unna-latin-400-normal.woff2 400 normal
emit Unna $A/unna/package/files/unna-latin-400-italic.woff2 400 italic
emit Unna $A/unna/package/files/unna-latin-700-normal.woff2 700 normal
emit Unna $A/unna/package/files/unna-latin-700-italic.woff2 700 italic
emit Outfit $A/outfit/package/files/outfit-latin-400-normal.woff2 400 normal
emit Outfit $A/outfit/package/files/outfit-latin-700-normal.woff2 700 normal
emit 'Be Vietnam Pro' $A/bvp/package/files/be-vietnam-pro-latin-400-normal.woff2 400 normal
emit 'Be Vietnam Pro' $A/bvp/package/files/be-vietnam-pro-latin-500-normal.woff2 500 normal
emit 'Be Vietnam Pro' $A/bvp/package/files/be-vietnam-pro-latin-600-normal.woff2 600 normal
wc -c $out
