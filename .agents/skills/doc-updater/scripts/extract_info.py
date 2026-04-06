#!/usr/bin/env python3
import os
import re
import json
import argparse
from pathlib import Path

def detect_tech_stack(root: Path):
    stack = {"frontend": [], "backend": [], "database": []}
    
    # Check package.json
    pkg_path = root / "package.json"
    if pkg_path.exists():
        try:
            with open(pkg_path) as f:
                pkg = json.load(f)
                deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
                if "react" in deps or "react-dom" in deps: stack["frontend"].append("React")
                if "next" in deps: stack["frontend"].append("Next.js")
                if "vue" in deps: stack["frontend"].append("Vue")
                if "express" in deps: stack["backend"].append("Express")
                if "fastify" in deps: stack["backend"].append("Fastify")
                if "prisma" in deps: stack["database"].append("Prisma")
                if "mongoose" in deps: stack["database"].append("MongoDB (Mongoose)")
        except: pass

    # Check requirements.txt or pyproject.toml
    req_path = root / "requirements.txt"
    if req_path.exists():
        content = req_path.read_text().lower()
        if "fastapi" in content: stack["backend"].append("FastAPI")
        if "django" in content: stack["backend"].append("Django")
        if "flask" in content: stack["backend"].append("Flask")
        if "sqlalchemy" in content: stack["database"].append("SQLAlchemy")

    return stack

def extract_api_endpoints(root: Path):
    endpoints = []
    # Simple regex for Express/FastAPI routes
    expressions = [
        r"(app|router)\.(get|post|put|delete|patch)\(['\"]([^'\"]+)['\"]",  # Node.js Express
        r"@app\.(get|post|put|delete|patch)\(['\"]([^'\"]+)['\"]",         # Python FastAPI/Flask
    ]
    
    # Process all common source files
    for ext in ["js", "ts", "py", "tsx", "jsx"]:
        for file_path in root.rglob(f"*.{ext}"):
            if any(p in str(file_path) for p in ["node_modules", "venv", "dist", "build", ".next"]): 
                continue
            try:
                content = file_path.read_text()
                for expr in expressions:
                    matches = re.findall(expr, content)
                    for m in matches:
                        method = m[1].upper()
                        path = m[2]
                        endpoints.append({"method": method, "path": path, "file": str(file_path.relative_to(root))})
            except: pass
    
    return endpoints

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--path", default=".")
    args = parser.parse_args()
    root = Path(args.path).resolve()
    
    stack = detect_tech_stack(root)
    endpoints = extract_api_endpoints(root)
    
    result = {
        "name": root.name,
        "stack": stack,
        "endpoints": endpoints,
        "is_backend": len(stack["backend"]) > 0 or len(endpoints) > 0
    }
    
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()
