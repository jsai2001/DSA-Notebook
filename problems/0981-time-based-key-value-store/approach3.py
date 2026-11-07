class TimeMap(object):
    def __init__(self):
        self.store = {}  # key -> list of (timestamp, value); timestamps only grow, so it's sorted  # @viz init
    def set(self, key, value, timestamp):
        self.store.setdefault(key, []).append((timestamp, value))  # @viz set
    def get(self, key, timestamp):
        pairs = self.store.get(key, [])  # @viz search
        lo, hi = 0, len(pairs)  # find the first pair with time > timestamp  # @viz search
        while lo < hi:  # @viz search
            mid = (lo + hi) // 2  # @viz search
            if pairs[mid][0] <= timestamp:  # @viz search
                lo = mid + 1  # @viz search
            else:  # @viz search
                hi = mid  # @viz search
        return pairs[lo - 1][1] if lo else ""  # the one just before it is the latest at or before timestamp  # @viz return
