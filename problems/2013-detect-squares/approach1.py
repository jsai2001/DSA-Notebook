class DetectSquares(object):
    def __init__(self):
        self.points = []  # every added point, repeats included  # @viz init

    def add(self, point):
        self.points.append(point)  # @viz add

    def count(self, point):
        x, y = point  # @viz count
        total = 0  # @viz count
        for px, py in self.points:  # try each stored point as the corner across from the query  # @viz diag
            if px == x or abs(px - x) != abs(py - y):  # not a diagonal (or no area)  # @viz diag
                continue  # @viz diag
            # The other two corners are (x, py) and (px, y): count them by scanning again.
            a = sum(1 for qx, qy in self.points if qx == x and qy == py)  # @viz corner
            b = sum(1 for qx, qy in self.points if qx == px and qy == y)  # @viz corner
            total += a * b  # @viz sum
        return total  # @viz return
