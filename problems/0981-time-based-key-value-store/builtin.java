import java.util.*;
class TimeMap {
    private final Map<String, TreeMap<Integer, String>> store = new HashMap<>(); // a sorted map per key
    public TimeMap() {}
    public void set(String key, String value, int timestamp) {
        store.computeIfAbsent(key, k -> new TreeMap<>()).put(timestamp, value);
    }
    public String get(String key, int timestamp) {
        TreeMap<Integer, String> m = store.get(key);
        if (m == null) return "";
        Map.Entry<Integer, String> e = m.floorEntry(timestamp); // latest time <= timestamp
        return e == null ? "" : e.getValue();
    }
}
