class Node(object):
    __slots__ = ("key", "val", "prev", "next")

    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None


class LRUCache(object):
    def __init__(self, capacity):
        self.cap = capacity  # @viz init
        self.map = {}  # key -> its node  # @viz init
        self.head, self.tail = Node(), Node()  # sentinels: no empty-list special cases  # @viz init
        self.head.next, self.tail.prev = self.tail, self.head  # most recent after head, least recent before tail  # @viz init

    def _unlink(self, node):
        node.prev.next, node.next.prev = node.next, node.prev

    def _push_front(self, node):
        node.prev, node.next = self.head, self.head.next
        self.head.next.prev = node
        self.head.next = node

    def get(self, key):
        node = self.map.get(key)  # O(1): the map finds the node  # @viz miss
        if node is None:  # @viz miss
            return -1  # @viz miss
        self._unlink(node)  # O(1): move it to the front  # @viz hit
        self._push_front(node)  # @viz hit
        return node.val  # @viz hit

    def put(self, key, value):
        node = self.map.get(key)  # @viz update
        if node:  # @viz update
            node.val = value  # @viz update
            self._unlink(node)  # @viz update
        else:  # @viz evict
            if len(self.map) == self.cap:  # full: evict the node just before the tail  # @viz evict
                lru = self.tail.prev  # @viz evict
                self._unlink(lru)  # @viz evict
                del self.map[lru.key]  # that's why each node keeps its key  # @viz evict
            node = Node(key, value)  # @viz insert
            self.map[key] = node  # @viz insert
        self._push_front(node)  # @viz insert
