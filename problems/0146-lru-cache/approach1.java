import java.util.*;

class LRUCache {
    private final int cap;
    private final List<int[]> items = new ArrayList<>(); // {key, value}, least recently used first // @viz init

    public LRUCache(int capacity) {
        cap = capacity; // @viz init
    }

    private int find(int key) { // a linear scan: O(capacity)
        for (int i = 0; i < items.size(); i++) {
            if (items.get(i)[0] == key) return i;
        }
        return -1;
    }

    public int get(int key) {
        int i = find(key); // @viz get
        if (i == -1) return -1; // @viz miss
        int[] item = items.remove(i); // used now: move it to the back // @viz hit
        items.add(item); // @viz hit
        return item[1]; // @viz hit
    }

    public void put(int key, int value) {
        int i = find(key); // @viz put
        if (i != -1) { // already there: drop the old entry first // @viz update
            items.remove(i); // @viz update
        } else if (items.size() == cap) { // full: evict the least recently used, at the front // @viz evict
            items.remove(0); // @viz evict
        }
        items.add(new int[] {key, value}); // the newest goes at the back // @viz insert
    }
}
