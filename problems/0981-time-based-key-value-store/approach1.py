class TimeMap(object):
    def __init__(self):
        self.at = {}  # (key, timestamp) -> value  # @viz init
    def set(self, key, value, timestamp):
        self.at[(key, timestamp)] = value  # @viz set
    def get(self, key, timestamp):
        for t in range(timestamp, 0, -1):  # try timestamp, timestamp - 1, ... down to 1  # @viz scan
            if (key, t) in self.at:  # @viz scan
                return self.at[(key, t)]  # @viz found
        return ""  # nothing set at or before timestamp  # @viz none
