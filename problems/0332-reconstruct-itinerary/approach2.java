import java.util.*;
class Solution {
    private final Map<String, PriorityQueue<String>> out = new HashMap<>(); // airport -> its destinations, smallest on top
    private final LinkedList<String> route = new LinkedList<>();
    public List<String> findItinerary(List<List<String>> tickets) {
        for (List<String> t : tickets) out.computeIfAbsent(t.get(0), k -> new PriorityQueue<>()).add(t.get(1)); // @viz init
        visit("JFK"); // @viz return
        return route; // @viz return
    }
    private void visit(String a) { // Hierholzer: use up every ticket out of a, then add a // @viz visit
        PriorityQueue<String> dest = out.get(a); // @viz visit
        while (dest != null && !dest.isEmpty()) visit(dest.poll()); // always fly the smallest destination first // @viz visit
        route.addFirst(a); // stuck here: this airport comes after everything visited from it // @viz stuck
    }
}
