from bisect import bisect_right
class TimeMap(object):
    def __init__(self):
        self.times, self.values = {}, {}
    def set(self, key, value, timestamp):
        self.times.setdefault(key, []).append(timestamp)
        self.values.setdefault(key, []).append(value)
    def get(self, key, timestamp):
        i = bisect_right(self.times.get(key, []), timestamp)  # first time > timestamp
        return self.values[key][i - 1] if i else ""
