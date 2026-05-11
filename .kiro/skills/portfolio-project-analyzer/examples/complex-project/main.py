import re
import json

class DataProcessor:
    """Base class for data processing."""
    def process(self, data):
        raise NotImplementedError

class RegexProcessor(DataProcessor):
    """Complex regex processor to identify patterns in unstructured logs."""
    def __init__(self):
        # Complex pattern that might be a technical challenge to explain
        self.pattern = re.compile(r'(\d{4}-\d{2}-\d{2})\s+\[(\w+)\]\s+(.*)')

    def process(self, data):
        matches = self.pattern.findall(data)
        return [{"date": m[0], "level": m[1], "msg": m[2]} for m in matches]

class ProcessorFactory:
    """Factory Pattern implementation to decouple processor creation."""
    @staticmethod
    def get_processor(ptype):
        if ptype == "regex":
            return RegexProcessor()
        return None

def main():
    # Rationale: Need a way to quickly parse random logs on my machine.
    log_data = """2026-03-31 [INFO] Started analyzer.
2026-03-31 [ERROR] Failed to sync.
"""
    processor = ProcessorFactory.get_processor("regex")
    results = processor.process(log_data)
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
