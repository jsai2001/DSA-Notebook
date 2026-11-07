import java.util.*;
class TimeMap {
    private final Map<String, String> at = new HashMap<>(); // key + "#" + timestamp -> value // @viz init
    public TimeMap() {} // @viz init
    public void set(String key, String value, int timestamp) {
        at.put(key + "#" + timestamp, value); // @viz set
    }
    public String get(String key, int timestamp) {
        for (int t = timestamp; t >= 1; t--) { // try timestamp, timestamp - 1, ... down to 1 // @viz scan
            String v = at.get(key + "#" + t); // @viz scan
            if (v != null) return v; // @viz found
        }
        return ""; // nothing set at or before timestamp // @viz none
    }
}
