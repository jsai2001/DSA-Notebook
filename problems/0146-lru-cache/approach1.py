class LRUCache(object):
    def __init__(self, capacity):
        self.cap = capacity  # @viz init
        self.items = []  # [key, value] pairs, least recently used first  # @viz init

    def _find(self, key):  # a linear scan: O(capacity)
        for i, (k, _) in enumerate(self.items):
            if k == key:
                return i
        return -1

    def get(self, key):
        i = self._find(key)  # @viz get
        if i == -1:  # @viz miss
            return -1  # @viz miss
        item = self.items.pop(i)  # used now: move it to the back  # @viz hit
        self.items.append(item)  # @viz hit
        return item[1]  # @viz hit

    def put(self, key, value):
        i = self._find(key)  # @viz put
        if i != -1:  # already there: drop the old entry first  # @viz update
            self.items.pop(i)  # @viz update
        elif len(self.items) == self.cap:  # full: evict the least recently used, at the front  # @viz evict
            self.items.pop(0)  # @viz evict
        self.items.append([key, value])  # the newest goes at the back  # @viz insert
