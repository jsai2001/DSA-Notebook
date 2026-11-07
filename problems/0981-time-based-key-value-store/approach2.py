class TimeMap(object):
    def __init__(self):
        self.store = {}  # key -> list of (timestamp, value); timestamps only grow, so it's sorted  # @viz init
    def set(self, key, value, timestamp):
        self.store.setdefault(key, []).append((timestamp, value))  # @viz set
    def get(self, key, timestamp):
        pairs = self.store.get(key, [])  # @viz scan
        for i in range(len(pairs) - 1, -1, -1):  # newest first  # @viz scan
            if pairs[i][0] <= timestamp:  # the first one at or before timestamp is the latest  # @viz found
                return pairs[i][1]  # @viz found
        return ""  # @viz none
