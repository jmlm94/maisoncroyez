"""Tiny CSS block splitter: returns a list of (prelude, body) at one nesting level; body for @media/@supports is parsed again by the caller."""
import re
def strip_comments(s):
    return re.sub(r'/\*.*?\*/', '', s, flags=re.S)
def split(s):
    out = []; i = 0; n = len(s)
    while i < n:
        j = s.find('{', i)
        if j < 0: break
        pre = s[i:j].strip()
        # handle ; terminated at-rules (e.g. @import, @charset) in the prelude
        while ';' in pre and pre.startswith('@'):
            k = pre.index(';'); pre = pre[k+1:].strip()
        d = 0; k = j; q = None
        while k < n:
            c = s[k]
            if q:
                if c == q and s[k-1] != '\\': q = None
            elif c in '"\'': q = c
            elif c == '{': d += 1
            elif c == '}':
                d -= 1
                if d == 0: break
            k += 1
        out.append((pre, s[j+1:k]))
        i = k + 1
    return out
def sels(pre):
    # split a selector list on top-level commas
    out = []; d = 0; cur = ''
    for c in pre:
        if c in '([': d += 1
        elif c in ')]': d -= 1
        if c == ',' and d == 0: out.append(cur.strip()); cur = ''
        else: cur += c
    if cur.strip(): out.append(cur.strip())
    return out
