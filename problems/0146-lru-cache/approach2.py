import heapq
class LRUCache(object):
    def __init__(self, capacity):
        self.cap = capacity  # @viz init
        self.data = {}  # key -> [value, time of last use]  # @viz init
        self.heap = []  # (time, key); old entries stay until popped  # @viz init
        self.clock = 0  # @viz init

    def _touch(self, key):  # mark key as used now
        self.clock += 1
        self.data[key][1] = self.clock
        heapq.heappush(self.heap, (self.clock, key))

    def get(self, key):
        if key not in self.data:  # @viz miss
            return -1  # @viz miss
        self._touch(key)  # @viz hit
        return self.data[key][0]  # @viz hit

    def put(self, key, value):
        if key in self.data:  # @viz update
            self.data[key][0] = value  # @viz update
        else:  # @viz evict
            if len(self.data) == self.cap:  # full: find the least recently used  # @viz evict
                while True:  # @viz evict
                    t, k = heapq.heappop(self.heap)  # @viz evict
                    if self.data[k][1] == t:  # this key's latest time: it's the real LRU  # @viz evict
                        del self.data[k]  # @viz evict
                        break  # @viz evict
                    # otherwise the key was used again later: skip this old entry
            self.data[key] = [value, 0]  # @viz insert
        self._touch(key)  # @viz insert
