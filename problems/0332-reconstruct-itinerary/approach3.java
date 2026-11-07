import java.util.*;
class Solution {
    public List<String> findItinerary(List<List<String>> tickets) {
        Map<String, PriorityQueue<String>> out = new HashMap<>(); // airport -> its destinations, smallest on top // @viz init
        for (List<String> t : tickets) out.computeIfAbsent(t.get(0), k -> new PriorityQueue<>()).add(t.get(1)); // @viz init
        ArrayDeque<String> stack = new ArrayDeque<>(); // the current path // @viz init
        LinkedList<String> route = new LinkedList<>(); // @viz init
        stack.push("JFK"); // @viz init
        while (!stack.isEmpty()) { // @viz visit
            PriorityQueue<String> dest = out.get(stack.peek()); // @viz visit
            if (dest != null && !dest.isEmpty()) stack.push(dest.poll()); // a ticket is left: fly it // @viz visit
            else route.addFirst(stack.pop()); // stuck: this airport is final from here on // @viz stuck
        }
        return route; // @viz return
    }
}
