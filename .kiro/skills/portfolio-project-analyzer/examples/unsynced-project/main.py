import math

def calculate_area(radius):
    return math.pi * radius**2

if __name__ == "__main__":
    r = float(input("Enter radius: "))
    print(f"Area: {calculate_area(r)}")
