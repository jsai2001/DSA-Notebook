class Solution(object):
    def partitionLabels(self, s):
        span = {}  # letter -> [first index, last index]  # @viz spans
        for i, ch in enumerate(s):  # @viz spans
            if ch in span:  # @viz spans
                span[ch][1] = i  # @viz spans
            else:  # @viz spans
                span[ch] = [i, i]  # @viz spans
        res = []  # @viz merge
        cur = None  # the part being built, as [start, end]  # @viz merge
        for a, b in sorted(span.values()):  # at most 26 spans, by start  # @viz merge
            if cur and a <= cur[1]:  # overlaps the current part: the letters must stay together  # @viz merge
                cur[1] = max(cur[1], b)  # @viz merge
            else:  # @viz cut
                if cur:  # @viz cut
                    res.append(cur[1] - cur[0] + 1)  # @viz cut
                cur = [a, b]  # @viz cut
        res.append(cur[1] - cur[0] + 1)  # @viz return
        return res  # @viz return
