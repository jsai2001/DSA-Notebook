import java.util.*;
class Solution {
    public boolean isNStraightHand(int[] hand, int groupSize) {
        if (hand.length % groupSize != 0) return false; // the cards must split evenly // @viz init
        Map<Long, Integer> count = new HashMap<>(); // card -> copies left // @viz init
        for (int x : hand) count.merge((long) x, 1, Integer::sum); // @viz init
        long[] keys = new long[count.size()]; // @viz group
        int n = 0; // @viz group
        for (long x : count.keySet()) keys[n++] = x; // @viz group
        Arrays.sort(keys); // smallest card first // @viz group
        for (long x : keys) { // @viz group
            int c = count.get(x); // every copy of x left must start its own group // @viz group
            if (c == 0) continue; // @viz group
            for (long y = x; y < x + groupSize; y++) { // start all c groups at once // @viz take
                int have = count.getOrDefault(y, 0); // @viz fail
                if (have < c) return false; // not enough y to go on // @viz fail
                count.put(y, have - c); // @viz take
            }
        }
        return true; // @viz return
    }
}
