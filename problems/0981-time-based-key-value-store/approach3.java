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
        List<Integer> ts = times.get(key); // @viz search
        if (ts == null) return ""; // @viz return
        int lo = 0, hi = ts.size(); // find the first timestamp > timestamp // @viz search
        while (lo < hi) { // @viz search
            int mid = (lo + hi) >>> 1; // @viz search
            if (ts.get(mid) <= timestamp) lo = mid + 1; // @viz search
            else hi = mid; // @viz search
        }
        return lo > 0 ? values.get(key).get(lo - 1) : ""; // the one just before it is the latest at or before timestamp // @viz return
    }
}
