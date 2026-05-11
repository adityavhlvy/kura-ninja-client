#!/usr/bin/env python3
"""
WCAG Color Contrast Checker

Checks color contrast ratios against WCAG AA and AAA thresholds
for both normal and large text.

Usage:
    python scripts/contrast_checker.py "#ffffff" "#3b82f6"
    python scripts/contrast_checker.py "rgb(255,255,255)" "#1e293b"
    python scripts/contrast_checker.py --batch pairs.json

WCAG Thresholds:
    AA  — Normal text: 4.5:1 | Large text (18pt+ or 14pt bold): 3:1
    AAA — Normal text: 7:1   | Large text: 4.5:1
"""

import sys
import argparse
import json
import re
from typing import Union


def hex_to_rgb(hex_color: str) -> tuple[int, int, int]:
    """Convert hex color string to (R, G, B) tuple."""
    hex_color = hex_color.strip().lstrip("#")
    if len(hex_color) == 3:
        hex_color = "".join(c * 2 for c in hex_color)
    if len(hex_color) != 6:
        raise ValueError(f"Invalid hex color: '#{hex_color}'")
    r = int(hex_color[0:2], 16)
    g = int(hex_color[2:4], 16)
    b = int(hex_color[4:6], 16)
    return r, g, b


def parse_rgb(rgb_str: str) -> tuple[int, int, int]:
    """Parse rgb(R, G, B) string to tuple."""
    match = re.match(r"rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)", rgb_str.strip())
    if not match:
        raise ValueError(f"Invalid rgb() format: '{rgb_str}'")
    return int(match.group(1)), int(match.group(2)), int(match.group(3))


def parse_color(color: str) -> tuple[int, int, int]:
    """Parse a color string (hex or rgb) to (R, G, B)."""
    color = color.strip()
    if color.startswith("rgb"):
        return parse_rgb(color)
    return hex_to_rgb(color)


def relative_luminance(r: int, g: int, b: int) -> float:
    """Calculate relative luminance per WCAG 2.1 definition."""
    def channel(c: int) -> float:
        s = c / 255
        return s / 12.92 if s <= 0.03928 else ((s + 0.055) / 1.055) ** 2.4

    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)


def contrast_ratio(color1: str, color2: str) -> float:
    """Calculate contrast ratio between two colors."""
    rgb1 = parse_color(color1)
    rgb2 = parse_color(color2)
    l1 = relative_luminance(*rgb1)
    l2 = relative_luminance(*rgb2)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)


def evaluate_contrast(ratio: float) -> dict:
    """Evaluate a contrast ratio against WCAG levels."""
    return {
        "ratio": round(ratio, 2),
        "aa_normal":  ratio >= 4.5,
        "aa_large":   ratio >= 3.0,
        "aaa_normal": ratio >= 7.0,
        "aaa_large":  ratio >= 4.5,
    }


def format_result(color1: str, color2: str, eval_result: dict) -> str:
    r = eval_result["ratio"]
    lines = [
        f"\n  Foreground: {color1}",
        f"  Background: {color2}",
        f"  Contrast Ratio: {r}:1",
        "",
        f"  WCAG AA  — Normal text (4.5:1): {'✅ Pass' if eval_result['aa_normal'] else '❌ Fail'}",
        f"  WCAG AA  — Large text  (3.0:1): {'✅ Pass' if eval_result['aa_large']  else '❌ Fail'}",
        f"  WCAG AAA — Normal text (7.0:1): {'✅ Pass' if eval_result['aaa_normal'] else '❌ Fail'}",
        f"  WCAG AAA — Large text  (4.5:1): {'✅ Pass' if eval_result['aaa_large'] else '❌ Fail'}",
    ]
    return "\n".join(lines)


def check_batch(pairs_file: str):
    """Check multiple color pairs from a JSON file."""
    with open(pairs_file, "r", encoding="utf-8") as f:
        pairs = json.load(f)

    results = []
    for pair in pairs:
        fg = pair.get("foreground")
        bg = pair.get("background")
        label = pair.get("label", f"{fg} on {bg}")
        try:
            ratio = contrast_ratio(fg, bg)
            eval_result = evaluate_contrast(ratio)
            eval_result["label"] = label
            eval_result["foreground"] = fg
            eval_result["background"] = bg
            results.append(eval_result)
            print(f"\n  [{label}]")
            print(format_result(fg, bg, eval_result))
        except ValueError as e:
            print(f"  ⚠️  Skipping '{label}': {e}", file=sys.stderr)

    # Summary
    passed_aa = sum(1 for r in results if r["aa_normal"])
    total = len(results)
    print(f"\n  Summary: {passed_aa}/{total} pairs pass WCAG AA (normal text)\n")
    print(json.dumps(results, indent=2))


def main():
    parser = argparse.ArgumentParser(
        description="Check color contrast ratios against WCAG standards."
    )
    parser.add_argument("foreground", nargs="?", help="Foreground color (hex or rgb())")
    parser.add_argument("background", nargs="?", help="Background color (hex or rgb())")
    parser.add_argument("--batch", metavar="FILE",
                        help="JSON file with array of {foreground, background, label} pairs")
    args = parser.parse_args()

    if args.batch:
        check_batch(args.batch)
        return

    if not args.foreground or not args.background:
        parser.print_help()
        sys.exit(1)

    try:
        ratio = contrast_ratio(args.foreground, args.background)
        eval_result = evaluate_contrast(ratio)
        print(format_result(args.foreground, args.background, eval_result))
        print(f"\n{json.dumps(eval_result, indent=2)}")
    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
