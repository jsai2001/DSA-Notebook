import java.util.*;
class TimeMap {
    private final Map<String, List<Integer>> times = new HashMap<>(); // key -> timestamps, sorted // @viz init
    private final Map<String, List<String>> values = new HashMap<>(); // key -> values, same order // @viz init
    public TimeMap() {} // @viz init
    public void set(String key, String value, int timestamp) {
        times.computeIfAbsent(key, k -> new ArrayList<>()).add(timestamp); // timestamps only grow, so the list stays sorted // @viz set
        values.computeIfAbsent(key, k -> new ArrayList<>()).add(value); // @viz set
    }
    public String get(String key, int timestamp) {
        List<Integer> ts = times.get(key); // @viz scan
        if (ts == null) return ""; // @viz none
        for (int i = ts.size() - 1; i >= 0; i--) // newest first // @viz scan
            if (ts.get(i) <= timestamp) return values.get(key).get(i); // the first one at or before timestamp is the latest // @viz found
        return ""; // @viz none
    }
}
