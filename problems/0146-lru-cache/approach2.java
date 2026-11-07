import java.util.*;

class LRUCache {
    private final int cap;
    private long clock = 0; // @viz init
    private final Map<Integer, long[]> data = new HashMap<>(); // key -> {value, time of last use} // @viz init
    private final PriorityQueue<long[]> heap = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0])); // {time, key}; old entries stay until popped // @viz init

    public LRUCache(int capacity) {
        cap = capacity; // @viz init
    }

    private void touch(int key) { // mark key as used now
        data.get(key)[1] = ++clock;
        heap.add(new long[] {clock, key});
    }

    public int get(int key) {
        long[] e = data.get(key); // @viz miss
        if (e == null) return -1; // @viz miss
        touch(key); // @viz hit
        return (int) e[0]; // @viz hit
    }

    public void put(int key, int value) {
        long[] e = data.get(key); // @viz update
        if (e != null) { // @viz update
            e[0] = value; // @viz update
        } else { // @viz evict
            if (data.size() == cap) { // full: find the least recently used // @viz evict
                while (true) { // @viz evict
                    long[] top = heap.poll(); // @viz evict
                    int k = (int) top[1]; // @viz evict
                    if (data.get(k)[1] == top[0]) { // this key's latest time: it's the real LRU // @viz evict
                        data.remove(k); // @viz evict
                        break; // @viz evict
                    } // otherwise the key was used again later: skip this old entry
                }
            }
            data.put(key, new long[] {value, 0}); // @viz insert
        }
        touch(key); // @viz insert
    }
}
