from collections import defaultdict
class DetectSquares(object):
    def __init__(self):
        self.cnt = defaultdict(int)  # (x, y) -> how many times it was added  # @viz init
        self.col = defaultdict(lambda: defaultdict(int))  # x -> {y: count}: the points in each column  # @viz init

    def add(self, point):
        x, y = point  # @viz add
        self.cnt[(x, y)] += 1  # @viz add
        self.col[x][y] += 1  # @viz add

    def count(self, point):
        x, y = point  # @viz count
        total = 0  # @viz count
        for y2, c in self.col[x].items():  # a point straight above or below the query: one side of the square  # @viz side
            if y2 == y:  # same point: no side  # @viz side
                continue  # @viz side
            d = y2 - y  # the side length (with a sign)  # @viz side
            for x2 in (x + d, x - d):  # the square can be on the right or on the left  # @viz corner
                total += c * self.cnt.get((x2, y), 0) * self.cnt.get((x2, y2), 0)  # @viz sum
        return total  # @viz return
