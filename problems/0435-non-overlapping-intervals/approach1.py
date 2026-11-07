class Solution(object):
    def eraseOverlapIntervals(self, intervals):
        iv = sorted(intervals)  # by start  # @viz init
        n = len(iv)  # @viz init
        keep = [1] * n  # keep[i]: most intervals kept from iv[:i + 1], ending with iv[i]  # @viz init
        for i in range(n):  # @viz dp
            for j in range(i):  # @viz dp
                if iv[j][1] <= iv[i][0]:  # iv[j] ends before iv[i] starts: they fit together  # @viz dp
                    keep[i] = max(keep[i], keep[j] + 1)  # @viz dp
        return n - max(keep)  # remove everything else  # @viz return
