from collections import defaultdict
class DetectSquares(object):
    def __init__(self):
        self.cnt = defaultdict(int)  # (x, y) -> how many times it was added  # @viz init

    def add(self, point):
        self.cnt[tuple(point)] += 1  # @viz add

    def count(self, point):
        x, y = point  # @viz count
        total = 0  # @viz count
        for (px, py), c in self.cnt.items():  # each distinct stored point, as the corner across from the query  # @viz diag
            if px == x or abs(px - x) != abs(py - y):  # not a diagonal (or no area)  # @viz diag
                continue  # @viz diag
            # The other two corners are (x, py) and (px, y); repeats multiply.
            total += c * self.cnt.get((x, py), 0) * self.cnt.get((px, y), 0)  # @viz corner, sum
        return total  # @viz return
