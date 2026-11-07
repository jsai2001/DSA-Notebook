import java.util.*;
class Solution {
    public boolean isNStraightHand(int[] hand, int groupSize) {
        if (hand.length % groupSize != 0) return false; // the cards must split evenly // @viz init
        List<Integer> h = new ArrayList<>(); // @viz init
        for (int x : hand) h.add(x); // @viz init
        Collections.sort(h); // @viz init
        while (!h.isEmpty()) { // @viz group
            long start = h.get(0); // the smallest card left must start a group // @viz group
            for (long x = start; x < start + groupSize; x++) { // @viz take
                int i = x > Integer.MAX_VALUE ? -1 : h.indexOf((int) x); // @viz fail
                if (i < 0) return false; // a missing card breaks the run // @viz fail
                h.remove(i); // O(n) // @viz take
            }
        }
        return true; // @viz return
    }
}
