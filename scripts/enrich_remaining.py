#!/usr/bin/env python3
"""
Enrich remaining JS files with zh/ja translations.
Handles multiple patterns:
  - Single-line { en: '...', bn: '...' } objects (qaida-data, learn-kids)
  - Multi-line direct en/bn properties (amal-daily.js)
  - why-islam.js { en: '...', bn: '...' } objects
"""

import re
import json
import os
import sys

# Import googletrans
try:
    from googletrans import Translator
    translator = Translator()
except ImportError:
    print("WARNING: googletrans not available, will use English fallback")
    translator = None

# Cache translations to avoid redundant API calls
trans_cache = {}

def translate(text, dest):
    if not text or not text.strip():
        return text
    cache_key = (text, dest)
    if cache_key in trans_cache:
        return trans_cache[cache_key]
    try:
        if translator:
            result = translator.translate(text, dest=dest, src='en')
            translated = result.text
            trans_cache[cache_key] = translated
            return translated
    except Exception as e:
        print(f"  Translation error for '{text[:50]}': {e}")
    return text  # fallback to original English

def add_zh_ja_props(text, is_single_line=True):
    """
    Find all { en: '...', bn: '...' } patterns and add , zh: '...', ja: '...'
    """
    if is_single_line:
        pattern = r"(\{\s*en\s*:\s*'([^']*)'\s*,\s*bn\s*:\s*'([^']*)'\s*\})"
    else:
        # Multi-line: handle objects where en/bn span multiple lines
        # This is more complex - use a different approach
        pattern = r"en\s*:\s*'([^']*)'\s*,\s*\n\s*bn\s*:\s*'([^']*)'"
    
    def replacer(m):
        en_text = m.group(1) if is_single_line else m.group(1)
        bn_text = m.group(2) if is_single_line else m.group(2)
        
        # Translate
        zh_text = translate(en_text, 'zh-cn')
        ja_text = translate(en_text, 'ja')
        
        if is_single_line:
            orig = m.group(0)
            return f"{{ en: '{en_text}', bn: '{bn_text}', zh: '{zh_text}', ja: '{ja_text}' }}"
        else:
            # Multi-line already matched
            return f"en: '{en_text}',\n      bn: '{bn_text}',\n      zh: '{zh_text}',\n      ja: '{ja_text}'"
    
    if is_single_line:
        return re.sub(pattern, replacer, text)
    else:
        return re.sub(pattern, replacer, text)


def process_why_islam():
    """Process why-islam.js - has { en: '...', bn: '...' } objects, some multi-line"""
    print("\n=== Processing why-islam.js ===")
    with open('js/why-islam.js') as f:
        text = f.read()
    
    orig_len = len(text)
    
    # Find all single-line { en: '...', bn: '...' } patterns
    count_before = len(re.findall(r"\bzh\s*:", text))
    
    # Handle single-line objects first
    text = add_zh_ja_props(text, is_single_line=True)
    
    # Handle multi-line objects
    text = add_zh_ja_props(text, is_single_line=False)
    
    count_after = len(re.findall(r"\bzh\s*:", text))
    added = count_after - count_before
    print(f"  Added zh/ja to {added} objects")
    
    with open('js/why-islam.js', 'w') as f:
        f.write(text)
    print(f"  File size: {orig_len} -> {len(text)} bytes")


def process_qaida_data():
    """Process qaida-data.js - has { en: '...', bn: '...' } in KIDS_THEME_WORDS, QAIDA_HARAKAT, labels"""
    print("\n=== Processing qaida-data.js ===")
    with open('js/qaida-data.js') as f:
        text = f.read()
    
    count_before = len(re.findall(r"\bzh\s*:", text))
    
    # Single-line { en: '...', bn: '...' } objects
    text = add_zh_ja_props(text, is_single_line=True)
    
    count_after = len(re.findall(r"\bzh\s*:", text))
    added = count_after - count_before
    print(f"  Added zh/ja to {added} objects")
    
    with open('js/qaida-data.js', 'w') as f:
        f.write(text)
    print(f"  Done")


def process_learn_kids():
    """Process learn-kids.js - has KIDS_DUA_L10N and KIDS_KALIMA_L10N with { en: '...', bn: '...' }"""
    print("\n=== Processing learn-kids.js ===")
    with open('js/learn-kids.js') as f:
        text = f.read()
    
    count_before = len(re.findall(r"\bzh\s*:", text))
    
    text = add_zh_ja_props(text, is_single_line=True)
    
    count_after = len(re.findall(r"\bzh\s*:", text))
    added = count_after - count_before
    print(f"  Added zh/ja to {added} objects")
    
    with open('js/learn-kids.js', 'w') as f:
        f.write(text)
    print(f"  Done")


def process_amal_daily():
    """Process amal-daily.js - has direct en/bn properties (not nested objects)"""
    print("\n=== Processing amal-daily.js ===")
    with open('js/amal-daily.js') as f:
        text = f.read()
    
    count_before = len(re.findall(r"\bzh\s*:", text))
    
    # Pattern 1: AMAL_STR entries like { en: '...', bn: '...' }
    text = add_zh_ja_props(text, is_single_line=True)
    
    # Pattern 2: Direct en/bn properties in AMAL_ITEMS, MORNING_EVENING_ADHKAR, AFTER_SALAH
    # These look like:
    #     en: '...',
    #     bn: '...' },
    # We need to find en/bn pairs and add zh/ja
    
    # Find patterns like: en: 'text',\n    bn: 'text'  (with varying indentation)
    # The 'bn' line ends with } (end of object) or ,
    pattern2 = r"(en:\s*'([^']*)')\s*,\s*\n(\s*)(bn:\s*'([^']*)')\s*(\},?)"
    
    def replacer2(m):
        en_text = m.group(2)
        bn_text = m.group(5)
        indent = m.group(3)
        suffix = m.group(6)  # }, or }
        
        zh_text = translate(en_text, 'zh-cn')
        ja_text = translate(en_text, 'ja')
        
        return f"{m.group(1)},\n{indent}{m.group(4)},\n{indent}zh: '{zh_text}',\n{indent}ja: '{ja_text}'{suffix}"
    
    text = re.sub(pattern2, replacer2, text)
    
    count_after = len(re.findall(r"\bzh\s*:", text))
    added = count_after - count_before
    print(f"  Added zh/ja to {added} objects")
    
    with open('js/amal-daily.js', 'w') as f:
        f.write(text)
    print(f"  Done")


def main():
    if len(sys.argv) > 1:
        targets = sys.argv[1:]
    else:
        targets = ['amal-daily', 'qaida-data', 'learn-kids', 'why-islam']
    
    if 'amal-daily' in targets:
        process_amal_daily()
    if 'qaida-data' in targets:
        process_qaida_data()
    if 'learn-kids' in targets:
        process_learn_kids()
    if 'why-islam' in targets:
        process_why_islam()
    
    print("\n=== Summary ===")
    # Find remaining files that still need work
    for fname in ['js/amal-daily.js', 'js/qaida-data.js', 'js/learn-kids.js', 'js/why-islam.js']:
        with open(fname) as f:
            text = f.read()
        zh_count = len(re.findall(r"\bzh\s*:", text))
        ja_count = len(re.findall(r"\bja\s*:", text))
        en_objs = len(re.findall(r"\{\s*en\s*:\s*['\"]", text))
        print(f"  {fname}: zh={zh_count}, ja={ja_count}, remaining en-only objs={en_objs}")

if __name__ == '__main__':
    main()
