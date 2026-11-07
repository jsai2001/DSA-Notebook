class Solution(object):
    def kClosest(self, points, k):
        order = sorted(points, key=lambda p: p[0] * p[0] + p[1] * p[1])  # squared distance: no sqrt needed  # @viz sort
        return order[:k]  # @viz return
