"""Builds kits-buybox.css: the kits page rules (mc-dk.css) that style the parts of the buy box the advertorial reuses, re-rooted from #root to #mckb."""
import json, os, re, subprocess, sys, tempfile
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from cssparse import strip_comments, split, sels
PAGES = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
SRC = os.path.join(PAGES, 'diffuser-kits', 'mc-dk.css')
REF = os.path.join(PAGES, 'adv-kits', 'kits-ref')
OUT = os.path.join(HERE, '..', 'kits-buybox.css')
TMP = tempfile.mkdtemp()
css = strip_comments(open(SRC).read())
GLOBAL = {':root', 'html', 'body', '*', '*::before', '*::after', '::before', '::after', 'html,body'}
rules = []  # (media or None, prelude, body)
def walk(blocks, media=None):
    for pre, body in blocks:
        if pre.startswith('@media') or pre.startswith('@supports'):
            walk(split(body), pre if media is None else media + ' / ' + pre)
        elif pre.startswith('@'):
            rules.append((media, pre, body))
        else:
            rules.append((media, pre, body))
walk(split(css))
allsel = []
for m, pre, body in rules:
    if pre.startswith('@'): continue
    for s in sels(pre): allsel.append(s)
uniq = sorted(set(allsel))
json.dump(uniq, open(os.path.join(TMP, 'sels.json'), 'w'))
subprocess.run(['node', os.path.join(HERE, 'match.js'), os.path.join(TMP, 'sels.json'), os.path.join(TMP, 'used.json'), REF], check=True)
used = {uniq[i] for i in json.load(open(os.path.join(TMP, 'used.json')))}
def rew(s):
    s = s.strip()
    if s in (':root', 'html', 'body'): return '#mckb'
    if s == '*': return '#mckb *'
    if s in ('*::before', '*::after', '::before', '::after'): return '#mckb ' + s
    if s.startswith('#root'): return '#mckb' + s[5:]
    if re.match(r'(html|body)\b', s): return None
    return '#mckb ' + s
seq = []  # (media, rule text), in source order: the cascade depends on it
for m, pre, body in rules:
    if pre.startswith('@'): continue
    keep = [s for s in sels(pre) if s.strip() in (':root', 'html', 'body', '*', '*::before', '*::after', '::before', '::after') or s in used]
    if any(x.strip() in ('html', 'body') for x in keep):
        if len(keep) > 1 or keep[0].strip() == 'html': continue
        decls = [d.strip() for d in body.split(';') if d.strip()]
        body = ';'.join(d for d in decls if d.split(':')[0].strip() in ('font-family', 'color', 'font-size', 'line-height', '-webkit-font-smoothing'))
        if not body: continue
    keep = [r for r in (rew(s) for s in keep) if r]
    if keep: seq.append((m, ','.join(keep) + '{' + body.strip() + '}'))
kf = set(re.findall(r'animation(?:-name)?\s*:\s*([\w-]+)', ''.join(t for _, t in seq)))
keyframes = ['%s{%s}' % (pre, body) for m, pre, body in rules if pre.startswith('@keyframes') and pre.split()[1] in kf]
lines, cur = [], None
for m, t in seq:
    if m != cur:
        if cur is not None: lines.append('}')
        if m is not None: lines.append(m + '{')
        cur = m
    lines.append(t)
if cur is not None: lines.append('}')
text = '\n'.join(lines + keyframes) + '\n'
open(OUT, 'w').write(text)
print('rules', len(seq), 'bytes', len(text), 'keyframes', [k.split('{')[0] for k in keyframes])
