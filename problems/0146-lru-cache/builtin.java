import java.util.LinkedHashMap;
import java.util.Map;

class LRUCache {
    private final LinkedHashMap<Integer, Integer> map;

    public LRUCache(int capacity) {
        // accessOrder = true: get and put move the entry to the end
        map = new LinkedHashMap<>(16, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
                return size() > capacity; // checked after each put
            }
        };
    }

    public int get(int key) {
        return map.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        map.put(key, value);
    }
}
