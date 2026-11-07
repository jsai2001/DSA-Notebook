import java.util.*;

class LRUCache {
    private static class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }

    private final int cap;
    private final Map<Integer, Node> map = new HashMap<>(); // key -> its node // @viz init
    private final Node head = new Node(0, 0), tail = new Node(0, 0); // sentinels // @viz init

    public LRUCache(int capacity) {
        cap = capacity; // @viz init
        head.next = tail; // most recent after head, least recent before tail // @viz init
        tail.prev = head; // @viz init
    }

    private void unlink(Node n) {
        n.prev.next = n.next;
        n.next.prev = n.prev;
    }

    private void pushFront(Node n) {
        n.prev = head;
        n.next = head.next;
        head.next.prev = n;
        head.next = n;
    }

    public int get(int key) {
        Node node = map.get(key); // O(1): the map finds the node // @viz miss
        if (node == null) return -1; // @viz miss
        unlink(node); // O(1): move it to the front // @viz hit
        pushFront(node); // @viz hit
        return node.val; // @viz hit
    }

    public void put(int key, int value) {
        Node node = map.get(key); // @viz update
        if (node != null) { // @viz update
            node.val = value; // @viz update
            unlink(node); // @viz update
        } else { // @viz evict
            if (map.size() == cap) { // full: evict the node just before the tail // @viz evict
                Node lru = tail.prev; // @viz evict
                unlink(lru); // @viz evict
                map.remove(lru.key); // that's why each node keeps its key // @viz evict
            }
            node = new Node(key, value); // @viz insert
            map.put(key, node); // @viz insert
        }
        pushFront(node); // @viz insert
    }
}
