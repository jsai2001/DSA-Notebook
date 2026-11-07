import java.util.*;
class Solution {
    public boolean isNStraightHand(int[] hand, int groupSize) {
        if (hand.length % groupSize != 0) return false; // the cards must split evenly // @viz init
        Map<Long, Integer> count = new HashMap<>(); // card -> copies left // @viz init
        for (int x : hand) count.merge((long) x, 1, Integer::sum); // @viz init
        PriorityQueue<Long> heap = new PriorityQueue<>(count.keySet()); // the smallest card left on top // @viz init
        while (!heap.isEmpty()) { // @viz group
            long start = heap.peek(); // the smallest card left must start a group // @viz group
            for (long x = start; x < start + groupSize; x++) { // @viz take
                int c = count.getOrDefault(x, 0); // @viz fail
                if (c == 0) return false; // a missing card breaks the run // @viz fail
                count.put(x, c - 1); // @viz take
                if (c - 1 == 0) { // x is used up // @viz pop
                    if (x != heap.peek()) return false; // a smaller card is still left, and now it can never be in a group // @viz fail
                    heap.poll(); // @viz pop
                }
            }
        }
        return true; // @viz return
    }
}
