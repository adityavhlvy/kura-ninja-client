#!/usr/bin/env python3
"""
Design System Health Score Calculator

Reads a structured audit JSON file and computes the weighted Health Score
across all design system categories.

Usage:
    python scripts/score_calculator.py audit.json
    python scripts/score_calculator.py audit.json --verbose

Audit JSON format: see resources/audit-schema.json
"""

import json
import sys
import argparse
from typing import Optional


CATEGORY_WEIGHTS = {
    "color_system": 0.25,
    "typography": 0.20,
    "spacing_layout": 0.20,
    "component_consistency": 0.25,
    "accessibility_motion": 0.10,
}

SEVERITY_LABELS = {
    (0, 40):  ("🔴", "CRITICAL"),
    (40, 60): ("🟡", "WARNING"),
    (60, 80): ("🟡", "FAIR"),
    (80, 90): ("🟢", "GOOD"),
    (90, 101):("🟢", "EXCELLENT"),
}


def get_severity(score: float) -> tuple[str, str]:
    for (low, high), label in SEVERITY_LABELS.items():
        if low <= score < high:
            return label
    return ("🔴", "CRITICAL")


def calculate_score(audit: dict, verbose: bool = False) -> float:
    total = 0.0
    category_results = []

    for category, weight in CATEGORY_WEIGHTS.items():
        raw = audit.get(category)
        if raw is None:
            print(f"  ⚠️  Missing category: '{category}' — defaulting to 0", file=sys.stderr)
            score = 0
        elif isinstance(raw, dict):
            # Support {score: int, notes: str} format
            score = int(raw.get("score", 0))
        elif isinstance(raw, (int, float)):
            score = float(raw)
        else:
            print(f"  ⚠️  Invalid value for '{category}' — defaulting to 0", file=sys.stderr)
            score = 0

        weighted = score * weight
        total += weighted
        category_results.append((category, score, weight, weighted))

    if verbose:
        print("\nCategory Breakdown:")
        print(f"  {'Category':<30} {'Score':>6}  {'Weight':>7}  {'Weighted':>9}")
        print(f"  {'-'*30} {'-'*6}  {'-'*7}  {'-'*9}")
        for cat, score, weight, weighted in category_results:
            label = cat.replace("_", " ").title()
            print(f"  {label:<30} {score:>5.1f}  {weight*100:>6.0f}%  {weighted:>9.2f}")
        print()

    return round(total, 1)


def format_report(score: float, project_name: Optional[str] = None) -> str:
    icon, label = get_severity(score)
    name_line = f"Project: {project_name}\n" if project_name else ""
    return (
        f"\n{'━'*38}\n"
        f"  DESIGN SYSTEM HEALTH SCORE\n"
        f"{'━'*38}\n"
        f"  {name_line}"
        f"  Score:  {score}/100\n"
        f"  Status: {icon} {label}\n"
        f"{'━'*38}\n"
    )


def main():
    parser = argparse.ArgumentParser(
        description="Calculate Design System Health Score from an audit JSON file."
    )
    parser.add_argument("audit_file", help="Path to the audit JSON file")
    parser.add_argument("--verbose", "-v", action="store_true",
                        help="Show category breakdown")
    args = parser.parse_args()

    try:
        with open(args.audit_file, "r", encoding="utf-8") as f:
            audit = json.load(f)
    except FileNotFoundError:
        print(f"Error: File not found — '{args.audit_file}'", file=sys.stderr)
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON — {e}", file=sys.stderr)
        sys.exit(1)

    project_name = audit.get("project_name")
    score = calculate_score(audit, verbose=args.verbose)
    print(format_report(score, project_name))

    # Output machine-readable result for piping
    result = {"health_score": score}
    if project_name:
        result["project_name"] = project_name
    print(json.dumps(result))


if __name__ == "__main__":
    main()
