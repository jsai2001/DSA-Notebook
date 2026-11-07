import java.util.*;
class Solution {
    private final Map<String, List<String>> out = new HashMap<>(); // airport -> its destinations, smallest first
    private final Map<String, boolean[]> used = new HashMap<>();
    private final List<String> route = new ArrayList<>();
    private int total;
    public List<String> findItinerary(List<List<String>> tickets) {
        List<List<String>> t = new ArrayList<>(tickets); // @viz init
        t.sort((x, y) -> x.get(0).equals(y.get(0)) ? x.get(1).compareTo(y.get(1)) : x.get(0).compareTo(y.get(0))); // @viz init
        for (List<String> e : t) out.computeIfAbsent(e.get(0), k -> new ArrayList<>()).add(e.get(1)); // @viz init
        for (Map.Entry<String, List<String>> e : out.entrySet()) used.put(e.getKey(), new boolean[e.getValue().size()]); // @viz init
        total = tickets.size(); // @viz init
        route.add("JFK"); // @viz init
        go(); // @viz return
        return route; // @viz return
    }
    private boolean go() { // try to use every remaining ticket from the last airport // @viz try
        if (route.size() == total + 1) return true; // all tickets used // @viz done
        String a = route.get(route.size() - 1); // @viz try
        List<String> dest = out.get(a); // @viz try
        if (dest == null) return false; // @viz try
        boolean[] u = used.get(a); // @viz try
        for (int i = 0; i < dest.size(); i++) { // smallest destination first // @viz try
            if (u[i] || (i > 0 && dest.get(i).equals(dest.get(i - 1)) && !u[i - 1])) continue; // skip a repeat of a ticket just tried // @viz try
            u[i] = true; // @viz take
            route.add(dest.get(i)); // @viz take
            if (go()) return true; // the first full route found is the smallest one // @viz take
            route.remove(route.size() - 1); // dead end: undo and try the next ticket // @viz undo
            u[i] = false; // @viz undo
        }
        return false; // @viz undo
    }
}
