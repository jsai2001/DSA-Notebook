class Solution(object):
    def merge(self, intervals):
        top = max(e for _, e in intervals)  # @viz init
        starts = [0] * (top + 1)  # starts[x]: how many intervals begin at x  # @viz init
        ends = [0] * (top + 1)  # ends[x]: how many intervals finish at x  # @viz init
        for s, e in intervals:  # @viz count
            starts[s] += 1  # @viz count
            ends[e] += 1  # @viz count
        merged, active, begin = [], 0, 0  # active: intervals open right now  # @viz prep
        for x in range(top + 1):  # sweep left to right  # @viz sweep
            if active == 0 and starts[x]:  # nothing was open: a merged interval begins here  # @viz begin
                begin = x  # @viz begin
            active += starts[x]  # count every start and end at x before checking for a close  # @viz sweep
            active -= ends[x]  # @viz sweep
            if active == 0 and ends[x]:  # the last open interval just closed  # @viz close
                merged.append([begin, x])  # @viz close
        return merged  # @viz return
