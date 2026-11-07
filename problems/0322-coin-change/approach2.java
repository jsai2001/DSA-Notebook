import java.util.*;
class Solution {
    public int coinChange(int[] coins, int amount) {
        if (amount == 0) return 0; // @viz base
        boolean[] seen = new boolean[amount + 1]; // amounts already reached with fewer coins // @viz init
        seen[0] = true; // @viz init
        ArrayDeque<Integer> queue = new ArrayDeque<>(); // @viz init
        queue.add(0); // @viz init
        for (int steps = 1; !queue.isEmpty(); steps++) { // one BFS level per coin // @viz level
            for (int size = queue.size(); size > 0; size--) { // @viz level
                int a = queue.poll(); // @viz add
                for (int c : coins) { // add one more coin // @viz add
                    long b = (long) a + c; // coins can be up to 2^31 - 1: avoid overflow // @viz add
                    if (b == amount) return steps; // the first time it's reached is with the fewest coins // @viz found
                    if (b < amount && !seen[(int) b]) { // @viz add
                        seen[(int) b] = true; // @viz add
                        queue.add((int) b); // @viz add
                    }
                }
            }
        }
        return -1; // @viz none
    }
}
